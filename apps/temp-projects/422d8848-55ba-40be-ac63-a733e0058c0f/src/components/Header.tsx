import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import TripPlanner from './TripPlanner';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTripPlannerOpen, setIsTripPlannerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Culture', href: '#culture' },
    { label: 'Seasons', href: '#seasons' },
    { label: 'Travel Tips', href: '#tips' },
    { label: 'Gallery', href: '#gallery' },
  ];

  const handlePlanTripClick = () => {
    setIsTripPlannerOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-japan-red to-japan-cherry rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Explore Japan</h1>
                <p className="text-xs text-muted-foreground">Land of Rising Sun</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-japan-red transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button 
                onClick={handlePlanTripClick}
                className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Plan Your Trip
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-slide-up">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-foreground hover:text-japan-red transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <button 
                  onClick={handlePlanTripClick}
                  className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-6 py-2 rounded-full mt-4 hover:shadow-lg transition-all duration-300"
                >
                  Plan Your Trip
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Trip Planner Modal */}
      <TripPlanner 
        isOpen={isTripPlannerOpen} 
        onClose={() => setIsTripPlannerOpen(false)} 
      />
    </>
  );
};

export default Header;