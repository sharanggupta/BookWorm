# Notification Worker

## Overview
The Notification Worker is a Spring Boot application that handles asynchronous notification delivery for GreenForked. It processes notification jobs and sends emails, push notifications, and in-app notifications to users.

## Responsibilities
- **Email Notifications**: Send transactional and marketing emails
- **Push Notifications**: Deliver mobile push notifications
- **In-App Notifications**: Store notifications in database
- **Notification Templates**: Manage email and push templates
- **Delivery Tracking**: Monitor notification delivery status

## Architecture
- **Queue**: `greenforked:queue:notifications`
- **Input**: Notification job data
- **Output**: Delivered notifications and status
- **Email Service**: SMTP or email service provider
- **Push Service**: Firebase Cloud Messaging or similar
- **Database**: Stores notification history and preferences

## Message Format
```json
{
  "id": "uuid",
  "timestamp": "2024-01-01T00:00:00Z",
  "job_type": "notification",
  "priority": "high|normal|low",
  "data": {
    "type": "like|comment|report|welcome|recipe_approved",
    "user_id": "456",
    "recipient_email": "user@example.com",
    "template_data": {
      "recipe_title": "Vegan Chocolate Cake",
      "commenter_name": "John Doe",
      "recipe_url": "https://greenforked.com/recipe/123"
    }
  }
}
```

## Notification Types
- **Welcome Email**: New user registration
- **Recipe Interactions**: Likes, comments on user's recipes
- **Moderation Updates**: Recipe approval/rejection
- **Report Notifications**: Content moderation alerts
- **System Announcements**: Platform updates and news

## Processing Steps
1. **Receive Job**: Get notification job from Redis queue
2. **Validate Data**: Check recipient and template data
3. **Fetch Template**: Load email/push notification template
4. **Render Content**: Populate template with dynamic data
5. **Send Notification**: Deliver via email/push service
6. **Track Status**: Record delivery success/failure
7. **Update Database**: Store notification history

## Configuration
```yaml
spring:
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
  
  datasource:
    url: ${DATASOURCE_URL}
    username: ${DATASOURCE_USERNAME}
    password: ${DATASOURCE_PASSWORD}

  mail:
    host: ${SMTP_HOST:smtp.gmail.com}
    port: ${SMTP_PORT:587}
    username: ${SMTP_USERNAME}
    password: ${SMTP_PASSWORD}
    properties:
      mail.smtp.auth: true
      mail.smtp.starttls.enable: true

notification:
  email:
    from: noreply@greenforked.com
    reply-to: support@greenforked.com
    templates-path: /templates/email
    retry-attempts: 3
  
  push:
    fcm:
      project-id: ${FCM_PROJECT_ID}
      private-key: ${FCM_PRIVATE_KEY}
      client-email: ${FCM_CLIENT_EMAIL}
    
  preferences:
    default-email: true
    default-push: true
    quiet-hours: "22:00-08:00"
```

## Dependencies
- **Spring Boot**: Application framework
- **Spring Data Redis**: Queue processing
- **Spring Data JPA**: Database operations
- **Spring Mail**: Email sending
- **Firebase Admin SDK**: Push notifications
- **Thymeleaf**: Email template rendering
- **Jackson**: JSON processing

## Email Templates
```html
<!-- welcome-email.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to GreenForked!</title>
</head>
<body>
    <h1>Welcome, {{userName}}!</h1>
    <p>Thank you for joining GreenForked, the vegan recipe community.</p>
    <a href="{{verificationUrl}}">Verify your email</a>
</body>
</html>
```

## Health Checks
- **Queue Depth**: Monitor pending notifications
- **Email Delivery Rate**: Successful email sends
- **Push Delivery Rate**: Successful push notifications
- **Error Rate**: Failed notification attempts
- **Template Rendering**: Template processing performance

## Scaling
- **Horizontal**: Multiple workers can process notifications concurrently
- **Rate Limiting**: Respect email service provider limits
- **Batching**: Group similar notifications
- **Priority Queues**: Process high-priority notifications first

## Error Handling
- **Email Failures**: Retry with exponential backoff
- **Invalid Recipients**: Log and skip invalid emails
- **Template Errors**: Fallback to simple text templates
- **Service Outages**: Queue notifications for later delivery

## Notification Preferences
```json
{
  "user_id": "456",
  "email_notifications": {
    "welcome": true,
    "recipe_interactions": true,
    "moderation": true,
    "marketing": false
  },
  "push_notifications": {
    "recipe_interactions": true,
    "moderation": false
  },
  "quiet_hours": {
    "enabled": true,
    "start": "22:00",
    "end": "08:00"
  }
}
```

## Development
```bash
# Run locally
./mvnw spring-boot:run -pl workers/notification-worker

# Build Docker image
docker build -t greenforked-notification-worker .

# Run with Docker Compose
docker-compose up notification-worker
```

## Testing
- **Unit Tests**: Template rendering logic
- **Integration Tests**: Email and push delivery
- **Template Tests**: Email template validation
- **Performance Tests**: High-volume notification sending

## Monitoring
- **Delivery Rates**: Track successful notifications
- **Bounce Rates**: Monitor email delivery issues
- **Template Performance**: Track template rendering times
- **Service Health**: Monitor email and push service status 