using System;
using Microsoft.EntityFrameworkCore;

namespace Todo.Models {
    [Index(nameof(UserId), Name = "Idx_UserId")]
    public class TodoItem {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTimeOffset DateCreated { get; set; }
        public DateTimeOffset DateTarget { get; set; }
        public DateTimeOffset DateCompleted { get; set; }
        public TodoState State { get; set; }
    }
}