# Logo Setup Instructions

## Where to Place Your Logo

1. **Save your logo file** as `logo.png` in the `frontend/public/` folder
   - Path: `frontend/public/logo.png`
   - Recommended format: PNG with transparent background
   - Recommended size: 200x200px or larger for best quality

## Logo Usage

The logo is now integrated in the following places:

1. **Navigation Bar** - Left side, next to "Padma Navigation" text
2. **Home Page Hero** - Centered above the welcome message
3. **Admin Panel** - Sidebar header
4. **Admin Login Page** - Centered at the top
5. **Browser Tab/Favicon** - Shows as the site icon

## File Structure

```
frontend/
  └── public/
      └── logo.png  ← Place your logo file here
```

## After Adding the Logo

Once you've placed your `logo.png` file in the `frontend/public/` folder, the development server should automatically pick it up. If not, restart the server:

```bash
cd frontend
npm run dev
```

The logo will appear throughout the website automatically!
