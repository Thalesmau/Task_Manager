using Microsoft.EntityFrameworkCore;
using Task_Manager_Backend.Models;

namespace Task_Manager_Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<TaskCard> TaskCards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.TaskCards)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId);

        base.OnModelCreating(modelBuilder);
    }
}
