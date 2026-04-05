# 🕉️ Temple Finder

A modern web application to discover and explore temples near you, built with React, TypeScript, and Vite.

## ✨ Features

- 🗺️ **Interactive Maps** - Google Maps integration with temple locations
- 📍 **Nearby Temples** - Find temples within your search radius
- 🔍 **Smart Search** - Search by deity, location, or name
- ⭐ **Temple Details** - Comprehensive information about each temple
- 🎯 **Deity Categories** - Explore temples by deity with mantras
- 📱 **PWA Support** - Install as a Progressive Web App
- 🌐 **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deployment to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Set **Root Directory** to: `temple-finder` (if repo contains parent folder)
   - Add environment variables (see below)
   - Click "Deploy"

3. **Environment Variables** (Add in Vercel Dashboard):
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📁 Project Structure

```
temple-finder/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── contexts/       # React contexts
│   ├── services/       # API and service layers
│   ├── types/          # TypeScript types
│   └── SimpleApp.tsx   # Main app router
├── public/             # Static assets
├── dist/               # Build output (generated)
└── package.json
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### Google Maps API Setup

1. Create an API key in [Google Cloud Console](https://console.cloud.google.com) (Credentials).
2. Enable at least:
   - **Maps JavaScript API** (maps on Home / Nearby / Temple)
   - **Places API** (live “Nearby” Hindu temples from Google; without it, the app falls back to the built-in sample list)
3. Optional: Directions API, Geocoding API (for future features).
4. Restrict the key by **HTTP referrer** (your Vercel domain + `localhost` for dev).
5. Add `VITE_GOOGLE_MAPS_API_KEY` to `.env.local` and Vercel.

### Panchang accuracy

Daily tithi, nakshatra, yoga, paksha, sunrise/sunset, and muhurtas are computed in the browser with the `mhah-panchang` library (astronomical algorithms). Regional almanacs (Tamil / Drik) may differ slightly; Tamil month labels are approximate mappings from the computed lunar month.

**Daily mantra line:** The library groups the 27 nakshatras into three large “Trinity” buckets (9 days each per cycle), so using Trinity alone often repeats the same suggestion. The app instead picks a **per-nakshatra** mantra line so the guidance changes every day.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Maps**: Google Maps API
- **Database**: Supabase (optional)
- **PWA**: Vite PWA Plugin

## 📄 License

MIT License

## 🙏 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for the spiritual community**
