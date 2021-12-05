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

app.MapPost("/userprofiles", async (UserProfile profile, TodoDbContext db) => {
    db.UserProfiles.Add(profile);
    await db.SaveChangesAsync();
    return Results.Created($"/userprofiles/{profile.Id}", profile);
});

app.MapGet("/userprofiles", async (TodoDbContext db) => await db.UserProfiles.ToListAsync());

app.MapGet("/userprofiles/{id}", async (long id, TodoDbContext db) => 
    await db.UserProfiles.FindAsync(id) is UserProfile profile ? Results.Ok(profile) : Results.NotFound(id));

app.MapPost("/todoitems", async (TodoItem todo, TodoDbContext db) => {
    var profile = await db.UserProfiles.FindAsync(todo.UserId);
    if (profile == null) {
        return Results.NotFound(new { UserId = todo.UserId });
    }
    db.TodoItems.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todoitems/{todo.Id}", todo);
});

app.MapPut("/todoitems/{id}", async (long id, TodoItem todo, TodoDbContext db) => {
    var oldTodo = await db.TodoItems.FindAsync(id);
    if (oldTodo == null) {
        return Results.NotFound(new { id });
    }
    var profile = await db.UserProfiles.FindAsync(todo.UserId);
    if (profile == null) {
        return Results.NotFound(new { UserId = todo.UserId });
    }
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/todoitems", async (TodoDbContext db) => await db.TodoItems.ToListAsync());

app.MapGet("/userprofiles/{id}/todoitems", async (long id, TodoDbContext db) => {
    var profile = await db.UserProfiles.FindAsync(id);
    if (profile == null) {
        return Results.NotFound(new { id });
    }
    var ret = await db.TodoItems.Where(todo => todo.UserId == id).ToListAsync();
    return Results.Ok(ret);
});

app.Run();