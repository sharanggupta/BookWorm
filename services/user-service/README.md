# GreenForked User Service

## Responsibilities
- Handle user registration and login via Google OAuth
- Manage user profiles (bio, image, social links)
- Admin actions (ban, warn, delete users)

## API
- Register/Login with Google
- Get/Edit user profile
- Admin: Ban/Warn/Delete user

## Database
- User table (see [ER diagram](../../diagrams/er-diagram.png))

## Authentication
- All authentication is handled via Google OAuth. The service verifies tokens and manages user sessions.

## Setup
- Spring Boot, PostgreSQL
- See root README for setup instructions 