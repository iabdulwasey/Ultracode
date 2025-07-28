import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Star, Users, Award } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Discover the Land of the Rising Sun",
      subtitle: "Experience Japan's timeless beauty, from ancient temples to modern marvels",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&h=1080&fit=crop&crop=center",
      location: "Mount Fuji, Honshu"
    },
    {
      title: "Ancient Traditions, Modern Wonders",
      subtitle: "Journey through centuries of culture in the world's most fascinating country",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1920&h=1080&fit=crop&crop=center",
      location: "Kyoto, Traditional District"
    },
    {
      title: "Cherry Blossoms & Neon Lights",
      subtitle: "Where nature's beauty meets cutting-edge innovation",
      image: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=1920&h=1080&fit=crop&crop=center",
      location: "Tokyo, Shibuya"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Star, value: "4.9", label: "Rating" },
    { icon: Users, value: "50K+", label: "Travelers" },
    { icon: Award, value: "#1", label: "Japan Guide" }
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Location Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white mb-6 border border-white/30">
            <span className="text-sm font-medium">{heroSlides[currentSlide].location}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {heroSlides[currentSlide].title.split(' ').map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-4 ${
                  word === 'Japan' || word === 'Sun' ? 'text-sakura-300' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {heroSlides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="bg-gradient-to-r from-japanese-red to-sakura-500 text-white px-8 py-4 rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg flex items-center space-x-2">
              <span>Explore Destinations</span>
              <ChevronDown className="w-5 h-5" />
            </button>
            <button className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full hover:bg-white/30 transition-all duration-300 font-semibold text-lg flex items-center space-x-2 border border-white/30">
              <Play className="w-5 h-5" />
              <span>Watch Video</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 md:space-x-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-sakura-300 mr-2" />
                  <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <span className="text-gray-300 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/70" />
      </div>
    </section>
  );
};

export default Hero;