# Temple Finder - Demo Guide 🕉️

## Quick Start

1. **Install Dependencies & Run:**
   ```bash
   ./install-and-run.sh
   ```
   Or manually:
   ```bash
   npm install
   npm run dev
   ```

2. **Open in Browser:**
   - Navigate to `http://localhost:3000`
   - The app will load with a beautiful traditional Indian design

## App Features Demonstrated

### 🏠 Home Page (`/`)
- **Hero Section**: Gradient background with saffron and red colors
- **AI Search Bar**: Prominent search functionality
- **Quick Actions**: Nearby temples, deity categories, favorites, advanced search
- **Deity Categories**: Grid of deity categories with temple counts
- **Featured Temples**: Sample temple cards with ratings and crowd levels
- **Weather Widget**: Mock weather information for temple visits

### 🔍 Search Page (`/search`)
- **Advanced Filters**: Deity, rating, crowd level filters
- **Temple Cards**: Detailed temple information with images
- **Crowd Indicators**: Real-time crowd level visualization
- **Map View**: Placeholder for map integration
- **Sort Options**: Distance, rating, name sorting

### 🏛️ Temple Details (`/temple/:id`)
- **Comprehensive Information**: History, significance, architecture, legends
- **Pooja Timings**: Detailed timing schedules
- **Reviews & Ratings**: User feedback system
- **Contact Information**: Address, phone, website
- **Crowd Status**: Real-time occupancy tracking
- **Photo Gallery**: Temple images and visual content

### 🎭 Categories Page (`/categories`)
- **Deity Grid**: Browse temples by deity categories
- **Featured Temples**: Sample temples for each category
- **Search Within Categories**: Filter categories by name/description

### 👤 Profile Page (`/profile`)
- **User Information**: Name, email, member since date
- **Statistics**: Favorites, reviews, temples visited
- **Menu Items**: Favorites, notifications, settings, help, sign out

### ❤️ Favorites Page (`/favorites`)
- **Saved Temples**: Personal collection of bookmarked temples
- **Search Favorites**: Filter saved temples
- **Quick Actions**: View details, plan visits

### 📍 Nearby Page (`/nearby`)
- **Location Detection**: GPS-based temple discovery
- **Radius Selector**: Adjustable search radius
- **Distance Display**: Show distance to temples
- **Map Integration**: Placeholder for map view

### 🔔 Notifications Page (`/notifications`)
- **Notification Types**: Timing updates, crowd alerts, festivals
- **Filter Options**: All notifications, unread only
- **Temple Context**: Notifications linked to specific temples

### 🔐 Authentication (`/auth`)
- **Login/Signup Toggle**: Switch between login and registration
- **Form Validation**: Real-time validation with error messages
- **Traditional Design**: Culturally appropriate styling

### ⚙️ Admin Dashboard (`/admin`)
- **Overview Stats**: Total temples, active visitors, capacity usage
- **Temple Management**: Add, edit, delete temples
- **Analytics**: Visitor trends and peak hours (placeholders)
- **Capacity Control**: Real-time crowd management

## Design System

### 🎨 Colors
- **Primary**: Deep Saffron (#FF9933) - Spirituality and devotion
- **Secondary**: Sacred Red (#DC143C) - Important elements
- **Neutral**: Various grays for text and backgrounds

### 🔤 Typography
- **Headings**: Poppins font family
- **Body Text**: Inter font family
- **Cultural Elements**: Traditional Indian motifs and patterns

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **PWA Ready**: App-like experience with offline capabilities
- **Bottom Navigation**: Mobile-optimized navigation

## Technical Features

### ⚡ Performance
- **Vite Build System**: Fast development and production builds
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first styling with custom design system

### 🔄 State Management
- **React Context**: Global state for authentication and temple data
- **Mock Data**: Sample data for demonstration purposes
- **Real-time Updates**: Simulated real-time features

### 🌐 PWA Features
- **Service Workers**: Offline functionality
- **Web App Manifest**: Installable app experience
- **Push Notifications**: Ready for real-time updates

## Sample Data

The app includes mock data for:
- **2 Sample Temples**: Meenakshi Amman Temple, Tirumala Venkateswara Temple
- **5 Deity Categories**: Shiva, Vishnu, Ganpati, Murugan, Devi
- **Sample Reviews**: User feedback and ratings
- **Mock Notifications**: Various notification types
- **User Profiles**: Sample user data

## Next Steps for Production

1. **Backend Integration**: Connect to real database (Supabase/PostgreSQL)
2. **AI Integration**: Implement OpenAI GPT-4o for intelligent search
3. **Maps Integration**: Add Google Maps for directions and location services
4. **Real-time Features**: Implement WebSocket connections for live updates
5. **Payment Integration**: Add donation processing with Razorpay/Stripe
6. **Push Notifications**: Implement Firebase Cloud Messaging
7. **Image Upload**: Add photo upload functionality for temples and reviews
8. **Advanced Search**: Implement more sophisticated search algorithms

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

**Enjoy exploring the Temple Finder app! 🕉️**
