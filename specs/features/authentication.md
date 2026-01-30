# Feature: Authentication

## User Stories
- As a user, I can sign up with email and password
- As a user, I can log in with email and password
- As a user, I can log out
- As a logged-in user, I can access my tasks only

## Acceptance Criteria

### Sign Up
- Email unique, password min 8 chars
- Create user with hashed password
- Return JWT access token

### Login
- POST /api/auth/login {email, password} → JWT token
- Invalid creds → 401

### Protected Routes
- All /api/tasks require `Authorization: Bearer <token>`
- Token decoded for user_id

### Logout
- Client-side: clear token

### Frontend
- Login form at /login
- Store token in httpOnly cookie or localStorage
- API calls include Authorization header
- Redirect unauth users to /login

## Notes
- Backend: FastAPI JWT (python-jose, passlib)
- Mock user transition: replace demo-user with get_current_user()
- Demo creds: email=demo@example.com, password=demo123