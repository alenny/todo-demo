using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using Todo.Models;
using Todo.DataContexts;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TodoDbContext>(opt => opt.UseInMemoryDatabase("TodoDb"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/todoitems", async (TodoItem todo, TodoDbContext db) =>
{
    db.TodoItems.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todoitems/{todo.Id}", todo);
});

app.MapPut("/todoitems/{id}", async (long id, TodoItem todo, TodoDbContext db) =>
{
    var oldTodo = await db.TodoItems.FindAsync(id);
    if (oldTodo == null) {
        return Results.NotFound();
    }
    await db.SaveChangesAsync();
    return Results.Created($"/todoitems/{todo.Id}", todo);
});

app.MapGet("/todoitems", async (TodoDbContext db) => await db.TodoItems.ToListAsync());

app.MapGet("/todoitems/{id}", async (long id, TodoDbContext db) =>
    await db.TodoItems.FindAsync(id) is TodoItem todo ? Results.Ok(todo) : Results.NotFound());

app.Run();