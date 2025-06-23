# Image Processor Worker

## Overview
The Image Processor Worker is a Spring Boot application that handles asynchronous image processing tasks for GreenForked. It processes images uploaded by users, performing operations like resizing, optimization, and metadata extraction.

## Responsibilities
- **Image Resizing**: Resize images to multiple dimensions (thumbnail, medium, large)
- **Image Optimization**: Compress images while maintaining quality
- **Metadata Extraction**: Extract EXIF data, dimensions, file size
- **Format Conversion**: Convert images to web-optimized formats (WebP, JPEG)
- **Storage Management**: Update Cloudflare Images with processed versions

## Architecture
- **Queue**: `greenforked:queue:image-processing`
- **Input**: Image URLs from Cloudflare Images
- **Output**: Processed image URLs and metadata
- **Database**: Updates recipe records with processed image data

## Message Format
```json
{
  "id": "uuid",
  "timestamp": "2024-01-01T00:00:00Z",
  "job_type": "image_processing",
  "priority": "normal",
  "data": {
    "recipe_id": "123",
    "image_url": "https://cloudflare.com/image.jpg",
    "operations": ["resize", "optimize", "extract_metadata"]
  }
}
```

## Processing Steps
1. **Download**: Fetch image from Cloudflare Images
2. **Resize**: Create multiple sizes (150x150, 400x400, 800x800)
3. **Optimize**: Compress and convert to WebP/JPEG
4. **Upload**: Store processed images back to Cloudflare
5. **Update**: Save processed URLs to recipe record
6. **Cleanup**: Remove temporary files

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

image:
  processing:
    sizes:
      thumbnail: 150x150
      medium: 400x400
      large: 800x800
    formats: [webp, jpeg]
    quality: 85
    max-file-size: 10MB
```

## Dependencies
- **Spring Boot**: Application framework
- **Spring Data Redis**: Queue processing
- **Spring Data JPA**: Database operations
- **ImageIO**: Image processing
- **Cloudflare Images API**: Image storage
- **Jackson**: JSON processing

## Health Checks
- **Queue Depth**: Monitor pending jobs
- **Processing Rate**: Jobs per minute
- **Error Rate**: Failed processing attempts
- **Memory Usage**: Image processing memory consumption

## Scaling
- **Horizontal**: Multiple instances can process jobs concurrently
- **Vertical**: Increase memory for large image processing
- **Auto-scaling**: Scale based on queue depth

## Error Handling
- **Retry Logic**: Failed jobs are retried up to 3 times
- **Dead Letter Queue**: Permanently failed jobs
- **Logging**: Detailed error logs with correlation IDs
- **Monitoring**: Alert on high error rates

## Development
```bash
# Run locally
./mvnw spring-boot:run -pl workers/image-processor

# Build Docker image
docker build -t greenforked-image-processor .

# Run with Docker Compose
docker-compose up image-processor
```

## Testing
- **Unit Tests**: Image processing logic
- **Integration Tests**: Queue processing
- **Performance Tests**: Large image processing
- **Error Tests**: Invalid images, network failures 