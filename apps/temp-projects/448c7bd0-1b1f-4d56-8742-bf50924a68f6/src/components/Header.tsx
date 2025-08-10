import React from 'react';
import { User, Bell, Menu, Crown, Zap } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
  onShowNotifications: () => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLogin, 
  onLogout, 
  onShowNotifications, 
  onToggleSidebar 
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-saudi-green/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-saudi-green/10 transition-colors"
            >
              <Menu className="w-6 h-6 text-saudi-green" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-saudi-green to-green-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-saudi-gold" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-saudi-green">ساحة المعرفة</h1>
                <p className="text-xs text-gray-600">Knowledge Arena</p>
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Level and XP */}
                <div className="hidden sm:flex items-center gap-2 bg-saudi-gold/10 px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4 text-saudi-gold" />
                  <span className="text-sm font-medium">المستوى {user.level}</span>
                </div>

                {/* Notifications */}
                <button
                  onClick={onShowNotifications}
                  className="relative p-2 rounded-lg hover:bg-saudi-green/10 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-900">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.totalScore} نقطة</p>
                  </div>
                  <div className="relative">
                    <button className="w-10 h-10 bg-saudi-green rounded-full flex items-center justify-center text-white font-medium hover:bg-saudi-green/90 transition-colors">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
                      ) : (
                        <span>{user.username.charAt(0).toUpperCase()}</span>
                      )}
                    </button>
                    {/* Dropdown would go here */}
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-sm text-gray-600 hover:text-saudi-green transition-colors"
                  >
                    خروج
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="bg-saudi-green text-white px-6 py-2 rounded-lg font-medium hover:bg-saudi-green/90 transition-colors"
              >
                تسجيل الدخول
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;