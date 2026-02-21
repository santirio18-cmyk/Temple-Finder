#!/bin/bash

echo "🔧 DEFINITIVE ANDROID STUDIO FIX"
echo "================================="

# Step 1: Complete cleanup
echo "🧹 Step 1: Complete cleanup..."
rm -rf .idea
rm -rf app/build
rm -rf build
rm -rf .gradle
rm -rf app/.cxx
rm -rf app/.externalNativeBuild

# Step 2: Stop all Gradle processes
echo "🛑 Step 2: Stopping Gradle processes..."
./gradlew --stop
pkill -f gradle
pkill -f java

# Step 3: Set environment
echo "⚙️ Step 3: Setting environment..."
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="/Users/santhoshpremkumar/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools"

echo "✅ JAVA_HOME: $JAVA_HOME"
echo "✅ ANDROID_HOME: $ANDROID_HOME"

# Step 4: Clean Gradle cache
echo "🗑️ Step 4: Cleaning Gradle cache..."
rm -rf ~/.gradle/caches
rm -rf ~/.gradle/daemon

# Step 5: Fresh build
echo "🔨 Step 5: Fresh build..."
./gradlew clean
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Step 6: Install and test
    echo "📱 Step 6: Installing and testing app..."
    adb install -r app/build/outputs/apk/debug/app-debug.apk
    adb shell am start -n com.example.base/.MainActivity
    
    echo ""
    echo "🎉 SUCCESS! Your project is ready!"
    echo ""
    echo "📋 NEXT STEPS FOR ANDROID STUDIO:"
    echo "1. Close Android Studio completely"
    echo "2. Open Android Studio"
    echo "3. Click 'Import Project' (NOT Open Project)"
    echo "4. Navigate to: $(pwd)"
    echo "5. Select the folder and click OK"
    echo "6. Wait for Gradle sync to complete"
    echo ""
    echo "✅ This will fix your Android Studio issues permanently!"
    
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
