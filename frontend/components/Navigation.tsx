'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Navigation = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Check if user is logged in by checking localStorage
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        setUser(!!token);
      }
    };

    checkAuth();

    // Listen for storage changes (e.g., when logging in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    // Also check on pathname change (in case login happens on same tab)
    checkAuth();

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [pathname]);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setUser(false);
      window.location.href = '/';
    }
  };

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/launches', label: 'Launches' },
    { href: '/routes', label: 'Routes & Schedules' },
    { href: '/booking', label: 'Booking' },
    { href: '/management', label: 'Our Management' },
    { href: '/policies', label: 'Policies' },
  ];

  return (
    <nav className="bg-gradient-to-br from-[#0a1929] via-[#1a2332] to-[#0a1929] shadow-2xl border-b border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link href="/" className="flex items-center group">
              <div className="relative flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Padma Navigation Logo"
                  width={50}
                  height={50}
                  className="w-10 h-10 md:w-14 md:h-14 transition-transform group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="ml-2 md:ml-3 text-sm sm:text-base md:text-2xl font-display font-bold text-white tracking-tight whitespace-nowrap">
                <span className="text-[#d4af37]">Padma</span> <span className="inline">Navigation</span>
              </span>
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:whitespace-nowrap lg:flex-nowrap lg:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center px-2 md:px-2.5 py-2 text-xs md:text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                  isActive(link.href)
                    ? 'text-[#d4af37] border-b-2 border-[#d4af37]'
                    : 'text-white/90 hover:text-[#d4af37] hover:bg-white/5 border-b-2 border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:items-center lg:flex-shrink-0 lg:ml-4">
            {user ? (
              <div className="flex items-center space-x-2 md:space-x-4">
                <Link
                  href="/admin"
                  className="text-white/90 hover:text-[#d4af37] px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors duration-300"
                >
                  Admin
                </Link>
                <button
                  onClick={logout}
                  className="bg-[#d4af37] text-[#0a1929] px-4 md:px-6 py-2 md:py-2.5 rounded-md text-xs md:text-sm font-semibold hover:bg-[#b8941d] hover:shadow-lg transition-all duration-300 tracking-wide"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="bg-[#d4af37] text-[#0a1929] px-4 md:px-6 py-2 md:py-2.5 rounded-md text-xs md:text-sm font-semibold hover:bg-[#b8941d] hover:shadow-lg transition-all duration-300 tracking-wide whitespace-nowrap"
              >
                Admin Login
              </Link>
            )}
          </div>
          <div className="lg:hidden flex items-center ml-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:text-[#d4af37] hover:bg-white/10 touch-manipulation"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-br from-[#0a1929] via-[#1a2332] to-[#0a1929] border-t border-[#d4af37]/20">
          <div className="pt-2 pb-4 space-y-1 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block pl-4 pr-4 py-3 border-l-4 text-base font-medium transition-colors touch-manipulation ${
                  isActive(link.href)
                    ? 'border-[#d4af37] text-[#d4af37] bg-white/5'
                    : 'border-transparent text-white/90 active:bg-white/5 active:border-[#d4af37]/50 active:text-[#d4af37]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Admin and Logout links for mobile */}
            {user ? (
              <>
                <div className="border-t border-white/10 my-2"></div>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-4 pr-4 py-3 border-l-4 border-transparent text-base font-medium text-white/90 active:bg-white/5 active:border-[#d4af37]/50 active:text-[#d4af37] touch-manipulation"
                >
                  Admin
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left pl-4 pr-4 py-3 border-l-4 border-transparent text-base font-medium text-white/90 active:bg-white/5 active:border-[#d4af37]/50 active:text-[#d4af37] touch-manipulation"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-white/10 my-2"></div>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-4 pr-4 py-3 border-l-4 border-transparent text-base font-medium text-[#d4af37] bg-white/5 active:bg-white/10 active:border-[#d4af37] touch-manipulation"
                >
                  Admin Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
