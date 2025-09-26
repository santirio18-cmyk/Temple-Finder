# Temple Finder Android Setup Guide 🕉️

## Prerequisites

### 1. Java Development Kit (JDK)
You need Java 11 or later to build Android projects.

**Install Java:**
```bash
# Option 1: Using Homebrew (recommended)
brew install openjdk@11

# Option 2: Download from Oracle
# Visit: https://www.oracle.com/java/technologies/downloads/
# Download JDK 11 or later for macOS

# Option 3: Use Android Studio's built-in JDK
# Android Studio comes with its own JDK
```

**Set JAVA_HOME:**
```bash
# Add to your ~/.zshrc or ~/.bash_profile
export JAVA_HOME=/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

# Or for Android Studio's JDK
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

### 2. Android Studio
- Download from: https://developer.android.com/studio
- Install Android SDK (API 24+)
- Set up Android emulator or connect physical device

## Quick Start

### Method 1: Using the Build Script
```bash
cd /Users/santhoshpremkumar/AndroidStudioProjects/Base
./build-and-run.sh
```

### Method 2: Using Android Studio
1. Open Android Studio
2. Open the project: `/Users/santhoshpremkumar/AndroidStudioProjects/Base`
3. Wait for Gradle sync to complete
4. Click "Run" (green play button)

### Method 3: Command Line
```bash
cd /Users/santhoshpremkumar/AndroidStudioProjects/Base

# Set JAVA_HOME if needed
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"

# Build the project
./gradlew assembleDebug

# Install on device/emulator
./gradlew installDebug
```

## Project Structure

```
Base/
├── app/
│   ├── src/main/
│   │   ├── java/com/example/base/
│   │   │   ├── MainActivity.kt              # Launcher screen
│   │   │   └── TempleFinderActivity.kt     # WebView container
│   │   ├── assets/temple-finder/
│   │   │   └── index.html                  # Temple Finder web app
│   │   ├── res/                            # Android resources
│   │   └── AndroidManifest.xml             # App configuration
│   └── build.gradle.kts                    # Dependencies
├── build-and-run.sh                        # Build script
└── README_TEMPLE_FINDER.md                 # Documentation
```

## Features

### 🏠 Main Screen
- Beautiful launcher with Temple Finder branding
- Traditional Indian design with saffron colors
- Feature overview with icons
- One-tap launch button

### 🌐 Temple Finder Web App
- Responsive HTML/CSS/JavaScript app
- AI-powered search interface
- Interactive temple cards
- Location-based features
- Real-time crowd tracking simulation

### 📱 Android Integration
- WebView 2.0 for smooth performance
- Location permissions handling
- External link integration
- Android back button support
- Material Design 3 UI

## Troubleshooting

### Java Issues
```bash
# Check Java version
java -version

# Check JAVA_HOME
echo $JAVA_HOME

# Find Java installations
/usr/libexec/java_home -V

# Set JAVA_HOME manually
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
```

### Build Issues
```bash
# Clean and rebuild
./gradlew clean
./gradlew assembleDebug

# Check Gradle version
./gradlew --version

# Debug build
./gradlew assembleDebug --info
```

### Android Studio Issues
1. **Gradle Sync Failed:**
   - Check internet connection
   - Update Android Studio
   - Clear Gradle cache: `./gradlew clean`

2. **SDK Issues:**
   - Open SDK Manager in Android Studio
   - Install required SDK versions
   - Update build tools

3. **Emulator Issues:**
   - Create new AVD in AVD Manager
   - Use API 24+ (Android 7.0+)
   - Enable hardware acceleration

## Development

### Making Changes

**Web App Changes:**
1. Edit `app/src/main/assets/temple-finder/index.html`
2. Rebuild: `./gradlew assembleDebug`
3. Install: `./gradlew installDebug`

**Android App Changes:**
1. Edit Kotlin files in `app/src/main/java/`
2. Modify resources in `app/src/main/res/`
3. Update `AndroidManifest.xml` if needed
4. Rebuild and test

### Adding Features

**New Web Pages:**
1. Add HTML files to `assets/temple-finder/`
2. Update navigation in `TempleFinderActivity.kt`
3. Add routing logic if needed

**Native Features:**
1. Add permissions to `AndroidManifest.xml`
2. Implement in `TempleFinderActivity.kt`
3. Add UI components to `MainActivity.kt`

## Testing

### Device Testing
1. Enable Developer Options on Android device
2. Enable USB Debugging
3. Connect via USB
4. Run: `./gradlew installDebug`

### Emulator Testing
1. Open Android Studio
2. AVD Manager → Create Virtual Device
3. Choose API 24+ (Android 7.0+)
4. Start emulator and run app

## Deployment

### Debug APK
```bash
./gradlew assembleDebug
# APK: app/build/outputs/apk/debug/app-debug.apk
```

### Release APK
```bash
./gradlew assembleRelease
# APK: app/build/outputs/apk/release/app-release.apk
```

### Google Play Store
1. Generate signed APK/AAB
2. Upload to Google Play Console
3. Configure store listing
4. Submit for review

## Support

### Common Issues
- **Java not found:** Install JDK 11+ and set JAVA_HOME
- **Build failed:** Check dependencies and clean project
- **WebView not loading:** Verify asset file paths
- **Location not working:** Grant permissions on device

### Getting Help
1. Check Android Studio logs
2. Review Gradle build output
3. Test on multiple devices
4. Check Android documentation

---

**Temple Finder Android App** - Bringing Sacred Places to Mobile 🕉️
