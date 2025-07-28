import React, { useState, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';

const Hero: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [currentHero, setCurrentHero] = useState(0);

  const heroContent = [
    {
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      logo: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=200&fit=crop"
    },
    {
      title: "The Crown",
      description: "This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
      logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop"
    },
    {
      title: "Ozark",
      description: "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop",
      logo: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=200&fit=crop"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroContent.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentContent = heroContent[currentHero];

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentContent.image})`
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-16 max-w-2xl">
        <div className="animate-fade-in">
          {/* Logo/Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-shadow-lg">
            {currentContent.title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed max-w-xl">
            {currentContent.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex items-center justify-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors duration-200">
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600/90 transition-colors duration-200">
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>

        {/* Volume Control */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-24 right-4 md:right-16 bg-black/50 border border-gray-600 p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>

        {/* Hero Indicators */}
        <div className="absolute bottom-8 left-4 md:left-16 flex space-x-2">
          {heroContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentHero ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;