# Search Indexer Worker

## Overview
The Search Indexer Worker is a Spring Boot application that handles asynchronous search index updates for GreenForked. It maintains Elasticsearch indices for fast recipe search and filtering capabilities.

## Responsibilities
- **Index Management**: Create, update, and delete search indices
- **Data Indexing**: Index recipe data for fast search
- **Index Optimization**: Maintain index performance
- **Search Analytics**: Track search patterns and performance
- **Index Health**: Monitor and maintain index health

## Architecture
- **Queue**: `greenforked:queue:search-indexing`
- **Input**: Recipe data changes (create, update, delete)
- **Output**: Updated Elasticsearch indices
- **Search Engine**: Elasticsearch for fast search queries
- **Database**: Reads from PostgreSQL for indexing

## Message Format
```json
{
  "id": "uuid",
  "timestamp": "2024-01-01T00:00:00Z",
  "job_type": "search_index_update",
  "priority": "normal",
  "data": {
    "operation": "create|update|delete",
    "recipe_id": "123",
    "recipe_data": {
      "title": "Vegan Chocolate Cake",
      "ingredients": ["flour", "sugar", "cocoa"],
      "tags": ["dessert", "chocolate", "vegan"],
      "category": "Desserts"
    }
  }
}
```

## Processing Steps
1. **Receive Job**: Get indexing job from Redis queue
2. **Fetch Data**: Retrieve complete recipe data from database
3. **Transform**: Convert to search-optimized format
4. **Index**: Update Elasticsearch document
5. **Optimize**: Refresh index for immediate search
6. **Monitor**: Track indexing performance

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

elasticsearch:
  host: ${ELASTICSEARCH_HOST:localhost}
  port: ${ELASTICSEARCH_PORT:9200}
  index:
    name: greenforked-recipes
    shards: 1
    replicas: 0
  settings:
    refresh-interval: 1s
    number-of-shards: 1
    number-of-replicas: 0

search:
  indexing:
    batch-size: 100
    retry-attempts: 3
    index-refresh: immediate
```

## Dependencies
- **Spring Boot**: Application framework
- **Spring Data Redis**: Queue processing
- **Spring Data JPA**: Database operations
- **Elasticsearch Client**: Search engine integration
- **Jackson**: JSON processing
- **Spring Data Elasticsearch**: Elasticsearch operations

## Index Mapping
```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "title": { 
        "type": "text",
        "analyzer": "english",
        "fields": {
          "keyword": { "type": "keyword" }
        }
      },
      "ingredients": { 
        "type": "text",
        "analyzer": "english"
      },
      "tags": { "type": "keyword" },
      "category": { "type": "keyword" },
      "prepTime": { "type": "integer" },
      "servings": { "type": "integer" },
      "calories": { "type": "float" },
      "createdAt": { "type": "date" },
      "owner": { "type": "keyword" }
    }
  }
}
```

## Health Checks
- **Queue Depth**: Monitor pending indexing jobs
- **Index Health**: Elasticsearch cluster status
- **Indexing Rate**: Documents indexed per minute
- **Search Performance**: Query response times

## Scaling
- **Horizontal**: Multiple indexers can process jobs concurrently
- **Bulk Operations**: Batch multiple index updates
- **Index Sharding**: Distribute data across multiple shards
- **Replica Management**: Add replicas for read performance

## Error Handling
- **Index Failures**: Retry with exponential backoff
- **Data Inconsistency**: Re-fetch data from database
- **Elasticsearch Errors**: Log and alert on cluster issues
- **Partial Failures**: Continue processing other jobs

## Search Features
- **Full-Text Search**: Recipe titles and ingredients
- **Filtering**: By category, tags, prep time, servings
- **Sorting**: By relevance, date, popularity
- **Faceted Search**: Category and tag aggregations
- **Autocomplete**: Recipe title suggestions

## Development
```bash
# Run locally
./mvnw spring-boot:run -pl workers/search-indexer

# Build Docker image
docker build -t greenforked-search-indexer .

# Run with Docker Compose
docker-compose up search-indexer
```

## Testing
- **Unit Tests**: Indexing logic
- **Integration Tests**: Elasticsearch operations
- **Performance Tests**: Large dataset indexing
- **Search Tests**: Query performance validation

## Monitoring
- **Index Size**: Monitor disk usage
- **Query Performance**: Track search response times
- **Index Health**: Elasticsearch cluster status
- **Error Rates**: Failed indexing operations 