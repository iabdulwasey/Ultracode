import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TeamData {
  position: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
  logo: string;
}

interface League {
  id: string;
  name: string;
  country: string;
  season: string;
  teams: TeamData[];
}

const LeagueTables: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState('premier-league');

  const leagues: League[] = [
    {
      id: 'premier-league',
      name: 'Premier League',
      country: 'England',
      season: '2023/24',
      teams: [
        {
          position: 1,
          name: 'Manchester City',
          played: 38,
          won: 28,
          drawn: 7,
          lost: 3,
          goalsFor: 89,
          goalsAgainst: 34,
          goalDifference: 55,
          points: 91,
          form: ['W', 'W', 'D', 'W', 'W'],
          logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=50&h=50&fit=crop&crop=center'
        },
        {
          position: 2,
          name: 'Arsenal',
          played: 38,
          won: 26,
          drawn: 6,
          lost: 6,
          goalsFor: 91,
          goalsAgainst: 29,
          goalDifference: 62,
          points: 84,
          form: ['W', 'L', 'W', 'W', 'D'],
          logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=50&h=50&fit=crop&crop=center'
        },
        {
          position: 3,
          name: 'Liverpool',
          played: 38,
          won: 24,
          drawn: 10,
          lost: 4,
          goalsFor: 86,
          goalsAgainst: 41,
          goalDifference: 45,
          points: 82,
          form: ['W', 'W', 'D', 'W', 'L'],
          logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=50&h=50&fit=crop&crop=center'
        },
        {
          position: 4,
          name: 'Newcastle United',
          played: 38,
          won: 19,
          drawn: 14,
          lost: 5,
          goalsFor: 68,
          goalsAgainst: 33,
          goalDifference: 35,
          points: 71,
          form: ['D', 'W', 'D', 'W', 'W'],
          logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=50&h=50&fit=crop&crop=center'
        },
        {
          position: 5,
          name: 'Manchester United',
          played: 38,
          won: 23,
          drawn: 6,
          lost: 9,
          goalsFor: 58,
          goalsAgainst: 43,
          goalDifference: 15,
          points: 75,
          form: ['L', 'W', 'W', 'D', 'W'],
          logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=50&h=50&fit=crop&crop=center'
        }
      ]
    },
    {
      id: 'la-liga',
      name: 'La Liga',
      country: 'Spain',
      season: '2023/24',
      teams: [
        {
          position: 1,
          name: 'Barcelona',
          played: 38,
          won: 28,
          drawn: 4,
          lost: 6,
          goalsFor: 70,
          goalsAgainst: 20,
          goalDifference: 50,
          points: 88,
          form: ['W', 'W', 'W', 'D', 'W'],
          logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=50&h=50&fit=crop&crop=center'
        },
        {
          position: 2,
          name: 'Real Madrid',
          played: 38,
          won: 26,
          drawn: 8,
          lost: 4,
          goalsFor: 75,
          goalsAgainst: 36,
          goalDifference: 39,
          points: 86,
          form: ['W', 'D', 'W', 'W', 'W'],
          logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=50&h=50&fit=crop&crop=center'
        },
        {
          position: 3,
          name: 'Atletico Madrid',
          played: 38,
          won: 23,
          drawn: 11,
          lost: 4,
          goalsFor: 70,
          goalsAgainst: 33,
          goalDifference: 37,
          points: 80,
          form: ['D', 'W', 'W', 'D', 'W'],
          logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=50&h=50&fit=crop&crop=center'
        },
        {
          position: 4,
          name: 'Real Sociedad',
          played: 38,
          won: 20,
          drawn: 9,
          lost: 9,
          goalsFor: 51,
          goalsAgainst: 35,
          goalDifference: 16,
          points: 69,
          form: ['W', 'L', 'D', 'W', 'W'],
          logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=50&h=50&fit=crop&crop=center'
        },
        {
          position: 5,
          name: 'Villarreal',
          played: 38,
          won: 19,
          drawn: 7,
          lost: 12,
          goalsFor: 59,
          goalsAgainst: 37,
          goalDifference: 22,
          points: 64,
          form: ['W', 'W', 'L', 'D', 'W'],
          logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=50&h=50&fit=crop&crop=center'
        }
      ]
    }
  ];

  const currentLeague = leagues.find(league => league.id === selectedLeague) || leagues[0];

  const getPositionColor = (position: number) => {
    if (position <= 4) return 'bg-green-100 text-green-800';
    if (position <= 6) return 'bg-blue-100 text-blue-800';
    if (position >= 18) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getFormIcon = (result: string) => {
    switch (result) {
      case 'W': return <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">W</div>;
      case 'L': return <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">L</div>;
      case 'D': return <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">D</div>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Trophy className="h-7 w-7 text-yellow-500 mr-3" />
            League Tables
          </h2>
          <div className="text-sm text-gray-600">
            Season {currentLeague.season}
          </div>
        </div>

        {/* League Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {leagues.map((league) => (
              <button
                key={league.id}
                onClick={() => setSelectedLeague(league.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedLeague === league.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {league.name}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Pos</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Club</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">P</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">W</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">D</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">L</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">GF</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">GA</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">GD</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Pts</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Form</th>
              </tr>
            </thead>
            <tbody>
              {currentLeague.teams.map((team, index) => (
                <tr key={team.name} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getPositionColor(team.position)}`}>
                      {team.position}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={team.logo} alt={team.name} className="w-8 h-8 rounded-full" />
                      <span className="font-medium text-gray-900">{team.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-2 text-gray-700">{team.played}</td>
                  <td className="text-center py-4 px-2 text-gray-700">{team.won}</td>
                  <td className="text-center py-4 px-2 text-gray-700">{team.drawn}</td>
                  <td className="text-center py-4 px-2 text-gray-700">{team.lost}</td>
                  <td className="text-center py-4 px-2 text-gray-700">{team.goalsFor}</td>
                  <td className="text-center py-4 px-2 text-gray-700">{team.goalsAgainst}</td>
                  <td className="text-center py-4 px-2">
                    <span className={`font-semibold ${team.goalDifference > 0 ? 'text-green-600' : team.goalDifference < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="font-bold text-lg text-gray-900">{team.points}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-1 justify-center">
                      {team.form.map((result, idx) => (
                        <div key={idx}>
                          {getFormIcon(result)}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span className="text-gray-600">Champions League</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 rounded"></div>
            <span className="text-gray-600">Europa League</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 rounded"></div>
            <span className="text-gray-600">Relegation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueTables;