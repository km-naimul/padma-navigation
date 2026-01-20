'use client';

import { useEffect, useState } from 'react';
import { Launch } from '@/lib/types';
import { launchesApi } from '@/lib/api';
import LaunchCard from '@/components/LaunchCard';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { Search, Filter } from 'lucide-react';

export default function LaunchesPage() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [facilityFilter, setFacilityFilter] = useState<string>('');

  useEffect(() => {
    fetchLaunches();
  }, [statusFilter, facilityFilter]);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: any = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      if (facilityFilter) {
        params.facility = facilityFilter;
      }
      const response = await launchesApi.getAll(params);
      setLaunches(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch launches');
    } finally {
      setLoading(false);
    }
  };

  const filteredLaunches = launches.filter((launch) =>
    launch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchLaunches} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 bg-[#f5f1e8] min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2 sm:mb-4 text-[#0a1929] tracking-tight">Our Launches</h1>
      <p className="text-sm sm:text-base md:text-lg text-[#0a1929]/60 mb-6 sm:mb-8 md:mb-10">Discover our premium fleet of launches</p>

      {/* Filters */}
      <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search launches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border-2 border-[#e8e0d1] rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] bg-white text-sm sm:text-base text-[#0a1929] placeholder:text-[#0a1929]/40"
            />
          </div>
          <div className="flex gap-3 sm:gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#e8e0d1] rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] bg-white text-sm sm:text-base text-[#0a1929] font-medium"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input
              type="text"
              placeholder="Filter by facility..."
              value={facilityFilter}
              onChange={(e) => setFacilityFilter(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#e8e0d1] rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] bg-white text-sm sm:text-base text-[#0a1929] placeholder:text-[#0a1929]/40 flex-1 min-w-0"
            />
          </div>
        </div>
      </div>

      {/* Launches Grid */}
      {filteredLaunches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLaunches.map((launch) => (
            <LaunchCard key={launch._id} launch={launch} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No launches found</p>
        </div>
      )}
    </div>
  );
}
