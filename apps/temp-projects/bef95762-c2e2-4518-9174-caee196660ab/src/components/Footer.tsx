import React from 'react';
import { Trophy, Heart, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Football Stats Hub</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your ultimate destination for comprehensive football statistics, player profiles, 
              and league tables. Stay updated with the latest performance data from top leagues worldwide.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  League Tables
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Player Stats
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Player Profiles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Key Statistics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Top Performers
                </a>
              </li>
            </ul>
          </div>

          {/* Leagues */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Leagues</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Premier League
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  La Liga
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Serie A
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Bundesliga
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Ligue 1
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-300 mb-4 md:mb-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for football fans worldwide</span>
            </div>
            <div className="text-gray-300 text-sm">
              © {currentYear} Football Stats Hub. All rights reserved.
            </div>
          </div>
        </div>

        {/* Data Disclaimer */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            Statistics are updated regularly and sourced from official league data. 
            All player images are for demonstration purposes. Season 2023/24 data.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;