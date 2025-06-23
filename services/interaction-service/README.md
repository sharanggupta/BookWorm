# GreenForked Interaction Service

## Overview
The Interaction Service manages all social interactions including comments and likes on recipes, enabling user engagement and community features.

## Responsibilities
- Manage comments on recipes (add, edit, delete, list)
- Manage likes on recipes (like/unlike, list liked recipes)
- Handle comment moderation and reporting
- Provide social engagement metrics

## API Endpoints

### Comment Management
- `POST /recipes/{recipeId}/comments` - Add comment to recipe
- `GET /recipes/{recipeId}/comments` - List comments for recipe
- `PUT /comments/{id}` - Edit comment
- `DELETE /comments/{id}` - Delete comment
- `GET /comments/{id}` - Get comment by ID

### Like Management
- `POST /recipes/{recipeId}/like` - Like a recipe
- `DELETE /recipes/{recipeId}/like` - Unlike a recipe
- `GET /recipes/{recipeId}/likes` - Get like count for recipe
- `GET /users/{userId}/liked-recipes` - Get user's liked recipes

### Moderation
- `POST /comments/{id}/report` - Report comment for moderation
- `DELETE /comments/{id}` - Delete comment (admin only)

## Database Schema
- **Comment table** - Stores user comments on recipes
- **Like table** - Stores user likes on recipes
- See [ER diagram](../../diagrams/er-diagram.png) for detailed schema

## Tech Stack
- **Framework:** Spring Boot (Java 17+)
- **Database:** PostgreSQL
- **Build Tool:** Maven

## Setup Instructions
1. Ensure Java 17+ is installed
2. Set up PostgreSQL database
3. Update application properties
4. Run with `mvn spring-boot:run`

For detailed setup instructions, see the root [README.md](../../README.md). 