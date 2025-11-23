import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Languages'];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <h1 className="text-netflix-red text-2xl md:text-3xl font-bold">NETFLIX</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-white hover:text-gray-300 transition-colors text-sm"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center bg-black/70 border border-white rounded px-3 py-1">
                <Search className="w-4 h-4 text-white mr-2" />
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 outline-none w-48"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                  className="ml-2 text-white hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Notifications */}
          <button className="text-white hover:text-gray-300 transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-netflix-red rounded flex items-center justify-center">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
            <ChevronDown className="w-4 h-4 text-white hidden md:block" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden text-white hover:text-gray-300 transition-colors"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-netflix-black border-t border-gray-800">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-white hover:text-gray-300 transition-colors text-sm"
                onClick={() => setShowMobileMenu(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;