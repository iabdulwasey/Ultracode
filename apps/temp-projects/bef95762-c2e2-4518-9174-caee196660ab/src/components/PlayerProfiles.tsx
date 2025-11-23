import React, { useState } from 'react';
import { Users, Search, Filter, Trophy, Target, Clock, AlertTriangle, Star, Award, TrendingUp, MapPin } from 'lucide-react';

interface PlayerProfile {
  id: number;
  name: string;
  position: string;
  team: string;
  league: string;
  nationality: string;
  age: number;
  height: string;
  weight: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  appearances: number;
  shotsOnTarget: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  cleanSheets?: number;
  saves?: number;
  marketValue: string;
  imageUrl: string;
  rating: number;
}

const PlayerProfiles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'goals' | 'assists' | 'marketValue'>('rating');

  const playerProfiles: PlayerProfile[] = [
    {
      id: 1,
      name: 'Erling Haaland',
      position: 'Forward',
      team: 'Manchester City',
      league: 'Premier League',
      nationality: 'Norway',
      age: 23,
      height: '1.94m',
      weight: '88kg',
      goals: 36,
      assists: 8,
      yellowCards: 3,
      redCards: 0,
      minutesPlayed: 2769,
      appearances: 35,
      shotsOnTarget: 67,
      passAccuracy: 82,
      tackles: 12,
      interceptions: 5,
      marketValue: '€180M',
      imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face',
      rating: 9.2
    },
    {
      id: 2,
      name: 'Kylian Mbappé',
      position: 'Forward',
      team: 'PSG',
      league: 'Ligue 1',
      nationality: 'France',
      age: 24,
      height: '1.78m',
      weight: '73kg',
      goals: 29,
      assists: 5,
      yellowCards: 4,
      redCards: 0,
      minutesPlayed: 2456,
      appearances: 34,
      shotsOnTarget: 58,
      passAccuracy: 85,
      tackles: 8,
      interceptions: 3,
      marketValue: '€160M',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face',
      rating: 9.0
    },
    {
      id: 3,
      name: 'Kevin De Bruyne',
      position: 'Midfielder',
      team: 'Manchester City',
      league: 'Premier League',
      nationality: 'Belgium',
      age: 32,
      height: '1.81m',
      weight: '70kg',
      goals: 7,
      assists: 16,
      yellowCards: 4,
      redCards: 0,
      minutesPlayed: 2134,
      appearances: 25,
      shotsOnTarget: 23,
      passAccuracy: 91,
      tackles: 34,
      interceptions: 28,
      marketValue: '€85M',
      imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=600&fit=crop&crop=face',
      rating: 8.8
    },
    {
      id: 4,
      name: 'Virgil van Dijk',
      position: 'Defender',
      team: 'Liverpool',
      league: 'Premier League',
      nationality: 'Netherlands',
      age: 32,
      height: '1.93m',
      weight: '92kg',
      goals: 3,
      assists: 1,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 3154,
      appearances: 35,
      shotsOnTarget: 8,
      passAccuracy: 89,
      tackles: 45,
      interceptions: 67,
      marketValue: '€45M',
      imageUrl: 'https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=400&h=600&fit=crop&crop=face',
      rating: 8.5
    },
    {
      id: 5,
      name: 'Alisson Becker',
      position: 'Goalkeeper',
      team: 'Liverpool',
      league: 'Premier League',
      nationality: 'Brazil',
      age: 30,
      height: '1.91m',
      weight: '91kg',
      goals: 0,
      assists: 0,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 3240,
      appearances: 36,
      shotsOnTarget: 0,
      passAccuracy: 78,
      tackles: 2,
      interceptions: 8,
      cleanSheets: 20,
      saves: 98,
      marketValue: '€55M',
      imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=600&fit=crop&crop=face',
      rating: 8.3
    },
    {
      id: 6,
      name: 'Pedri',
      position: 'Midfielder',
      team: 'Barcelona',
      league: 'La Liga',
      nationality: 'Spain',
      age: 20,
      height: '1.74m',
      weight: '60kg',
      goals: 3,
      assists: 6,
      yellowCards: 7,
      redCards: 0,
      minutesPlayed: 2456,
      appearances: 30,
      shotsOnTarget: 15,
      passAccuracy: 93,
      tackles: 42,
      interceptions: 35,
      marketValue: '€100M',
      imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=600&fit=crop&crop=face',
      rating: 8.7
    },
    {
      id: 7,
      name: 'Victor Osimhen',
      position: 'Forward',
      team: 'Napoli',
      league: 'Serie A',
      nationality: 'Nigeria',
      age: 24,
      height: '1.85m',
      weight: '81kg',
      goals: 26,
      assists: 4,
      yellowCards: 5,
      redCards: 0,
      minutesPlayed: 2687,
      appearances: 32,
      shotsOnTarget: 52,
      passAccuracy: 76,
      tackles: 15,
      interceptions: 8,
      marketValue: '€120M',
      imageUrl: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=600&fit=crop&crop=face',
      rating: 8.9
    },
    {
      id: 8,
      name: 'Jude Bellingham',
      position: 'Midfielder',
      team: 'Borussia Dortmund',
      league: 'Bundesliga',
      nationality: 'England',
      age: 19,
      height: '1.86m',
      weight: '75kg',
      goals: 8,
      assists: 3,
      yellowCards: 6,
      redCards: 0,
      minutesPlayed: 2134,
      appearances: 28,
      shotsOnTarget: 18,
      passAccuracy: 87,
      tackles: 52,
      interceptions: 41,
      marketValue: '€90M',
      imageUrl: 'https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?w=400&h=600&fit=crop&crop=face',
      rating: 8.6
    }
  ];

  const leagues = ['all', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'];
  const positions = ['all', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper'];

  const filteredPlayers = playerProfiles
    .filter(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLeague === 'all' || player.league === selectedLeague) &&
      (selectedPosition === 'all' || player.position === selectedPosition)
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'goals') return b.goals - a.goals;
      if (sortBy === 'assists') return b.assists - a.assists;
      if (sortBy === 'marketValue') {
        const aValue = parseInt(a.marketValue.replace(/[€M]/g, ''));
        const bValue = parseInt(b.marketValue.replace(/[€M]/g, ''));
        return bValue - aValue;
      }
      return 0;
    });

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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="h-7 w-7 text-blue-500 mr-3" />
            Player Profiles
          </h2>
          <div className="text-sm text-gray-600">
            Season 2023/24 • {filteredPlayers.length} players
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {leagues.map(league => (
                <option key={league} value={league}>
                  {league === 'all' ? 'All Leagues' : league}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {positions.map(position => (
                <option key={position} value={position}>
                  {position === 'all' ? 'All Positions' : position}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'goals' | 'assists' | 'marketValue')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="goals">Sort by Goals</option>
              <option value="assists">Sort by Assists</option>
              <option value="marketValue">Sort by Market Value</option>
            </select>
          </div>
        </div>

        {/* Player Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Player Image */}
              <div className="relative">
                <img 
                  src={player.imageUrl} 
                  alt={player.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRatingColor(player.rating)}`}>
                    ★ {player.rating}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPositionColor(player.position)}`}>
                    {player.position}
                  </span>
                </div>
              </div>

              {/* Player Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{player.name}</h3>
                  <p className="text-gray-600 font-medium">{player.team}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{player.nationality} • {player.age} years</span>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-3">
                    <div className="flex items-center justify-center mb-1">
                      <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-2xl font-bold text-gray-900">{player.goals}</span>
                    </div>
                    <p className="text-xs text-gray-600">Goals</p>
                  </div>
                  <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3">
                    <div className="flex items-center justify-center mb-1">
                      <Target className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-2xl font-bold text-gray-900">{player.assists}</span>
                    </div>
                    <p className="text-xs text-gray-600">Assists</p>
                  </div>
                </div>

                {/* Physical Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs">
                  <div>
                    <div className="font-semibold text-gray-900">{player.height}</div>
                    <div className="text-gray-600">Height</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{player.weight}</div>
                    <div className="text-gray-600">Weight</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{player.appearances}</div>
                    <div className="text-gray-600">Apps</div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pass Accuracy</span>
                    <span className="font-semibold">{player.passAccuracy}%</span>
                  </div>
                  {player.position === 'Goalkeeper' ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Clean Sheets</span>
                        <span className="font-semibold">{player.cleanSheets}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Saves</span>
                        <span className="font-semibold">{player.saves}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shots on Target</span>
                        <span className="font-semibold">{player.shotsOnTarget}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tackles</span>
                        <span className="font-semibold">{player.tackles}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Market Value */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Market Value</span>
                    <span className="text-lg font-bold text-green-600">{player.marketValue}</span>
                  </div>
                </div>

                {/* Cards */}
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-sm mr-1"></div>
                    <span className="text-sm font-semibold">{player.yellowCards}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-sm mr-1"></div>
                    <span className="text-sm font-semibold">{player.redCards}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No players found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerProfiles;