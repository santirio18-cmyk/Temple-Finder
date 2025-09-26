#!/bin/bash

echo "🏗️  Temple Finder Android Build Script"
echo "======================================"

# Check if Java is available
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed or not in PATH"
    echo ""
    echo "Please install Java 11 or later:"
    echo "1. Visit: https://www.oracle.com/java/technologies/downloads/"
    echo "2. Or install via Homebrew: brew install openjdk@11"
    echo "3. Or use Android Studio's built-in JDK"
    echo ""
    echo "After installing Java, run this script again."
    exit 1
fi

# Check Java version
JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 11 ]; then
    echo "❌ Java version $JAVA_VERSION is too old. Please install Java 11 or later."
    exit 1
fi

echo "✅ Java $JAVA_VERSION found"

# Set JAVA_HOME if not set
if [ -z "$JAVA_HOME" ]; then
    # Try to find Java installation
    if [ -d "/Library/Java/JavaVirtualMachines" ]; then
        JAVA_HOME=$(find /Library/Java/JavaVirtualMachines -name "Home" -type d | head -n 1)
        export JAVA_HOME
        echo "✅ Set JAVA_HOME to: $JAVA_HOME"
    fi
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
./gradlew clean

# Build the project
echo "🔨 Building Temple Finder Android app..."
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Build successful!"
    echo ""
    echo "📱 APK location: app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "🚀 To install and run:"
    echo "1. Connect an Android device or start an emulator"
    echo "2. Run: ./gradlew installDebug"
    echo "3. Or open the project in Android Studio and click Run"
    echo ""
    echo "📋 Features included:"
    echo "   • Beautiful launcher screen with Temple Finder branding"
    echo "   • WebView integration with local HTML content"
    echo "   • Location services for temple discovery"
    echo "   • Traditional Indian design with saffron colors"
    echo "   • Interactive temple cards and search functionality"
else
    echo ""
    echo "❌ Build failed. Please check the error messages above."
    echo ""
    echo "🔧 Common solutions:"
    echo "1. Make sure Java 11+ is installed and JAVA_HOME is set"
    echo "2. Clean and rebuild: ./gradlew clean assembleDebug"
    echo "3. Check Android SDK is properly installed"
    echo "4. Open in Android Studio for better error handling"
fi
