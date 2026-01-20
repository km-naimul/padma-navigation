import Link from 'next/link';
import Image from 'next/image';
import { Launch } from '@/lib/types';
import FacilityBadge from './FacilityBadge';
import { Phone, Ship, MapPin } from 'lucide-react';

interface LaunchCardProps {
  launch: Launch;
}

const getLaunchRoute = (launchId: string): string => {
  const routeMap: { [key: string]: string } = {
    '1': 'Dhaka–Patuakhali–Dhaka', // M. V. Pubali-12
    '2': 'Dhaka–Chormontaj–Dhaka', // M. V. Pubali-9
    '3': 'Dhaka–Khepupara–Dhaka', // M. V. Pubali-6
    '4': 'Dhaka–Elisha–Dhaka', // M. V. Pubali-5
  };
  return routeMap[launchId] || '';
};

const LaunchCard = ({ launch }: LaunchCardProps) => {
  const route = getLaunchRoute(launch._id);
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-[#e8e0d1]/20">
      <div className="relative h-48 w-full">
        {launch.imageUrl ? (
          <Image
            src={launch.imageUrl.startsWith('/') ? launch.imageUrl : launch.imageUrl}
            alt={launch.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="h-48 w-full bg-gradient-to-br from-[#d4af37] to-[#b8941d] flex items-center justify-center">
            <Ship className="h-16 w-16 text-white opacity-50" />
          </div>
        )}
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 gap-2">
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-[#0a1929] tracking-tight flex-1 min-w-0">{launch.name}</h3>
          <span
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-full tracking-wide flex-shrink-0 whitespace-nowrap ${
              launch.status === 'active'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-gray-100 text-gray-800 border border-gray-200'
            }`}
          >
            {launch.status}
          </span>
        </div>

        {launch.description && (
          <p className="text-[#0a1929]/70 text-base mb-5 line-clamp-2 leading-relaxed">{launch.description}</p>
        )}

        <div className="mb-4">
          {route && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-2 text-[#d4af37]" />
              <span className="font-medium">{route}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Ship className="h-4 w-4 mr-2" />
            <span>Capacity: {launch.capacity}+</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            <a href={`tel:${launch.contactNumber}`} className="hover:text-primary-600">
              {launch.contactNumber}
            </a>
          </div>
        </div>

        {launch.facilities && launch.facilities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {launch.facilities.map((facility, index) => (
                <FacilityBadge key={index} facility={facility} />
              ))}
            </div>
          </div>
        )}

        <Link
          href={`/launches/${launch._id}`}
          className="block w-full text-center bg-[#d4af37] text-[#0a1929] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#b8941d] hover:shadow-lg transition-all duration-300 tracking-wide touch-manipulation"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default LaunchCard;
