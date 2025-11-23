import React from 'react';
import { TrendingUp, Trophy, Target, Users, Clock, Award, BarChart3, Activity } from 'lucide-react';

const KeyStats: React.FC = () => {
  const keyStatistics = [
    {
      title: 'Total Goals Scored',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Trophy,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      title: 'Average Goals per Game',
      value: '2.8',
      change: '+0.3',
      trend: 'up',
      icon: Target,
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      title: 'Total Matches Played',
      value: '380',
      change: '0%',
      trend: 'stable',
      icon: Activity,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Average Attendance',
      value: '42,156',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Total Playing Time',
      value: '34,200',
      change: '+2.1%',
      trend: 'up',
      icon: Clock,
      color: 'from-red-400 to-rose-500',
      bgColor: 'from-red-50 to-rose-50',
      suffix: 'minutes'
    },
    {
      title: 'Clean Sheets',
      value: '156',
      change: '+15.2%',
      trend: 'up',
      icon: Award,
      color: 'from-teal-400 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50'
    }
  ];

  const leagueComparison = [
    { league: 'Premier League', goals: 1071, avgGoals: 2.82 },
    { league: 'La Liga', goals: 967, avgGoals: 2.55 },
    { league: 'Serie A', goals: 891, avgGoals: 2.35 },
    { league: 'Bundesliga', goals: 943, avgGoals: 3.08 },
    { league: 'Ligue 1', goals: 823, avgGoals: 2.17 }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-7 w-7 text-indigo-500 mr-3" />
            Key Statistics
          </h2>
          <div className="text-sm text-gray-600">
            Season 2023/24 Overview
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {keyStatistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(stat.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                    {stat.suffix && <span className="text-lg text-gray-600 ml-1">{stat.suffix}</span>}
                  </div>
                  <h3 className="text-gray-700 font-medium">{stat.title}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* League Comparison */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
            League Comparison - Goals Scored
          </h3>
          
          <div className="space-y-4">
            {leagueComparison.map((league, index) => {
              const maxGoals = Math.max(...leagueComparison.map(l => l.goals));
              const percentage = (league.goals / maxGoals) * 100;
              
              return (
                <div key={league.league} className="flex items-center space-x-4">
                  <div className="w-32 text-sm font-medium text-gray-700">
                    {league.league}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                        {league.goals} goals
                      </div>
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm text-gray-600">
                    {league.avgGoals} avg
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
            <p className="text-gray-700 font-medium">Match Completion Rate</p>
            <p className="text-sm text-gray-600 mt-1">Matches played without major incidents</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2.1M</div>
            <p className="text-gray-700 font-medium">Total Spectators</p>
            <p className="text-sm text-gray-600 mt-1">Across all league matches</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">£2.8B</div>
            <p className="text-gray-700 font-medium">Total Transfer Value</p>
            <p className="text-sm text-gray-600 mt-1">Summer & winter windows combined</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyStats;