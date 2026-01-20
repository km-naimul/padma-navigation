# Quick Start: Deploy to Render

## 🚀 Fast Deployment Steps

### 1. Prerequisites Checklist
- [ ] GitHub repository with your code
- [ ] MongoDB Atlas account (free tier)
- [ ] Render account (free tier)

### 2. MongoDB Atlas Setup (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0 Sandbox)
3. Create database user (save username/password)
4. Get connection string:
   - Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
5. Network Access → Add IP Address → `0.0.0.0/0` (allow all)

### 3. Render Deployment (10 minutes)

1. **Go to Render**: https://render.com → Sign in with GitHub

2. **New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select repository

3. **Configure**:
   ```
   Name: padma-navigation-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Environment Variables** (click "Advanced"):
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=generate-with-openssl-rand-base64-32
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend-url.com
   ```

5. **Deploy**: Click "Create Web Service"

6. **Wait**: 5-10 minutes for first deployment

7. **Get URL**: `https://your-app.onrender.com`

### 4. Verify (2 minutes)

Test these URLs:
- Health: `https://your-app.onrender.com/health`
- API: `https://your-app.onrender.com/api`

### 5. Update Frontend

In your frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-app.onrender.com/api
```

---

## ⚠️ Important Notes

1. **Generate JWT_SECRET**:
   ```bash
   openssl rand -base64 32
   ```

2. **MongoDB URI Format**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

3. **Free Tier Limitations**:
   - Spins down after 15 min inactivity
   - First request after spin-down is slow (~30s)
   - No persistent storage (uploads reset on redeploy)

---

## 📝 Full Documentation

See `RENDER_DEPLOYMENT.md` for detailed instructions and troubleshooting.

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Health check passes
- [ ] Frontend updated with backend URL

---

**Ready to deploy? Follow the steps above!**
