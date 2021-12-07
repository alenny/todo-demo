# Project Name: todo-demo
## Requirements
- List Todo Items
- Add a Todo item
- Update a Todo item
- Delete Todo Item
- Mark Item as Completed

## Prerequisites
- .NET 6 SDK
- Node.js 16

## Run Todo Web API
1. Make sure .NET 6 SDK has been installed.
2. Go to src/TodoApi in a command prompt.
3. Run commands:
```
dotnet dev-certs https --trust
dotnet run
```
4. Local API document endpoint: https://localhost:7143/swagger/index.html

## Run Todo Web site
1. Make sure Node.js 16 has been installed.
2. Go to src/todoweb in a command prompt.
3. Run command:
```
npm start
```

## Re-create Database with Initial Data
1. Delete all DB files in src/TodoApi, including todo.db, todo.db-shm and todo.db-wal.
2. Re-run Todo web API

