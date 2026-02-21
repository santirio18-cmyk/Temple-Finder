#!/bin/bash

# Setup script for GitHub and Vercel deployment
# This script helps you prepare your Temple Finder app for deployment

echo "🚀 Temple Finder - GitHub & Vercel Setup"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the temple-finder directory."
    exit 1
fi

echo -e "${BLUE}Step 1: Checking Git status...${NC}"
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo -e "${BLUE}Step 2: Checking for uncommitted changes...${NC}"
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 You have uncommitted changes. Would you like to commit them? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Prepare for Vercel deployment - $(date +%Y-%m-%d)"
        echo "✅ Changes committed"
    fi
else
    echo "✅ No uncommitted changes"
fi

echo ""
echo -e "${BLUE}Step 3: Checking for GitHub remote...${NC}"
if git remote | grep -q "origin"; then
    echo "✅ GitHub remote already configured"
    git remote -v
else
    echo -e "${YELLOW}⚠️  No GitHub remote found${NC}"
    echo ""
    echo "To add GitHub remote, run:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/temple-finder.git"
    echo ""
    echo "Then push with:"
    echo "  git push -u origin main"
fi

echo ""
echo -e "${BLUE}Step 4: Verifying build...${NC}"
echo "Running build test..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${YELLOW}❌ Build failed. Please fix errors before deploying.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✨ Setup Complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo "1. Create a GitHub repository at https://github.com/new"
echo "2. Add remote: git remote add origin https://github.com/YOUR_USERNAME/temple-finder.git"
echo "3. Push code: git push -u origin main"
echo "4. Go to https://vercel.com and import your GitHub repository"
echo "5. Add environment variables in Vercel dashboard"
echo ""
echo "📖 See DEPLOY_TO_VERCEL.md for detailed instructions"
