# Fix Vercel 404 Error

## 🔍 Common Causes of 404 Error

The 404 error usually happens because Vercel can't find your app. Here's how to fix it:

## ✅ Solution 1: Set Root Directory (Most Common Fix)

Since your GitHub repo contains the entire `Base` project, but your app is in the `temple-finder` subfolder:

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"General"**
3. Scroll to **"Root Directory"**
4. Click **"Edit"**
5. Set to: `temple-finder`
6. Click **"Save"**
7. Go to **"Deployments"** tab
8. Click **"Redeploy"** on the latest deployment

## ✅ Solution 2: Check Build Logs

1. Go to Vercel dashboard → Your project
2. Click on the failed deployment
3. Check **"Build Logs"** for errors
4. Common issues:
   - Missing dependencies
   - Build command failing
   - TypeScript errors

## ✅ Solution 3: Verify vercel.json

Make sure `vercel.json` is in the `temple-finder` folder (it should be).

## ✅ Solution 4: Check File Structure

Your GitHub repo structure should be:
```
Temple-Finder/
├── temple-finder/
│   ├── vercel.json ✅
│   ├── package.json ✅
│   ├── src/ ✅
│   └── ...
└── (other files)
```

## 🚀 Quick Fix Steps

### Step 1: Update Vercel Settings

1. **Vercel Dashboard** → Your Project → **Settings**
2. **Root Directory**: Set to `temple-finder`
3. **Build Command**: `npm run build` (should auto-detect)
4. **Output Directory**: `dist` (should auto-detect)
5. **Install Command**: `npm install` (should auto-detect)

### Step 2: Add Environment Variables

1. **Settings** → **Environment Variables**
2. Add:
   ```
   VITE_GOOGLE_MAPS_API_KEY = AIzaSyCr3No3TWC7-9MC63ZO7rcbSeljyFgfNkU
   ```
3. Select: **Production**, **Preview**, **Development**
4. Click **"Save"**

### Step 3: Redeploy

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for build to complete

## 🔧 Alternative: Deploy Only temple-finder Folder

If the above doesn't work, you can create a separate GitHub repo just for the temple-finder folder:

```bash
cd /Users/santhoshpremkumar/AndroidStudioProjects/Base/temple-finder

# Initialize new repo
git init
git add .
git commit -m "Initial commit"

# Create new GitHub repo and push
git remote add origin https://github.com/santirio18-cmyk/temple-finder-app.git
git push -u origin main
```

Then import this new repo to Vercel (no root directory needed).

## 📋 Checklist

- [ ] Root Directory set to `temple-finder` in Vercel
- [ ] Environment variables added
- [ ] Build logs checked (no errors)
- [ ] Redeployed after settings change
- [ ] Verified `vercel.json` exists in `temple-finder` folder

## 🐛 Still Getting 404?

1. **Check Build Logs**: Look for errors in the deployment logs
2. **Verify Path**: Make sure you're accessing the correct Vercel URL
3. **Check vercel.json**: Ensure rewrites are configured correctly
4. **Contact Support**: Use the error ID from the 404 page

## 💡 Pro Tip

After setting Root Directory, always **Redeploy** for changes to take effect!
