import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/env';
import { connectDatabase } from './config/database';
import { errorHandler, notFound } from './middleware/errorHandler';
import routes from './routes';

const app: Application = express();

// Middleware
// CORS configuration - allow multiple origins for development and production
const allowedOrigins = [
  config.frontendUrl,
  'http://localhost:3000',
  'https://padma-navigation-frontend.vercel.app',
  'https://*.vercel.app', // Allow all Vercel preview deployments
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        // Handle wildcard domains
        const pattern = allowed.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowed === origin;
    })) {
      callback(null, true);
    } else {
      // For development, allow all origins
      if (config.nodeEnv === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', routes);

// API root endpoint
app.get('/api', (req, res) => {
  res.json({
    status: 'success',
    message: 'Padma Navigation API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/login',
      launches: '/api/launches',
      routes: '/api/routes',
      ghats: '/api/ghats',
      health: '/health',
    },
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Padma Navigation API',
    version: '1.0.0',
    documentation: '/api',
    health: '/health',
    endpoints: {
      auth: '/api/auth/login',
      launches: '/api/launches',
      routes: '/api/routes',
      ghats: '/api/ghats',
      health: '/health',
    },
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Padma Navigation API is running' });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
