using Task_Manager_Backend.DTOs;
using Task_Manager_Backend.Models;

namespace Task_Manager_Backend.Services.TaskService;

public interface ITaskService
{
    Task<TaskCard> CreateTaskAsync(TaskCardDTO taskCardDto);
    Task<List<TaskCard>> GetTasksByUserIdAsync(int userId);
    Task<TaskCard> GetTaskByIdAsync(int id);
    Task<TaskCard> UpdateTaskAsync(int id, TaskCardDTO taskCardDto);
    Task<TaskCard?> UpdateTaskStatusAsync(int id, string newStatus);
    Task<bool> DeleteTaskAsync(int id);
    Task<TaskCard> MarkTaskAsCompletedAsync(int id);
}
