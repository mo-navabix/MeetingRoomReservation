# Sprint 01 - Project Foundation

## Goal

Prepare the development environment and understand the core architecture of NestJS before starting implementation.

---

## Completed

- Created project folder structure.
- Initialized Git repository.
- Created documentation structure.
- Selected project technologies.
- Installed Nest CLI.
- Created the NestJS project.
- Successfully ran the NestJS application.
- Explored the default project structure.
- Learned the core architecture of NestJS.

---

## Concepts Learned

### NestJS

A progressive Node.js framework built on top of Express (or Fastify).

It follows a modular architecture that helps build scalable and maintainable applications.

---

### main.ts

The entry point of the application.

Responsible for bootstrapping the NestJS application and starting the HTTP server.

---

### AppModule

The root module of the application.

Acts as the starting point for loading all modules, controllers and providers.

---

### Module

A module groups related features together.

Each feature should have its own module.

Examples:

- AuthModule
- UsersModule
- RoomsModule
- ReservationsModule

---

### Controller

Responsible for:

- Receiving HTTP requests
- Calling the appropriate Service
- Returning HTTP responses

Controllers should remain thin and should not contain business logic.

---

### Service

Contains the application's business logic.

Responsible for:

- Processing requests
- Communicating with the database
- Returning data to Controllers

---

### Request Lifecycle

```
Client
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Database
```

---

### Bootstrap Process

```
main.ts
   │
   ▼
NestFactory.create(AppModule)
   │
   ▼
Load Modules
   │
   ▼
Load Controllers
   │
   ▼
Load Providers
   │
   ▼
Register Routes
   │
   ▼
Start HTTP Server
```

---

## Architecture Decisions

- Use Modular Architecture.
- Keep Controllers thin.
- Place business logic inside Services.
- Every feature will live in its own Module.
- Use English naming conventions.
- Build the project following production-level practices.

---

## Project Structure

```
MeetingRoomReservation/

├── backend
├── frontend
└── docs
```

---

## What I Learned

- How a NestJS application starts.
- The responsibility of `main.ts`.
- The role of `AppModule`.
- The difference between Controllers and Services.
- Why business logic belongs in Services.
- The request lifecycle inside NestJS.
- How NestJS bootstraps an application.

---

## Sprint Result

✅ Development environment is ready.

✅ NestJS project is running successfully.

✅ Core architecture is understood.

The project is now ready to start implementing real features.

---

## Next Sprint

- Dependency Injection
- Providers
- Decorators
- Custom Modules
- Create the Health Module
- Build the first real API endpoint
