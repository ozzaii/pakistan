# 🚀 Deployment Guide for PakistanAI

This guide will help you deploy PakistanAI to production using Docker and your preferred cloud provider.

## Prerequisites

- Docker and Docker Compose installed
- Google Cloud account with Vertex AI API enabled
- Domain name (optional but recommended)
- SSL certificate (recommended for production)

## Local Deployment

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pakistan-ai.git
cd pakistan-ai
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the application:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Cloud Deployment

### Google Cloud Run (Recommended)

1. Install Google Cloud CLI and authenticate:
```bash
gcloud auth login
gcloud config set project your-project-id
```

2. Enable required APIs:
```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

3. Build and push Docker images:
```bash
# Backend
gcloud builds submit backend/ --tag gcr.io/your-project-id/pakistan-ai-backend
# Frontend
gcloud builds submit pakistan-ai-web/ --tag gcr.io/your-project-id/pakistan-ai-frontend
```

4. Deploy to Cloud Run:
```bash
# Backend
gcloud run deploy pakistan-ai-backend \
  --image gcr.io/your-project-id/pakistan-ai-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Frontend
gcloud run deploy pakistan-ai-frontend \
  --image gcr.io/your-project-id/pakistan-ai-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Alternative: Digital Ocean App Platform

1. Fork the repository to your GitHub account

2. In Digital Ocean:
   - Create a new app from your GitHub repo
   - Select "Dockerfile" as the deployment method
   - Configure environment variables
   - Deploy!

## Environment Variables

Make sure to set these environment variables in your cloud provider:

### Backend
- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_CLOUD_LOCATION`
- `GOOGLE_APPLICATION_CREDENTIALS`

### Frontend
- `NEXT_PUBLIC_API_URL`
- `NODE_ENV`

## SSL/TLS Configuration

For production, always use HTTPS. You can:
1. Use your cloud provider's managed certificates
2. Set up Cloudflare as a proxy
3. Use Let's Encrypt with certbot

## Monitoring and Logging

1. Set up Google Cloud Monitoring:
```bash
gcloud services enable monitoring.googleapis.com
gcloud services enable logging.googleapis.com
```

2. View logs:
```bash
# Backend logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=pakistan-ai-backend"

# Frontend logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=pakistan-ai-frontend"
```

## Production Checklist

- [ ] Set up proper SSL/TLS
- [ ] Configure proper CORS settings
- [ ] Set up monitoring and alerting
- [ ] Configure rate limiting
- [ ] Set up proper logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Configure proper error handling
- [ ] Set up proper security headers

## Troubleshooting

### Common Issues

1. **CORS errors**
   - Check CORS configuration in `main.py`
   - Verify API URL in frontend

2. **Google AI Authentication**
   - Verify service account permissions
   - Check credentials file path

3. **Container Issues**
   - Check Docker logs: `docker-compose logs`
   - Verify environment variables

For more help, check the [GitHub issues](https://github.com/yourusername/pakistan-ai/issues) or create a new one. 