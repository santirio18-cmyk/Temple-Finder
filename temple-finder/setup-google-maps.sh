#!/bin/bash

# Google Maps API Key Setup Script
# Usage: ./setup-google-maps.sh YOUR_API_KEY

if [ -z "$1" ]; then
    echo "❌ Error: Please provide your Google Maps API key"
    echo "Usage: ./setup-google-maps.sh YOUR_API_KEY"
    exit 1
fi

API_KEY=$1
TEMPLE_FINDER_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$TEMPLE_FINDER_DIR/.env.local"
CONFIG_FILE="../app/src/main/assets/temple-finder/config.js"

echo "🔑 Setting up Google Maps API key..."

# Update .env.local for web app
if [ -f "$ENV_FILE" ]; then
    # Update existing file
    if grep -q "VITE_GOOGLE_MAPS_API_KEY" "$ENV_FILE"; then
        # Replace existing key
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s|VITE_GOOGLE_MAPS_API_KEY=.*|VITE_GOOGLE_MAPS_API_KEY=$API_KEY|" "$ENV_FILE"
        else
            # Linux
            sed -i "s|VITE_GOOGLE_MAPS_API_KEY=.*|VITE_GOOGLE_MAPS_API_KEY=$API_KEY|" "$ENV_FILE"
        fi
        echo "✅ Updated .env.local"
    else
        # Add new key
        echo "" >> "$ENV_FILE"
        echo "# Google Maps API Key" >> "$ENV_FILE"
        echo "VITE_GOOGLE_MAPS_API_KEY=$API_KEY" >> "$ENV_FILE"
        echo "✅ Added to .env.local"
    fi
else
    # Create new file
    echo "# Google Maps API Key" > "$ENV_FILE"
    echo "VITE_GOOGLE_MAPS_API_KEY=$API_KEY" >> "$ENV_FILE"
    echo "✅ Created .env.local"
fi

# Update config.js for mobile app
CONFIG_FILE_ABS="$(cd "$(dirname "$0")/.." && pwd)/app/src/main/assets/temple-finder/config.js"
if [ -f "$CONFIG_FILE_ABS" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|googleMapsApiKey: '[^']*'|googleMapsApiKey: '$API_KEY'|" "$CONFIG_FILE_ABS"
        sed -i '' "s|VITE_GOOGLE_MAPS_API_KEY = '[^']*'|VITE_GOOGLE_MAPS_API_KEY = '$API_KEY'|" "$CONFIG_FILE_ABS"
    else
        # Linux
        sed -i "s|googleMapsApiKey: '[^']*'|googleMapsApiKey: '$API_KEY'|" "$CONFIG_FILE_ABS"
        sed -i "s|VITE_GOOGLE_MAPS_API_KEY = '[^']*'|VITE_GOOGLE_MAPS_API_KEY = '$API_KEY'|" "$CONFIG_FILE_ABS"
    fi
    echo "✅ Updated config.js for mobile app"
else
    echo "⚠️  Warning: config.js not found at $CONFIG_FILE_ABS"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Restart your development server if it's running"
echo "2. Test the map on the Nearby page"
echo "3. Make sure you've enabled these APIs in Google Cloud Console:"
echo "   - Maps JavaScript API"
echo "   - Places API"
echo "   - Directions API"
echo "   - Geocoding API"
