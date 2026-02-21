# 🕉️ Temple Finder - Simple Web App

A clean, simple web application to discover temples. Built with React, TypeScript, and Vite.

## ✨ Features

- 🏠 **Home Page** - Browse temples, search, explore by deity
- 🔍 **Search** - Find temples by name, deity, or location
- 🏛️ **Temple Details** - View comprehensive temple information
- 📍 **Nearby Temples** - Find temples near your location
- 🎭 **Deity Categories** - Explore temples by deity

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
temple-finder/
├── src/
│   ├── data.ts              # All temple data + helper functions
│   ├── SimpleApp.tsx        # Main app router
│   ├── main.tsx             # Entry point
│   └── pages/
│       ├── SimpleHome.tsx      # Home page
│       ├── SimpleSearch.tsx    # Search page
│       ├── SimpleTemple.tsx    # Temple details
│       ├── SimpleNearby.tsx    # Nearby temples
│       └── SimpleCategories.tsx # Deity categories
├── public/                  # Static assets
├── dist/                    # Build output (generated)
└── vercel.json              # Vercel deployment config
```

## 🌐 Deploy to Vercel

### Option 1: Via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy simple web app"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - **Important:** Set **Root Directory** to: `temple-finder`
   - Click "Deploy"

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd temple-finder
vercel
```

## 📝 Adding More Temples

Edit `src/data.ts`:

```typescript
export const temples: Temple[] = [
  // Add your temple here
  {
    id: '11',
    name: 'Temple Name',
    deity: 'Shiva',
    description: 'Description',
    address: 'Address',
    city: 'City',
    state: 'State',
    latitude: 13.0827,
    longitude: 80.2707,
    rating: 4.5
  },
  // ... more temples
]
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` or use inline Tailwind classes.

### Styling
All pages use Tailwind CSS. Modify classes directly in components.

### Data
All data is in `src/data.ts` - easy to modify!

## 🔧 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "lucide-react": "^0.294.0"
}
```

## ✅ What's Simple

- ✅ **No contexts** - Just React state
- ✅ **No services** - Direct data access
- ✅ **Single data file** - Easy to manage
- ✅ **Clean code** - Easy to understand
- ✅ **Fast build** - No complex dependencies

## 🚀 Deployment Checklist

- [x] Build succeeds (`npm run build`)
- [x] Root Directory set to `temple-finder` in Vercel
- [x] Environment variables set (if needed)
- [x] GitHub repo connected

## 📱 Mobile Responsive

The app is fully responsive and works on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop
- 🖥️ Large screens

## 🎯 Next Steps

1. Add more temples to `src/data.ts`
2. Customize colors and styling
3. Add Google Maps integration (optional)
4. Deploy to Vercel

---

**Simple, clean, and ready to deploy!** 🚀
