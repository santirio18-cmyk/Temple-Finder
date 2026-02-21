#!/bin/bash

echo "🚀 Setting up Temple Finder Mobile App..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ is required. Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo -e "${YELLOW}⚠️  Expo CLI is not installed. Installing...${NC}"
    npm install -g @expo/cli
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install Expo CLI${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Expo CLI is available${NC}"

# Navigate to mobile app directory
cd temple-finder-mobile

# Install dependencies
echo -e "${BLUE}📦 Installing mobile app dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependencies installed successfully${NC}"

# Create app.json configuration
echo -e "${BLUE}📝 Creating app configuration...${NC}"
cat > app.json << EOF
{
  "expo": {
    "name": "Temple Finder",
    "slug": "temple-finder",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FF6B35"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.templefinder.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FF6B35"
      },
      "package": "com.templefinder.app",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-location",
      "expo-camera",
      "expo-notifications"
    ]
  }
}
EOF

echo -e "${GREEN}✅ App configuration created${NC}"

# Create basic assets directory
mkdir -p assets
echo -e "${GREEN}✅ Assets directory created${NC}"

# Create metro.config.js
echo -e "${BLUE}📝 Creating Metro configuration...${NC}"
cat > metro.config.js << EOF
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
EOF

echo -e "${GREEN}✅ Metro configuration created${NC}"

# Create babel.config.js
echo -e "${BLUE}📝 Creating Babel configuration...${NC}"
cat > babel.config.js << EOF
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
EOF

echo -e "${GREEN}✅ Babel configuration created${NC}"

# Create README.md
echo -e "${BLUE}📝 Creating README...${NC}"
cat > README.md << EOF
# Temple Finder Mobile App

A professional temple discovery app built with React Native and Expo.

## Features

- 🏛️ Discover 1000+ temples across India
- 📍 Find nearby temples with location-based search
- 🔍 Advanced search and filtering
- ⭐ Rate and review temples
- ❤️ Save favorite temples
- 📱 Beautiful, modern UI/UX
- 🌐 Offline support

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

3. Run on device:
   - Android: \`npm run android\`
   - iOS: \`npm run ios\`
   - Web: \`npm run web\`

## Building for Production

### Android

1. Build APK:
   \`\`\`bash
   eas build --platform android
   \`\`\`

2. Submit to Play Store:
   \`\`\`bash
   eas submit --platform android
   \`\`\`

### iOS

1. Build for App Store:
   \`\`\`bash
   eas build --platform ios
   \`\`\`

2. Submit to App Store:
   \`\`\`bash
   eas submit --platform ios
   \`\`\`

## Project Structure

\`\`\`
src/
├── components/          # Reusable components
├── screens/            # App screens
├── context/            # React Context providers
├── services/           # API services
├── styles/             # Styles and themes
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
\`\`\`

## API Integration

The app connects to the Temple Finder backend API:

- Base URL: \`http://localhost:3000/api/v1\`
- Authentication: JWT tokens
- Real-time updates via WebSocket

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
EOF

echo -e "${GREEN}✅ README created${NC}"

# Create .gitignore
echo -e "${BLUE}📝 Creating .gitignore...${NC}"
cat > .gitignore << EOF
# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
*.hprof
.cxx/

# node.js
#
node_modules/
npm-debug.log
yarn-error.log

# BUCK
buck-out/
\.buckd/
*.keystore
!debug.keystore

# Bundle artifacts
*.jsbundle

# CocoaPods
/ios/Pods/

# Expo
.expo/
dist/
web-build/

# Temporary files created by Metro
.metro-health-check*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# EAS
.easignore
EOF

echo -e "${GREEN}✅ .gitignore created${NC}"

# Test the setup
echo -e "${BLUE}🧪 Testing the setup...${NC}"
npx expo doctor

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Setup completed successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  Setup completed with warnings${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Mobile App Setup Complete!${NC}"
echo "=========================================="
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Start the development server: npm start"
echo "2. Install Expo Go app on your phone"
echo "3. Scan the QR code to test the app"
echo "4. Connect to the backend API"
echo ""
echo -e "${BLUE}🔗 Important Commands:${NC}"
echo "• Start development: npm start"
echo "• Run on Android: npm run android"
echo "• Run on iOS: npm run ios"
echo "• Build for production: eas build"
echo ""
echo -e "${BLUE}📱 Testing:${NC}"
echo "• Install Expo Go from Play Store/App Store"
echo "• Scan QR code from terminal"
echo "• Test all features on your device"
echo ""
echo -e "${BLUE}🔧 Configuration:${NC}"
echo "• App config: app.json"
echo "• Metro config: metro.config.js"
echo "• Babel config: babel.config.js"
echo ""
echo -e "${GREEN}✅ Ready for mobile app development!${NC}"




