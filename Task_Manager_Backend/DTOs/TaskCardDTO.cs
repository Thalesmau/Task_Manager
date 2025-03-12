using System.ComponentModel.DataAnnotations;

namespace Task_Manager_Backend.DTOs;

public class TaskCardDTO
{
    [Required(ErrorMessage = "Title is required")]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [Required(ErrorMessage = "Status is required")]
    public string? Status { get; set; }

    [Required(ErrorMessage = "UserId is required")]
    public int UserId { get; set; }
}
