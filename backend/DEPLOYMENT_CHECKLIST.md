# 🚨 Deployment Issues Fix Checklist

## Issues to Fix:

### 1. ✅ Root Route Added
- Added `/` route handler to show API information
- Now visiting root URL won't show "Route / not found"

### 2. ✅ CORS Configuration Updated
- Updated to allow Vercel frontend URLs
- Allows both production and preview deployments
- Fallback to allow all in development

### 3. ⚠️ Check These in Render Dashboard:

#### Environment Variables to Verify:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://padma_navigation:25M3BnGt9JCtqAfy@my-first-cluster1.c0ymrhl.mongodb.net/padma-navigation?retryWrites=true&w=majority
JWT_SECRET=ifoWRpoDbdHmKoEFfOEXwYjhyWmBOV4BnvPiqDDTwMY=
JWT_EXPIRE=7d
FRONTEND_URL=https://your-actual-vercel-url.vercel.app
```

**Important:** Replace `your-actual-vercel-url.vercel.app` with your actual Vercel frontend URL!

### 4. ⚠️ Check These in Vercel Dashboard:

#### Environment Variable to Set:
```
NEXT_PUBLIC_API_URL=https://padma-navigation.onrender.com/api
```

**Important:** Replace `padma-navigation.onrender.com` with your actual Render backend URL!

### 5. ⚠️ Seed Database Data

After backend is deployed, you need to seed the database:

**Option 1: Using Render Shell**
1. Go to Render dashboard → Your service
2. Click "Shell" tab
3. Run:
   ```bash
   npm run seed:all
   ```

**Option 2: Test API Endpoints**
Visit these URLs to verify:
- Health: `https://your-backend.onrender.com/health`
- API Info: `https://your-backend.onrender.com/api`
- Launches: `https://your-backend.onrender.com/api/launches`

If endpoints return empty arrays `[]`, you need to seed the database.

---

## Quick Fix Steps:

### Step 1: Update Frontend Environment Variable in Vercel
1. Go to Vercel dashboard
2. Your project → Settings → Environment Variables
3. Add/Update:
   ```
   NEXT_PUBLIC_API_URL=https://your-actual-backend-url.onrender.com/api
   ```
4. Redeploy frontend

### Step 2: Update Backend FRONTEND_URL in Render
1. Go to Render dashboard
2. Your service → Environment
3. Update `FRONTEND_URL` to your actual Vercel URL
4. Save (auto-redeploys)

### Step 3: Seed Database
1. Render dashboard → Your service → Shell
2. Run: `npm run seed:all`
3. Wait for completion

### Step 4: Test
- Visit your frontend URL
- Check browser console for API errors
- Verify data is loading

---

## Troubleshooting:

### No Data Showing:
- ✅ Check backend is deployed and running
- ✅ Check `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- ✅ Check backend has data (seed database)
- ✅ Check browser console for errors

### CORS Errors:
- ✅ Check `FRONTEND_URL` matches your Vercel URL exactly
- ✅ Check backend CORS configuration allows your frontend
- ✅ Try accessing API directly to verify it works

### 404 Errors:
- ✅ Root route `/` is now handled
- ✅ API routes should be at `/api/*`
- ✅ Check backend logs for route errors

---

## Test URLs:

After fixes, test these:

1. **Backend Health**: `https://your-backend.onrender.com/health`
2. **Backend API**: `https://your-backend.onrender.com/api`
3. **Backend Launches**: `https://your-backend.onrender.com/api/launches`
4. **Frontend**: `https://your-frontend.vercel.app`

---

## Next Steps:

1. ✅ Code fixes pushed (root route + CORS)
2. ⚠️ Update environment variables in Render and Vercel
3. ⚠️ Seed database with data
4. ⚠️ Test full application
