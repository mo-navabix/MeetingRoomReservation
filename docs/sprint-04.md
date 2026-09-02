# Sprint 04

## Goal

Build the first real feature module and connect NestJS to PostgreSQL using TypeORM.

---

## Completed

- Created Users Module.
- Created Users Controller.
- Created Users Service.
- Created User Entity.
- Created Base Entity.
- Created UserRole Enum.
- Configured PostgreSQL connection.
- Configured TypeORM.
- Registered User entity.
- Injected Repository.
- Implemented first database query.
- Created first Users API.

---

## Concepts Learned

### Entity

Represents a database table.

Each class decorated with `@Entity()` becomes a table.

---

### Base Entity

Contains common columns shared by all entities.

Example:

- id
- createdAt
- updatedAt

---

### Repository

Responsible for communicating with the database.

Common methods:

- find()
- findOne()
- save()
- update()
- delete()

---

### Dependency Injection

NestJS injects the Repository into the Service.

```ts
constructor(
  @InjectRepository(User)
  private readonly userRepository: Repository<User>,
) {}
```

---

### TypeOrmModule.forFeature()

Registers entities inside a feature module.

```ts
TypeOrmModule.forFeature([User]);
```

---

### synchronize

Automatically synchronizes Entity definitions with database tables.

Used only during development.

Should be disabled in production.

---

## Architecture

Client

↓

UsersController

↓

UsersService

↓

UserRepository

↓

PostgreSQL

---

## API Created

### Get Users

```http
GET /users
```

Returns all users.

---

## Important Notes

- Controllers should not access the database directly.
- Business logic belongs in Services.
- Repository is responsible for database operations.
- Every Feature Module registers its own entities.

---

## Next Sprint

Authentication System

- Register User
- Check Email
- Hash Password
- OTP Generation
- Email Verification
- Login
