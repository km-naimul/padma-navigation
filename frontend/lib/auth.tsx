'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginResponse } from './types';
import { authApi } from './api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Fetch user info
      authApi
        .getMe()
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log('Attempting login with:', { email });
      const response = await authApi.login(email, password);
      console.log('Login response:', response);
      const data: LoginResponse = response.data;
      
      if (data.status === 'success' && data.token && data.user) {
        console.log('Login successful, saving token');
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        console.log('Token saved, user set:', data.user);
      } else {
        throw new Error('Login failed: Invalid response from server');
      }
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        request: error.request,
        stack: error.stack,
      });
      // Handle axios errors
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Login failed. Please check your credentials.';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      } else {
        throw new Error(error.message || 'Login failed. Please check your credentials.');
      }
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    authApi.logout().catch(() => {
      // Ignore logout errors
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
