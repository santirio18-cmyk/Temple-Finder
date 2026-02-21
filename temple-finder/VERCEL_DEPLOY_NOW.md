# 🚀 Deploy to Vercel - Quick Steps

Your code is now on GitHub! Deploy to Vercel in 3 steps:

## ✅ Step 1: Go to Vercel

1. Visit: https://vercel.com
2. Sign in with your **GitHub account** (same account: santirio18-cmyk)

## ✅ Step 2: Import Repository

1. Click **"Add New Project"** or **"Import Project"**
2. Find and select: **`santirio18-cmyk/Temple-Finder`**
3. Click **"Import"**

## ✅ Step 3: Configure Project

### Important Settings:

1. **Root Directory**: 
   - Click **"Edit"** next to Root Directory
   - Set to: `temple-finder`
   - This tells Vercel where your app is located

2. **Framework Preset**: 
   - Should auto-detect as **Vite**
   - If not, select **Vite**

3. **Build Settings** (should auto-fill):
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables** (Click "Environment Variables"):
   Add these:
   ```
   VITE_GOOGLE_MAPS_API_KEY = AIzaSyCr3No3TWC7-9MC63ZO7rcbSeljyFgfNkU
   ```
   (Add other variables if you have them)

5. Click **"Deploy"**

## ⏱️ Wait 1-2 Minutes

Vercel will:
- Install dependencies
- Build your app
- Deploy it

## 🎉 Success!

Your app will be live at:
- **Production URL**: `https://temple-finder.vercel.app` (or similar)
- Check the Vercel dashboard for your exact URL

## 🔄 Automatic Deployments

- Every push to `main` → Auto-deploys
- Pull Requests → Preview deployments
- Other branches → Preview deployments

## 📝 Next Steps After Deployment

1. **Test your app** at the Vercel URL
2. **Update Google Maps API restrictions**:
   - Go to Google Cloud Console
   - Add your Vercel domain to allowed domains
   - Example: `*.vercel.app` or your custom domain

3. **Share your app** with others! 🎊

---

**Need help?** Check `DEPLOY_TO_VERCEL.md` for detailed instructions.
