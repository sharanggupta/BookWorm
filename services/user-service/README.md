# GreenForked User Service

## Overview
The User Service handles all user-related operations including authentication, profile management, and administrative functions.

## Responsibilities
- Handle user registration and login via Google OAuth
- Manage user profiles (bio, image, social links)
- Admin actions (ban, warn, delete users)
- User session management and token verification

## API Endpoints

### Authentication
- `POST /auth/google` - Register/Login with Google OAuth
- `POST /auth/logout` - Logout user

### User Management
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/{id}` - Get user by ID

### Admin Operations
- `POST /admin/users/{id}/ban` - Ban user
- `POST /admin/users/{id}/warn` - Warn user
- `DELETE /admin/users/{id}` - Delete user

## Database Schema
- **User table** - Stores user information, profiles, and authentication data
- See [ER diagram](../../diagrams/er-diagram.png) for detailed schema

## Authentication
All authentication is handled via Google OAuth. The service verifies tokens and manages user sessions.

## Tech Stack
- **Framework:** Spring Boot (Java 17+)
- **Database:** PostgreSQL
- **Authentication:** Google OAuth 2.0
- **Build Tool:** Maven

## Setup Instructions
1. Ensure Java 17+ is installed
2. Set up PostgreSQL database
3. Configure Google OAuth credentials
4. Update application properties
5. Run with `mvn spring-boot:run`

For detailed setup instructions, see the root [README.md](../../README.md). 