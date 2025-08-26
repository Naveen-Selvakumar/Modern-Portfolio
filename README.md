# Portfolio Website

A modern, responsive portfolio website built with the MERN stack featuring IoT projects and professional experience. This portfolio showcases a PG IoT Fresher | MERN Developer | CoPLO Specialist with dynamic animations, contact functionality, and project management.

## 🚀 Features

### Frontend
- **Modern React 18** with functional components and hooks
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** using Framer Motion and AOS
- **Interactive Navigation** with smooth scrolling
- **Theme Support** with context-based state management
- **Contact Form** with real-time validation
- **Project Filtering** and modal views
- **Certification Timeline** with verification badges
- **Skills Progress Bars** with animated counters
- **Social Media Integration** with React Icons

### Backend
- **RESTful API** built with Express.js
- **MongoDB Integration** with Mongoose ODM
- **Email Functionality** using Nodemailer
- **Input Validation** with express-validator
- **Security Middleware** (Helmet, CORS, Rate Limiting)
- **Error Handling** with custom middleware
- **Environment Configuration** for different stages

### Performance & Security
- **Compression** for faster loading
- **Rate Limiting** to prevent abuse
- **CORS Protection** for secure API access
- **Input Sanitization** and validation
- **Error Logging** and monitoring

## 🛠️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Framer Motion
- AOS (Animate On Scroll)
- React Icons
- React Scroll
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer
- express-validator
- Helmet
- express-rate-limit

### Development Tools
- Concurrently
- Nodemon
- PostCSS
- Autoprefixer

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

### Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install-all

# Or install separately
npm install                    # Root dependencies
cd frontend && npm install     # Frontend dependencies
cd ../backend && npm install   # Backend dependencies
```

## 🏗️ Project Structure

```
Portfolio/
├── frontend/          # React application
├── backend/           # Express.js API
├── package.json       # Root package.json
└── README.md
```

## 🔧 Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Animations

- **Framer Motion**: Page transitions and component animations
- **AOS**: Scroll-triggered animations
- **Custom CSS**: Hover effects and micro-interactions

## 📞 Contact

Feel free to reach out for any questions or collaborations!

---

**Built with ❤️ by [Your Name]**
