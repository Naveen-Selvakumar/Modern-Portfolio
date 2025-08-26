@echo off
echo 🚀 Setting up IoT Portfolio Project...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js (version 14 or higher)
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..

REM Create environment files if they don't exist
if not exist "frontend\.env" (
    echo 📄 Creating frontend environment file...
    copy "frontend\.env.example" "frontend\.env"
    echo ⚠️  Please update frontend/.env with your configuration
)

if not exist "backend\.env" (
    echo 📄 Creating backend environment file...
    copy "backend\.env.example" "backend\.env"
    echo ⚠️  Please update backend/.env with your configuration
)

REM Create uploads directory for backend
if not exist "backend\uploads" mkdir "backend\uploads"

REM Create public assets directories for frontend
if not exist "frontend\public\images" mkdir "frontend\public\images"
if not exist "frontend\public\projects" mkdir "frontend\public\projects"
if not exist "frontend\public\assets" mkdir "frontend\public\assets"

echo ✅ Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Update backend/.env with your MongoDB URI and email configuration
echo 2. Update frontend/.env with your API URL
echo 3. Add your profile image to frontend/public/profile-image.jpg
echo 4. Add project images to frontend/public/projects/
echo 5. Run 'npm run dev' to start both frontend and backend
echo.
echo 🌐 Development URLs:
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000
echo.
echo Happy coding! 🎉
pause
