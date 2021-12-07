using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.InMemory;
using Microsoft.EntityFrameworkCore.Sqlite;
using Todo.Models;
using Todo.DataContexts;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddDbContext<TodoDbContext>(opt => opt.UseInMemoryDatabase("TodoDb"));
builder.Services.AddDbContext<TodoDbContext>(opt => opt.UseSqlite(builder.Configuration.GetConnectionString("TodoDb")));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Create database and insert initial data if the database file does not exist
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<TodoDbContext>();
    context.Database.EnsureCreated();
    DbInitializer.Initialize(context);
}

app.UseHttpsRedirection();

// Create a new todo item
app.MapPost("/todoitems", async (TodoItem todo, TodoDbContext db) => {
    db.TodoItems.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todoitems/{todo.Id}", todo);
});

// Update an existing todo item
app.MapPut("/todoitems/{id}", async (long id, TodoItem todo, TodoDbContext db) => {
    var item = await db.TodoItems.FindAsync(id);
    if (item == null) {
        return Results.NotFound(new { id });
    }
    item.Id = id;
    item.Description = todo.Description;
    item.State = todo.State;
    item.DateTarget = todo.DateTarget;
    item.DateCompleted = todo.DateCompleted;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// Get all todo items
app.MapGet("/todoitems", async (TodoDbContext db) => await db.TodoItems.ToListAsync());

// Get one specified todo item
app.MapGet("/todoitems/{id}", async (long id, TodoDbContext db) => {
    var item = await db.TodoItems.FindAsync(id);
    return item != null ? Results.Ok(item) : Results.NotFound(new { id });
});

app.Run();