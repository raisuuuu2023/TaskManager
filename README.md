# Task Manager API

A REST API built with Node.js and Express.js using in-memory storage.

## Setup

npm install
node server.js

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/stats | Get stats |
| GET | /api/tasks/:id | Get one task |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| PATCH | /api/tasks/:id | Partial update |
| DELETE | /api/tasks/:id | Delete a task |

## Query Parameters

| Param | Example | Description |
|-------|---------|-------------|
| status | ?status=To Do | Filter by status |
| search | ?search=node | Search title/description |
| sort | ?sort=newest | newest, oldest, title_asc, title_desc |