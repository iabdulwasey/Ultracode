import React, { useState } from 'react';
import { Target, Trophy, Clock, Users, TrendingUp, Award } from 'lucide-react';

interface PlayerStat {
  id: number;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  minutesPlayed: number;
  appearances: number;
  shotsOnTarget: number;
  passAccuracy: number;
  imageUrl: string;
}

const PlayerStats: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'goals' | 'assists' | 'shots' | 'passes'>('goals');

  const playerStats: PlayerStat[] = [
    {
      id: 1,
      name: 'Erling Haaland',
      team: 'Manchester City',
      position: 'Forward',
      goals: 36,
      assists: 8,
      minutesPlayed: 2769,
      appearances: 35,
      shotsOnTarget: 67,
      passAccuracy: 82,
      imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Harry Kane',
      team: 'Tottenham',
      position: 'Forward',
      goals: 30,
      assists: 3,
      minutesPlayed: 3240,
      appearances: 38,
      shotsOnTarget: 89,
      passAccuracy: 78,
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Ivan Toney',
      team: 'Brentford',
      position: 'Forward',
      goals: 21,
      assists: 5,
      minutesPlayed: 2890,
      appearances: 33,
      shotsOnTarget: 45,
      passAccuracy: 75,
      imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=600&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Kevin De Bruyne',
      team: 'Manchester City',
      position: 'Midfielder',
      goals: 7,
      assists: 16,
      minutesPlayed: 2134,
      appearances: 25,
      shotsOnTarget: 23,
      passAccuracy: 91,
      imageUrl: 'https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=400&h=600&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Bruno Fernandes',
      team: 'Manchester United',
      position: 'Midfielder',
      goals: 8,
      assists: 8,
      minutesPlayed: 2987,
      appearances: 35,
      shotsOnTarget: 34,
      passAccuracy: 84,
      imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=600&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Leandro Trossard',
      team: 'Arsenal',
      position: 'Forward',
      goals: 12,
      assists: 2,
      minutesPlayed: 1876,
      appearances: 25,
      shotsOnTarget: 28,
      passAccuracy: 87,
      imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=600&fit=crop&crop=face'
    },
    {
      id: 7,
      name: 'Bukayo Saka',
      team: 'Arsenal',
      position: 'Forward',
      goals: 14,
      assists: 11,
      minutesPlayed: 3156,
      appearances: 37,
      shotsOnTarget: 42,
      passAccuracy: 83,
      imageUrl: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=600&fit=crop&crop=face'
    },
    {
      id: 8,
      name: 'Marcus Rashford',
      team: 'Manchester United',
      position: 'Forward',
      goals: 17,
      assists: 5,
      minutesPlayed: 2678,
      appearances: 31,
      shotsOnTarget: 51,
      passAccuracy: 79,
      imageUrl: 'https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?w=400&h=600&fit=crop&crop=face'
    }
  ];

  const getSortedPlayers = () => {
    return [...playerStats].sort((a, b) => {
      switch (selectedCategory) {
        case 'goals': return b.goals - a.goals;
        case 'assists': return b.assists - a.assists;
        case 'shots': return b.shotsOnTarget - a.shotsOnTarget;
        case 'passes': return b.passAccuracy - a.passAccuracy;
        default: return 0;
      }
    });
  };

  const getStatValue = (player: PlayerStat) => {
    switch (selectedCategory) {
      case 'goals': return player.goals;
      case 'assists': return player.assists;
      case 'shots': return player.shotsOnTarget;
      case 'passes': return `${player.passAccuracy}%`;
      default: return 0;
    }
  };

  const getStatIcon = () => {
    switch (selectedCategory) {
      case 'goals': return Trophy;
      case 'assists': return Target;
      case 'shots': return TrendingUp;
      case 'passes': return Award;
      default: return Trophy;
    }
  };

  const StatIcon = getStatIcon();
  const sortedPlayers = getSortedPlayers();

  const categories = [
    { id: 'goals' as const, label: 'Top Scorers', icon: Trophy },
    { id: 'assists' as const, label: 'Most Assists', icon: Target },
    { id: 'shots' as const, label: 'Shots on Target', icon: TrendingUp },
    { id: 'passes' as const, label: 'Pass Accuracy', icon: Award },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="h-7 w-7 text-blue-500 mr-3" />
            Player Statistics
          </h2>
          <div className="text-sm text-gray-600">
            Season 2023/24
          </div>
        </div>

        {/* Category Selector */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Rankings */}
        <div className="space-y-4">
          {sortedPlayers.map((player, index) => (
            <div key={player.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-6">
                {/* Ranking */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>

                {/* Player Image */}
                <div className="flex-shrink-0">
                  <img 
                    src={player.imageUrl} 
                    alt={player.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>

                {/* Player Info */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{player.name}</h3>
                  <p className="text-gray-600 mb-2">{player.team} • {player.position}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{player.appearances} apps</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{Math.round(player.minutesPlayed / 60)} hrs</span>
                    </div>
                  </div>
                </div>

                {/* Main Stat */}
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <StatIcon className="h-6 w-6 text-blue-500" />
                    <span className="text-3xl font-bold text-gray-900">
                      {getStatValue(player)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 capitalize">
                    {selectedCategory === 'passes' ? 'Accuracy' : selectedCategory}
                  </p>
                </div>

                {/* Additional Stats */}
                <div className="hidden lg:block flex-shrink-0 text-right text-sm">
                  <div className="space-y-1">
                    {selectedCategory !== 'goals' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Goals:</span>
                        <span className="font-semibold">{player.goals}</span>
                      </div>
                    )}
                    {selectedCategory !== 'assists' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assists:</span>
                        <span className="font-semibold">{player.assists}</span>
                      </div>
                    )}
                    {selectedCategory !== 'passes' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pass Acc:</span>
                        <span className="font-semibold">{player.passAccuracy}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {sortedPlayers.reduce((sum, player) => sum + player.goals, 0)}
            </div>
            <p className="text-sm text-gray-600">Total Goals</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {sortedPlayers.reduce((sum, player) => sum + player.assists, 0)}
            </div>
            <p className="text-sm text-gray-600">Total Assists</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {sortedPlayers.reduce((sum, player) => sum + player.shotsOnTarget, 0)}
            </div>
            <p className="text-sm text-gray-600">Shots on Target</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center">
            <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(sortedPlayers.reduce((sum, player) => sum + player.passAccuracy, 0) / sortedPlayers.length)}%
            </div>
            <p className="text-sm text-gray-600">Avg Pass Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;