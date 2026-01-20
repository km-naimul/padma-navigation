'use client';

import { useEffect, useState } from 'react';
import { Ghat } from '@/lib/types';
import { ghatsApi } from '@/lib/api';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import FacilityBadge from '@/components/FacilityBadge';
import { MapPin, Search } from 'lucide-react';

export default function GhatsPage() {
  const [ghats, setGhats] = useState<Ghat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGhats();
  }, []);

  const fetchGhats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ghatsApi.getAll();
      setGhats(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch ghats');
    } finally {
      setLoading(false);
    }
  };

  const filteredGhats = ghats.filter(
    (ghat) =>
      ghat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ghat.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchGhats} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#f5f1e8] min-h-screen">
      <h1 className="text-5xl font-display font-bold mb-4 text-[#0a1929] tracking-tight">Ghats & Terminals</h1>
      <p className="text-[#0a1929]/60 mb-10 text-lg">Explore our network of terminals</p>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search ghats by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Ghats Grid */}
      {filteredGhats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGhats.map((ghat) => (
            <div key={ghat._id} className="bg-white rounded-xl shadow-lg p-6 border border-[#e8e0d1]/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-2xl font-display font-bold mb-3 text-[#0a1929] tracking-tight">{ghat.name}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{ghat.location}</span>
              </div>

              {ghat.address && (
                <p className="text-gray-600 text-sm mb-4">{ghat.address}</p>
              )}

              {ghat.facilities && ghat.facilities.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Facilities:</p>
                  <div className="flex flex-wrap gap-2">
                    {ghat.facilities.map((facility, index) => (
                      <FacilityBadge key={index} facility={facility} variant="small" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No ghats found</p>
        </div>
      )}
    </div>
  );
}
