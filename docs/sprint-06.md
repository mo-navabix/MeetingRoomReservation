# Sprint 06

## Goal

Implement Authorization system using Role-Based Access Control (RBAC).

The goal of this sprint is to control what authenticated users are allowed to do.

Authentication answers:

> Who is the user?

Authorization answers:

> What is the user allowed to do?

---

## Completed

- Designed RBAC architecture.
- Replaced simple enum-based role system with database-driven roles.
- Created Roles Module.
- Created Role Entity.
- Created Permissions Module.
- Created Permission Entity.
- Implemented User and Role Many-to-Many relationship.
- Created user_roles relation table.
- Implemented Role and Permission Many-to-Many relationship.
- Created role_permissions relation table.
- Designed permission-based authorization flow.
- Created Permissions decorator.
- Created Permission Guard.
- Connected Authorization with JWT authentication.
- Protected routes using Permission checking.

---

## Concepts Learned

### Authentication vs Authorization

Authentication verifies the identity of the user.

Example:

```text
Login
↓
JWT
↓
AuthGuard
↓
request.user
```
