using System.ComponentModel.DataAnnotations;

namespace Task_Manager_Backend.DTOs;

public class UserSignInDTO
{
    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    public string? Password { get; set; }
}
