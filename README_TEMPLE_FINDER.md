# Temple Finder Android App 🕉️

A beautiful Android app that integrates the Temple Finder web application using WebView technology.

## 🚀 Quick Start

### Prerequisites
- Android Studio Arctic Fox or later
- Android SDK 24+ (Android 7.0)
- Kotlin 1.8+

### Installation & Build

1. **Open in Android Studio:**
   ```bash
   # Navigate to your project
   cd /Users/santhoshpremkumar/AndroidStudioProjects/Base
   
   # Open in Android Studio
   open -a "Android Studio" .
   ```

2. **Sync Project:**
   - Android Studio will automatically sync the project
   - Wait for Gradle sync to complete
   - Resolve any dependency issues if prompted

3. **Build the App:**
   - Click "Build" → "Make Project" (Ctrl+F9 / Cmd+F9)
   - Or use the build button in the toolbar

4. **Run the App:**
   - Connect an Android device or start an emulator
   - Click "Run" → "Run 'app'" (Shift+F10 / Ctrl+R)
   - Or click the green play button

## 📱 App Features

### Main Screen
- **Beautiful Launcher**: Traditional Indian design with saffron colors
- **App Icon**: Om symbol (🕉️) representing spirituality
- **Feature Overview**: Key features displayed with icons
- **Launch Button**: One-tap access to Temple Finder

### Temple Finder Web App
- **Responsive Design**: Optimized for mobile viewing
- **AI-Powered Search**: Natural language temple search
- **Location Services**: GPS-based temple discovery
- **Real-Time Features**: Crowd tracking and timing updates
- **Interactive Elements**: Clickable temple cards and search

### WebView Integration
- **Native Performance**: Smooth scrolling and interactions
- **Offline Support**: Local HTML file loading
- **External Links**: Phone, email, and web links open in native apps
- **Location Permissions**: Automatic location access for temple discovery
- **Back Navigation**: Android back button support

## 🏗️ Project Structure

```
app/
├── src/main/
│   ├── java/com/example/base/
│   │   ├── MainActivity.kt              # Launcher screen
│   │   ├── TempleFinderActivity.kt     # WebView container
│   │   └── WebServerHelper.kt          # Local server (optional)
│   ├── assets/temple-finder/
│   │   └── index.html                  # Temple Finder web app
│   ├── res/
│   │   ├── values/strings.xml          # App name and strings
│   │   └── mipmap/                     # App icons
│   └── AndroidManifest.xml             # Permissions and activities
├── build.gradle.kts                    # Dependencies and build config
└── README_TEMPLE_FINDER.md            # This file
```

## 🔧 Technical Details

### Dependencies Added
- `androidx.webkit:webkit:1.8.0` - Modern WebView features
- `com.squareup.okhttp3:okhttp:4.12.0` - HTTP client
- `com.google.code.gson:gson:2.10.1` - JSON parsing

### Permissions
- `INTERNET` - Web content loading
- `ACCESS_NETWORK_STATE` - Network status checking
- `ACCESS_FINE_LOCATION` - GPS for temple discovery
- `ACCESS_COARSE_LOCATION` - Network-based location

### WebView Features
- JavaScript enabled for interactive features
- DOM storage for local data
- Zoom controls for better readability
- Mixed content support for external resources
- Geolocation permissions for location services

## 🎨 Design System

### Colors
- **Primary**: Deep Saffron (#FF9933) - Spirituality and devotion
- **Secondary**: Sacred Red (#DC143C) - Important elements
- **Background**: Gradient from orange to red tones

### Typography
- **Headings**: Poppins font family
- **Body Text**: Inter font family
- **Cultural Elements**: Traditional Indian motifs

### Layout
- **Material Design 3**: Modern Android design principles
- **Responsive**: Adapts to different screen sizes
- **Accessibility**: High contrast and readable fonts

## 🔄 Development Workflow

### Making Changes

1. **Web App Changes:**
   - Edit `/app/src/main/assets/temple-finder/index.html`
   - Rebuild and run the app
   - Changes appear immediately

2. **Android App Changes:**
   - Modify Kotlin files in `src/main/java/`
   - Update resources in `src/main/res/`
   - Sync and rebuild

3. **Adding New Features:**
   - Add new HTML pages to `assets/temple-finder/`
   - Update WebView navigation in `TempleFinderActivity.kt`
   - Add new permissions to `AndroidManifest.xml` if needed

### Testing

1. **Device Testing:**
   - Test on physical Android devices
   - Check different screen sizes and orientations
   - Verify location permissions and GPS functionality

2. **Emulator Testing:**
   - Use Android Studio emulator
   - Test different Android versions (API 24+)
   - Simulate different network conditions

## 🚀 Deployment

### Debug Build
```bash
./gradlew assembleDebug
# APK location: app/build/outputs/apk/debug/app-debug.apk
```

### Release Build
```bash
./gradlew assembleRelease
# APK location: app/build/outputs/apk/release/app-release.apk
```

### Google Play Store
1. Generate signed APK/AAB
2. Upload to Google Play Console
3. Configure store listing with screenshots
4. Submit for review

## 🔮 Future Enhancements

### Planned Features
- **Full React App Integration**: Replace HTML with built React app
- **Native Features**: Camera integration for photo uploads
- **Push Notifications**: Real-time temple updates
- **Offline Database**: Local temple data storage
- **Maps Integration**: Native Google Maps integration

### Advanced Integration
- **Hybrid App**: Mix of native and web components
- **PWA Features**: Service worker integration
- **Real-time Updates**: WebSocket connections
- **Payment Integration**: In-app donations

## 🐛 Troubleshooting

### Common Issues

1. **WebView Not Loading:**
   - Check internet connection
   - Verify asset file path
   - Check WebView settings

2. **Location Not Working:**
   - Grant location permissions
   - Check device GPS settings
   - Test on physical device

3. **Build Errors:**
   - Clean and rebuild project
   - Check Gradle sync
   - Verify dependency versions

4. **Performance Issues:**
   - Enable hardware acceleration
   - Optimize WebView settings
   - Check memory usage

### Debug Tips
- Use Chrome DevTools for WebView debugging
- Check Android logs in Android Studio
- Test on multiple devices and Android versions
- Verify all permissions are granted

## 📞 Support

For issues or questions:
1. Check this README first
2. Review Android Studio logs
3. Test on different devices
4. Check WebView compatibility

---

**Temple Finder Android App** - Bringing Sacred Places to Your Mobile Device 🕉️
