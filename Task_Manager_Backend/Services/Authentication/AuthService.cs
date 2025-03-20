using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;

using Task_Manager_Backend.Data;
using Task_Manager_Backend.Models;
using Task_Manager_Backend.DTOs;

namespace Task_Manager_Backend.Services.Authentication;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<string> Register(UserRegisterDTO userDTO)
    {
        try
        {
            if (await _context.Users.AnyAsync(u => u.Email == userDTO.Email))
            {
                throw new Exception("Email already in use.");
            }

            var user = new User
            {
                Username = userDTO.Username,
                Email = userDTO.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password)
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return "User registered successfully!";
        } catch (ArgumentException ex)
        {
            throw new ArgumentException($"Error saving user: {ex.Message}");
        }
    }

    public async Task<AuthResponseDTO> SignIn(UserSignInDTO userDTO)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDTO.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(userDTO.Password, user.Password))
        {
            throw new Exception("Invalid credentials.");
        }

        var token = GenerateJwtToken(user);

        return new AuthResponseDTO
        {
            Id = user.Id,
            Email = user.Email,
            Name = user.Username,
            Token = token,
        };
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Name, user.Username!)
            };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
