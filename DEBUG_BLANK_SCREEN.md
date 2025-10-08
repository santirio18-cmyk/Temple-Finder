# 🔍 Debugging Blank Screen Issue

## 🚨 **Issue**: After logging in, the location screen is blank

## ✅ **Fixes Applied**

### **1. Fixed Asset Paths in HTML**
- **Problem**: HTML was using absolute paths (`/assets/...`)
- **Solution**: Changed to relative paths (`./assets/...`)
- **File**: `app/src/main/assets/temple-finder/index.html`

### **2. Added Comprehensive Debugging**
- **Enhanced WebView logging** with detailed console output
- **Added error handling** for script loading
- **Created debug page** for testing WebView functionality
- **File**: `TempleFinderActivity.kt`

### **3. Created Debug HTML Page**
- **Simple test page** to verify WebView functionality
- **Tests JavaScript, LocalStorage, Fetch API**
- **Shows detailed status information**
- **File**: `debug.html`

## 🔧 **How to Debug**

### **Step 1: Install Updated APK**
```bash
# Install the new APK with debugging
adb install app/build/outputs/apk/debug/app-debug.apk
```

### **Step 2: Test the Debug Page**
1. **Launch the app**
2. **Sign in** or use "Continue as Guest"
3. **You should see the debug page** instead of blank screen
4. **Check the test results** to identify issues

### **Step 3: View Console Logs**
```bash
# View Android logs
adb logcat | grep -E "(WebView|JS|TempleFinder)"

# Or filter by package
adb logcat | grep "com.example.base"
```

### **Step 4: Switch Back to Main App**
Once debugging is complete, change the URL back:
```kotlin
// In TempleFinderActivity.kt, line 31
private const val INITIAL_URL = "file:///android_asset/temple-finder/index.html" // Change back
```

## 📊 **Expected Debug Output**

### **Successful Loading:**
```
📊 WebView Progress: 100%
🔍 WebView: Page finished loading: file:///android_asset/temple-finder/debug.html
🔧 Starting script loading sequence...
✅ Config loaded successfully
✅ Error handler loaded successfully
✅ Mobile enhancements loaded successfully
🎉 All scripts loaded - Temple Finder ready!
```

### **Error Scenarios:**
```
❌ WebView Error: net::ERR_FILE_NOT_FOUND
❌ Failed to load config
❌ Failed to load mobile enhancements
```

## 🛠️ **Troubleshooting Steps**

### **If Debug Page Shows:**
1. **All tests pass** → Main app should work, switch back to `index.html`
2. **JavaScript fails** → WebView settings issue
3. **Config fails to load** → Asset path problem
4. **Still blank** → Check asset files exist

### **If Still Blank:**
1. **Check asset files exist:**
   ```bash
   ls -la app/src/main/assets/temple-finder/
   ```

2. **Verify file permissions:**
   ```bash
   ls -la app/src/main/assets/temple-finder/index.html
   ```

3. **Check WebView settings:**
   - JavaScript enabled: ✅
   - DOM storage enabled: ✅
   - File access allowed: ✅

## 📱 **Testing on Device**

### **Method 1: ADB Install**
```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

### **Method 2: Android Studio**
1. **Run** the app from Android Studio
2. **Select** your device
3. **Monitor** Logcat for debug messages

### **Method 3: Manual Install**
1. **Copy APK** to device
2. **Enable** "Unknown Sources"
3. **Install** the APK

## 🔄 **Quick Fixes**

### **Fix 1: Restore Main App**
```kotlin
// Change line 31 in TempleFinderActivity.kt
private const val INITIAL_URL = "file:///android_asset/temple-finder/index.html"
```

### **Fix 2: Rebuild Assets**
```bash
# Rebuild React app
cd temple-finder
npm run build

# Copy to Android
cp -r dist/* ../app/src/main/assets/temple-finder/

# Rebuild APK
cd ..
./gradlew assembleDebug
```

### **Fix 3: Check File Structure**
```
app/src/main/assets/temple-finder/
├── index.html ✅
├── debug.html ✅
├── config.js ✅
├── assets/
│   ├── index-*.js ✅
│   └── index-*.css ✅
└── manifest.webmanifest ✅
```

## 🎯 **Next Steps**

1. **Test debug page** - Verify WebView works
2. **Check console logs** - Identify specific errors
3. **Fix asset issues** - Based on debug results
4. **Switch back** - To main app when fixed
5. **Test full app** - Verify all features work

## 📞 **Need Help?**

If you're still seeing a blank screen:

1. **Share the debug page results**
2. **Provide console log output**
3. **Confirm asset files exist**
4. **Test on different device/emulator**

The debug page will help identify exactly what's causing the blank screen issue!
