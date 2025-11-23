import React, { useState } from 'react';
import { Star, Trophy, Target, Shield, Award, TrendingUp, Crown } from 'lucide-react';

interface TopPerformer {
  id: number;
  name: string;
  team: string;
  position: string;
  category: string;
  value: number | string;
  imageUrl: string;
  rating: number;
  description: string;
}

const TopPerformers: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('overall');

  const topPerformers: TopPerformer[] = [
    {
      id: 1,
      name: 'Erling Haaland',
      team: 'Manchester City',
      position: 'Forward',
      category: 'goals',
      value: 36,
      imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face',
      rating: 9.2,
      description: 'Leading goalscorer across all competitions'
    },
    {
      id: 2,
      name: 'Kevin De Bruyne',
      team: 'Manchester City',
      position: 'Midfielder',
      category: 'assists',
      value: 16,
      imageUrl: 'https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=400&h=600&fit=crop&crop=face',
      rating: 8.8,
      description: 'Most assists and key passes created'
    },
    {
      id: 3,
      name: 'Virgil van Dijk',
      team: 'Liverpool',
      position: 'Defender',
      category: 'defense',
      value: '94%',
      imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=600&fit=crop&crop=face',
      rating: 8.5,
      description: 'Highest defensive success rate'
    },
    {
      id: 4,
      name: 'Alisson Becker',
      team: 'Liverpool',
      position: 'Goalkeeper',
      category: 'saves',
      value: 98,
      imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=600&fit=crop&crop=face',
      rating: 8.3,
      description: 'Most saves and clean sheets'
    },
    {
      id: 5,
      name: 'Bukayo Saka',
      team: 'Arsenal',
      position: 'Forward',
      category: 'overall',
      value: '8.7',
      imageUrl: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=600&fit=crop&crop=face',
      rating: 8.7,
      description: 'Consistent top performer with goals and assists'
    },
    {
      id: 6,
      name: 'Pedri',
      team: 'Barcelona',
      position: 'Midfielder',
      category: 'passes',
      value: '93%',
      imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=600&fit=crop&crop=face',
      rating: 8.7,
      description: 'Highest pass accuracy in midfield'
    }
  ];

  const categories = [
    { id: 'overall', label: 'Overall Rating', icon: Crown },
    { id: 'goals', label: 'Top Scorers', icon: Trophy },
    { id: 'assists', label: 'Playmakers', icon: Target },
    { id: 'defense', label: 'Defenders', icon: Shield },
    { id: 'saves', label: 'Goalkeepers', icon: Award },
    { id: 'passes', label: 'Passers', icon: TrendingUp }
  ];

  const filteredPerformers = selectedCategory === 'overall' 
    ? topPerformers.sort((a, b) => b.rating - a.rating)
    : topPerformers.filter(player => player.category === selectedCategory);

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Forward': return 'bg-red-100 text-red-800';
      case 'Midfielder': return 'bg-blue-100 text-blue-800';
      case 'Defender': return 'bg-green-100 text-green-800';
      case 'Goalkeeper': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9.0) return 'text-green-600 bg-green-100';
    if (rating >= 8.5) return 'text-blue-600 bg-blue-100';
    if (rating >= 8.0) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'goals': return Trophy;
      case 'assists': return Target;
      case 'defense': return Shield;
      case 'saves': return Award;
      case 'passes': return TrendingUp;
      default: return Star;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Star className="h-7 w-7 text-yellow-500 mr-3" />
            Top Performers
          </h2>
          <div className="text-sm text-gray-600">
            Season 2023/24 • Elite Players
          </div>
        </div>

        {/* Category Selector */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Performers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPerformers.map((performer, index) => {
            const CategoryIcon = getCategoryIcon(performer.category);
            return (
              <div key={performer.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>

                {/* Player Image */}
                <div className="relative">
                  <img 
                    src={performer.imageUrl} 
                    alt={performer.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRatingColor(performer.rating)}`}>
                      ★ {performer.rating}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPositionColor(performer.position)}`}>
                      {performer.position}
                    </span>
                  </div>
                </div>

                {/* Player Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{performer.name}</h3>
                    <p className="text-gray-600 font-medium">{performer.team}</p>
                  </div>

                  {/* Performance Stat */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {performer.category === 'overall' ? 'Rating' : performer.category}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {performer.value}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {performer.description}
                  </p>

                  {/* Achievement Badge */}
                  <div className="mt-4 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Crown className="h-3 w-3" />
                      <span>TOP PERFORMER</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPerformers.length === 0 && (
          <div className="text-center py-12">
            <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No performers found in this category.</p>
          </div>
        )}

        {/* Performance Summary */}
        <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 text-indigo-500 mr-2" />
            Performance Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-1">6</div>
              <p className="text-sm text-gray-600">Elite Performers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">8.6</div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 mb-1">5</div>
              <p className="text-sm text-gray-600">Categories Covered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;