import React, { useState } from 'react';
import { X, Bell, Trophy, Users, Gift, CheckCircle, Clock } from 'lucide-react';
import { Notification } from '../types';

interface NotificationCenterProps {
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  // Mock notifications
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'challenge',
      title: 'تحدي جديد',
      titleAr: 'تحدي جديد',
      message: 'تم إنشاء تحدي جديد في الثقافة العامة',
      messageAr: 'تم إنشاء تحدي جديد في الثقافة العامة',
      isRead: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      actionUrl: '/challenges'
    },
    {
      id: '2',
      type: 'achievement',
      title: 'إنجاز جديد',
      titleAr: 'إنجاز جديد',
      message: 'تهانينا! حصلت على إنجاز "خبير الثقافة"',
      messageAr: 'تهانينا! حصلت على إنجاز "خبير الثقافة"',
      isRead: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    {
      id: '3',
      type: 'friend',
      title: 'دعوة صداقة',
      titleAr: 'دعوة صداقة',
      message: 'أحمد يريد إضافتك كصديق',
      messageAr: 'أحمد يريد إضافتك كصديق',
      isRead: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: '4',
      type: 'system',
      title: 'تحديث النظام',
      titleAr: 'تحديث النظام',
      message: 'تم إضافة ميزات جديدة للمنصة',
      messageAr: 'تم إضافة ميزات جديدة للمنصة',
      isRead: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    }
  ];

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'challenge':
        return <Trophy className="w-5 h-5 text-saudi-green" />;
      case 'achievement':
        return <Gift className="w-5 h-5 text-yellow-600" />;
      case 'friend':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'system':
        return <Bell className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم`;
  };

  const markAsRead = (notificationId: string) => {
    // In a real app, this would update the notification status
    console.log('Marking notification as read:', notificationId);
  };

  const markAllAsRead = () => {
    // In a real app, this would mark all notifications as read
    console.log('Marking all notifications as read');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-saudi-green" />
            <h2 className="text-xl font-bold text-gray-900">الإشعارات</h2>
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === 'all'
                ? 'text-saudi-green border-b-2 border-saudi-green bg-saudi-green/5'
                : 'text-gray-600 hover:text-saudi-green'
            }`}
          >
            الكل ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === 'unread'
                ? 'text-saudi-green border-b-2 border-saudi-green bg-saudi-green/5'
                : 'text-gray-600 hover:text-saudi-green'
            }`}
          >
            غير مقروءة ({notifications.filter(n => !n.isRead).length})
          </button>
        </div>

        {/* Actions */}
        {filteredNotifications.some(n => !n.isRead) && (
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={markAllAsRead}
              className="text-sm text-saudi-green hover:text-saudi-green/80 font-medium"
            >
              تحديد الكل كمقروء
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.isRead ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {notification.titleAr}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-saudi-green rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.messageAr}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(notification.createdAt)}
                        </span>
                        {!notification.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="text-xs text-saudi-green hover:text-saudi-green/80"
                          >
                            تحديد كمقروء
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                لا توجد إشعارات
              </h3>
              <p className="text-gray-600">
                {activeTab === 'unread' 
                  ? 'لا توجد إشعارات غير مقروءة'
                  : 'ستظهر إشعاراتك هنا'
                }
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              آخر تحديث: {new Date().toLocaleTimeString('ar-SA')}
            </span>
            <button className="text-saudi-green hover:text-saudi-green/80">
              إعدادات الإشعارات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;