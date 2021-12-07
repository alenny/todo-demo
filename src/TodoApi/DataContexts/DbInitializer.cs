using System;
using Todo.Models;

namespace Todo.DataContexts {
    public class DbInitializer {
        public static void Initialize(TodoDbContext context) {
            if (context.TodoItems.Any()) {
                return;     // DB has data already
            }
            var todoItems = new TodoItem[] {
                new TodoItem { Description = "Wash car", DateCreated = DateTime.UtcNow, DateTarget = DateTime.UtcNow.AddDays(10) },
                new TodoItem { Description = "Buy food from Costco", DateCreated = DateTime.UtcNow, DateTarget = DateTime.UtcNow.AddDays(5) },
                new TodoItem { Description = "Read book - The GO Programming Language", DateCreated = DateTime.UtcNow },
                new TodoItem { Description = "Pick up kids", DateCreated = DateTime.UtcNow, DateTarget = DateTime.UtcNow.AddDays(1) },
                new TodoItem { Description = "Buy Christmas presents for kids", DateCreated = DateTime.UtcNow, DateTarget = DateTime.UtcNow.AddDays(7) },
            };
            context.TodoItems.AddRange(todoItems);
            context.SaveChanges();
        }
    }
}