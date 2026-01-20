# Vercel Deployment Guide for Padma Navigation Frontend

This guide will walk you through deploying your Next.js frontend to Vercel.

## ✅ Pre-Deployment Checklist

- [x] Build successful (`npm run build` completed)
- [x] TypeScript errors fixed
- [x] All dependencies installed
- [x] Code pushed to GitHub

---

## 🚀 Quick Deployment Steps

### Step 1: Sign Up / Sign In to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. **Sign in with GitHub** (recommended - easiest way)

### Step 2: Import Your Repository

1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Find and select your repository: `km-naimul/padma-navigation`
4. Click **"Import"**

### Step 3: Configure Project Settings

Vercel will auto-detect Next.js, but verify these settings:

**Project Settings:**
- **Project Name**: `padma-navigation-frontend` (or your choice)
- **Framework Preset**: `Next.js` (auto-detected)
- **Root Directory**: `frontend` ⚠️ **IMPORTANT!**
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

**Environment Variables:**
Click **"Environment Variables"** and add:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

**Important Notes:**
- Replace `your-backend-url.onrender.com` with your actual Render backend URL
- If backend is not deployed yet, you can add this later and redeploy
- All `NEXT_PUBLIC_*` variables are exposed to the browser

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-5 minutes for the first deployment
3. Watch the build logs for any errors

### Step 5: Get Your Frontend URL

After deployment completes, you'll get a URL like:
```
https://padma-navigation-frontend.vercel.app
```

---

## 🔧 Configuration Details

### Root Directory

**Critical**: Set Root Directory to `frontend`

This tells Vercel where your Next.js app is located since your repo has both `frontend/` and `backend/` folders.

### Build Settings

Vercel auto-detects these, but they should be:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Environment Variables

Required environment variable:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

**To add environment variables:**
1. Go to Project Settings → Environment Variables
2. Add variable name and value
3. Select environments (Production, Preview, Development)
4. Redeploy if needed

---

## 🔄 Updating Deployment

Vercel automatically redeploys when you push to GitHub:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. Vercel detects the push and redeploys automatically
4. Check deployment status in Vercel dashboard

---

## 🌍 Custom Domain (Optional)

To add a custom domain:

1. Go to Project Settings → Domains
2. Add your domain (e.g., `padmanavigation.com`)
3. Follow DNS configuration instructions
4. Vercel will automatically configure SSL

---

## 📊 Monitoring & Analytics

Vercel provides:
- **Deployment Logs**: View build and runtime logs
- **Analytics**: Page views, performance metrics
- **Speed Insights**: Core Web Vitals
- **Function Logs**: Serverless function logs

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Solution: Ensure all dependencies are in `package.json`
- Check that `node_modules` is not committed to git

**Error: "TypeScript errors"**
- Solution: Fix TypeScript errors locally first
- Run `npm run build` locally to test

**Error: "Root directory not found"**
- Solution: Verify Root Directory is set to `frontend`
- Check that `frontend/package.json` exists

### Runtime Errors

**Error: "API calls failing"**
- Solution: Check `NEXT_PUBLIC_API_URL` environment variable
- Verify backend is deployed and accessible
- Check CORS settings on backend

**Error: "Images not loading"**
- Solution: Update `next.config.js` with backend image domains
- Check image URLs are correct

### Environment Variables Not Working

**Issue: Variables not accessible**
- Solution: Ensure variable name starts with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Check variable is set for correct environment (Production/Preview)

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** to git
2. **Use environment variables** for sensitive data
3. **Only expose public variables** with `NEXT_PUBLIC_` prefix
4. **Keep backend URLs** in environment variables
5. **Use HTTPS** (automatic on Vercel)

---

## 📝 Post-Deployment Checklist

- [ ] Frontend deployed successfully
- [ ] Environment variables set
- [ ] Backend URL configured
- [ ] Test homepage loads
- [ ] Test API calls work
- [ ] Test admin login
- [ ] Check mobile responsiveness
- [ ] Verify images load correctly

---

## 🎯 Next Steps

1. **Deploy Backend** (if not done):
   - Deploy to Render using `backend/RENDER_QUICK_START.md`
   - Get backend URL
   - Update `NEXT_PUBLIC_API_URL` in Vercel

2. **Test Full Application**:
   - Test all pages
   - Test admin panel
   - Test API integration

3. **Set Up Custom Domain** (optional):
   - Add custom domain in Vercel
   - Configure DNS

4. **Monitor Performance**:
   - Check Vercel Analytics
   - Monitor error logs
   - Optimize as needed

---

## 📚 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Vercel Support**: https://vercel.com/support

---

## ✅ Summary

Your frontend is ready to deploy! Just:

1. Go to https://vercel.com
2. Import your GitHub repository
3. Set Root Directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy!

**Estimated time**: 5-10 minutes

---

**Last Updated**: 2024
