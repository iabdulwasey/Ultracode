import React from 'react';
import { Home, Trophy, Plus, Target, Users, User, X } from 'lucide-react';

type ActiveView = 'dashboard' | 'challenges' | 'create' | 'game' | 'leaderboard' | 'profile';

interface SidebarProps {
  isOpen: boolean;
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeView, onViewChange, onClose }) => {
  const menuItems = [
    { id: 'dashboard' as ActiveView, icon: Home, label: 'الرئيسية', labelEn: 'Dashboard' },
    { id: 'challenges' as ActiveView, icon: Target, label: 'التحديات', labelEn: 'Challenges' },
    { id: 'create' as ActiveView, icon: Plus, label: 'إنشاء تحدي', labelEn: 'Create Challenge' },
    { id: 'leaderboard' as ActiveView, icon: Trophy, label: 'المتصدرين', labelEn: 'Leaderboard' },
    { id: 'profile' as ActiveView, icon: User, label: 'الملف الشخصي', labelEn: 'Profile' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-white/95 backdrop-blur-sm border-l border-saudi-green/20 z-50
        transform transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4">
          {/* Close button for mobile */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-saudi-green">القائمة</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-saudi-green/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-all duration-200
                    ${isActive 
                      ? 'bg-saudi-green text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-saudi-green/10 hover:text-saudi-green'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.labelEn}</div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Stats Section */}
          <div className="mt-8 p-4 bg-gradient-to-br from-saudi-green/10 to-saudi-gold/10 rounded-xl">
            <h3 className="font-semibold text-saudi-green mb-3">إحصائيات سريعة</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">التحديات النشطة</span>
                <span className="font-medium text-saudi-green">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">اللاعبين المتصلين</span>
                <span className="font-medium text-saudi-green">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الجوائز اليومية</span>
                <span className="font-medium text-saudi-gold">50,000 ريال</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;