import React from 'react';
import { Film, User, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">CinemaBook</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Movies</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Theaters</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Offers</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Events</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search movies..."
                className="pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;