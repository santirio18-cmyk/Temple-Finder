# 🚨 Fix Vercel 404 Error - Step by Step

## Error Details
- **Error**: `404: NOT_FOUND`
- **Code**: `NOT_FOUND`
- **ID**: `bom1::mwszp-1771693198534-0e5f03fe41ff`

## ✅ Step-by-Step Fix

### Step 1: Verify Root Directory in Vercel

1. **Go to**: [Vercel Dashboard](https://vercel.com/dashboard)
2. **Click** on your project: `Temple-Finder` (or whatever you named it)
3. **Click**: **Settings** (gear icon in top nav)
4. **Click**: **General** (left sidebar)
5. **Scroll down** to **"Root Directory"** section
6. **Click**: **Edit** button next to "Root Directory"
7. **Enter**: `temple-finder` (exactly this, no leading slash)
8. **Click**: **Save**

### Step 2: Verify Build Settings

In the same **Settings → General** page, verify:

| Setting | Should Be |
|---------|-----------|
| **Framework Preset** | `Vite` (auto-detected) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node.js Version** | `18.x` (default) |

### Step 3: Add Environment Variable

1. **In Settings**, click **Environment Variables** (left sidebar)
2. **Click**: **Add New**
3. **Key**: `VITE_GOOGLE_MAPS_API_KEY`
4. **Value**: `AIzaSyCr3No3TWC7-9MC63ZO7rcbSeljyFgfNkU`
5. **Environments**: Select all (Production, Preview, Development)
6. **Click**: **Save**

### Step 4: Redeploy

1. **Go to**: **Deployments** tab (top nav)
2. **Find** the latest deployment
3. **Click**: **...** (three dots menu)
4. **Click**: **Redeploy**
5. **Wait** 1-2 minutes for build to complete

### Step 5: Verify Deployment

After redeploy:
1. **Click** on the deployment
2. **Check** the build logs:
   - ✅ Should see: "Installing dependencies"
   - ✅ Should see: "Running npm run build"
   - ✅ Should see: "Build completed"
   - ✅ Should see: "Output: dist/"

3. **Click** the deployment URL (e.g., `temple-finder-xxx.vercel.app`)
4. **Should see**: Your app homepage (not 404)

---

## 🔍 If Still Getting 404

### Check Build Logs

1. **Go to**: Deployments → Latest deployment
2. **Click**: **Build Logs** tab
3. **Look for errors**:
   - ❌ "Could not find a production build"
   - ❌ "File not found"
   - ❌ "Build failed"

### Common Issues & Fixes

#### Issue 1: Root Directory Not Saved
**Symptom**: Still seeing 404 after setting Root Directory
**Fix**: 
- Make sure you clicked **Save** after editing
- Refresh the page and verify Root Directory still shows `temple-finder`
- Redeploy

#### Issue 2: Build Failing
**Symptom**: Build logs show errors
**Fix**:
- Check if `package.json` exists in `temple-finder/` folder
- Verify Node.js version (should be 18.x or 20.x)
- Check for TypeScript errors

#### Issue 3: Wrong Output Directory
**Symptom**: Build succeeds but 404 persists
**Fix**:
- Verify Output Directory is exactly `dist` (not `dist/` or `./dist`)
- Check build logs to see where files are being output

#### Issue 4: GitHub Repo Structure
**Symptom**: Vercel can't find the project
**Fix**:
- Verify your GitHub repo has this structure:
  ```
  Temple-Finder/
  └── temple-finder/
      ├── package.json
      ├── vite.config.ts
      ├── src/
      └── ...
  ```

---

## 🎯 Quick Checklist

Before redeploying, verify:

- [ ] Root Directory = `temple-finder` ✅
- [ ] Build Command = `npm run build` ✅
- [ ] Output Directory = `dist` ✅
- [ ] Environment Variable `VITE_GOOGLE_MAPS_API_KEY` is set ✅
- [ ] GitHub repo is connected ✅
- [ ] Latest code is pushed to GitHub ✅

---

## 📞 Still Not Working?

If you've done all the above and still get 404:

1. **Share** your Vercel build logs (copy/paste the full log)
2. **Share** a screenshot of your Settings → General page
3. **Verify** your GitHub repo URL is correct in Vercel

---

**Most Common Fix**: Setting Root Directory to `temple-finder` fixes 90% of 404 errors! 🎯
