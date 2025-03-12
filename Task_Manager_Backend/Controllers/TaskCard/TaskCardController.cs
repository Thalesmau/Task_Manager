using Task_Manager_Backend.Services.TaskService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task_Manager_Backend.DTOs;
using System.Runtime.CompilerServices;

namespace Task_Manager_Backend.Controllers.TaskCard
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskCardController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskCardController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskCardDTO taskCardDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdTask = await _taskService.CreateTaskAsync(taskCardDto);
            return CreatedAtAction(nameof(GetTaskById), new { id = createdTask.Id }, createdTask);
        }

        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetTasksByUserId(int userId)
        {
            var tasks = await _taskService.GetTasksByUserIdAsync(userId);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPut("UpdateTask/{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskCardDTO taskCardDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await _taskService.UpdateTaskAsync(id, taskCardDto);
            return Ok(task);
        }

        [HttpPut("UpdateStatusTask/{id}")]
        public async Task<ActionResult> UpdateStatusTask(int id, [FromBody] UpdateTaskStatusDTO newStatus)
        {
            var updatedStatus = await _taskService.UpdateTaskStatusAsync(id, newStatus.Status);

            if (updatedStatus == null)
                return NotFound(new { message = "Task not found" });

            return Ok(updatedStatus);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var result = await _taskService.DeleteTaskAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPatch("Complete/{id}")]
        public async Task<IActionResult> MarkTaskAsCompleted(int id)
        {
            var task = await _taskService.MarkTaskAsCompletedAsync(id);
            return Ok(task);
        }
    }
}
