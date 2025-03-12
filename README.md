# Task Management Application
This project is a full-stack application that allows users to manage tasks. Currently, it includes user authentication and basic task management functionalities. The backend supports full CRUD operations for tasks, while the frontend allows users to log in, fetch their tasks, update task statuses, and organize tasks using a drag-and-drop Kanban view.

## Technologies Used
Backend
- .NET: A robust framework for building scalable and secure backend services.
- Entity Framework: An ORM (Object-Relational Mapper) for interacting with the database.
- JWT (JSON Web Tokens): Used for secure user authentication.

Database
- MySQL: A relational database for storing user and task data.

Frontend
- React: A JavaScript library for building user interfaces.
- Vite: A fast build tool for modern web development.
- Tailwind CSS: A utility-first CSS framework for styling the application.
- Dnd Kit: A library for implementing drag-and-drop functionality in the Kanban view.
- Axios: A promise-based HTTP client for making API requests to the backend.

## Features Implemented
Backend
- Authentication:
  - User registration and login with JWT-based authentication.
- Task Management:
  - Create: Add new tasks.
  - Read: Fetch all tasks for the logged-in user.
  - Update: Edit task details and update task status.
  - Delete: Remove tasks.

Frontend
- Authentication:
  - User registration and login.
- Task Management:
  - Fetch and display tasks for the logged-in user.
  - Update task status (e.g., mark as completed).
  - Organize tasks in a Kanban view with drag-and-drop functionality.

## Installation and Execution
- Prerequisites
  - .NET SDK: Ensure you have the .NET SDK installed.
  - Node.js: Ensure you have Node.js installed.
  - MySQL: Ensure you have MySQL installed and running.

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/Thalesmau/Task_Manager.git
```

2. Navigate to the backend directory:
```bash
cd Task_Manager\Task_Manager_Backend
```

3. Update the database connection string and jwt in appsettings.json:
```bash
"Jwt": {
  "Key": "your-scret-key",
  "Issuer": "Task_Manager_Backend",
  "Audience": "Task_Manager_Frontend"
},
"ConnectionStrings": {
    "DefaultConnection": "Server=your-server;Database=your-database;Uid=your-user;Pwd=your-password;"
}
```

4. Run Entity Framework migrations to create the database:
```bash
dotnet ef database update
```

5. Start the backend server:
```bash
dotnet run
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Task_Manager\Task_Manager_Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API endpoint:
  - Open the .env file (or create one if it doesn’t exist) in the frontend directory.
  - Add the following line to set the API URL
```bash
VITE_BASE_URL=https://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## Code Structure
Backend
- Controllers: Handles API endpoints for authentication and task management.
- DTOs (Data Transfer Objects): Used to transfer data between layers (e.g., request/response objects).
- Models: Defines the database schema using Entity Framework.
- Services: Contains business logic for tasks and authentication.
- Migrations: Contains database migration files.

Frontend
- Components: Reusable React components for the UI.
- Pages: Contains the main pages (e.g., Login, Task Management).
- Hooks: Custom hooks for state management and API calls.
- Styles: Tailwind CSS classes for styling.
- Dnd Kit: Implements drag-and-drop functionality for the Kanban view.
