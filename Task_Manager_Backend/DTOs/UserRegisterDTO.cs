using System.ComponentModel.DataAnnotations;

namespace Task_Manager_Backend.DTOs;

public class UserRegisterDTO
{
    [Required]
    public string? Username { get; set; }

    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    public string? Password { get; set; }
}
