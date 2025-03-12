using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Task_Manager_Backend.Data;
using Task_Manager_Backend.DTOs;
using Task_Manager_Backend.Models;

namespace Task_Manager_Backend.Services.TaskService;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<TaskCard> CreateTaskAsync(TaskCardDTO taskCardDto)
    {
        ArgumentNullException.ThrowIfNull(taskCardDto);

        var task = new TaskCard
        {
            Title = taskCardDto.Title,
            Description = taskCardDto.Description,
            Status = taskCardDto.Status,
            UserId = taskCardDto.UserId,
            CreatedAt = DateTime.Now
        };

        _context.TaskCards.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<List<TaskCard>> GetTasksByUserIdAsync(int userId)
    {
        return await _context.TaskCards
            .Where(t => t.UserId == userId)
            .ToListAsync();
    }

    public async Task<TaskCard> GetTaskByIdAsync(int id)
    {
        return await _context.TaskCards.FindAsync(id);
    }

    public async Task<TaskCard> UpdateTaskAsync(int id, TaskCardDTO taskCardDto)
    {
        var task = await _context.TaskCards.FindAsync(id) ?? throw new KeyNotFoundException("Task not found");

        task.Title = taskCardDto.Title;
        task.Description = taskCardDto.Description;
        task.Status = taskCardDto.Status;

        _context.TaskCards.Update(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<TaskCard?> UpdateTaskStatusAsync(int id, string newStatus)
    {
        var task = await _context.TaskCards.FindAsync(id);

        if (task == null)
            return null;

        task.Status = newStatus;

        await _context.SaveChangesAsync();

        return task;
    }

    public async Task<bool> DeleteTaskAsync(int id)
    {
        var task = await _context.TaskCards.FindAsync(id);
        if (task == null)
        {
            throw new KeyNotFoundException("Task not found");
        }

        _context.TaskCards.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<TaskCard> MarkTaskAsCompletedAsync(int id)
    {
        var task = await _context.TaskCards.FindAsync(id);
        if (task == null)
        {
            throw new KeyNotFoundException("Task not found");
        }

        task.Status = "Done";
        task.CompletedAt = DateTime.Now;

        _context.TaskCards.Update(task);
        await _context.SaveChangesAsync();
        return task;
    }
}
