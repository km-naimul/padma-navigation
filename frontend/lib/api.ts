import axios from 'axios';
import { mockLaunchesApi, mockRoutesApi, mockGhatsApi, mockBookingsApi, mockManagementApi, mockPoliciesApi } from './mockApi';

// Use mock data when NEXT_PUBLIC_USE_MOCK is true or API_URL is not set
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || !process.env.NEXT_PUBLIC_API_URL;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        if (window.location.pathname.startsWith('/admin')) {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Launches API
export const launchesApi = USE_MOCK
  ? mockLaunchesApi
  : {
      getAll: (params?: { status?: string; facility?: string }) =>
        api.get('/launches', { params }),
      getById: (id: string) => api.get(`/launches/${id}`),
      create: (data: any) => api.post('/admin/launches', data),
      update: (id: string, data: any) => api.put(`/admin/launches/${id}`, data),
      delete: (id: string) => api.delete(`/admin/launches/${id}`),
      uploadImage: (id: string, file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post(`/admin/launches/${id}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
    };

// Routes API
export const routesApi = USE_MOCK
  ? mockRoutesApi
  : {
      getAll: () => api.get('/routes'),
      getById: (id: string) => api.get(`/routes/${id}`),
      create: (data: any) => api.post('/admin/routes', data),
      update: (id: string, data: any) => api.put(`/admin/routes/${id}`, data),
      delete: (id: string) => api.delete(`/admin/routes/${id}`),
    };

// Ghats API
export const ghatsApi = USE_MOCK
  ? mockGhatsApi
  : {
      getAll: (params?: { location?: string }) =>
        api.get('/ghats', { params }),
      getById: (id: string) => api.get(`/ghats/${id}`),
      create: (data: any) => api.post('/admin/ghats', data),
      update: (id: string, data: any) => api.put(`/admin/ghats/${id}`, data),
      delete: (id: string) => api.delete(`/admin/ghats/${id}`),
    };

// Bookings API
export const bookingsApi = USE_MOCK
  ? mockBookingsApi
  : {
      getAll: () => api.get('/admin/bookings'),
      getById: (id: string) => api.get(`/admin/bookings/${id}`),
      create: (data: any) => api.post('/admin/bookings', data),
      update: (id: string, data: any) => api.put(`/admin/bookings/${id}`, data),
      delete: (id: string) => api.delete(`/admin/bookings/${id}`),
    };

// Management API
export const managementApi = USE_MOCK
  ? mockManagementApi
  : {
      getAll: () => api.get('/management'),
      getById: (id: string) => api.get(`/management/${id}`),
      create: (data: any) => api.post('/admin/management', data),
      update: (id: string, data: any) => api.put(`/admin/management/${id}`, data),
      delete: (id: string) => api.delete(`/admin/management/${id}`),
    };

// Policies API
export const policiesApi = USE_MOCK
  ? mockPoliciesApi
  : {
      getAll: () => api.get('/policies'),
      getById: (id: string) => api.get(`/policies/${id}`),
      create: (data: any) => api.post('/admin/policies', data),
      update: (id: string, data: any) => api.put(`/admin/policies/${id}`, data),
      delete: (id: string) => api.delete(`/admin/policies/${id}`),
    };

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    USE_MOCK
      ? Promise.resolve({
          data: {
            status: 'success',
            token: 'mock-token',
            user: { id: '1', username: 'admin', email, role: 'admin' },
          },
        })
      : api.post('/auth/login', { email, password }),
  logout: () => (USE_MOCK ? Promise.resolve({ data: { status: 'success' } }) : api.post('/auth/logout')),
  getMe: () =>
    USE_MOCK
      ? Promise.resolve({
          data: {
            status: 'success',
            user: { id: '1', username: 'admin', email: 'admin@padmanavigation.com', role: 'admin' },
          },
        })
      : api.get('/auth/me'),
};

export default api;
