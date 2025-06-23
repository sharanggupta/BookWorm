# GreenForked Workers

## Overview
The Workers directory contains all background processing components for GreenForked. These are separate Spring Boot applications that handle asynchronous tasks via Redis queues, ensuring fast user responses and scalable background processing.

## Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Core Services │    │   Redis Queue   │    │   Background    │
│                 │───▶│                 │───▶│    Workers      │
│ (User, Recipe,  │    │                 │    │                 │
│  Interaction)   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Worker Components

### 1. [Image Processor](image-processor/README.md)
- **Queue**: `greenforked:queue:image-processing`
- **Purpose**: Resize, optimize, and process recipe images
- **Priority**: High (affects user experience)

### 2. [Nutrition Worker](nutrition-worker/README.md)
- **Queue**: `greenforked:queue:nutrition-analysis`
- **Purpose**: Calculate nutrition data via Nutritionix API
- **Priority**: High (core recipe functionality)

### 3. [Search Indexer](search-indexer/README.md)
- **Queue**: `greenforked:queue:search-indexing`
- **Purpose**: Maintain Elasticsearch indices for fast search
- **Priority**: Medium (performance optimization)

### 4. [Notification Worker](notification-worker/README.md)
- **Queue**: `greenforked:queue:notifications`
- **Purpose**: Send emails and push notifications
- **Priority**: Medium (user engagement)

### 5. [Moderation Worker](moderation-worker/README.md)
- **Queue**: `greenforked:queue:moderation`
- **Purpose**: Process content reports and moderation
- **Priority**: Low (admin functionality)

## Common Architecture

### Message Format
All workers use a standardized message format:
```json
{
  "id": "uuid",
  "timestamp": "2024-01-01T00:00:00Z",
  "job_type": "worker_specific_type",
  "priority": "high|normal|low",
  "retry_count": 0,
  "max_retries": 3,
  "data": {
    // Worker-specific data
  }
}
```

### Configuration
All workers share common configuration patterns:
```yaml
spring:
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
  
  datasource:
    url: ${DATASOURCE_URL}
    username: ${DATASOURCE_USERNAME}
    password: ${DATASOURCE_PASSWORD}
```

### Dependencies
Common dependencies across all workers:
- **Spring Boot**: Application framework
- **Spring Data Redis**: Queue processing
- **Spring Data JPA**: Database operations
- **Jackson**: JSON processing
- **Spring Actuator**: Health checks and monitoring

## Development

### Running Locally
```bash
# Run all workers
docker-compose up image-processor nutrition-worker search-indexer notification-worker moderation-worker

# Run specific worker
./mvnw spring-boot:run -pl workers/image-processor
```

### Building
```bash
# Build all workers
mvn clean install -pl workers/

# Build specific worker
mvn clean install -pl workers/image-processor
```

### Testing
```bash
# Test all workers
mvn test -pl workers/

# Test specific worker
mvn test -pl workers/image-processor
```

## Deployment

### Docker Compose
Each worker is defined as a separate service in `docker-compose.yml`:
```yaml
image-processor:
  build: ./workers/image-processor
  environment:
    SPRING_REDIS_HOST: redis
    SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/greenforked
```

### Kubernetes/Helm
Workers are deployed as separate pods with independent scaling:
```yaml
workers:
  imageProcessor:
    replicaCount: 2
  nutritionWorker:
    replicaCount: 1
  searchIndexer:
    replicaCount: 1
```

## Monitoring

### Health Checks
All workers expose health endpoints:
- `/actuator/health`: Overall health
- `/actuator/health/readiness`: Readiness probe
- `/actuator/health/liveness`: Liveness probe

### Metrics
Common metrics across all workers:
- Queue depth and processing rates
- Job success/failure rates
- Processing times
- Error rates and types

### Logging
Standardized logging with correlation IDs:
```java
@Slf4j
@Component
public class WorkerComponent {
    public void processJob(JobMessage job) {
        log.info("Processing job: {}", job.getId());
        // Process job
        log.info("Job completed: {}", job.getId());
    }
}
```

## Scaling Strategy

### Horizontal Scaling
- Multiple instances of each worker can run concurrently
- Redis ensures jobs are distributed across instances
- No shared state between worker instances

### Auto-scaling
- Scale based on queue depth
- Scale based on processing time
- Scale based on error rates

### Resource Allocation
- **Image Processor**: High memory (image processing)
- **Nutrition Worker**: Medium memory (API calls)
- **Search Indexer**: Medium memory (Elasticsearch)
- **Notification Worker**: Low memory (email/push)
- **Moderation Worker**: Low memory (text processing)

## Error Handling

### Retry Logic
- Failed jobs are retried up to 3 times
- Exponential backoff between retries
- Dead letter queue for permanently failed jobs

### Circuit Breaker
- Protect against external service failures
- Graceful degradation when services are down
- Automatic recovery when services return

### Monitoring
- Alert on high error rates
- Alert on queue depth thresholds
- Alert on worker health issues

## Future Enhancements

### Phase 1 (Current)
- Basic queue processing
- Simple error handling
- Health monitoring

### Phase 2 (Next)
- Advanced retry strategies
- Circuit breakers
- Performance optimization

### Phase 3 (Future)
- AI/ML integration
- Advanced monitoring
- Auto-scaling 