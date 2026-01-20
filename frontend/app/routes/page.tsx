'use client';

import { useEffect, useState } from 'react';
import { Route, Launch } from '@/lib/types';
import { routesApi, launchesApi } from '@/lib/api';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import ScheduleTable from '@/components/ScheduleTable';
import { MapPin, Clock } from 'lucide-react';

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [routesResponse, launchesResponse] = await Promise.all([
        routesApi.getAll().catch(() => ({ data: { data: [] } })),
        launchesApi.getAll().catch(() => ({ data: { data: [] } })),
      ]);
      setRoutes(routesResponse.data.data || []);
      setLaunches(launchesResponse.data.data || []);
      if (routesResponse.data.data && routesResponse.data.data.length > 0) {
        setSelectedRoute(routesResponse.data.data[0]);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch routes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 bg-[#f5f1e8] min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2 sm:mb-4 text-[#0a1929] tracking-tight">Routes & Schedules</h1>
      <p className="text-sm sm:text-base md:text-lg text-[#0a1929]/60 mb-6 sm:mb-8 md:mb-10">Plan your journey with our comprehensive schedule</p>

      {routes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No routes available</p>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {routes.map((route) => (
            <div key={route._id} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-[#e8e0d1]/20 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[#0a1929] tracking-tight break-words">{route.name}</h2>
                {route.distance && (
                  <span className="text-sm sm:text-base text-gray-600 whitespace-nowrap">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 inline mr-1" />
                    {route.distance}
                  </span>
                )}
              </div>

              {route.estimatedDuration && (
                <div className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-600">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 inline mr-1" />
                  Estimated Duration: {route.estimatedDuration}
                </div>
              )}

              {route.schedules && route.schedules.length > 0 ? (
                <ScheduleTable route={route} launches={launches} />
              ) : (
                <p className="text-gray-500">No schedules available for this route</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
