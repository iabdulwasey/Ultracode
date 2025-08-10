import React, { useState } from 'react';
import { Trophy, Crown, Medal, Star, TrendingUp, Users, Calendar } from 'lucide-react';
import { mockUsers, mockCategories } from '../data/mockData';

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'category' | 'weekly'>('global');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock leaderboard data
  const getLeaderboardData = () => {
    return mockUsers.map((user, index) => ({
      rank: index + 1,
      user,
      score: user.totalScore,
      gamesPlayed: user.gamesPlayed,
      winRate: user.winRate
    })).sort((a, b) => b.score - a.score);
  };

  const leaderboardData = getLeaderboardData();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
        2: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white',
        3: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white'
      };
      return colors[rank as keyof typeof colors];
    }
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-saudi-green to-green-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">لوحة المتصدرين</h1>
            <p className="text-saudi-gold/90">تابع ترتيبك وتنافس مع أفضل اللاعبين</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-saudi-gold" />
              <div className="text-sm">موسم المعرفة</div>
              <div className="text-xs text-saudi-gold/80">ديسمبر 2024</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'global', label: 'الترتيب العام', icon: Trophy },
            { id: 'category', label: 'حسب التصنيف', icon: Star },
            { id: 'weekly', label: 'الأسبوعي', icon: Calendar }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-saudi-green border-b-2 border-saudi-green bg-saudi-green/5'
                    : 'text-gray-600 hover:text-saudi-green'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Category Filter */}
        {activeTab === 'category' && (
          <div className="p-4 border-b border-gray-200">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
            >
              <option value="all">جميع التصنيفات</option>
              {mockCategories.map(category => (
                <option key={category.id} value={category.id}>{category.nameAr}</option>
              ))}
            </select>
          </div>
        )}

        {/* Top 3 Podium */}
        <div className="p-6 bg-gradient-to-br from-saudi-green/5 to-saudi-gold/5">
          <div className="flex justify-center items-end gap-8 mb-8">
            {leaderboardData.slice(0, 3).map((entry, index) => {
              const positions = [1, 0, 2]; // Center first, left second, right third
              const actualIndex = positions.indexOf(index);
              const heights = ['h-32', 'h-40', 'h-28'];
              
              return (
                <div key={entry.user.id} className="text-center">
                  <div className={`${getRankBadge(entry.rank)} ${heights[actualIndex]} w-24 rounded-t-xl flex flex-col justify-end p-4 mb-4`}>
                    <div className="text-2xl font-bold mb-1">{entry.rank}</div>
                    <div className="text-xs opacity-80">المركز</div>
                  </div>
                  <div className="w-16 h-16 bg-saudi-green rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl">
                    {entry.user.username.charAt(0)}
                  </div>
                  <div className="font-semibold text-gray-900">{entry.user.username}</div>
                  <div className="text-sm text-saudi-gold font-medium">{entry.score.toLocaleString()} نقطة</div>
                  <div className="text-xs text-gray-600">{entry.winRate}% معدل الفوز</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">الترتيب الكامل</h3>
          <div className="space-y-3">
            {leaderboardData.map((entry, index) => (
              <div
                key={entry.user.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  index < 3
                    ? 'bg-gradient-to-r from-saudi-green/10 to-saudi-gold/10 border-saudi-green/20'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12">
                  {getRankIcon(entry.rank)}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-saudi-green rounded-full flex items-center justify-center text-white font-bold">
                    {entry.user.username.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{entry.user.username}</div>
                    <div className="text-sm text-gray-600">المستوى {entry.user.level} • {entry.user.region}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-8 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-saudi-green">{entry.score.toLocaleString()}</div>
                    <div className="text-gray-600">النقاط</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{entry.gamesPlayed}</div>
                    <div className="text-gray-600">مباراة</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">{entry.winRate}%</div>
                    <div className="text-gray-600">فوز</div>
                  </div>
                </div>

                {/* Trend */}
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+{Math.floor(Math.random() * 50) + 10}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">12,847</div>
              <div className="text-sm text-gray-600">إجمالي اللاعبين</div>
            </div>
          </div>
          <div className="text-sm text-green-600">
            <TrendingUp className="w-4 h-4 inline mr-1" />
            +15% هذا الشهر
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">2,456</div>
              <div className="text-sm text-gray-600">مباريات اليوم</div>
            </div>
          </div>
          <div className="text-sm text-green-600">
            <TrendingUp className="w-4 h-4 inline mr-1" />
            +8% من أمس
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">156,890</div>
              <div className="text-sm text-gray-600">نقطة موزعة اليوم</div>
            </div>
          </div>
          <div className="text-sm text-green-600">
            <TrendingUp className="w-4 h-4 inline mr-1" />
            رقم قياسي جديد!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;