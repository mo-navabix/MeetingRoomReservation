# Sprint 03

## Goal

Create the first real feature module and learn how requests are handled in NestJS.

---

## Completed

- Created Auth Module.
- Created Auth Controller.
- Created Auth Service.
- Created DTO structure.
- Implemented the first API endpoint.
- Configured ValidationPipe globally.
- Installed class-validator.
- Installed class-transformer.

---

## API

### POST /auth/check-email

Request Body

```json
{
  "email": "user@example.com"
}
```

Current Response

```json
{
  "email": "user@example.com",
  "exists": false
}
```

(Currently mocked without database.)

---

## Concepts Learned

### Feature Module

Each business domain should have its own module.

Example:

- Auth
- User
- Room
- Reservation

---

### DTO (Data Transfer Object)

Defines the structure of data exchanged between Client and Server.

Benefits:

- Type Safety
- Validation
- Security
- Readability
- API Contract

---

### ValidationPipe

Global pipe that validates incoming requests before they reach the controller.

Configuration:

- whitelist
- forbidNonWhitelisted
- transform

---

### class-validator

Used to validate DTO properties.

Examples:

- IsEmail
- IsNotEmpty
- MinLength
- MaxLength

---

### class-transformer

Transforms incoming data into the expected TypeScript types.

Example:

Query string values can automatically become numbers.

---

### Controller

Responsible for handling HTTP requests.

Responsibilities:

- Receive Request
- Call Service
- Return Response

Should NOT contain business logic.

---

### Service

Responsible for business logic.

Responsibilities:

- Process application logic
- Communicate with database
- Return data

---

### Route Decorators

Learned decorators:

- @Controller()
- @Get()
- @Post()

---

### Parameter Decorators

Learned decorators:

- @Body()
- @Param()
- @Query()

---

### Dependency Injection

Controllers receive Services through constructor injection.

Example:

```ts
constructor(private readonly authService: AuthService) {}
```

NestJS creates and injects the dependency automatically.

---

## Request Lifecycle (Current Knowledge)

Client

↓

Controller

↓

ValidationPipe

↓

Service

↓

Response

---

## Project Structure

```
src/

auth/
│
├── dto/
│   └── check-email.dto.ts
│
├── auth.controller.ts
├── auth.service.ts
└── auth.module.ts
```

---

## Next Sprint

- PostgreSQL connection
- Install TypeORM
- Configure database
- Create first Entity (User)
- Create first Migration
- Connect Auth module to database
