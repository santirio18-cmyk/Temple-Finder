#!/bin/bash

# Set up the environment for Node.js
export PATH="$(pwd)/node-v18.20.8-darwin-arm64/bin:$PATH"

# Navigate to the temple-finder directory
cd temple-finder

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server
echo "Starting development server..."
npm run dev
