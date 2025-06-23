# GreenForked Recipe Service

## Overview
The Recipe Service manages all recipe-related operations including CRUD operations, image handling, search functionality, and category management.

## Responsibilities
- Recipe CRUD (create, read, update, delete)
- Image upload and management via Cloudflare Images
- Search, filter, and list recipes with advanced filtering
- Report recipes for moderation
- Category management (create, edit, delete, list categories)
- Nutrition analysis integration via Nutritionix API

## API Endpoints

### Recipe Management
- `POST /recipes` - Create new recipe
- `GET /recipes/{id}` - Get recipe by ID
- `PUT /recipes/{id}` - Update recipe
- `DELETE /recipes/{id}` - Delete recipe
- `GET /recipes` - List/search recipes with filters

### Image Management
- `POST /recipes/{id}/images` - Upload recipe image
- `DELETE /recipes/{id}/images/{imageId}` - Delete recipe image

### Category Management
- `POST /categories` - Create new category
- `GET /categories` - List all categories
- `PUT /categories/{id}` - Update category
- `DELETE /categories/{id}` - Delete category

### Reporting
- `POST /recipes/{id}/report` - Report recipe for moderation

### Search & Filtering
- `GET /recipes/search` - Advanced search with filters
- `GET /recipes/popular` - Get popular recipes
- `GET /recipes/recent` - Get recent recipes

## Database Schema
- **Recipe table** - Stores recipe information, ingredients, instructions
- **Category table** - Stores recipe categories
- **Report table** - Stores recipe reports for moderation
- See [ER diagram](../../diagrams/er-diagram.png) for detailed schema

## External Integrations
- **Cloudflare Images** - Image storage and CDN
- **Nutritionix API** - Nutrition analysis and calorie calculation

## Tech Stack
- **Framework:** Spring Boot (Java 17+)
- **Database:** PostgreSQL
- **Image Storage:** Cloudflare Images
- **Nutrition API:** Nutritionix
- **Build Tool:** Maven

## Setup Instructions
1. Ensure Java 17+ is installed
2. Set up PostgreSQL database
3. Configure Cloudflare Images API credentials
4. Configure Nutritionix API credentials
5. Update application properties
6. Run with `mvn spring-boot:run`

For detailed setup instructions, see the root [README.md](../../README.md). 