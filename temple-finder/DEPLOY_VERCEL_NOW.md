# 🚀 Deploy to Vercel - Step by Step

## ✅ Code is Already on GitHub!

Your code is pushed to: `https://github.com/santirio18-cmyk/Temple-Finder`

---

## 🌐 Deploy via Vercel Dashboard (Recommended)

### Step 1: Go to Vercel
1. Open [vercel.com](https://vercel.com)
2. Sign in (or sign up with GitHub)

### Step 2: Import Project
1. Click **"Add New Project"** or **"Import Project"**
2. Find your repository: **`santirio18-cmyk/Temple-Finder`**
3. Click **"Import"**

### Step 3: Configure Settings ⚠️ IMPORTANT

**Root Directory:**
- Click **"Edit"** next to Root Directory
- Enter: `temple-finder`
- Click **"Continue"**

**Build Settings (should auto-detect):**
- Framework Preset: `Vite` ✅
- Build Command: `npm run build` ✅
- Output Directory: `dist` ✅
- Install Command: `npm install` ✅

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 1-2 minutes
3. Your app will be live! 🎉

---

## 📋 Quick Checklist

Before deploying, verify:
- [x] Code is pushed to GitHub ✅
- [x] Root Directory = `temple-finder` ⚠️ **CRITICAL**
- [x] Build Command = `npm run build`
- [x] Output Directory = `dist`
- [x] Framework = Vite

---

## 🔧 Alternative: Deploy via CLI

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to temple-finder
cd temple-finder

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No (first time)
# - Project name? temple-finder
# - Directory? ./temple-finder (or just .)
# - Override settings? No
```

---

## 🌍 After Deployment

Once deployed, you'll get:
- **Production URL**: `https://temple-finder-xxx.vercel.app`
- **Automatic deployments** on every push to `main`
- **Preview deployments** for pull requests

---

## 🔍 Verify Deployment

After deployment:
1. Visit your Vercel URL
2. Check that all pages work:
   - `/` - Home page
   - `/search` - Search page
   - `/temple/1` - Temple details
   - `/nearby` - Nearby temples
   - `/categories` - Categories

---

## 🐛 Troubleshooting

### If you get 404:
- ✅ Check Root Directory is set to `temple-finder`
- ✅ Verify `vercel.json` exists
- ✅ Check build logs in Vercel dashboard

### If build fails:
- ✅ Check build logs for errors
- ✅ Verify `package.json` has correct scripts
- ✅ Ensure all dependencies are in `package.json`

---

## 📝 Environment Variables (Optional)

Currently, no environment variables are needed. If you add Google Maps later:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `VITE_GOOGLE_MAPS_API_KEY` = `your-api-key`

---

**Your app is ready to deploy! Follow the steps above.** 🚀
