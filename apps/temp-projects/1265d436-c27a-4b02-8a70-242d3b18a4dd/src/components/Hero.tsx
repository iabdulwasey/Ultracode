import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-purple-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-primary-600 text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4" />
              <span>Trending Stories & Insights</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Stories That
              <span className="gradient-text block">Inspire & Inform</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Dive into a world of knowledge with our curated collection of articles on technology, 
              design, business, and lifestyle. Join thousands of readers who trust us for quality content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center group">
                Start Reading
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors">
                Browse Categories
              </button>
            </div>
          </div>

          {/* Featured Article Card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 card-hover">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-gray-600 font-medium">Featured Article</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    Technology
                  </span>
                  <span className="text-gray-500 text-sm">5 min read</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                  The Future of Web Development: Trends to Watch in 2024
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  Explore the latest trends shaping the web development landscape, 
                  from AI integration to progressive web apps.
                </p>
                
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-gray-500 text-sm">Tech Writer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;