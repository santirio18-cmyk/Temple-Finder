#!/bin/bash

# Android Studio Setup Script for Temple Finder App
echo "🔧 Setting up Android Studio for Temple Finder App..."

# Set up environment variables
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="/Users/santhoshpremkumar/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools"

echo "✅ Environment variables set:"
echo "   JAVA_HOME: $JAVA_HOME"
echo "   ANDROID_HOME: $ANDROID_HOME"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
./gradlew --stop
./gradlew clean

# Verify Gradle setup
echo "📋 Verifying Gradle setup..."
./gradlew --version

# Test build
echo "🔨 Testing build..."
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Check for connected devices
echo "📱 Checking for connected devices..."
adb devices

echo ""
echo "🎉 Android Studio setup complete!"
echo ""
echo "Next steps:"
echo "1. Open Android Studio"
echo "2. Open this project: $(pwd)"
echo "3. Wait for Gradle sync to complete"
echo "4. Run the app (Shift+F10 or green play button)"
echo ""
echo "If you encounter issues:"
echo "- Make sure Android Studio is using the correct JDK"
echo "- Check that Android SDK is properly installed"
echo "- Verify emulator or device is connected"
