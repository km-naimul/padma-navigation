# 🚀 Quick Start: Deploy to Vercel

## 5-Minute Deployment

### 1. Go to Vercel
👉 https://vercel.com → Sign in with GitHub

### 2. Import Repository
- Click **"Add New..."** → **"Project"**
- Select: `km-naimul/padma-navigation`
- Click **"Import"**

### 3. Configure (Important!)
```
Root Directory: frontend  ⚠️ MUST SET THIS!
Framework: Next.js (auto-detected)
Build Command: npm run build (auto-detected)
```

### 4. Add Environment Variable
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```
(Replace with your actual backend URL)

### 5. Deploy!
Click **"Deploy"** → Wait 2-5 minutes → Done! 🎉

---

## ✅ After Deployment

Your site will be live at:
```
https://padma-navigation-frontend.vercel.app
```

---

## 🔄 Update Backend URL Later

1. Project Settings → Environment Variables
2. Edit `NEXT_PUBLIC_API_URL`
3. Redeploy (automatic on next push)

---

## 📖 Full Guide

See `VERCEL_DEPLOYMENT.md` for detailed instructions.

---

**Ready? Go to https://vercel.com and deploy!**
