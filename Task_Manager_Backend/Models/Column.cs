namespace Task_Manager_Backend.Models;

public class Column
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public int BoardId { get; set; }
    public Board? Board { get; set; }

    public ICollection<TaskCard>? TaskCards { get; set; }
}
