using System;
using Microsoft.EntityFrameworkCore;

namespace Todo.Models {
    public class TodoItem {
        public long Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime DateCreated { get; set; }
        public DateTime? DateTarget { get; set; }
        public DateTime? DateCompleted { get; set; }
        public TodoState State { get; set; }
    }
}