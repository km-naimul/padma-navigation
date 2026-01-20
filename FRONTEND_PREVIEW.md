# Frontend Preview Guide

## ✅ Frontend is Running with Mock Data!

The frontend development server is now running with **mock data** - no backend required!

### 🌐 Access the Application

Open your browser and go to:
**http://localhost:3000**

### 📱 Pages Available

1. **Home Page** (`/`)
   - Hero section
   - Statistics (12 launches, 8 routes, 25 ghats)
   - Features section
   - Call-to-action

2. **Launches** (`/launches`)
   - View all launches
   - Search functionality
   - Filter by status and facilities
   - Launch cards with details

3. **Launch Details** (`/launches/[id]`)
   - Full launch information
   - Facilities list
   - Contact information
   - Booking details

4. **Routes & Schedules** (`/routes`)
   - All routes with schedules
   - Departure/arrival times
   - Days of operation
   - Number of stops

5. **Ghats** (`/ghats`)
   - List of all terminals/ghats
   - Location information
   - Facilities at each ghat
   - Search by location

6. **Booking** (`/booking`)
   - Contact information by launch
   - Booking instructions
   - Quick dial links

### 🎨 Features You Can Test

- ✅ Responsive design (try resizing browser)
- ✅ Search functionality
- ✅ Filtering options
- ✅ Navigation menu
- ✅ Mobile menu (on small screens)
- ✅ Smooth scrolling
- ✅ Hover effects
- ✅ Loading states

### 📝 Mock Data Included

- **4 Launches**: MV Padma Express, MV Padma Star, MV Padma Royal, MV Padma Dream
- **3 Routes**: Dhaka to Barisal, Dhaka to Chandpur, Barisal to Patuakhali
- **6 Ghats**: Various terminals with facilities

### 🔄 To Switch to Real Backend

When you're ready to connect to the backend:

1. Stop the current server (Ctrl+C)
2. Create `frontend/.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_USE_MOCK=false
   ```
3. Start backend server
4. Restart frontend: `npm run dev`

### 🛑 To Stop the Server

Press `Ctrl+C` in the terminal where the server is running.

---

**Note**: The admin panel (`/admin`) requires backend authentication, so it won't work with mock data. All public pages work perfectly!
