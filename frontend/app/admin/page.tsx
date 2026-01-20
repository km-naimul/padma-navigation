'use client';

import { useEffect, useState } from 'react';
import { launchesApi, routesApi, ghatsApi } from '@/lib/api';
import { Ship, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    launches: 0,
    routes: 0,
    ghats: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [launchesRes, routesRes, ghatsRes] = await Promise.all([
        launchesApi.getAll(),
        routesApi.getAll(),
        ghatsApi.getAll(),
      ]);

      setStats({
        launches: launchesRes.data.data?.length || 0,
        routes: routesRes.data.data?.length || 0,
        ghats: ghatsRes.data.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-gray-900">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-gray-600 text-xs sm:text-sm">Total Launches</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.launches}</p>
            </div>
            <Ship className="h-8 w-8 sm:h-12 sm:w-12 text-primary-600 flex-shrink-0 ml-2" />
          </div>
          <Link
            href="/admin/launches"
            className="mt-3 sm:mt-4 text-primary-600 hover:underline inline-block text-sm sm:text-base"
          >
            Manage Launches →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-gray-600 text-xs sm:text-sm">Total Routes</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.routes}</p>
            </div>
            <MapPin className="h-8 w-8 sm:h-12 sm:w-12 text-primary-600 flex-shrink-0 ml-2" />
          </div>
          <Link
            href="/admin/routes"
            className="mt-3 sm:mt-4 text-primary-600 hover:underline inline-block text-sm sm:text-base"
          >
            Manage Routes →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-gray-600 text-xs sm:text-sm">Total Ghats</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.ghats}</p>
            </div>
            <Clock className="h-8 w-8 sm:h-12 sm:w-12 text-primary-600 flex-shrink-0 ml-2" />
          </div>
          <Link
            href="/admin/ghats"
            className="mt-3 sm:mt-4 text-primary-600 hover:underline inline-block text-sm sm:text-base"
          >
            Manage Ghats →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Link
            href="/admin/launches?action=create"
            className="bg-primary-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-primary-700 text-center text-sm sm:text-base transition-colors"
          >
            Add New Launch
          </Link>
          <Link
            href="/admin/routes?action=create"
            className="bg-primary-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-primary-700 text-center text-sm sm:text-base transition-colors"
          >
            Add New Route
          </Link>
          <Link
            href="/admin/ghats?action=create"
            className="bg-primary-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-primary-700 text-center text-sm sm:text-base transition-colors sm:col-span-2 lg:col-span-1"
          >
            Add New Ghat
          </Link>
        </div>
      </div>
    </div>
  );
}
