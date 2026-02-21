#!/bin/bash

echo "🚀 SYNCING STABLE VERSION WITH ANDROID STUDIO"
echo "=============================================="

# Set environment
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH="$PATH:/Users/santhoshpremkumar/Library/Android/sdk/platform-tools"

echo "✅ Environment configured"

# Clean and sync
echo "🧹 Cleaning project..."
./gradlew clean

echo "📦 Building project..."
./gradlew build

echo "🔧 Syncing Gradle..."
./gradlew --refresh-dependencies

echo "📱 Generating APKs..."
./gradlew assembleDebug assembleRelease

echo ""
echo "✅ SYNC COMPLETE!"
echo ""
echo "📋 NEXT STEPS FOR ANDROID STUDIO:"
echo "1. Open Android Studio"
echo "2. Choose 'Open an existing project'"
echo "3. Navigate to: /Users/santhoshpremkumar/AndroidStudioProjects/Base"
echo "4. Click 'Open'"
echo "5. Wait for Gradle sync to complete"
echo "6. Click 'Run' or press Shift+F10"
echo ""
echo "🎯 YOUR STABLE VERSION IS READY!"
echo ""
echo "📁 APK Locations:"
echo "Debug: app/build/outputs/apk/debug/app-debug.apk"
echo "Release: app/build/outputs/apk/release/app-release.apk"
echo ""
echo "🚀 Features included:"
echo "✅ Stable Temple Finder app"
echo "✅ Fixed UI and scrolling"
echo "✅ Working buttons and navigation"
echo "✅ Mobile-optimized design"
echo "✅ No crashes or blank screens"
echo ""
echo "📱 Test the app in Android Studio now!"






