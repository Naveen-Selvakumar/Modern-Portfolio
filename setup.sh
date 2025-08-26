#!/bin/bash

# Portfolio Setup Script
echo "🚀 Setting up IoT Portfolio Project..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js (version 14 or higher)"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm"
    exit 1
fi

print_status "Node.js and npm are installed"

# Install root dependencies
print_status "Installing root dependencies..."
npm install

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
print_status "Installing backend dependencies..."
cd backend
npm install
cd ..

# Create environment files if they don't exist
if [ ! -f "frontend/.env" ]; then
    print_status "Creating frontend environment file..."
    cp frontend/.env.example frontend/.env
    print_warning "Please update frontend/.env with your configuration"
fi

if [ ! -f "backend/.env" ]; then
    print_status "Creating backend environment file..."
    cp backend/.env.example backend/.env
    print_warning "Please update backend/.env with your configuration"
fi

# Create uploads directory for backend
mkdir -p backend/uploads

# Create public assets directories for frontend
mkdir -p frontend/public/images
mkdir -p frontend/public/projects
mkdir -p frontend/public/assets

print_status "Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your MongoDB URI and email configuration"
echo "2. Update frontend/.env with your API URL"
echo "3. Add your profile image to frontend/public/profile-image.jpg"
echo "4. Add project images to frontend/public/projects/"
echo "5. Run 'npm run dev' to start both frontend and backend"
echo ""
echo "🌐 Development URLs:"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000"
echo ""
echo "Happy coding! 🎉"
