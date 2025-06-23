# Nutrition Worker

## Overview
The Nutrition Worker is a Spring Boot application that handles asynchronous nutrition analysis for GreenForked recipes. It processes recipe ingredients through the Nutritionix API to calculate nutritional information and calories.

## Responsibilities
- **Ingredient Analysis**: Parse recipe ingredients for nutrition data
- **API Integration**: Call Nutritionix API for nutritional information
- **Calorie Calculation**: Calculate total calories per serving
- **Nutrition Aggregation**: Sum up all nutritional values
- **Data Storage**: Update recipe records with nutrition data

## Architecture
- **Queue**: `greenforked:queue:nutrition-analysis`
- **Input**: Recipe ingredients list
- **Output**: Complete nutrition data and calories
- **External API**: Nutritionix API for ingredient analysis
- **Database**: Updates recipe records with nutrition information

## Message Format
```json
{
  "id": "uuid",
  "timestamp": "2024-01-01T00:00:00Z",
  "job_type": "nutrition_analysis",
  "priority": "normal",
  "data": {
    "recipe_id": "123",
    "ingredients": [
      "2 cups all-purpose flour",
      "1 cup granulated sugar",
      "3 large eggs"
    ],
    "servings": 12
  }
}
```

## Processing Steps
1. **Parse Ingredients**: Extract quantities and food items
2. **API Calls**: Query Nutritionix for each ingredient
3. **Calculate Totals**: Sum up nutritional values
4. **Per-Serving**: Divide by number of servings
5. **Format Data**: Structure nutrition JSON
6. **Update Recipe**: Save to database

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

nutritionix:
  api:
    base-url: https://trackapi.nutritionix.com/v2
    app-id: ${NUTRITIONIX_APP_ID}
    app-key: ${NUTRITIONIX_APP_KEY}
    timeout: 30s
    retry-attempts: 3

nutrition:
  analysis:
    default-serving-size: 100g
    max-ingredients-per-request: 50
    cache-duration: 24h
```

## Dependencies
- **Spring Boot**: Application framework
- **Spring Data Redis**: Queue processing
- **Spring Data JPA**: Database operations
- **WebClient**: HTTP client for API calls
- **Jackson**: JSON processing
- **Cache**: Redis caching for API responses

## Health Checks
- **Queue Depth**: Monitor pending nutrition jobs
- **API Response Time**: Nutritionix API performance
- **Success Rate**: Successful nutrition calculations
- **Cache Hit Rate**: Cached ingredient data usage

## Scaling
- **Horizontal**: Multiple instances can process jobs concurrently
- **Rate Limiting**: Respect Nutritionix API limits
- **Caching**: Reduce API calls with ingredient caching
- **Batching**: Process multiple ingredients per API call

## Error Handling
- **API Failures**: Retry with exponential backoff
- **Invalid Ingredients**: Log and skip problematic items
- **Rate Limiting**: Queue jobs for later processing
- **Partial Failures**: Return partial nutrition data

## Nutrition Data Structure
```json
{
  "calories": 250,
  "protein": 8.5,
  "fat": 12.3,
  "carbohydrates": 28.7,
  "fiber": 2.1,
  "sugar": 15.2,
  "sodium": 180,
  "per_serving": {
    "calories": 20.8,
    "protein": 0.7,
    "fat": 1.0,
    "carbohydrates": 2.4
  }
}
```

## Development
```bash
# Run locally
./mvnw spring-boot:run -pl workers/nutrition-worker

# Build Docker image
docker build -t greenforked-nutrition-worker .

# Run with Docker Compose
docker-compose up nutrition-worker
```

## Testing
- **Unit Tests**: Ingredient parsing logic
- **Integration Tests**: Nutritionix API integration
- **Mock Tests**: API response simulation
- **Performance Tests**: Large ingredient lists

## API Rate Limits
- **Free Tier**: 1,000 requests/day
- **Paid Tier**: 50,000 requests/month
- **Request Size**: Max 50 ingredients per request
- **Response Time**: ~200ms average 