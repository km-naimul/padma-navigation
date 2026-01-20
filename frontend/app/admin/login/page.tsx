'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const { login } = useAuth();
  const router = useRouter();

  // Save errors to localStorage for debugging
  useEffect(() => {
    if (error) {
      const errorLog = {
        timestamp: new Date().toISOString(),
        error: error,
        debugInfo: debugInfo,
      };
      localStorage.setItem('lastLoginError', JSON.stringify(errorLog));
      console.error('Login Error Saved:', errorLog);
    }
  }, [error, debugInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDebugInfo([]);
    setLoading(true);

    const debugSteps: string[] = [];
    debugSteps.push(`[${new Date().toLocaleTimeString()}] Starting login process...`);

    try {
      debugSteps.push('Calling login function...');
      setDebugInfo([...debugSteps]);
      
      await login(email, password);
      
      debugSteps.push('Login successful, redirecting...');
      setDebugInfo([...debugSteps]);
      router.push('/admin');
    } catch (err: any) {
      debugSteps.push(`Error caught: ${err.message || 'Unknown error'}`);
      debugSteps.push(`Error type: ${err.constructor.name}`);
      debugSteps.push(`Has response: ${!!err.response}`);
      debugSteps.push(`Has request: ${!!err.request}`);
      
      if (err.response) {
        debugSteps.push(`Response status: ${err.response.status}`);
        debugSteps.push(`Response data: ${JSON.stringify(err.response.data)}`);
      }
      
      if (err.request) {
        debugSteps.push(`Request failed - server may be down`);
      }
      
      setDebugInfo([...debugSteps]);
      
      // Log full error details
      const fullError = {
        message: err.message,
        stack: err.stack,
        response: err.response?.data,
        request: err.request ? 'Request made but no response' : null,
      };
      console.error('Full Login Error:', fullError);
      
      // Save to localStorage
      localStorage.setItem('lastLoginError', JSON.stringify({
        timestamp: new Date().toISOString(),
        error: fullError,
        debugSteps: debugSteps,
      }));
      
      // Error is thrown as Error object with message property
      const errorMessage = err.message || err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Padma Navigation Logo"
              width={80}
              height={80}
              priority
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Padma Navigation Co.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
              <div className="font-bold mb-2">Login Error:</div>
              <div className="mb-2">{error}</div>
              {debugInfo.length > 0 && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-semibold">Debug Information (Click to expand)</summary>
                  <div className="mt-2 p-2 bg-red-100 rounded text-xs font-mono overflow-auto max-h-40">
                    {debugInfo.map((step, idx) => (
                      <div key={idx} className="mb-1">{step}</div>
                    ))}
                  </div>
                </details>
              )}
              <button
                type="button"
                onClick={() => {
                  const savedError = localStorage.getItem('lastLoginError');
                  if (savedError) {
                    const blob = new Blob([savedError], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `login-error-${Date.now()}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }
                }}
                className="mt-2 text-xs underline"
              >
                Download Full Error Log
              </button>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
