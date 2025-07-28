import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-chinese-red/20 via-chinese-gold/10 to-chinese-jade/20">
          <div className="w-full h-full chinese-pattern opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block text-white mb-2">Discover</span>
            <span className="gradient-text">China</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Embark on an extraordinary journey through 5,000 years of history, breathtaking landscapes, 
            and culinary adventures that will awaken your senses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-chinese-red to-chinese-gold text-white px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-semibold flex items-center space-x-2 group">
              <span>Start Your Adventure</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/30 transition-all duration-300 font-semibold flex items-center space-x-2 border border-white/30">
              <Play className="w-5 h-5" />
              <span>Watch Video</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-float">
              <div className="text-3xl md:text-4xl font-bold text-chinese-gold mb-2">56</div>
              <div className="text-white/80">Ethnic Groups</div>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="text-3xl md:text-4xl font-bold text-chinese-gold mb-2">34</div>
              <div className="text-white/80">Provinces</div>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-3xl md:text-4xl font-bold text-chinese-gold mb-2">55</div>
              <div className="text-white/80">UNESCO Sites</div>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="text-3xl md:text-4xl font-bold text-chinese-gold mb-2">1000+</div>
              <div className="text-white/80">Dishes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;