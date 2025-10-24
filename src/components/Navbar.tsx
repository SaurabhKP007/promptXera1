import { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', value: 'home' },
    { label: 'AI Tools', value: 'tools' },
    { label: 'Practice Prompt', value: 'practice' },
    { label: 'Tutorial', value: 'tutorial' },
    { label: 'Prompt Legends', value: 'legends' },
  ];

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              onNavigate('home');
              setMenuOpen(false);
            }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-pink-500 to-yellow-400 rounded-lg flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-lg">PX</span>
              </div>
              <div className="absolute inset-0 blur-xl bg-gradient-to-br from-cyan-400 via-pink-500 to-yellow-400 opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              PromptXera
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map(item => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${
                  currentPage === item.value
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item.label}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-300 ${
                    currentPage === item.value
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                ></div>
              </button>
            ))}
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 border-t border-cyan-500/20 backdrop-blur-lg">
          <div className="flex flex-col items-center py-4 space-y-2">
            {menuItems.map(item => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setMenuOpen(false);
                }}
                className={`w-full text-center py-2 font-medium transition-all ${
                  currentPage === item.value
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
