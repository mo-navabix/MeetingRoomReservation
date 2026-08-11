# Sprint 05

## Goal

Build the Authentication System for the Meeting Room Reservation backend.

---

## Completed

- Created Auth Module.
- Created Auth Controller.
- Created Auth Service.
- Created CheckEmailDto.
- Created RegisterDto.
- Created VerifyOtpDto.
- Created LoginDto.
- Implemented Check Email flow.
- Implemented Register flow.
- Added Password Hashing with bcrypt.
- Added OTP Generation.
- Added OTP Expiration.
- Stored OTP in database.
- Implemented Email Verification.
- Implemented Resend OTP.
- Created Mail Module.
- Created Mail Service.
- Configured SMTP with Nodemailer.
- Sent OTP to user email.
- Implemented Login flow.
- Compared passwords with bcrypt.
- Configured JWT.
- Generated Access Token.
- Created AuthGuard.
- Verified JWT inside protected routes.
- Added authenticated user payload to request.

---

## Concepts Learned

### Authentication

Authentication is the process of verifying who the user is.

Current authentication flow uses:

- Email
- Password
- OTP
- JWT

---

### Check Email

Checks whether a user already exists.

Possible actions:

- register
- verify-email
- login

Example:

```ts
if (!user) {
  return {
    exists: false,
    action: "register",
  };
}

if (!user.isEmailVerified) {
  return {
    exists: true,
    action: "verify-email",
  };
}

return {
  exists: true,
  action: "login",
};
```

---

### Password Hashing

Passwords are not stored as plain text.

bcrypt hashes the password before saving it.

```ts
const hashedPassword = await bcrypt.hash(dto.password, 10);
```

---

### Password Comparison

During login, the entered password is compared with the stored hash.

```ts
const isPasswordValid = await bcrypt.compare(dto.password, user.password);
```

---

### OTP

OTP is used to verify the user's email.

A six-digit OTP is generated.

```ts
private generateOtp(): string {
  return randomInt(
    100000,
    1000000,
  ).toString();
}
```

---

### OTP Expiration

OTP is valid for 5 minutes.

```ts
const otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000);
```

---

### Email Verification

The backend checks:

- User exists.
- OTP is correct.
- OTP is not expired.

If valid:

```ts
user.isEmailVerified = true;
user.otp = null;
user.otpExpiredAt = null;
```

---

### Resend OTP

Used when the user registered before but did not complete email verification.

A new OTP is generated and replaces the old OTP.

---

### Mail Service

Responsible for sending emails.

Uses Nodemailer and SMTP.

```text
AuthService
↓
MailService
↓
Nodemailer
↓
SMTP Server
↓
User Email
```

---

### JWT

JWT is generated after successful login.

Payload example:

```ts
const payload = {
  sub: user.id,
  email: user.email,
  role: user.role,
};
```

Token generation:

```ts
const accessToken = await this.jwtService.signAsync(payload);
```

---

### AuthGuard

Protects private routes.

It reads the JWT from:

```http
Authorization: Bearer TOKEN
```

Then verifies it.

If valid:

```ts
request["user"] = payload;
```

If invalid:

```http
401 Unauthorized
```

---

### AuthenticatedRequest

Express does not know about `request.user` by default.

```ts
export type AuthenticatedRequest = Request & {
  user: JwtPayload;
};
```

This tells TypeScript that authenticated requests contain a user payload.

---

## Architecture

```text
                CHECK EMAIL
                     ↓
        ┌────────────┴────────────┐
        ↓                         ↓
     REGISTER                   LOGIN
        ↓                         ↓
 Password Hash              findByEmail
        ↓                         ↓
 Generate OTP              Email verified?
        ↓                         ↓
 Save User                 bcrypt.compare
        ↓                         ↓
 Send Email                    JWT
        ↓                         ↓
 Verify OTP                Access Token
        ↓                         ↓
isEmailVerified=true       Frontend
                                  ↓
                       Authorization: Bearer JWT
                                  ↓
                             AuthGuard
                                  ↓
                          verifyAsync()
                                  ↓
                           request.user
                                  ↓
                         Protected Route
```

---

## Service Architecture

```text
Client

↓

AuthController

↓

AuthService

↓

UsersService / MailService / JwtService

↓

Repository

↓

PostgreSQL
```

---

## API Created

### Check Email

```http
POST /auth/check-email
```

Checks whether the user should:

- Register
- Verify Email
- Login

---

### Register

```http
POST /auth/register
```

Creates a new user.

Also:

- Hashes password.
- Generates OTP.
- Sets OTP expiration.
- Saves user.
- Sends OTP email.

---

### Verify OTP

```http
POST /auth/verifyotp
```

Verifies the OTP and confirms the user's email.

---

### Resend OTP

```http
POST /auth/resendotp
```

Generates and sends a new OTP.

---

### Login

```http
POST /auth/login
```

Checks:

- User exists.
- Email is verified.
- Password is correct.

Returns a JWT Access Token.

---

### Protected Route Example

```http
GET /users/me
```

Requires:

```http
Authorization: Bearer TOKEN
```

Returns the authenticated user payload.

---

## Important Notes

- Controllers should not contain authentication business logic.
- AuthService is responsible for authentication decisions.
- UsersService is responsible for user database operations.
- MailService is responsible for sending emails.
- Passwords must never be stored as plain text.
- OTP should expire after a limited time.
- OTP should be cleared after successful verification.
- JWT_SECRET must not be written directly inside source code.
- Protected routes should use AuthGuard.
- User identity should come from verified JWT data, not from a userId sent by the client.
- Register and Login routes should not require AuthGuard.
- Integration testing is still pending.

---

## Authentication Flow

```text
Check Email
↓
User not found
→ Register
→ Hash Password
→ Generate OTP
→ Save User
→ Send OTP
→ Verify OTP
→ Email Verified

OR

User exists and verified
→ Login
→ Compare Password
→ Generate JWT
→ Access Protected Routes
```

---

## Next Sprint

Authorization and Core Features

Possible next tasks:

- Current User helper / decorator.
- Role-based authorization.
- Admin Guard.
- Rooms Module.
- Reservation flow.
- Protect private APIs with JWT.
