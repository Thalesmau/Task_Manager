using Task_Manager_Backend.DTOs;

namespace Task_Manager_Backend.Services.Authentication;

public interface IAuthService
{
    Task<string> Register(UserRegisterDTO userDTO);
    Task<string> SignIn(UserSignInDTO userDTO);
}
