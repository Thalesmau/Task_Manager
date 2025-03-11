namespace Task_Manager_Backend.Models;

public class TaskCard
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? CompletedAt { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public int BoardId { get; set; }
    public Board? Board { get; set; }

    public int ColumnId { get; set; }
    public Column? Column { get; set; }
}
