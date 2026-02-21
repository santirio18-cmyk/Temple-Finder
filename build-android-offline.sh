#!/bin/bash

# Build Android App with Offline Temple Finder
# This script builds the React app and copies it to Android assets

echo "🏛️ Building Temple Finder Android App (Offline Mode)..."

# Build React app
echo "📦 Building React app..."
cd temple-finder
PATH="../node-v18.20.8-darwin-arm64/bin:$PATH" npm run build

if [ $? -ne 0 ]; then
    echo "❌ React build failed!"
    exit 1
fi

echo "✅ React app built successfully!"

# Copy to Android assets
echo "📱 Copying to Android assets..."
cd ..
rm -rf app/src/main/assets/temple-finder
mkdir -p app/src/main/assets/temple-finder
cp -r temple-finder/dist/* app/src/main/assets/temple-finder/

# Create offline configuration
cat > app/src/main/assets/temple-finder/config.js << 'EOF'
// Temple Finder Mobile Configuration - OFFLINE MODE
window.TEMPLE_FINDER_CONFIG = {
  app: {
    name: 'Temple Finder',
    version: '1.0.0',
    isMobile: true,
    platform: 'android',
    mode: 'offline'
  },
  features: {
    geolocation: true,
    favorites: true,
    reviews: true,
    categories: true,
    search: true,
    aiSearch: true,
    offline: true
  },
  mockData: {
    enabled: true,
    temples: 8,
    categories: 8,
    users: 1,
    reviews: 3
  }
};

window.import = window.import || {};
window.import.meta = window.import.meta || {};
window.import.meta.env = window.import.meta.env || {};
window.import.meta.env.VITE_OFFLINE_MODE = 'true';
window.import.meta.env.VITE_MOCK_DATA = 'true';
window.import.meta.env.VITE_LOCAL_AI = 'true';

console.log('Temple Finder Mobile Configuration Loaded (OFFLINE MODE)');
EOF

echo "✅ Configuration updated for offline mode!"

# Build Android APK
echo "🔨 Building Android APK..."
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo "🎉 SUCCESS! Android APK built successfully!"
    echo "📱 APK location: app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "🚀 Features available:"
    echo "   ✅ Temple browsing and search"
    echo "   ✅ AI-powered search (local)"
    echo "   ✅ Categories and filtering"
    echo "   ✅ Temple details and reviews"
    echo "   ✅ Favorites system"
    echo "   ✅ User profiles"
    echo "   ✅ Offline functionality"
    echo ""
    echo "📋 Test these features:"
    echo "   1. Search for 'Shiva temples'"
    echo "   2. Browse categories"
    echo "   3. View temple details"
    echo "   4. Add to favorites"
    echo "   5. Try AI search"
else
    echo "❌ Android build failed!"
    exit 1
fi









