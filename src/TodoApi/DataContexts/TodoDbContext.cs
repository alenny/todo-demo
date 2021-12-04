using Microsoft.EntityFrameworkCore;
using Todo.Models;

namespace Todo.DataContexts {
    public class TodoDbContext : DbContext {
        public TodoDbContext(DbContextOptions<TodoDbContext> options)
            : base(options) { }

        public DbSet<UserProfile> UserProfiles => Set<UserProfile>();
        public DbSet<TodoItem> TodoItems => Set<TodoItem>();
    }
}
