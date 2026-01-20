# Render Deployment Guide for Padma Navigation Backend

This guide will walk you through deploying the Padma Navigation backend to Render.

## Prerequisites

1. **Render Account**: Sign up at https://render.com (free tier available)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **MongoDB Atlas**: Free MongoDB database (https://www.mongodb.com/cloud/atlas)

---

## Step-by-Step Deployment Instructions

### Step 1: Prepare MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0 Sandbox)
3. Create a database user:
   - Username: `padma_navigation` (or your choice)
   - Password: Generate a strong password
4. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://padma_navigation:yourpassword@cluster0.xxxxx.mongodb.net/padma-navigation?retryWrites=true&w=majority`
5. Configure Network Access:
   - Add IP Address: `0.0.0.0/0` (allows all IPs, or add Render's IPs)

### Step 2: Deploy to Render

1. **Sign in to Render**
   - Go to https://render.com
   - Sign up or log in with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your code

3. **Configure Service Settings**
   - **Name**: `padma-navigation-backend` (or your choice)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend` (important!)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Set Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:

   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/padma-navigation?retryWrites=true&w=majority
   JWT_SECRET=your-very-strong-secret-key-here-use-openssl-rand-base64-32
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

   **Important Notes:**
   - Replace `MONGODB_URI` with your actual MongoDB Atlas connection string
   - Generate a strong `JWT_SECRET` (use: `openssl rand -base64 32`)
   - Set `FRONTEND_URL` to your frontend deployment URL

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically:
     - Clone your repository
     - Install dependencies
     - Build the TypeScript code
     - Start the server

6. **Wait for Deployment**
   - First deployment takes 5-10 minutes
   - Watch the build logs for any errors
   - Once deployed, you'll get a URL like: `https://padma-navigation-backend.onrender.com`

### Step 3: Verify Deployment

1. **Health Check**
   ```
   https://your-app.onrender.com/health
   ```
   Should return: `{"status":"ok","message":"Padma Navigation API is running"}`

2. **API Root**
   ```
   https://your-app.onrender.com/api
   ```
   Should return API information

3. **Test Database Connection**
   - Check Render logs for "MongoDB connected successfully"
   - If errors, verify MongoDB URI and network access

### Step 4: Seed Admin User (Optional)

After deployment, you can seed the admin user:

**Option 1: Using Render Shell**
1. Go to your service → "Shell"
2. Run:
   ```bash
   npm run seed
   ```

**Option 2: Using MongoDB Atlas**
- Connect to MongoDB Atlas
- Manually create admin user or use MongoDB Compass

**Option 3: Create API Endpoint** (for one-time seeding)
- Add a temporary endpoint to seed admin

### Step 5: Update Frontend

Update your frontend `.env.local` or environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-app.onrender.com/api
```

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for JWT tokens | `your-secret-key` |
| `JWT_EXPIRE` | Token expiration | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-app.vercel.app` |

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Solution: Ensure all dependencies are in `dependencies` not `devDependencies`
- Check `package.json` includes all required packages

**Error: "TypeScript compilation failed"**
- Solution: Check TypeScript errors locally first
- Run `npm run build` locally to test

### Server Won't Start

**Error: "Port already in use"**
- Solution: Render sets PORT automatically, ensure your code uses `process.env.PORT`

**Error: "MongoDB connection failed"**
- Solution: 
  - Verify MongoDB URI is correct
  - Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)
  - Verify database user credentials

### CORS Errors

**Error: "CORS policy blocked"**
- Solution: Update `FRONTEND_URL` environment variable to match your frontend domain
- Check `backend/src/server.ts` CORS configuration

### File Uploads Not Working

**Issue: Uploads folder resets on restart**
- Solution: Render's filesystem is ephemeral
- Consider using cloud storage (AWS S3, Cloudinary) for production
- For now, uploads will work but reset on redeploy

---

## Render Free Tier Limitations

- **Spins down after 15 minutes** of inactivity
- **First request after spin-down** takes ~30 seconds (cold start)
- **512MB RAM** limit
- **No persistent storage** (uploads folder resets)

**Solutions:**
- Use external storage (S3, Cloudinary) for file uploads
- Consider upgrading to paid plan for always-on service
- Use uptime monitoring to keep service awake

---

## Updating Deployment

Render automatically redeploys when you push to your connected branch:

1. Make changes to your code
2. Commit and push to GitHub
3. Render detects changes and redeploys automatically
4. Check deployment logs for status

---

## Monitoring

- **Logs**: View real-time logs in Render dashboard
- **Metrics**: Monitor CPU, memory, and response times
- **Alerts**: Set up email alerts for deployment failures

---

## Security Checklist

- [ ] Changed default JWT_SECRET to strong random value
- [ ] Updated admin password from default
- [ ] MongoDB Atlas network access configured
- [ ] CORS configured for production frontend URL only
- [ ] Environment variables set securely (not in code)
- [ ] HTTPS enabled (automatic on Render)

---

## Next Steps

1. Deploy frontend (Vercel, Netlify, etc.)
2. Update frontend API URL to Render backend URL
3. Test full application flow
4. Set up monitoring and alerts
5. Consider upgrading to paid plan for production

---

## Support

- Render Docs: https://render.com/docs
- Render Support: https://render.com/support
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

---

**Last Updated**: 2024
