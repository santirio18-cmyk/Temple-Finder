#!/bin/bash

# Temple Finder Android Integration Build Script
# This script builds the React app and integrates it with Android

set -e

echo "🏛️ Temple Finder Android Integration"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is available
check_node() {
    print_status "Checking Node.js installation..."
    if [ -f "./node-v18.20.8-darwin-arm64/bin/node" ]; then
        export PATH="$(pwd)/node-v18.20.8-darwin-arm64/bin:$PATH"
        print_success "Node.js found at ./node-v18.20.8-darwin-arm64/bin/node"
    else
        print_error "Node.js not found. Please ensure node-v18.20.8-darwin-arm64 directory exists."
        exit 1
    fi
}

# Build React app
build_react_app() {
    print_status "Building React app for production..."
    cd temple-finder
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing dependencies..."
        npm install
    fi
    
    # Build the app
    print_status "Running production build..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "React app built successfully!"
    else
        print_error "React app build failed!"
        exit 1
    fi
    
    cd ..
}

# Copy files to Android assets
copy_to_android() {
    print_status "Copying built files to Android assets..."
    
    # Remove old files
    rm -rf app/src/main/assets/temple-finder
    
    # Create directory
    mkdir -p app/src/main/assets/temple-finder
    
    # Copy built files
    cp -r ./dist/* app/src/main/assets/temple-finder/
    
    if [ $? -eq 0 ]; then
        print_success "Files copied to Android assets successfully!"
    else
        print_error "Failed to copy files to Android assets!"
        exit 1
    fi
}

# Verify integration
verify_integration() {
    print_status "Verifying Android integration..."
    
    # Check if index.html exists
    if [ -f "app/src/main/assets/temple-finder/index.html" ]; then
        print_success "index.html found in Android assets"
    else
        print_error "index.html not found in Android assets"
        exit 1
    fi
    
    # Check if config.js exists
    if [ -f "app/src/main/assets/temple-finder/config.js" ]; then
        print_success "config.js found in Android assets"
    else
        print_error "config.js not found in Android assets"
        exit 1
    fi
    
    # Check if mobile-enhancements.js exists
    if [ -f "app/src/main/assets/temple-finder/mobile-enhancements.js" ]; then
        print_success "mobile-enhancements.js found in Android assets"
    else
        print_error "mobile-enhancements.js not found in Android assets"
        exit 1
    fi
    
    # List files
    print_status "Files in Android assets:"
    ls -la app/src/main/assets/temple-finder/
}

# Main execution
main() {
    echo
    print_status "Starting Temple Finder Android integration..."
    echo
    
    # Step 1: Check Node.js
    check_node
    echo
    
    # Step 2: Build React app
    build_react_app
    echo
    
    # Step 3: Copy to Android
    copy_to_android
    echo
    
    # Step 4: Verify integration
    verify_integration
    echo
    
    print_success "🎉 Temple Finder Android integration completed successfully!"
    echo
    print_status "Next steps:"
    echo "1. Open Android Studio"
    echo "2. Build and run your Android app"
    echo "3. The Temple Finder web app will load in the WebView"
    echo "4. Test the complete functionality"
    echo
    print_status "Your app now includes:"
    echo "✅ 16+ famous temples from across India"
    echo "✅ Supabase database integration"
    echo "✅ Search functionality (Basic, AI, Enhanced)"
    echo "✅ Temple details with timings and reviews"
    echo "✅ Favorites system"
    echo "✅ Categories browsing"
    echo "✅ Mobile-optimized interface"
    echo "✅ Geolocation support"
    echo
    print_warning "Note: Make sure your Supabase credentials are correctly configured in config.js"
    echo
}

# Run main function
main









