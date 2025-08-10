import React from 'react';
import { Trophy, Users, Target, Plus, TrendingUp, Clock, Star, Award } from 'lucide-react';
import { User, Challenge } from '../types';
import { mockChallenges } from '../data/mockData';

interface DashboardProps {
  user: User | null;
  onJoinChallenge: (challenge: Challenge) => void;
  onViewChallenges: () => void;
  onCreateChallenge: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  onJoinChallenge, 
  onViewChallenges, 
  onCreateChallenge 
}) => {
  const featuredChallenges = mockChallenges.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-saudi-green to-green-600 rounded-2xl p-6 text-white saudi-pattern">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              {user ? `مرحباً ${user.username}` : 'مرحباً بك في ساحة المعرفة السعودية'}
            </h1>
            <p className="text-saudi-gold/90 text-lg">
              {user 
                ? 'استعد للتحدي واختبر معلوماتك مع أفضل اللاعبين'
                : 'انضم إلى أكبر منصة مسابقات معرفية في المملكة العربية السعودية'
              }
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onViewChallenges}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Target className="w-5 h-5" />
              استكشف التحديات
            </button>
            <button
              onClick={onCreateChallenge}
              className="bg-saudi-gold text-saudi-green px-6 py-3 rounded-xl font-medium hover:bg-saudi-gold/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              إنشاء تحدي
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-600">لاعب متصل</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12% من الأسبوع الماضي</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-600">تحدي نشط</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>5 تحديات جديدة اليوم</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">50,000</p>
              <p className="text-sm text-gray-600">ريال جوائز اليوم</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-yellow-600 text-sm">
            <Award className="w-4 h-4" />
            <span>جائزة كبرى: 10,000 ريال</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">4.9</p>
              <p className="text-sm text-gray-600">تقييم المنصة</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Challenges */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">التحديات المميزة</h2>
          <button
            onClick={onViewChallenges}
            className="text-saudi-green hover:text-saudi-green/80 font-medium"
          >
            عرض الكل ←
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredChallenges.map((challenge) => (
            <div key={challenge.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: challenge.category.color }}
                >
                  {challenge.category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{challenge.titleAr}</h3>
                  <p className="text-sm text-gray-600">{challenge.category.nameAr}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {challenge.descriptionAr}
              </p>

              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-600">
                  {challenge.participants.length}/{challenge.maxParticipants} لاعب
                </span>
                <span className="text-saudi-gold font-medium">
                  {challenge.prizePool} ريال
                </span>
              </div>

              <button
                onClick={() => onJoinChallenge(challenge)}
                className="w-full bg-saudi-green text-white py-2 rounded-lg font-medium hover:bg-saudi-green/90 transition-colors"
              >
                انضم للتحدي
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">تحدي سريع</h3>
          <p className="text-blue-700 mb-4">ابدأ مباراة سريعة مع لاعبين عشوائيين</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            ابدأ الآن
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-2">تدريب يومي</h3>
          <p className="text-green-700 mb-4">حل 10 أسئلة يومية واكسب نقاط إضافية</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            ابدأ التدريب
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;