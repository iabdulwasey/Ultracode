import React, { useState } from 'react';
import { Search, Filter, Users, Clock, Trophy, Star } from 'lucide-react';
import { Challenge, Category } from '../types';

interface ChallengeListProps {
  challenges: Challenge[];
  categories: Category[];
  onJoinChallenge: (challenge: Challenge) => void;
}

const ChallengeList: React.FC<ChallengeListProps> = ({ 
  challenges, 
  categories, 
  onJoinChallenge 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || challenge.category.id === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'prize':
        return b.prizePool - a.prizePool;
      case 'participants':
        return b.participants.length - a.participants.length;
      default:
        return 0;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'سهل';
      case 'medium': return 'متوسط';
      case 'hard': return 'صعب';
      default: return difficulty;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return 'في الانتظار';
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">التحديات المتاحة</h1>
          <p className="text-gray-600">اختر التحدي المناسب لك وابدأ المنافسة</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredChallenges.length} من {challenges.length} تحدي
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في التحديات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
          >
            <option value="all">جميع التصنيفات</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.nameAr}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
          >
            <option value="all">جميع المستويات</option>
            <option value="easy">سهل</option>
            <option value="medium">متوسط</option>
            <option value="hard">صعب</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
          >
            <option value="newest">الأحدث</option>
            <option value="prize">الجائزة الأكبر</option>
            <option value="participants">الأكثر مشاركة</option>
          </select>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
            {/* Challenge Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: challenge.category.color }}
                  >
                    {challenge.category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{challenge.titleAr}</h3>
                    <p className="text-sm text-gray-600">{challenge.category.nameAr}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {getDifficultyText(challenge.difficulty)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                    {getStatusText(challenge.status)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {challenge.descriptionAr}
              </p>

              {/* Challenge Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{challenge.participants.length}/{challenge.maxParticipants}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{challenge.duration} دقيقة</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Trophy className="w-4 h-4" />
                  <span>{challenge.prizePool} ريال</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4" />
                  <span>{challenge.questions.length} سؤال</span>
                </div>
              </div>

              {/* Creator Info */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <div className="w-6 h-6 bg-saudi-green rounded-full flex items-center justify-center text-white text-xs">
                  {challenge.creator.username.charAt(0)}
                </div>
                <span className="text-sm text-gray-600">بواسطة {challenge.creator.username}</span>
              </div>
            </div>

            {/* Challenge Actions */}
            <div className="px-6 pb-6">
              <button
                onClick={() => onJoinChallenge(challenge)}
                disabled={challenge.status === 'completed' || challenge.participants.length >= challenge.maxParticipants}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  challenge.status === 'completed' || challenge.participants.length >= challenge.maxParticipants
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-saudi-green text-white hover:bg-saudi-green/90'
                }`}
              >
                {challenge.status === 'completed' 
                  ? 'التحدي مكتمل' 
                  : challenge.participants.length >= challenge.maxParticipants
                    ? 'التحدي ممتلئ'
                    : 'انضم للتحدي'
                }
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد تحديات</h3>
          <p className="text-gray-600">جرب تعديل معايير البحث أو إنشاء تحدي جديد</p>
        </div>
      )}
    </div>
  );
};

export default ChallengeList;