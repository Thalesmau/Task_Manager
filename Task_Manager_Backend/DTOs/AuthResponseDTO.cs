namespace Task_Manager_Backend.DTOs;

public class AuthResponseDTO
{
    public string? Token { get; set; }
    public UserDTO User { get; set; }
}

public class UserDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
}
