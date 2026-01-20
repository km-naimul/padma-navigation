'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Ship, Clock, MapPin, Phone, Shield, Users, Award, ArrowRight } from 'lucide-react';
import { launchesApi, routesApi, ghatsApi } from '@/lib/api';
import { Launch } from '@/lib/types';
import Image from 'next/image';
import LaunchCard from '@/components/LaunchCard';

export default function Home() {
  const [stats, setStats] = useState({
    launches: 0,
    routes: 0,
    ghats: 0,
  });
  const [featuredLaunches, setFeaturedLaunches] = useState<Launch[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [launchesRes, routesRes, ghatsRes] = await Promise.all([
          launchesApi.getAll().catch(() => ({ data: { data: [] } })),
          routesApi.getAll().catch(() => ({ data: { data: [] } })),
          ghatsApi.getAll().catch(() => ({ data: { data: [] } })),
        ]);

        const launches = launchesRes.data.data || [];
        setStats({
          launches: launches.length,
          routes: routesRes.data.data?.length || 0,
          ghats: ghatsRes.data.data?.length || 0,
        });

        // Get featured launches (first 3 active ones)
        const activeLaunches = launches.filter((l: Launch) => l.status === 'active').slice(0, 3);
        setFeaturedLaunches(activeLaunches);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const { launches: launchCount, routes: routeCount, ghats: ghatCount } = stats;

  return (
    <div className="bg-[#f5f1e8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a1929] via-[#1a2332] to-[#0a1929] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Padma Navigation Logo"
                  width={120}
                  height={120}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 transition-transform hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-2xl opacity-50"></div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 sm:mb-6 text-white tracking-tight px-2">
              Welcome to <span className="text-[#d4af37]">Padma Navigation</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-white/90 font-light tracking-wide max-w-2xl mx-auto leading-relaxed px-4">
              Your trusted partner for safe and comfortable launch journeys
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/launches"
                className="bg-[#d4af37] text-[#0a1929] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#b8941d] hover:shadow-2xl transition-all duration-300 tracking-wide transform hover:scale-105 touch-manipulation text-center"
              >
                View Launches
              </Link>
              <Link
                href="/routes"
                className="bg-transparent text-white border-2 border-[#d4af37] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#d4af37] hover:text-[#0a1929] transition-all duration-300 tracking-wide touch-manipulation text-center"
              >
                Check Schedules
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-full w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Ship className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-[#0a1929]" />
              </div>
              <h3 className="text-4xl sm:text-5xl font-display font-bold text-[#0a1929] mb-2 sm:mb-3">{launchCount}</h3>
              <p className="text-[#0a1929]/70 font-medium tracking-wide uppercase text-xs sm:text-sm">Active Launches</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-full w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-[#0a1929]" />
              </div>
              <h3 className="text-4xl sm:text-5xl font-display font-bold text-[#0a1929] mb-2 sm:mb-3">{routeCount}</h3>
              <p className="text-[#0a1929]/70 font-medium tracking-wide uppercase text-xs sm:text-sm">Routes</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-full w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-[#0a1929]" />
              </div>
              <h3 className="text-4xl sm:text-5xl font-display font-bold text-[#0a1929] mb-2 sm:mb-3">{ghatCount}</h3>
              <p className="text-[#0a1929]/70 font-medium tracking-wide uppercase text-xs sm:text-sm">Ghats</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-[#0a1929] tracking-tight">
            Why Choose Padma Navigation?
          </h2>
          <p className="text-center text-[#0a1929]/60 mb-16 text-lg max-w-2xl mx-auto">
            Experience luxury and comfort on every journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-xl p-6 mb-6 w-20 h-20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Ship className="h-10 w-10 text-[#0a1929]" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-[#0a1929]">Modern Fleet</h3>
              <p className="text-[#0a1929]/70 leading-relaxed">
                Well-maintained launches with modern facilities
              </p>
            </div>
            <div className="text-center group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-xl p-6 mb-6 w-20 h-20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-10 w-10 text-[#0a1929]" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-[#0a1929]">Regular Schedules</h3>
              <p className="text-[#0a1929]/70 leading-relaxed">
                Reliable and punctual service on all routes
              </p>
            </div>
            <div className="text-center group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-xl p-6 mb-6 w-20 h-20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-10 w-10 text-[#0a1929]" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-[#0a1929]">Multiple Routes</h3>
              <p className="text-[#0a1929]/70 leading-relaxed">
                Extensive network covering major destinations
              </p>
            </div>
            <div className="text-center group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-xl p-6 mb-6 w-20 h-20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-10 w-10 text-[#0a1929]" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-[#0a1929]">Easy Booking</h3>
              <p className="text-[#0a1929]/70 leading-relaxed">
                Simple booking process with multiple contact options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Launches Section */}
      {featuredLaunches.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-[#0a1929] tracking-tight">
                Featured Launches
              </h2>
              <p className="text-[#0a1929]/60 text-lg max-w-2xl mx-auto">
                Experience our premium fleet of well-maintained launches
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredLaunches.map((launch) => (
                <LaunchCard key={launch._id} launch={launch} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/launches"
                className="inline-flex items-center gap-2 bg-[#d4af37] text-[#0a1929] px-8 py-3 rounded-lg font-semibold hover:bg-[#b8941d] hover:shadow-lg transition-all duration-300 tracking-wide"
              >
                View All Launches
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-20 bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-[#0a1929] tracking-tight">
                About Padma Navigation
              </h2>
              <p className="text-[#0a1929]/70 text-lg mb-6 leading-relaxed">
                With years of experience in the launch transportation industry, Padma Navigation Co. has established itself as a trusted name for safe, comfortable, and reliable waterway journeys.
              </p>
              <p className="text-[#0a1929]/70 text-lg mb-8 leading-relaxed">
                We pride ourselves on maintaining a modern fleet, ensuring punctual schedules, and providing exceptional customer service. Our commitment to excellence has made us the preferred choice for travelers across Bangladesh.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-lg p-3">
                    <Shield className="h-6 w-6 text-[#0a1929]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a1929]">Safe Travel</p>
                    <p className="text-sm text-[#0a1929]/60">Certified & Insured</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-lg p-3">
                    <Users className="h-6 w-6 text-[#0a1929]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a1929]">1000+ Passengers</p>
                    <p className="text-sm text-[#0a1929]/60">Daily Service</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-lg p-3">
                    <Award className="h-6 w-6 text-[#0a1929]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a1929]">Award Winning</p>
                    <p className="text-sm text-[#0a1929]/60">Best Service</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-lg p-3">
                    <Clock className="h-6 w-6 text-[#0a1929]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a1929]">On Time</p>
                    <p className="text-sm text-[#0a1929]/60">Always Punctual</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-8">
                  <h3 className="text-2xl font-display font-bold mb-6 text-[#0a1929]">Our Commitment</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-[#d4af37]/20 rounded-full p-1.5 mt-0.5">
                        <Ship className="h-4 w-4 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0a1929]">Modern Fleet</p>
                        <p className="text-sm text-[#0a1929]/70">Regularly maintained and upgraded vessels</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-[#d4af37]/20 rounded-full p-1.5 mt-0.5">
                        <Clock className="h-4 w-4 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0a1929]">Punctual Service</p>
                        <p className="text-sm text-[#0a1929]/70">Timely departures and arrivals</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-[#d4af37]/20 rounded-full p-1.5 mt-0.5">
                        <Shield className="h-4 w-4 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0a1929]">Safety First</p>
                        <p className="text-sm text-[#0a1929]/70">Certified safety standards and protocols</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-[#d4af37]/20 rounded-full p-1.5 mt-0.5">
                        <Users className="h-4 w-4 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0a1929]">Customer Care</p>
                        <p className="text-sm text-[#0a1929]/70">24/7 support and assistance</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-[#0a1929] tracking-tight">
              Quick Access
            </h2>
            <p className="text-[#0a1929]/60 text-lg max-w-2xl mx-auto">
              Everything you need for your journey in one place
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/launches"
              className="group bg-gradient-to-br from-[#0a1929] to-[#1a2332] rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-[#d4af37]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Ship className="h-8 w-8 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-white">Our Launches</h3>
              <p className="text-white/70 text-sm mb-4">Browse our fleet</p>
              <ArrowRight className="h-5 w-5 text-[#d4af37] mx-auto group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/routes"
              className="group bg-gradient-to-br from-[#0a1929] to-[#1a2332] rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-[#d4af37]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-white">Routes & Schedules</h3>
              <p className="text-white/70 text-sm mb-4">View timetables</p>
              <ArrowRight className="h-5 w-5 text-[#d4af37] mx-auto group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/ghats"
              className="group bg-gradient-to-br from-[#0a1929] to-[#1a2332] rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-[#d4af37]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-white">Ghats & Terminals</h3>
              <p className="text-white/70 text-sm mb-4">Find locations</p>
              <ArrowRight className="h-5 w-5 text-[#d4af37] mx-auto group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/booking"
              className="group bg-gradient-to-br from-[#0a1929] to-[#1a2332] rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-[#d4af37]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-8 w-8 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-white">Book Now</h3>
              <p className="text-white/70 text-sm mb-4">Contact us</p>
              <ArrowRight className="h-5 w-5 text-[#d4af37] mx-auto group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#0a1929] via-[#1a2332] to-[#0a1929] relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">Ready to Book Your Journey?</h2>
          <p className="text-xl mb-10 text-white/90 font-light max-w-2xl mx-auto">
            View our launches and schedules to plan your trip
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-[#d4af37] text-[#0a1929] px-12 py-4 rounded-lg font-semibold hover:bg-[#b8941d] hover:shadow-2xl transition-all duration-300 tracking-wide transform hover:scale-105 inline-block"
            >
              Book Now
            </Link>
            <Link
              href="/routes"
              className="bg-transparent text-white border-2 border-[#d4af37] px-12 py-4 rounded-lg font-semibold hover:bg-[#d4af37] hover:text-[#0a1929] transition-all duration-300 tracking-wide inline-block"
            >
              View Schedules
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
