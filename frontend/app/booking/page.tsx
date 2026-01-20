'use client';

import { useEffect, useState } from 'react';
import { Launch } from '@/lib/types';
import { launchesApi } from '@/lib/api';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { Phone, Mail } from 'lucide-react';

export default function BookingPage() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await launchesApi.getAll({ status: 'active' });
        
        if (!isMounted) return;
        
        // Handle response structure: response.data.data or response.data
        const launchesData = response?.data?.data || response?.data || [];
        setLaunches(Array.isArray(launchesData) ? launchesData : []);
      } catch (err: any) {
        if (!isMounted) return;
        
        console.error('Error fetching launches:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch launches. Please check if the backend server is running.';
        setError(errorMessage);
        // Set empty array on error so page can still render
        setLaunches([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);


  const retryFetch = () => {
    window.location.reload();
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={retryFetch} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#f5f1e8] min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-display font-bold mb-4 text-[#0a1929] tracking-tight">Book Your Journey</h1>
        <p className="text-xl text-[#0a1929]/70 font-light">
          Contact us directly to book your launch journey
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 rounded-xl p-8 mb-12 border border-[#d4af37]/20">
        <h2 className="text-3xl font-display font-bold mb-6 text-[#0a1929] tracking-tight">How to Book</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Choose your preferred launch from the list below</li>
          <li>Call the contact number provided</li>
          <li>Provide your travel details (route, date, number of passengers)</li>
          <li>Confirm your booking and receive confirmation details</li>
        </ol>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-gray-900">Contact Information by Launch</h2>

      {launches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {launches.map((launch) => (
            <div key={launch._id} className="bg-white rounded-xl shadow-lg p-6 border border-[#e8e0d1]/20 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-display font-bold mb-4 text-[#0a1929] tracking-tight">{launch.name}</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Phone className="h-5 w-5 mr-2" />
                    <span className="font-medium">Primary Contact</span>
                  </div>
                  <a
                    href={`tel:${launch.contactNumber}`}
                    className="text-primary-600 hover:underline text-lg font-semibold block ml-7"
                  >
                    {launch.contactNumber}
                  </a>
                </div>

                {launch.alternateContact && (
                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Phone className="h-5 w-5 mr-2" />
                      <span className="font-medium">Alternate Contact</span>
                    </div>
                    <a
                      href={`tel:${launch.alternateContact}`}
                      className="text-primary-600 hover:underline text-lg font-semibold block ml-7"
                    >
                      {launch.alternateContact}
                    </a>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <a
                    href={`/launches/${launch._id}`}
                    className="text-primary-600 hover:underline font-medium"
                  >
                    View Launch Details →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No active launches available</p>
        </div>
      )}

      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">General Inquiries</h2>
        <p className="text-gray-700 mb-4">
          For general inquiries or assistance, please contact any of our launch operators listed above.
        </p>
        <p className="text-gray-600 text-sm">
          Our customer service team is available to help you with route information, schedule details, and booking assistance.
        </p>
      </div>
    </div>
  );
}
