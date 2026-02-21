#!/bin/bash

# Quick script to add your Google Maps API key
# Usage: ./add-google-api-key.sh YOUR_API_KEY

if [ -z "$1" ]; then
    echo "❌ Please provide your Google Maps API key"
    echo ""
    echo "Usage: ./add-google-api-key.sh YOUR_API_KEY"
    echo ""
    echo "Example: ./add-google-api-key.sh AIzaSyAbCdEf123456789"
    exit 1
fi

API_KEY=$1
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLE_FINDER_DIR="$PROJECT_ROOT/temple-finder"
ENV_FILE="$TEMPLE_FINDER_DIR/.env.local"
CONFIG_FILE="$PROJECT_ROOT/app/src/main/assets/temple-finder/config.js"

echo "🔑 Adding Google Maps API key to Temple Finder..."
echo ""

# Update .env.local for web app
echo "📝 Updating .env.local for web app..."
if [ -f "$ENV_FILE" ]; then
    if grep -q "VITE_GOOGLE_MAPS_API_KEY" "$ENV_FILE"; then
        # Replace existing key
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|VITE_GOOGLE_MAPS_API_KEY=.*|VITE_GOOGLE_MAPS_API_KEY=$API_KEY|" "$ENV_FILE"
        else
            sed -i "s|VITE_GOOGLE_MAPS_API_KEY=.*|VITE_GOOGLE_MAPS_API_KEY=$API_KEY|" "$ENV_FILE"
        fi
        echo "   ✅ Updated existing key in .env.local"
    else
        # Add new key
        echo "" >> "$ENV_FILE"
        echo "# Google Maps API Key" >> "$ENV_FILE"
        echo "VITE_GOOGLE_MAPS_API_KEY=$API_KEY" >> "$ENV_FILE"
        echo "   ✅ Added key to .env.local"
    fi
else
    # Create new file
    echo "# Google Maps API Key" > "$ENV_FILE"
    echo "VITE_GOOGLE_MAPS_API_KEY=$API_KEY" >> "$ENV_FILE"
    echo "   ✅ Created .env.local with API key"
fi

# Update config.js for mobile app
echo "📱 Updating config.js for Android app..."
if [ -f "$CONFIG_FILE" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|googleMapsApiKey: '[^']*'|googleMapsApiKey: '$API_KEY'|g" "$CONFIG_FILE"
        sed -i '' "s|VITE_GOOGLE_MAPS_API_KEY = '[^']*'|VITE_GOOGLE_MAPS_API_KEY = '$API_KEY'|g" "$CONFIG_FILE"
    else
        # Linux
        sed -i "s|googleMapsApiKey: '[^']*'|googleMapsApiKey: '$API_KEY'|g" "$CONFIG_FILE"
        sed -i "s|VITE_GOOGLE_MAPS_API_KEY = '[^']*'|VITE_GOOGLE_MAPS_API_KEY = '$API_KEY'|g" "$CONFIG_FILE"
    fi
    echo "   ✅ Updated config.js for Android app"
else
    echo "   ⚠️  Warning: config.js not found at $CONFIG_FILE"
fi

echo ""
echo "✨ Done! Your Google Maps API key has been added."
echo ""
echo "📋 What was updated:"
echo "   ✅ Web app (.env.local)"
echo "   ✅ Android app (config.js)"
echo ""
echo "🔄 Next steps:"
echo "   1. Restart your web dev server if it's running"
echo "   2. Rebuild Android APK if needed: ./build-apk.sh"
echo ""
echo "🧪 To test:"
echo "   - Web: Open http://localhost:3000 and go to 'Nearby' page"
echo "   - Android: Install the APK and test the map feature"
echo ""
