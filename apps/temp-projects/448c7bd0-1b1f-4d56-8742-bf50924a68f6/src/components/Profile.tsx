import React, { useState } from 'react';
import { User, Edit3, Trophy, Star, Target, Award, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfileProps {
  user: UserType;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'achievements' | 'settings'>('overview');

  const achievements = [
    { id: '1', name: 'أول فوز', nameAr: 'أول فوز', description: 'فز في أول مباراة لك', icon: '🏆', rarity: 'common' },
    { id: '2', name: 'خبير الثقافة', nameAr: 'خبير الثقافة', description: 'أجب على 100 سؤال ثقافي بشكل صحيح', icon: '📚', rarity: 'rare' },
    { id: '3', name: 'سرعة البرق', nameAr: 'سرعة البرق', description: 'أجب على سؤال في أقل من 5 ثواني', icon: '⚡', rarity: 'epic' },
    { id: '4', name: 'الملك', nameAr: 'الملك', description: 'احتل المركز الأول لمدة أسبوع', icon: '👑', rarity: 'legendary' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-saudi-green to-green-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 saudi-pattern opacity-20"></div>
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl font-bold">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-2xl object-cover" />
                ) : (
                  user.username.charAt(0).toUpperCase()
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-saudi-gold text-saudi-green px-3 py-1 rounded-full text-sm font-bold">
                المستوى {user.level}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-saudi-gold/90 mb-4">{user.email}</p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold mb-1">{user.totalScore.toLocaleString()}</div>
                  <div className="text-sm text-saudi-gold/80">إجمالي النقاط</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold mb-1">{user.gamesPlayed}</div>
                  <div className="text-sm text-saudi-gold/80">مباراة لعبت</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold mb-1">{user.winRate}%</div>
                  <div className="text-sm text-saudi-gold/80">معدل الفوز</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold mb-1">{user.badges.length}</div>
                  <div className="text-sm text-saudi-gold/80">الإنجازات</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'نظرة عامة', icon: User },
            { id: 'stats', label: 'الإحصائيات', icon: Target },
            { id: 'achievements', label: 'الإنجازات', icon: Award },
            { id: 'settings', label: 'الإعدادات', icon: Edit3 }
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

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">المعلومات الشخصية</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="text-sm text-gray-600">البريد الإلكتروني</div>
                        <div className="font-medium">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="text-sm text-gray-600">المنطقة</div>
                        <div className="font-medium">{user.region}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="text-sm text-gray-600">تاريخ الانضمام</div>
                        <div className="font-medium">{new Date(user.createdAt).toLocaleDateString('ar-SA')}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">النشاط الأخير</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Trophy className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-800">فوز في تحدي الثقافة العامة</div>
                        <div className="text-sm text-green-600">منذ ساعتين</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Star className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-blue-800">حصل على إنجاز "خبير الثقافة"</div>
                        <div className="text-sm text-blue-600">أمس</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Award className="w-5 h-5 text-yellow-600" />
                      <div>
                        <div className="font-medium text-yellow-800">وصل للمستوى {user.level}</div>
                        <div className="text-sm text-yellow-600">منذ 3 أيام</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">الإحصائيات التفصيلية</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-blue-900">{user.gamesPlayed}</div>
                      <div className="text-sm text-blue-700">إجمالي المباريات</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-600">معدل 2.3 مباراة يومياً</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-green-900">{user.gamesWon}</div>
                      <div className="text-sm text-green-700">المباريات المكسوبة</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-600">معدل فوز {user.winRate}%</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-8 h-8 text-yellow-600" />
                    <div>
                      <div className="text-2xl font-bold text-yellow-900">{user.experience}</div>
                      <div className="text-sm text-yellow-700">نقاط الخبرة</div>
                    </div>
                  </div>
                  <div className="w-full bg-yellow-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full" 
                      style={{ width: `${(user.experience % 1000) / 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">الأداء خلال آخر 30 يوم</h4>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Target className="w-12 h-12 mx-auto mb-2" />
                    <p>رسم بياني للأداء</p>
                    <p className="text-sm">سيتم إضافة الرسوم البيانية قريباً</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">الإنجازات</h3>
                <div className="text-sm text-gray-600">
                  {achievements.length} إنجاز متاح
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-xl border-2 transition-all hover:shadow-md ${getRarityColor(achievement.rarity)}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{achievement.nameAr}</h4>
                        <p className="text-sm opacity-80 mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity === 'common' && 'عادي'}
                            {achievement.rarity === 'rare' && 'نادر'}
                            {achievement.rarity === 'epic' && 'ملحمي'}
                            {achievement.rarity === 'legendary' && 'أسطوري'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">إعدادات الحساب</h3>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">المعلومات الأساسية</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم المستخدم</label>
                      <input
                        type="text"
                        defaultValue={user.username}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent">
                        <option value="الرياض">الرياض</option>
                        <option value="جدة">جدة</option>
                        <option value="الدمام">الدمام</option>
                        <option value="مكة">مكة</option>
                        <option value="المدينة">المدينة</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اللغة المفضلة</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent">
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">إعدادات الخصوصية</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">إظهار الملف الشخصي</div>
                        <div className="text-sm text-gray-600">السماح للآخرين برؤية ملفك الشخصي</div>
                      </div>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">إشعارات الألعاب</div>
                        <div className="text-sm text-gray-600">تلقي إشعارات عند بدء الألعاب</div>
                      </div>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    إلغاء
                  </button>
                  <button className="px-6 py-2 bg-saudi-green text-white rounded-lg hover:bg-saudi-green/90">
                    حفظ التغييرات
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;