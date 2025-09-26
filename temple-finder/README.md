# Temple Finder 🕉️

A comprehensive Progressive Web App (PWA) designed to help devotees discover and connect with temples across various locations through AI-powered search and detailed temple information.

## 🌟 Features

### Core Features
- **AI-Powered Temple Search**: Intelligent search functionality using natural language queries
- **Hierarchical Location Filtering**: Multi-level filtering by Country → State → City → Locality
- **Deity-Based Categorization**: Organized temple listings by categories (Ganpati, Shiva, Murugan, etc.)
- **Comprehensive Temple Profiles**: Detailed information including history, significance, architecture, and legends
- **Real-Time Crowd Tracking**: Live occupancy monitoring using temple capacity vs current visitors
- **Dynamic Timing Management**: Real-time pooja and darshan timings with holiday/festival schedule updates
- **User Reviews & Ratings**: Community-driven feedback system for temple experiences
- **Favorite Temples**: Personal collection of bookmarked temples
- **Visit Planning**: Calendar integration and visit scheduling features
- **Offline Access**: PWA capabilities for accessing saved temple information without internet

### Design Features
- **Traditional Indian Aesthetic**: Classic and culturally respectful design with traditional motifs
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **PWA Support**: App-like experience with offline functionality and push notifications
- **Accessibility**: High contrast design and keyboard navigation support

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **PWA**: Vite PWA Plugin
- **Build Tool**: Vite

## 📱 Screens & Navigation

### Main Screens
- **Home** (`/`): AI search, location selector, deity categories, featured temples
- **Search** (`/search`): Advanced search with filters, temple cards, map view
- **Temple Details** (`/temple/:id`): Comprehensive temple information, timings, reviews
- **Categories** (`/categories`): Browse temples by deity categories
- **Profile** (`/profile`): User account, favorites, settings
- **Favorites** (`/favorites`): Saved temples and visit planning
- **Nearby** (`/nearby`): Location-based temple discovery
- **Notifications** (`/notifications`): Temple updates and alerts
- **Auth** (`/auth`): Login and registration

### Admin Features
- **Admin Dashboard** (`/admin`): Temple management, capacity control, analytics

## 🎨 Design System

### Color Palette
- **Primary**: Deep Saffron (#FF9933) - Spirituality and devotion
- **Secondary**: Pure White (#FFFFFF) - Peace and purity  
- **Accent**: Sacred Red (#DC143C) - Important elements and CTAs

### Typography
- **Headings**: Poppins (clean, modern readability)
- **Body Text**: Inter (excellent readability across devices)

### Components
- Custom button styles (primary, secondary, outline)
- Card components with consistent styling
- Form inputs with validation states
- Navigation components (header, bottom nav)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd temple-finder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup
Create a `.env.local` file in the root directory:
```env
VITE_APP_TITLE=Temple Finder
VITE_APP_DESCRIPTION=Discover and connect with temples across various locations
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # Top navigation header
│   └── BottomNavigation.tsx  # Mobile bottom navigation
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── TempleContext.tsx # Temple data management
├── pages/              # Route components
│   ├── Home.tsx        # Landing page
│   ├── Search.tsx      # Search results
│   ├── TempleDetails.tsx # Individual temple page
│   ├── Categories.tsx  # Deity categories
│   ├── Profile.tsx     # User profile
│   ├── Favorites.tsx   # Saved temples
│   ├── Nearby.tsx      # Location-based search
│   ├── Auth.tsx        # Login/Register
│   ├── Notifications.tsx # User notifications
│   └── AdminDashboard.tsx # Admin interface
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type definitions
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🌐 PWA Features

- **Service Workers**: Offline functionality and caching
- **Web App Manifest**: App-like installation experience
- **Push Notifications**: Real-time temple updates
- **Responsive Design**: Works on all device sizes
- **Offline Support**: Access saved data without internet

## 🔮 Future Enhancements

### Planned Features
- **AI Integration**: OpenAI GPT-4o for intelligent search
- **Real-time Database**: Supabase for live data updates
- **Maps Integration**: Google Maps for directions and location services
- **Weather API**: OpenWeatherMap for visit planning
- **Payment Integration**: Razorpay/Stripe for donations
- **Push Notifications**: Firebase Cloud Messaging

### API Integrations
- OpenAI API for AI-powered search
- Google Maps API for location services
- OpenWeatherMap API for weather information
- Razorpay/Stripe API for donation processing
- Firebase Cloud Messaging for push notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Traditional Indian temple architecture for design inspiration
- Hindu religious symbols and motifs for cultural authenticity
- Open source community for excellent tools and libraries

## 📞 Support

For support, email support@templefinder.com or join our community discussions.

---

**Temple Finder** - Discover Sacred Places, Connect with Devotion 🕉️
