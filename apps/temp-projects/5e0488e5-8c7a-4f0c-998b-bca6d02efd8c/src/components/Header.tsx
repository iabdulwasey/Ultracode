import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  onSignIn: () => void;
  isLoggedIn: boolean;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignIn, isLoggedIn, onSignOut }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <h1 className="text-netflix-red text-2xl md:text-3xl font-bold cursor-pointer">
            NETFLIX
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-white hover:text-gray-300 transition-colors duration-200 text-sm"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Search className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition-colors" />
              <Bell className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition-colors" />
              
              {/* Profile Menu */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                    alt="Profile"
                    className="w-8 h-8 rounded"
                  />
                  <ChevronDown className={`w-4 h-4 text-white transition-transform ${
                    showProfileMenu ? 'rotate-180' : ''
                  }`} />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-gray-600 rounded shadow-lg">
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">Manage Profiles</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">Account</a>
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">Help Center</a>
                      <hr className="border-gray-600 my-2" />
                      <button
                        onClick={onSignOut}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={onSignIn}
              className="netflix-button text-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-black/95 border-t border-gray-800">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-white hover:text-gray-300 transition-colors duration-200"
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