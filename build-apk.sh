#!/bin/bash

# Temple Finder APK Build Script
# This script builds the Android APK with proper Java environment setup

echo "🏗️  Building Temple Finder APK..."

# Set Java environment for Android Studio
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"

# Navigate to project directory
cd "$(dirname "$0")"

echo "📱 Java Version:"
java -version

echo "🔨 Building APK..."
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo "✅ APK Build Successful!"
    echo "📁 APK Location: app/build/outputs/apk/debug/app-debug.apk"
    
    # Show file info
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    if [ -f "$APK_PATH" ]; then
        echo "📊 APK Size: $(du -h "$APK_PATH" | cut -f1)"
        echo "📅 Build Date: $(date)"
        echo ""
        echo "🚀 You can now install this APK on your Android device!"
        echo "   Use: adb install $APK_PATH"
    fi
else
    echo "❌ APK Build Failed!"
    exit 1
fi









