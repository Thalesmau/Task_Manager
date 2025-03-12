using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Task_Manager_Backend.DTOs;
using Task_Manager_Backend.Services.Authentication;

namespace Task_Manager_Backend.Controllers.Authentication;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register(UserRegisterDTO userDTO)
    {
        try
        {
            var result = await _authService.Register(userDTO);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("SignIn")]
    public async Task<IActionResult> SignIn(UserSignInDTO userDTO)
    {
        try
        {
            var token = await _authService.SignIn(userDTO);
            return Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


}
