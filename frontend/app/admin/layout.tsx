'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { LayoutDashboard, Plus, Settings, LogOut, Ship, BookOpen, Users, FileText } from 'lucide-react';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) return <Loading />;
  if (!user && pathname !== '/admin/login') return null;

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white min-h-screen">
          <div className="p-6">
            <div className="flex items-center mb-8">
              <Image
                src="/logo.png"
                alt="Padma Navigation Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
            <nav className="space-y-2">
              <Link
                href="/admin"
                className={`flex items-center px-4 py-2 rounded-lg ${
                  pathname === '/admin' ? 'bg-primary-600' : 'hover:bg-gray-700'
                }`}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
              <Link
                href="/admin/launches"
                className={`flex items-center px-4 py-2 rounded-lg ${
                  pathname.startsWith('/admin/launches') ? 'bg-primary-600' : 'hover:bg-gray-700'
                }`}
              >
                <Ship className="h-5 w-5 mr-3" />
                Launches
              </Link>
              <Link
                href="/admin/routes"
                className={`flex items-center px-4 py-2 rounded-lg ${
                  pathname.startsWith('/admin/routes') ? 'bg-primary-600' : 'hover:bg-gray-700'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Routes
              </Link>
              <Link
                href="/admin/ghats"
                className={`flex items-center px-4 py-2 rounded-lg ${
                  pathname.startsWith('/admin/ghats') ? 'bg-primary-600' : 'hover:bg-gray-700'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Ghats
              </Link>
              <Link
                href="/admin/booking"
                className={`flex items-center px-4 py-2 rounded-lg ${
                  pathname.startsWith('/admin/booking') ? 'bg-primary-600' : 'hover:bg-gray-700'
                }`}
              >
                <BookOpen className="h-5 w-5 mr-3" />
                Booking
              </Link>
              <Link
                href="/admin/management"
                className={`flex items-center px-4 py-2 rounded-lg ${
                  pathname.startsWith('/admin/management') ? 'bg-primary-600' : 'hover:bg-gray-700'
                }`}
              >
                <Users className="h-5 w-5 mr-3" />
                Management
              </Link>
              <Link
                href="/admin/policies"
                className={`flex items-center px-4 py-2 rounded-lg ${
                  pathname.startsWith('/admin/policies') ? 'bg-primary-600' : 'hover:bg-gray-700'
                }`}
              >
                <FileText className="h-5 w-5 mr-3" />
                Policies
              </Link>
            </nav>
          </div>
          <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
            <div className="mb-4">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-medium">{user?.username}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
