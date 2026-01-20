# 🚀 Deploy Backend to Render - Step by Step Guide

Follow these steps to deploy your backend to Render RIGHT NOW!

---

## ✅ Prerequisites Check

Before starting, make sure you have:
- [x] Code pushed to GitHub ✅
- [ ] MongoDB Atlas account (free tier)
- [ ] Render account (free tier)

---

## Step 1: Set Up MongoDB Atlas (5 minutes)

### 1.1 Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with Google/GitHub/Email

### 1.2 Create Free Cluster
1. Click **"Build a Database"**
2. Choose **"M0 FREE"** (Free Shared Cluster)
3. Select a **Cloud Provider** (AWS recommended)
4. Choose a **Region** closest to you
5. Click **"Create"**
6. Wait 3-5 minutes for cluster creation

### 1.3 Create Database User
1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username**: `padma_navigation` (or your choice)
   - **Password**: Generate a strong password (save it!)
5. Click **"Add User"**

### 1.4 Configure Network Access
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Click **"Database"** → Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your database user credentials
5. Add database name at the end:
   ```
   mongodb+srv://padma_navigation:yourpassword@cluster0.xxxxx.mongodb.net/padma-navigation?retryWrites=true&w=majority
   ```
6. **SAVE THIS CONNECTION STRING** - You'll need it!

---

## Step 2: Generate JWT Secret

Open your terminal and run:
```bash
openssl rand -base64 32
```

**Copy the output** - This is your JWT_SECRET (save it securely!)

---

## Step 3: Deploy to Render (10 minutes)

### 3.1 Sign Up / Sign In to Render
1. Go to: https://render.com
2. Click **"Get Started for Free"** or **"Log In"**
3. **Sign in with GitHub** (recommended - connects to your repo)

### 3.2 Create New Web Service
1. Click **"New +"** button (top right)
2. Click **"Web Service"**

### 3.3 Connect Repository
1. If not connected, click **"Connect account"** and authorize Render
2. Find and select: **`km-naimul/padma-navigation`**
3. Click **"Connect"**

### 3.4 Configure Service Settings

**Basic Settings:**
- **Name**: `padma-navigation-backend` (or your choice)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main` (should be auto-selected)
- **Root Directory**: `backend` ⚠️ **CRITICAL - MUST SET THIS!**
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 3.5 Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

**Required Variables:**

1. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`

2. **PORT**
   - Key: `PORT`
   - Value: `5000`

3. **MONGODB_URI**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://padma_navigation:yourpassword@cluster0.xxxxx.mongodb.net/padma-navigation?retryWrites=true&w=majority`
   - ⚠️ Replace with YOUR actual MongoDB connection string!

4. **JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: `paste-your-generated-secret-here`
   - ⚠️ Use the secret you generated in Step 2!

5. **JWT_EXPIRE**
   - Key: `JWT_EXPIRE`
   - Value: `7d`

6. **FRONTEND_URL**
   - Key: `FRONTEND_URL`
   - Value: `https://padma-navigation-frontend.vercel.app`
   - ⚠️ Update this after deploying frontend, or use placeholder for now

### 3.6 Deploy!
1. Scroll down and click **"Create Web Service"**
2. Wait 5-10 minutes for first deployment
3. Watch the build logs for progress

---

## Step 4: Verify Deployment

### 4.1 Check Deployment Status
- Watch the build logs in Render dashboard
- Wait for "Your service is live" message

### 4.2 Get Your Backend URL
After deployment, Render will show:
```
https://padma-navigation-backend.onrender.com
```
(Your URL will be different - copy it!)

### 4.3 Test Health Endpoint
Open in browser:
```
https://your-app.onrender.com/health
```
Should return: `{"status":"ok","message":"Padma Navigation API is running"}`

### 4.4 Test API Endpoint
Open in browser:
```
https://your-app.onrender.com/api
```
Should return API information

---

## Step 5: Seed Admin User (Optional)

After deployment, you can seed the admin user:

**Option 1: Using Render Shell**
1. Go to your service → Click **"Shell"** tab
2. Run:
   ```bash
   npm run seed
   ```
3. You should see: "Admin user created successfully"

**Option 2: Using MongoDB Atlas**
- Connect to MongoDB Atlas
- Manually create admin user in the database

---

## Step 6: Update Frontend

After backend is deployed:

1. **Get your backend URL** from Render dashboard
2. **Update Vercel environment variable**:
   - Go to Vercel dashboard
   - Your project → Settings → Environment Variables
   - Update `NEXT_PUBLIC_API_URL` to:
     ```
     https://your-backend-url.onrender.com/api
     ```
3. **Redeploy frontend** (automatic on next push, or manual)

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] JWT_SECRET generated
- [ ] Render account created
- [ ] Web service created
- [ ] Root Directory set to `backend`
- [ ] All environment variables set
- [ ] Deployment successful
- [ ] Health check passes
- [ ] Admin user seeded (optional)
- [ ] Frontend updated with backend URL

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Solution: Check that all dependencies are in `package.json`
- Verify `node_modules` is not committed to git

**Error: "TypeScript compilation failed"**
- Solution: Run `npm run build` locally first to check errors
- Fix any TypeScript errors before deploying

### Server Won't Start

**Error: "MongoDB connection failed"**
- Solution: 
  - Verify MongoDB URI is correct
  - Check MongoDB Atlas network access (should allow 0.0.0.0/0)
  - Verify database user credentials

**Error: "Port already in use"**
- Solution: Render sets PORT automatically, ensure your code uses `process.env.PORT`

### CORS Errors

**Error: "CORS policy blocked"**
- Solution: Update `FRONTEND_URL` environment variable
- Ensure it matches your frontend domain exactly

---

## 📝 Important Notes

1. **Root Directory**: MUST be set to `backend` (critical!)
2. **MongoDB URI**: Must include database name at the end
3. **JWT_SECRET**: Use a strong, random secret (never commit to git)
4. **Free Tier**: Service spins down after 15 min inactivity (first request will be slow)
5. **File Uploads**: Will reset on redeploy (consider cloud storage for production)

---

## 🎉 Success!

Once deployed, your backend will be live at:
```
https://padma-navigation-backend.onrender.com
```

**Next Steps:**
1. Deploy frontend to Vercel
2. Update frontend with backend URL
3. Test full application
4. Share your live website!

---

**Ready? Start with Step 1 above!**
