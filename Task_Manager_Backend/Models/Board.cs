namespace Task_Manager_Backend.Models;

public class Board
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public ICollection<Column>? Columns { get; set; }
    public ICollection<TaskCard>? TaskCards { get; set; }
}
