# 🌟 PakistanAI - Next Generation AI Chat Platform

A beautiful, modern AI chat platform built with Next.js, FastAPI, and Google AI, featuring a premium UI with Pakistani cultural elements.

🔗 **[Live Demo](https://yourusername.github.io/pakistan)** 

![PakistanAI Screenshot](pakistan-ai-web/public/screenshot.png)

## ✨ Features

- 🎨 Premium UI with Islamic geometric patterns
- 🌙 Dark mode support
- 🗣️ Real-time chat with Google AI
- 🎭 Beautiful animations and transitions
- 📱 Fully responsive design
- 🔒 Production-ready setup
- 🚀 Built with modern tech stack

## 🛠️ Tech Stack

### Frontend
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- DaisyUI
- Heroicons

### Backend
- FastAPI
- Google AI Platform
- Python 3.9+
- Vertex AI

## 🚀 Quick Start

### Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pakistan.git
cd pakistan
```

2. Frontend setup:
```bash
cd pakistan-ai-web
npm install
npm run dev
```

3. Backend setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
# Edit .env with your configuration
```

Required variables:
- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_CLOUD_LOCATION`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `NEXT_PUBLIC_API_URL`
- `API_KEY`

## 🌐 Deployment

### GitHub Pages (Frontend)

The frontend is automatically deployed to GitHub Pages when pushing to the main branch.

1. Update repository settings:
   - Go to Settings > Pages
   - Set source to "GitHub Actions"

2. Push to main branch:
```bash
git push origin main
```

### Backend Deployment

Follow the [Deployment Guide](DEPLOYMENT.md) for backend deployment options.

## 🔒 Security

- Rate limiting
- API key authentication
- Security headers
- CORS configuration
- Error handling

## 📝 License

MIT License - feel free to use this project for any purpose.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Thanks to the Next.js and FastAPI teams
- Google AI Platform
- The open-source community 