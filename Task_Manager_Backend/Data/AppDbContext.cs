using Microsoft.EntityFrameworkCore;
using Task_Manager_Backend.Models;

namespace Task_Manager_Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Board> Boards { get; set; }
    public DbSet<Column> Columns { get; set; }
    public DbSet<TaskCard> TaskCards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.Boards)
            .WithOne(b => b.User)
            .HasForeignKey(b => b.UserId);

        modelBuilder.Entity<Board>()
            .HasMany(b => b.Columns)
            .WithOne(c => c.Board)
            .HasForeignKey(c => c.BoardId);

        modelBuilder.Entity<Board>()
            .HasMany(b => b.TaskCards)
            .WithOne(t => t.Board)
            .HasForeignKey(t => t.BoardId);

        modelBuilder.Entity<Column>()
            .HasMany(c => c.TaskCards)
            .WithOne(t => t.Column)
            .HasForeignKey(t => t.ColumnId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.TaskCards)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId);
    }
}
