# Deployment Guide

This guide covers deploying your MERN portfolio website to various hosting platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Frontend) + Railway (Backend)
**Best for**: Easy deployment with good free tiers

### Option 2: Netlify (Frontend) + Heroku (Backend)
**Best for**: Traditional deployment with extensive documentation

### Option 3: Railway (Full Stack)
**Best for**: Single platform deployment

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] MongoDB database set up (MongoDB Atlas recommended)
- [ ] Email service configured (Gmail App Password or SendGrid)
- [ ] Profile image and project images added
- [ ] Content customized (name, bio, projects, etc.)
- [ ] Social media links updated
- [ ] Contact information verified

## 🔧 Environment Variables

### Frontend Environment Variables
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Backend Environment Variables
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-receiving-email@gmail.com
JWT_SECRET=your-super-secret-jwt-key-for-production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🌐 Frontend Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login and deploy
   vercel login
   cd frontend
   vercel
   ```

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Environment Variables**
   - Add `REACT_APP_API_URL` in Vercel dashboard

### Netlify Deployment

1. **Build and Deploy**
   ```bash
   cd frontend
   npm run build
   
   # Install Netlify CLI
   npm install -g netlify-cli
   netlify deploy --prod --dir=build
   ```

2. **Continuous Deployment**
   - Connect GitHub repository
   - Set build command: `cd frontend && npm run build`
   - Set publish directory: `frontend/build`

## 🖥️ Backend Deployment

### Railway Deployment

1. **Create New Project**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   cd backend
   railway deploy
   ```

2. **Configure Environment**
   - Add all environment variables in Railway dashboard
   - Set start command: `npm start`

### Heroku Deployment

1. **Prepare for Heroku**
   ```bash
   # Create Procfile in backend directory
   echo "web: npm start" > backend/Procfile
   ```

2. **Deploy**
   ```bash
   # Install Heroku CLI and login
   heroku login
   
   # Create app
   cd backend
   heroku create your-portfolio-api
   
   # Set environment variables
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-uri
   # ... add other env vars
   
   # Deploy
   git subtree push --prefix backend heroku main
   ```

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create Account**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster (free tier available)

2. **Configure Database**
   ```bash
   # Get connection string
   mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

3. **Security Settings**
   - Add your deployment platform IPs to whitelist
   - Create database user with read/write permissions

4. **Seed Data** (Optional)
   ```bash
   # Set MONGODB_URI in backend/.env
   cd backend
   node seed.js
   ```

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate App Password: Account Settings → Security → App Passwords
3. Use app password (not regular password) in environment variables

### Alternative: SendGrid
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com
```

## 🔍 Testing Deployment

### Frontend Tests
- [ ] Website loads correctly
- [ ] All sections display properly
- [ ] Navigation works smoothly
- [ ] Responsive design on mobile
- [ ] Contact form submits (check network tab)

### Backend Tests
- [ ] API endpoints respond correctly
- [ ] Contact form sends emails
- [ ] Database connections work
- [ ] CORS configured for frontend domain

### Integration Tests
- [ ] Frontend connects to backend API
- [ ] Contact form end-to-end functionality
- [ ] No console errors
- [ ] Performance optimization working

## 🚨 Common Issues & Solutions

### CORS Errors
```javascript
// backend/server.js - Update CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.vercel.app'
  ],
  credentials: true
};
```

### Environment Variable Issues
- Ensure all required variables are set
- Use production values (not localhost)
- Restart deployment after adding variables

### Build Failures
```bash
# Clear cache and reinstall
npm run clean
npm run install-all
npm run build
```

### Email Not Sending
- Verify email credentials
- Check spam folder
- Ensure Gmail app password is used (not regular password)

## 📊 Performance Optimization

### Frontend Optimization
- Enable compression in build
- Optimize images (WebP format)
- Implement lazy loading
- Use React.memo for heavy components

### Backend Optimization
- Enable gzip compression
- Add caching headers
- Optimize database queries
- Implement connection pooling

## 🔐 Security Checklist

- [ ] Environment variables secured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] HTTPS enabled
- [ ] Security headers set (Helmet.js)

## 📈 Monitoring & Analytics

### Add Analytics
```javascript
// Add to frontend/public/index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

### Error Monitoring
Consider adding:
- Sentry for error tracking
- LogRocket for user session recording
- Uptime monitoring services

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

If you encounter issues during deployment:

1. Check the platform-specific documentation
2. Review environment variable configuration
3. Test locally first with production environment variables
4. Check deployment logs for specific error messages

---

**Happy Deploying! 🚀**
