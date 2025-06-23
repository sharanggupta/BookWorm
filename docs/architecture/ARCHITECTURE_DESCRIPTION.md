# GreenForked Architecture Description

## Overview
GreenForked is a microservices-based vegan recipe platform, designed for scalability, maintainability, and a modern user experience. The system is composed of four main backend services, a React frontend, and cloud-based media storage.

## Microservices
- **User Service**: Handles authentication (Google OAuth), user registration, profile management, and admin actions.
- **Recipe Service**: Manages recipe CRUD, image uploads, search/filter, reporting, nutrition, and category management (recipes can be organized and filtered by category; admins can manage the list of categories).
- **Interaction Service**: Manages comments and likes on recipes.

## Data Storage
- **PostgreSQL**: Each service owns its tables.
- **Media Storage**: **Cloudflare Images** for all recipe/user images (no video support).
  - Predictable, low-cost pricing
  - Built-in CDN and image optimization
  - Direct upload API for user-generated content
  - No egress fees or bandwidth surprises
  - Easy integration with React/Spring Boot

## Frontend
- **React (TypeScript)**: Clean, green-themed UI inspired by Vegan Manna.
- **Tailwind CSS**: For rapid, consistent styling.

## Color Palette
- Primary Green: #2ecc71
- Accent Green: #27ae60
- Background: #ffffff
- Text: #222222
- Subtle Gray: #f7f7f7
- CTA/Highlight: #00b894
- Error/Alert: #e17055

## Architecture Diagram
See [../../diagrams/architecture-overview.png](../../diagrams/architecture-overview.png)

## Use Case Diagrams
- [Authentication & User Management](../../diagrams/use-case-authentication.png)
- [Recipe Management](../../diagrams/use-case-recipe-management.png)
- [Social Features](../../diagrams/use-case-social-features.png)
- [Moderation & Reporting](../../diagrams/use-case-moderation.png)

## ER Diagram
See [../../diagrams/er-diagram.png](../../diagrams/er-diagram.png)

## 🖼️ Key Diagrams

**Architecture Overview**

![Architecture Diagram](../../diagrams/architecture-overview.png)

**Use Case Diagrams**

Authentication & User Management:
![Authentication Use Case](../../diagrams/use-case-authentication.png)

Recipe Management:
![Recipe Management Use Case](../../diagrams/use-case-recipe-management.png)

Social Features:
![Social Features Use Case](../../diagrams/use-case-social-features.png)

Moderation & Reporting:
![Moderation Use Case](../../diagrams/use-case-moderation.png)

**ER Diagram**

![ER Diagram](../../diagrams/er-diagram.png) 