#!/bin/bash

echo "🚀 Setting up Temple Finder Production Backend..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ is required. Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL is not installed. Installing via Homebrew...${NC}"
    if command -v brew &> /dev/null; then
        brew install postgresql@15
        brew services start postgresql@15
    else
        echo -e "${RED}❌ Homebrew is not installed. Please install PostgreSQL manually.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ PostgreSQL is available${NC}"

# Navigate to backend directory
cd temple-finder-backend

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependencies installed successfully${NC}"

# Create environment file
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creating environment file...${NC}"
    cp env.example .env
    
    # Generate JWT secret
    JWT_SECRET=$(openssl rand -base64 64)
    sed -i '' "s/your_super_secure_jwt_secret_key_here/$JWT_SECRET/" .env
    
    echo -e "${GREEN}✅ Environment file created${NC}"
    echo -e "${YELLOW}⚠️  Please update .env file with your actual configuration values${NC}"
else
    echo -e "${GREEN}✅ Environment file already exists${NC}"
fi

# Setup database
echo -e "${BLUE}🗄️  Setting up database...${NC}"

# Check if database exists
DB_EXISTS=$(psql -lqt | cut -d \| -f 1 | grep -w temple_finder_prod | wc -l)

if [ $DB_EXISTS -eq 0 ]; then
    echo -e "${BLUE}📊 Creating database...${NC}"
    createdb temple_finder_prod
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to create database${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Database created successfully${NC}"
else
    echo -e "${GREEN}✅ Database already exists${NC}"
fi

# Run database migrations
echo -e "${BLUE}🔄 Running database migrations...${NC}"
npm run migrate

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Database migration failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Database migrations completed${NC}"

# Seed database with initial data
echo -e "${BLUE}🌱 Seeding database...${NC}"
npm run seed

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Database seeding failed (this is optional)${NC}"
fi

# Create uploads directory
mkdir -p uploads/temples
mkdir -p uploads/users
echo -e "${GREEN}✅ Upload directories created${NC}"

# Set up PM2 for production
if command -v pm2 &> /dev/null; then
    echo -e "${BLUE}🚀 Setting up PM2 for production...${NC}"
    pm2 delete temple-finder-backend 2>/dev/null || true
    pm2 start server.js --name temple-finder-backend --env production
    pm2 save
    pm2 startup
    echo -e "${GREEN}✅ PM2 configuration completed${NC}"
else
    echo -e "${YELLOW}⚠️  PM2 not installed. Installing...${NC}"
    npm install -g pm2
    pm2 start server.js --name temple-finder-backend --env production
    pm2 save
    pm2 startup
    echo -e "${GREEN}✅ PM2 installed and configured${NC}"
fi

# Test the server
echo -e "${BLUE}🧪 Testing server...${NC}"
sleep 5

# Check if server is running
if curl -s http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✅ Server is running and healthy${NC}"
else
    echo -e "${RED}❌ Server health check failed${NC}"
    echo -e "${YELLOW}⚠️  Please check the server logs: pm2 logs temple-finder-backend${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Production Backend Setup Complete!${NC}"
echo "=================================================="
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Update .env file with your actual configuration"
echo "2. Configure your domain and SSL certificates"
echo "3. Set up monitoring and logging"
echo "4. Configure backup strategies"
echo ""
echo -e "${BLUE}🔗 Important URLs:${NC}"
echo "• Health Check: http://localhost:3000/health"
echo "• API Base: http://localhost:3000/api/v1"
echo "• Documentation: http://localhost:3000/api/v1/docs"
echo ""
echo -e "${BLUE}📊 Management Commands:${NC}"
echo "• Start server: pm2 start temple-finder-backend"
echo "• Stop server: pm2 stop temple-finder-backend"
echo "• View logs: pm2 logs temple-finder-backend"
echo "• Monitor: pm2 monit"
echo ""
echo -e "${BLUE}🔧 Configuration Files:${NC}"
echo "• Environment: temple-finder-backend/.env"
echo "• Database: temple-finder-backend/scripts/setup-database.sql"
echo "• PM2 Config: ~/.pm2/ecosystem.config.js"
echo ""
echo -e "${GREEN}✅ Ready for production deployment!${NC}"




