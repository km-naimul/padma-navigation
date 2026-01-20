import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0a1929] via-[#1a2332] to-[#0a1929] border-t border-[#d4af37]/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="Padma Navigation Logo"
                width={40}
                height={40}
                className="mr-3 w-8 h-8 sm:w-10 sm:h-10"
              />
              <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-[#d4af37]">Padma Navigation Co.</h3>
            </Link>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Your trusted partner for safe and comfortable launch journeys.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-display font-semibold mb-4 sm:mb-6 text-[#d4af37]">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="/launches" className="text-sm sm:text-base text-white/80 hover:text-[#d4af37] transition-colors duration-300 touch-manipulation block">
                  Launches
                </a>
              </li>
              <li>
                <a href="/routes" className="text-sm sm:text-base text-white/80 hover:text-[#d4af37] transition-colors duration-300 touch-manipulation block">
                  Routes & Schedules
                </a>
              </li>
              <li>
                <a href="/booking" className="text-sm sm:text-base text-white/80 hover:text-[#d4af37] transition-colors duration-300 touch-manipulation block">
                  Booking
                </a>
              </li>
              <li>
                <a href="/management" className="text-sm sm:text-base text-white/80 hover:text-[#d4af37] transition-colors duration-300 touch-manipulation block">
                  Our Management
                </a>
              </li>
              <li>
                <a href="/policies" className="text-sm sm:text-base text-white/80 hover:text-[#d4af37] transition-colors duration-300 touch-manipulation block">
                  Policies
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-display font-semibold mb-4 sm:mb-6 text-[#d4af37]">Contact</h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              For booking inquiries, please visit our booking page or contact us directly.
            </p>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-[#d4af37]/20 text-center text-white/60">
          <p className="text-xs sm:text-sm md:text-base font-medium">&copy; {new Date().getFullYear()} Padma Navigation Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
