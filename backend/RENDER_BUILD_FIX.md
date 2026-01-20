# 🔧 Render Build Fix - Important!

## If Build Still Fails in Render Dashboard

If you're still seeing the `Cannot find type definition file for 'node'` error, you need to **manually update the Build Command** in Render dashboard:

### Steps to Fix in Render Dashboard:

1. Go to your Render service dashboard
2. Click **"Settings"** tab
3. Scroll to **"Build & Deploy"** section
4. Find **"Build Command"** field
5. **Change it to:**
   ```
   npm install --include=dev && npm run build
   ```
6. Click **"Save Changes"**
7. Render will automatically redeploy

### Why This Fixes It:

- `npm install --include=dev` ensures devDependencies (including `@types/node`) are installed
- This is needed because TypeScript needs `@types/node` during the build process
- The `--include=dev` flag ensures devDependencies are installed even in production builds

---

## Alternative: Update Build Command in Render Dashboard

If Render doesn't use `render.yaml` automatically, you must set the build command manually:

**Build Command:**
```
npm install --include=dev && npm run build
```

**Start Command:**
```
npm start
```

---

## Verify Fix

After updating, the build should:
- ✅ Install all dependencies including devDependencies
- ✅ Compile TypeScript successfully
- ✅ Deploy without errors

---

**Update the Build Command in Render dashboard now!**
