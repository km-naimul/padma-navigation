'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { LayoutDashboard, Plus, Settings, LogOut, Ship, BookOpen, Users, FileText, Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading) return <Loading />;
  if (!user && pathname !== '/admin/login') return null;

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Mobile menu overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white min-h-screen transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="Padma Navigation Logo"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  <span className="text-lg sm:text-xl font-bold">Admin Panel</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-gray-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-2">
                <Link
                  href="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                    pathname === '/admin' ? 'bg-primary-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/launches"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                    pathname.startsWith('/admin/launches') ? 'bg-primary-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <Ship className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                  Launches
                </Link>
                <Link
                  href="/admin/routes"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                    pathname.startsWith('/admin/routes') ? 'bg-primary-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                  Routes
                </Link>
                <Link
                  href="/admin/ghats"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                    pathname.startsWith('/admin/ghats') ? 'bg-primary-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                  Ghats
                </Link>
                <Link
                  href="/admin/booking"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                    pathname.startsWith('/admin/booking') ? 'bg-primary-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                  Booking
                </Link>
                <Link
                  href="/admin/management"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                    pathname.startsWith('/admin/management') ? 'bg-primary-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                  Management
                </Link>
              <Link
                href="/admin/policies"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                  pathname.startsWith('/admin/policies') ? 'bg-primary-600' : 'hover:bg-gray-700'
                }`}
              >
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                Policies
              </Link>
              <Link
                href="/admin/settings"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                  pathname.startsWith('/admin/settings') ? 'bg-primary-600' : 'hover:bg-gray-700'
                }`}
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                Settings
              </Link>
            </nav>
            </div>
            <div className="mt-auto p-4 sm:p-6 border-t border-gray-700">
              <div className="mb-4">
                <p className="text-xs sm:text-sm text-gray-400">Logged in as</p>
                <p className="font-medium text-sm sm:text-base">{user?.username}</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center w-full px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 text-sm sm:text-base"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 w-full lg:w-auto p-4 sm:p-6 lg:p-8">
          {/* Mobile header with menu button */}
          <div className="lg:hidden mb-4 flex items-center justify-between bg-white rounded-lg shadow p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Padma Navigation Logo"
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="text-sm font-bold text-gray-800">Admin Panel</span>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
