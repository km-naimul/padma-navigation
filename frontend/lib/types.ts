// Shared types between frontend and backend

export interface Launch {
  _id: string;
  name: string;
  routeIds: string[];
  capacity: number;
  facilities: string[];
  contactNumber: string;
  alternateContact?: string;
  status: 'active' | 'inactive';
  imageUrl?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Route {
  _id: string;
  name: string;
  launchIds: string[];
  schedules: Schedule[];
  distance?: string;
  estimatedDuration?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Schedule {
  launchId: string;
  departureTime: string;
  arrivalTime?: string;
  daysOfWeek: string[];
  ghatIds: string[];
}

export interface Ghat {
  _id: string;
  name: string;
  location: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  facilities: string[];
  contactNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'superadmin';
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: any[];
  count?: number;
}

export interface LoginResponse {
  status: 'success';
  token: string;
  user: User;
}

export interface Booking {
  _id: string;
  title: string;
  description: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  instructions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Management {
  _id: string;
  name: string;
  position: string;
  description: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Policy {
  _id: string;
  title: string;
  content: string;
  category?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}
