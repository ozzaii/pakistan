# 🔑 Setting Up API Keys and Credentials

## 1. Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Vertex AI API
   - Cloud Storage
   - Cloud Build API

### Get Service Account Key:
1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name it "pakistan-ai-service"
4. Grant these roles:
   - Vertex AI User
   - Storage Object Viewer
5. Click "Create Key" (JSON)
6. Save the JSON file as `google-credentials.json`

## 2. Setting up Environment Variables

### For Local Development:

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` with your values:
```env
# Google Cloud
GOOGLE_CLOUD_PROJECT=your-project-id    # From Google Cloud Console
GOOGLE_CLOUD_LOCATION=us-central1       # Keep as is
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json  # Path to your JSON key file

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000  # For local development
API_KEY=generate-a-random-key              # Run: openssl rand -hex 32

# Security Configuration
FRONTEND_URL=http://localhost:3000         # For local development
ALLOWED_HOSTS=localhost,your-domain.com
ENVIRONMENT=development
```

### For GitHub Pages Deployment:

1. Go to your GitHub repository
2. Go to Settings > Secrets and variables > Actions
3. Add these secrets:
   - `NEXT_PUBLIC_API_URL`: Your backend URL (after deploying backend)
   - `GCP_PROJECT_ID`: Your Google Cloud project ID
   - `GCP_SA_KEY`: The entire content of your `google-credentials.json`
   - `API_KEY`: The same API key you generated

## 3. Generate API Key

Run this command to generate a secure API key:
```bash
openssl rand -hex 32
```
Use this key for both:
- The `API_KEY` in your `.env`
- The secret in GitHub repository settings

## 4. Testing the Setup

1. Test locally:
```bash
# Backend
cd backend
python main.py

# Frontend (new terminal)
cd pakistan-ai-web
npm run dev
```

2. Verify in the browser:
- Frontend: http://localhost:3000
- Backend health check: http://localhost:8000/api/health

## 5. Common Issues

### Backend Issues:
- "Failed to initialize Google AI": Check your service account permissions
- "Invalid API key": Make sure API_KEY matches in both frontend and backend
- CORS errors: Verify FRONTEND_URL matches your actual frontend URL

### Frontend Issues:
- "Failed to fetch": Make sure backend is running and NEXT_PUBLIC_API_URL is correct
- "Invalid API key": Check if API key is properly set in environment variables

## 6. Production URLs

After deployment, your URLs will be:
- Frontend: https://yourusername.github.io/pakistan
- Backend: (depends on your backend deployment choice)

Remember to update the `NEXT_PUBLIC_API_URL` in GitHub secrets once you have your backend URL! 