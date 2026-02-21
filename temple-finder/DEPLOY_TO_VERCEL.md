# Deploy Temple Finder to Vercel via GitHub

This guide will help you deploy your Temple Finder app to Vercel through GitHub.

## 📋 Prerequisites

1. **GitHub Account** - You need a GitHub account
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free)
3. **Git Installed** - Make sure Git is installed on your machine

## 🚀 Step-by-Step Deployment

### Step 1: Initialize Git Repository (if not already done)

```bash
cd /Users/santhoshpremkumar/AndroidStudioProjects/Base/temple-finder
git init
```

### Step 2: Create .gitignore (if needed)

Make sure `.gitignore` includes:
```
node_modules/
dist/
.env.local
.env*.local
.DS_Store
*.log
```

### Step 3: Commit Your Code

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Temple Finder app"

# Or if you want to commit only the temple-finder folder
cd /Users/santhoshpremkumar/AndroidStudioProjects/Base
git add temple-finder/
git commit -m "Add Temple Finder app"
```

### Step 4: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `temple-finder` (or your preferred name)
4. Description: "Temple Finder - Discover temples near you"
5. Choose **Public** (or Private if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

### Step 5: Push to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/temple-finder.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 6: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository:
   - Click **"Import Git Repository"**
   - Select your `temple-finder` repository
   - Click **"Import"**
4. Configure Project:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `temple-finder` (if repo is at root) or leave blank if temple-finder is the repo
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)
5. **Environment Variables**:
   - Click **"Environment Variables"**
   - Add your variables:
     ```
     VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_key
     ```
   - Click **"Add"** for each variable
6. Click **"Deploy"**
7. Wait for deployment (usually 1-2 minutes)
8. Your app will be live at: `https://temple-finder.vercel.app` (or your custom domain)

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd temple-finder
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: temple-finder
# - Directory: ./
# - Override settings? No
```

### Step 7: Set Environment Variables in Vercel

1. Go to your project on Vercel dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `VITE_GOOGLE_MAPS_API_KEY` | Your Google Maps API key | Production, Preview, Development |
| `VITE_SUPABASE_URL` | Your Supabase URL | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |

4. Click **"Save"**
5. **Redeploy** your project for changes to take effect

## 🔄 Automatic Deployments

Once connected to GitHub:
- **Every push to `main` branch** → Deploys to production
- **Pull Requests** → Creates preview deployments
- **Other branches** → Creates preview deployments

## 📝 Important Notes

### 1. Root Directory Configuration

If your GitHub repo contains the entire `Base` project:
- In Vercel settings, set **Root Directory** to: `temple-finder`
- This tells Vercel where your app is located

### 2. Build Settings

Vercel should auto-detect Vite, but verify:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Environment Variables

**Never commit** `.env.local` to GitHub! Instead:
- Add environment variables in Vercel dashboard
- They will be available during build and runtime

### 4. API Keys Security

- ✅ Add API keys in Vercel dashboard (secure)
- ❌ Don't commit API keys to GitHub
- ✅ Use environment variables

## 🎯 Quick Deploy Script

Create a file `deploy.sh`:

```bash
#!/bin/bash
cd /Users/santhoshpremkumar/AndroidStudioProjects/Base/temple-finder

# Build locally to check for errors
echo "Building..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "Pushing to GitHub..."
    git add .
    git commit -m "Update: $(date +%Y-%m-%d)"
    git push origin main
    echo "✅ Pushed to GitHub. Vercel will auto-deploy!"
else
    echo "❌ Build failed. Fix errors before deploying."
    exit 1
fi
```

Make it executable:
```bash
chmod +x deploy.sh
```

## 🐛 Troubleshooting

### Build Fails

1. Check Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version (Vercel uses Node 18.x by default)

### Environment Variables Not Working

1. Make sure variable names start with `VITE_`
2. Redeploy after adding variables
3. Check variable names match exactly

### 404 Errors on Routes

- The `vercel.json` includes rewrites for SPA routing
- Should work automatically

### Google Maps Not Loading

1. Add your domain to Google Cloud Console API restrictions
2. Add `*.vercel.app` to allowed domains
3. Or use your custom domain

## 🌐 Custom Domain (Optional)

1. Go to Vercel project → **Settings** → **Domains**
2. Add your domain: `templefinder.yourdomain.com`
3. Follow DNS configuration instructions
4. Update Google Maps API restrictions to include your domain

## 📊 Monitoring

- **Vercel Dashboard**: View deployments, logs, analytics
- **GitHub Actions**: (Optional) Set up CI/CD workflows
- **Analytics**: Enable Vercel Analytics for insights

## ✅ Checklist

- [ ] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables added
- [ ] Build successful
- [ ] App accessible at Vercel URL
- [ ] Google Maps working
- [ ] All features tested

## 🎉 Success!

Once deployed, your app will be live at:
- **Production**: `https://temple-finder.vercel.app`
- **Preview**: `https://temple-finder-git-branch.vercel.app`

Share the link with others! 🚀

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html#vercel
