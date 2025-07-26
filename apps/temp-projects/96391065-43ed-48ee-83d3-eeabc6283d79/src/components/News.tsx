import React from 'react';
import { Calendar, Clock, ArrowRight, Trophy, BookOpen, Users } from 'lucide-react';

const News: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Greenwood Academy Students Win State Science Fair',
      excerpt: 'Our talented students took home first place in the state science competition with their innovative environmental project.',
      date: '2024-03-15',
      category: 'Achievement',
      icon: Trophy,
      image: 'science-fair',
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'New STEM Laboratory Opens This Fall',
      excerpt: 'State-of-the-art laboratory facility will enhance our science and technology programs starting next semester.',
      date: '2024-03-10',
      category: 'Facilities',
      icon: BookOpen,
      image: 'stem-lab',
      readTime: '2 min read'
    },
    {
      id: 3,
      title: 'Spring Arts Festival Showcases Student Talent',
      excerpt: 'Annual arts festival features student performances, art exhibitions, and creative workshops for the community.',
      date: '2024-03-05',
      category: 'Events',
      icon: Users,
      image: 'arts-festival',
      readTime: '4 min read'
    }
  ];

  const upcomingEvents = [
    {
      date: '2024-04-15',
      title: 'Open House for Prospective Families',
      time: '10:00 AM - 2:00 PM'
    },
    {
      date: '2024-04-20',
      title: 'Spring Concert Performance',
      time: '7:00 PM'
    },
    {
      date: '2024-04-25',
      title: 'Parent-Teacher Conferences',
      time: '3:00 PM - 8:00 PM'
    },
    {
      date: '2024-05-01',
      title: 'Science Fair Exhibition',
      time: '9:00 AM - 12:00 PM'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest News & Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest happenings, achievements, and upcoming events 
            at Greenwood Academy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* News Articles */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent News</h3>
            <div className="space-y-8">
              {newsItems.map((item) => (
                <article key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Article Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                    <item.icon className="h-16 w-16 text-white" />
                  </div>
                  
                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">
                        {item.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.readTime}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                      {item.title}
                    </h4>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(item.date)}
                      </div>
                      <button className="flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {/* View All News Button */}
            <div className="text-center mt-8">
              <button className="btn-primary">
                View All News
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-primary-600 pl-4">
                    <div className="text-sm text-primary-600 font-medium">
                      {formatDate(event.date)}
                    </div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {event.time}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center transition-colors">
                View All Events
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-primary-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h3>
              <div className="space-y-3">
                <a href="#" className="block text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Academic Calendar
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Student Handbook
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Parent Portal
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Lunch Menu
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Transportation
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
              <p className="text-white/90 mb-4">
                Subscribe to our newsletter for the latest updates and announcements.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <button className="w-full bg-white text-primary-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;