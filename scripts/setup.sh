#!/bin/bash

echo "🚀 Setting up Ultracode development environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📋 Creating .env file from .env.development..."
    cp .env.development .env
else
    echo "✅ .env file already exists"
fi

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 5

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup database
echo "🗄️ Setting up database..."
cd packages/database
npm install
npm run setup
npm run migrate
npm run seed
cd ../..

# Install API dependencies
echo "🔧 Setting up API..."
cd apps/api
npm install
cd ../..

# Install web dependencies
echo "🌐 Setting up web app..."
cd apps/web
npm install
cd ../..

echo "✅ Setup complete!"
echo ""
echo "To start the development servers, run:"
echo "  npm run dev"
echo ""
echo "Demo credentials:"
echo "  Email: demo@ultracode.dev"
echo "  Password: demo123!"
echo ""
echo "Services:"
echo "  Frontend: http://localhost:5173"
echo "  API: http://localhost:3000"
echo "  Database: postgresql://localhost:5432/ultracode_dev"
echo "  Redis: redis://localhost:6379"