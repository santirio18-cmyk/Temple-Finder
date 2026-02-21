#!/bin/bash

# Create Android app icons from SVG
# This script converts the temple_icon.svg to various PNG sizes required for Android

echo "🏛️ Creating Temple Finder App Icons..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing via Homebrew..."
    if command -v brew &> /dev/null; then
        brew install imagemagick
    else
        echo "❌ Homebrew not found. Please install ImageMagick manually:"
        echo "   brew install imagemagick"
        exit 1
    fi
fi

# Create directories if they don't exist
mkdir -p app/src/main/res/mipmap-ldpi
mkdir -p app/src/main/res/mipmap-mdpi
mkdir -p app/src/main/res/mipmap-hdpi
mkdir -p app/src/main/res/mipmap-xhdpi
mkdir -p app/src/main/res/mipmap-xxhdpi
mkdir -p app/src/main/res/mipmap-xxxhdpi

# Convert SVG to different PNG sizes
echo "📱 Converting to Android icon sizes..."

# LDPI (36x36)
convert temple_icon.svg -resize 36x36 app/src/main/res/mipmap-ldpi/ic_launcher.png
convert temple_icon.svg -resize 36x36 app/src/main/res/mipmap-ldpi/ic_launcher_round.png

# MDPI (48x48)
convert temple_icon.svg -resize 48x48 app/src/main/res/mipmap-mdpi/ic_launcher.png
convert temple_icon.svg -resize 48x48 app/src/main/res/mipmap-mdpi/ic_launcher_round.png

# HDPI (72x72)
convert temple_icon.svg -resize 72x72 app/src/main/res/mipmap-hdpi/ic_launcher.png
convert temple_icon.svg -resize 72x72 app/src/main/res/mipmap-hdpi/ic_launcher_round.png

# XHDPI (96x96)
convert temple_icon.svg -resize 96x96 app/src/main/res/mipmap-xhdpi/ic_launcher.png
convert temple_icon.svg -resize 96x96 app/src/main/res/mipmap-xhdpi/ic_launcher_round.png

# XXHDPI (144x144)
convert temple_icon.svg -resize 144x144 app/src/main/res/mipmap-xxhdpi/ic_launcher.png
convert temple_icon.svg -resize 144x144 app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png

# XXXHDPI (192x192)
convert temple_icon.svg -resize 192x192 app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
convert temple_icon.svg -resize 192x192 app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png

echo "✅ App icons created successfully!"
echo "📁 Icons saved to:"
echo "   - app/src/main/res/mipmap-ldpi/"
echo "   - app/src/main/res/mipmap-mdpi/"
echo "   - app/src/main/res/mipmap-hdpi/"
echo "   - app/src/main/res/mipmap-xhdpi/"
echo "   - app/src/main/res/mipmap-xxhdpi/"
echo "   - app/src/main/res/mipmap-xxxhdpi/"

echo ""
echo "🏗️ Now rebuilding APK with new icons..."
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo "✅ APK rebuilt successfully with new temple icon!"
    echo "📱 Your new APK is ready: TempleFinder.apk"
else
    echo "❌ APK rebuild failed. Please check the errors above."
fi











