# Moderation Worker

## Overview
The Moderation Worker is a Spring Boot application that handles asynchronous content moderation for GreenForked. It processes user and recipe reports, performs automated content analysis, and manages the moderation workflow.

## Responsibilities
- **Report Processing**: Handle user and recipe reports
- **Content Analysis**: Automated content filtering
- **Moderation Workflow**: Manage admin review process
- **Action Execution**: Apply moderation actions (warn, ban, delete)
- **Audit Trail**: Maintain moderation history and logs

## Architecture
- **Queue**: `greenforked:queue:moderation`
- **Input**: User/recipe reports and moderation requests
- **Output**: Moderation actions and status updates
- **Content Analysis**: AI/ML content filtering (future)
- **Database**: Stores reports, actions, and audit logs

## Message Format
```json
{
  "id": "uuid",
  "timestamp": "2024-01-01T00:00:00Z",
  "job_type": "moderation",
  "priority": "high|normal|low",
  "data": {
    "type": "user_report|recipe_report|auto_moderation",
    "reporter_id": "789",
    "target_id": "123",
    "target_type": "user|recipe",
    "reason": "inappropriate_content|spam|copyright",
    "evidence": "Additional context or evidence"
  }
}
```

## Moderation Types
- **User Reports**: Reports against user accounts
- **Recipe Reports**: Reports against recipe content
- **Auto Moderation**: Automated content filtering
- **Admin Actions**: Manual moderation actions
- **Appeal Processing**: Handle user appeals

## Processing Steps
1. **Receive Report**: Get moderation job from Redis queue
2. **Validate Report**: Check reporter and target validity
3. **Content Analysis**: Analyze reported content (future AI)
4. **Risk Assessment**: Determine severity and action needed
5. **Admin Review**: Queue for admin review if needed
6. **Execute Action**: Apply moderation action
7. **Notify Parties**: Inform reporter and target
8. **Audit Log**: Record action in moderation history

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

moderation:
  auto-moderation:
    enabled: false  # Future AI integration
    confidence-threshold: 0.8
    keywords:
      - "spam"
      - "inappropriate"
  
  actions:
    warning:
      max-warnings: 3
      warning-duration: 30d
    temporary-ban:
      duration: 7d
      max-temp-bans: 2
    permanent-ban:
      requires-admin: true
  
  workflow:
    auto-review-threshold: 5  # Reports before admin review
    admin-review-timeout: 24h
    appeal-window: 7d
```

## Dependencies
- **Spring Boot**: Application framework
- **Spring Data Redis**: Queue processing
- **Spring Data JPA**: Database operations
- **Spring Security**: Permission checking
- **Jackson**: JSON processing
- **Future**: AI/ML content analysis libraries

## Moderation Actions
```json
{
  "action_type": "warning|temporary_ban|permanent_ban|delete_content",
  "target_id": "123",
  "target_type": "user|recipe",
  "reason": "Violation of community guidelines",
  "duration": "7d",  // For temporary actions
  "admin_id": "admin_456",
  "evidence": "Multiple user reports",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Health Checks
- **Queue Depth**: Monitor pending moderation jobs
- **Processing Rate**: Reports processed per hour
- **Admin Response Time**: Time to admin review
- **Action Execution**: Successful moderation actions
- **Appeal Rate**: User appeals against actions

## Scaling
- **Horizontal**: Multiple workers can process reports concurrently
- **Priority Processing**: High-priority reports processed first
- **Admin Workload**: Distribute admin review tasks
- **Auto-scaling**: Scale based on report volume

## Error Handling
- **Invalid Reports**: Log and skip invalid reports
- **Content Analysis Failures**: Fallback to manual review
- **Action Failures**: Retry with exponential backoff
- **Database Errors**: Queue for later processing

## Audit Trail
```json
{
  "moderation_id": "mod_789",
  "target_id": "123",
  "target_type": "recipe",
  "action": "temporary_ban",
  "reason": "Inappropriate content",
  "admin_id": "admin_456",
  "timestamp": "2024-01-01T00:00:00Z",
  "evidence": ["report_1", "report_2"],
  "appeal_status": "none|pending|approved|rejected"
}
```

## Development
```bash
# Run locally
./mvnw spring-boot:run -pl workers/moderation-worker

# Build Docker image
docker build -t greenforked-moderation-worker .

# Run with Docker Compose
docker-compose up moderation-worker
```

## Testing
- **Unit Tests**: Moderation logic and workflow
- **Integration Tests**: Report processing pipeline
- **Workflow Tests**: Admin review process
- **Performance Tests**: High-volume report processing

## Monitoring
- **Report Volume**: Track incoming reports
- **Processing Time**: Time from report to action
- **Admin Workload**: Reports awaiting review
- **Action Distribution**: Types of actions taken
- **Appeal Success Rate**: Successful user appeals

## Future Enhancements
- **AI Content Analysis**: Automated content filtering
- **Image Moderation**: Analyze recipe images
- **Sentiment Analysis**: Detect toxic comments
- **Machine Learning**: Improve moderation accuracy
- **Real-time Moderation**: Instant content filtering 