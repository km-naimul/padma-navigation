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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Launches</p>
              <p className="text-3xl font-bold text-gray-900">{stats.launches}</p>
            </div>
            <Ship className="h-12 w-12 text-primary-600" />
          </div>
          <Link
            href="/admin/launches"
            className="mt-4 text-primary-600 hover:underline inline-block"
          >
            Manage Launches →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Routes</p>
              <p className="text-3xl font-bold text-gray-900">{stats.routes}</p>
            </div>
            <MapPin className="h-12 w-12 text-primary-600" />
          </div>
          <Link
            href="/admin/routes"
            className="mt-4 text-primary-600 hover:underline inline-block"
          >
            Manage Routes →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Ghats</p>
              <p className="text-3xl font-bold text-gray-900">{stats.ghats}</p>
            </div>
            <Clock className="h-12 w-12 text-primary-600" />
          </div>
          <Link
            href="/admin/ghats"
            className="mt-4 text-primary-600 hover:underline inline-block"
          >
            Manage Ghats →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/launches?action=create"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 text-center"
          >
            Add New Launch
          </Link>
          <Link
            href="/admin/routes?action=create"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 text-center"
          >
            Add New Route
          </Link>
          <Link
            href="/admin/ghats?action=create"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 text-center"
          >
            Add New Ghat
          </Link>
        </div>
      </div>
    </div>
  );
}
