# Sprint 02 - NestJS Core Concepts

## Goal

Understand the core concepts of NestJS and how its components communicate with each other.

---

## Progress

### Session 01 - Dependency Injection

- [x] Dependency Injection
- [x] Tight Coupling
- [x] Loose Coupling
- [x] Inversion of Control (IoC)
- [x] Dependency Injection Container

### Session 02 - Decorators

- [x] What is a Decorator?
- [x] Why NestJS uses Decorators
- [x] @Module()
- [x] @Controller()
- [x] @Injectable()
- [x] @Get()
- [x] How NestJS discovers Controllers and Routes

### Session 03

- [ ] Providers

### Session 04

- [ ] Modules

### Session 05

- [ ] Health Module

### Session 06

- [ ] First API Endpoint

---

## Concepts Learned

### Dependency Injection (DI)

Dependencies are provided by the framework instead of being created manually inside classes.

---

### Inversion of Control (IoC)

The responsibility of creating and managing objects is delegated to the framework.

---

### Dependency Injection Container

NestJS manages Providers inside a DI Container and injects them wherever they are required.

---

### Decorators

Decorators are special TypeScript functions that attach metadata to classes, methods or parameters.

NestJS uses this metadata to discover Modules, Controllers, Providers and Routes.

---

### Common Decorators

| Decorator       | Purpose                     |
| --------------- | --------------------------- |
| `@Module()`     | Defines a Module            |
| `@Controller()` | Defines a Controller        |
| `@Injectable()` | Marks a class as a Provider |
| `@Get()`        | Maps a GET HTTP request     |
| `@Post()`       | Maps a POST HTTP request    |

---

## Notes

- Never instantiate Services using `new`.
- Register Providers inside the `providers` array of a Module.
- Controllers should remain thin and delegate business logic to Services.
- NestJS relies heavily on metadata provided by Decorators.
