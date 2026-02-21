#!/bin/bash

echo "🔧 Testing Sign-In Fix"
echo "====================="

# Set environment
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH="$PATH:/Users/santhoshpremkumar/Library/Android/sdk/platform-tools"

echo "✅ Environment set up"

# Clear logs
echo "🧹 Clearing logs..."
adb logcat -c

# Install latest app
echo "📱 Installing updated app..."
adb install -r app/build/outputs/apk/debug/app-debug.apk

# Launch app
echo "🚀 Launching app..."
adb shell am start -n com.example.base/.MainActivity

echo ""
echo "📋 TESTING INSTRUCTIONS:"
echo "1. App should open to sign-in screen"
echo "2. Click 'Continue as Guest' or enter any credentials"
echo "3. You should see a debug page for 3 seconds"
echo "4. Then it will redirect to the main Temple Finder app"
echo "5. All features should be working"
echo ""
echo "🔍 To check logs:"
echo "adb logcat -s 'TempleFinderActivity' 'WebView'"
echo ""
echo "✅ Sign-in error fix is now active!"






