# Padma Navigation Co. Website

A full-stack web application for managing and displaying launch schedules, routes, ghats (terminals), and booking information for Padma Navigation Co.

## Technology Stack

### Frontend
- Next.js 14+ (App Router) with React
- TypeScript
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js with Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads

## Project Structure

```
padma-navigation/
├── frontend/          # Next.js frontend application
├── backend/           # Express.js backend API
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/padma-navigation
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

4. Start MongoDB (make sure MongoDB is running on your system)

5. Seed the database with an admin user (optional):
```bash
npm run seed
```
Default admin credentials:
- Email: admin@padmanavigation.com
- Password: admin123

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

### Public Pages
- **Home**: Company overview and statistics
- **Launches**: Browse all launches with filtering and search
- **Launch Details**: Detailed information about each launch
- **Routes & Schedules**: View all routes and their schedules
- **Ghats**: List of all ghats/terminals
- **Booking**: Contact information for booking

### Admin Panel
- **Dashboard**: Overview statistics
- **Launch Management**: CRUD operations for launches
- **Route Management**: CRUD operations for routes with schedule builder
- **Ghat Management**: CRUD operations for ghats
- **Image Upload**: Upload images for launches

## API Endpoints

### Public Endpoints
- `GET /api/launches` - Get all launches
- `GET /api/launches/:id` - Get single launch
- `GET /api/routes` - Get all routes
- `GET /api/routes/:id` - Get single route
- `GET /api/ghats` - Get all ghats
- `GET /api/ghats/:id` - Get single ghat

### Admin Endpoints (Protected)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current user
- `POST /api/admin/launches` - Create launch
- `PUT /api/admin/launches/:id` - Update launch
- `DELETE /api/admin/launches/:id` - Delete launch
- `POST /api/admin/launches/:id/upload` - Upload launch image
- Similar endpoints for routes and ghats

## Development

### Backend
- Development: `npm run dev`
- Build: `npm run build`
- Start: `npm start`

### Frontend
- Development: `npm run dev`
- Build: `npm run build`
- Start: `npm start`

## Notes

- Make sure MongoDB is running before starting the backend
- Change the default admin password after first login
- Update JWT_SECRET in production
- Configure CORS settings for production deployment
