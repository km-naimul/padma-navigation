'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Launch } from '@/lib/types';
import { launchesApi } from '@/lib/api';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import FacilityBadge from '@/components/FacilityBadge';
import Image from 'next/image';
import { Phone, Ship, MapPin, Clock } from 'lucide-react';

const getLaunchRoute = (launchId: string): string => {
  const routeMap: { [key: string]: string } = {
    '1': 'Dhaka–Patuakhali–Dhaka', // M. V. Pubali-12
    '2': 'Dhaka–Chormontaj–Dhaka', // M. V. Pubali-9
    '3': 'Dhaka–Khepupara–Dhaka', // M. V. Pubali-6
    '4': 'Dhaka–Elisha–Dhaka', // M. V. Pubali-5
  };
  return routeMap[launchId] || '';
};

export default function LaunchDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchLaunch();
    }
  }, [id]);

  const fetchLaunch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await launchesApi.getById(id);
      setLaunch(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch launch details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchLaunch} />;
  if (!launch) return <div>Launch not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full flex justify-center bg-gray-100 py-4 sm:py-6 md:py-8">
          {launch.imageUrl ? (
            <div className="relative w-full max-w-5xl px-4 sm:px-0">
              <Image
                src={launch.imageUrl.startsWith('/') ? launch.imageUrl : launch.imageUrl}
                alt={launch.name}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                unoptimized
                priority
              />
            </div>
          ) : (
            <div className="h-64 sm:h-80 md:h-96 w-full bg-gradient-to-br from-[#d4af37] to-[#b8941d] flex items-center justify-center">
              <Ship className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-white opacity-50" />
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">{launch.name}</h1>
            <span
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded whitespace-nowrap self-start sm:self-auto ${
                launch.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {launch.status}
            </span>
          </div>

          {launch.description && (
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">{launch.description}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {getLaunchRoute(launch._id) && (
              <div className="flex items-start sm:items-center">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#d4af37] mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500">Route</p>
                  <p className="text-base sm:text-lg font-semibold text-[#0a1929] break-words">{getLaunchRoute(launch._id)}</p>
                </div>
              </div>
            )}
            <div className="flex items-start sm:items-center">
              <Ship className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Capacity</p>
                <p className="text-base sm:text-lg font-semibold">{launch.capacity}+</p>
              </div>
            </div>
            <div className="flex items-start sm:items-center">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500">Contact</p>
                <a
                  href={`tel:${launch.contactNumber}`}
                  className="text-base sm:text-lg font-semibold text-primary-600 hover:underline break-all touch-manipulation"
                >
                  {launch.contactNumber}
                </a>
              </div>
            </div>
            {launch.alternateContact && (
              <div className="flex items-start sm:items-center">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500">Alternate Contact</p>
                  <a
                    href={`tel:${launch.alternateContact}`}
                    className="text-base sm:text-lg font-semibold text-primary-600 hover:underline break-all touch-manipulation"
                  >
                    {launch.alternateContact}
                  </a>
                </div>
              </div>
            )}
          </div>

          {launch.facilities && launch.facilities.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">Facilities</h2>
              <div className="flex flex-wrap gap-2">
                {launch.facilities.map((facility, index) => (
                  <FacilityBadge key={index} facility={facility} />
                ))}
              </div>
            </div>
          )}

          <div className="bg-primary-50 rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">Booking Information</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              To book your journey on {launch.name}, please contact us at:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={`tel:${launch.contactNumber}`}
                className="bg-primary-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-primary-700 transition-colors text-center touch-manipulation"
              >
                Call {launch.contactNumber}
              </a>
              {launch.alternateContact && (
                <a
                  href={`tel:${launch.alternateContact}`}
                  className="bg-white text-primary-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-primary-50 transition-colors border-2 border-primary-600 text-center touch-manipulation"
                >
                  Call {launch.alternateContact}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
