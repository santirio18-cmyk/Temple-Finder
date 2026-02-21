# ✅ Vercel Build Settings Verification

## 📋 Correct Settings for Your Project

Use these exact settings in your Vercel project:

### 🔧 Build & Development Settings

| Setting | Value | Notes |
|---------|-------|-------|
| **Framework Preset** | `Vite` | Auto-detected |
| **Root Directory** | `temple-finder` | ⚠️ **CRITICAL** - Must be set! |
| **Build Command** | `npm run build` | Runs: `tsc && vite build` |
| **Output Directory** | `dist` | Vite outputs to `dist/` |
| **Install Command** | `npm install` | Default npm install |
| **Node.js Version** | `18.x` or `20.x` | Vercel default (18.x) |

### ✅ Verification Checklist

#### 1. Root Directory ✅
```
✅ Set to: temple-finder
❌ NOT: . (root)
❌ NOT: /temple-finder
```

#### 2. Build Command ✅
```
✅ npm run build
```
This runs:
- `tsc` (TypeScript compilation)
- `vite build` (Vite production build)

#### 3. Output Directory ✅
```
✅ dist
```
Vite creates these files in `dist/`:
- `index.html`
- `assets/index-*.js`
- `assets/index-*.css`
- `sw.js` (Service Worker)
- `manifest.webmanifest`

#### 4. Framework Detection ✅
```
✅ Vite (should auto-detect)
```

### 🌍 Environment Variables

Add these in **Vercel Dashboard → Settings → Environment Variables**:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `VITE_GOOGLE_MAPS_API_KEY` | `AIzaSyCr3No3TWC7-9MC63ZO7rcbSeljyFgfNkU` | Production, Preview, Development |

### 📁 Project Structure

Your GitHub repo structure:
```
Temple-Finder/
├── temple-finder/          ← Root Directory should point here
│   ├── vercel.json         ✅
│   ├── package.json        ✅
│   ├── vite.config.ts      ✅
│   ├── src/                ✅
│   ├── public/             ✅
│   └── dist/               ✅ (generated on build)
└── (other files)
```

### ✅ Local Build Test

Your local build is **working** ✅:
```
✓ Built in 3.09s
✓ dist/index.html created
✓ dist/assets/ files created
✓ Service worker generated
```

### 🔍 How to Verify in Vercel

1. **Go to**: Vercel Dashboard → Your Project → **Settings** → **General**

2. **Check these fields**:
   - ✅ Root Directory: `temple-finder`
   - ✅ Framework Preset: `Vite`
   - ✅ Build Command: `npm run build`
   - ✅ Output Directory: `dist`
   - ✅ Install Command: `npm install`

3. **If any are wrong**:
   - Click **"Edit"**
   - Update the value
   - Click **"Save"**
   - **Redeploy** (Deployments → ... → Redeploy)

### 🚨 Common Mistakes

❌ **Wrong**: Root Directory = `.` (root)
✅ **Correct**: Root Directory = `temple-finder`

❌ **Wrong**: Output Directory = `build`
✅ **Correct**: Output Directory = `dist`

❌ **Wrong**: Build Command = `npm run build --prefix temple-finder`
✅ **Correct**: Build Command = `npm run build` (when Root Directory is set)

### 📊 Expected Build Output

After successful build, Vercel should show:
```
✓ Installing dependencies
✓ Running "npm run build"
✓ Build completed
✓ Output: dist/
```

### 🎯 Quick Fix Command

If settings are wrong, update them in Vercel Dashboard:
1. Settings → General
2. Edit Root Directory → Set to `temple-finder`
3. Save
4. Redeploy

---

**Your build is working locally ✅ - Vercel should work with these settings!**
