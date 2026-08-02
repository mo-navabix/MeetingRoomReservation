# Architecture

The application follows a Modular Architecture.

Every feature lives inside its own module.

Example:

- Auth Module
- Users Module
- Rooms Module
- Reservations Module

Application Flow

Client

↓

Controller

↓

Service

↓

Database

---

## Responsibilities

### Controller

- Receive HTTP Requests
- Return HTTP Responses

Controllers should not contain business logic.

---

### Service

Contains business logic.

Examples:

- Validate Password
- Generate JWT
- Create Reservation
- Save Data

---

### Module

Groups related components together.

Each feature should have its own module.
