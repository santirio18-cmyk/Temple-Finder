#!/bin/bash

echo "🔍 DIAGNOSING SIGN-IN ISSUE"
echo "============================"

# Set environment
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH="$PATH:/Users/santhoshpremkumar/Library/Android/sdk/platform-tools"

echo "✅ Environment set up"

# Clear logs
echo "🧹 Clearing logs..."
adb logcat -c

# Launch app
echo "🚀 Launching app..."
adb shell am start -n com.example.base/.MainActivity

echo ""
echo "📋 DIAGNOSIS INSTRUCTIONS:"
echo "1. App opens to sign-in screen"
echo "2. Click 'Continue as Guest' or enter credentials"
echo "3. You should see a TEST PAGE with diagnostic information"
echo "4. This test page will show exactly what's working/broken"
echo "5. Click 'Test Asset Loading' and 'Test React App' buttons"
echo "6. The results will show the exact issue"
echo ""
echo "🔍 COMMON ISSUES TO LOOK FOR:"
echo "- If WebView doesn't load: Android WebView issue"
echo "- If assets fail to load: File path problem"
echo "- If React script fails: JavaScript/Module loading issue"
echo "- If page is blank: WebView configuration problem"
echo ""
echo "📱 To check logs in real-time:"
echo "adb logcat -s 'TempleFinderActivity' 'WebView' 'System.err'"
echo ""
echo "✅ Diagnostic version installed - test now!"






