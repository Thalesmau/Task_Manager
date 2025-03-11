namespace Task_Manager_Backend.Models;

public class User
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    public DateTime LastModifiedDate { get; set; }
    public ICollection<Board>? Boards { get; set; }
    public ICollection<TaskCard>? TaskCards{ get; set; }

}
