import React from 'react';
import { X, MapPin, Clock, Users, Star, ArrowRight, Camera, Calendar, Heart } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  prefecture: string;
  description: string;
  image: string;
  rating: number;
  duration: string;
  visitors: string;
  highlights: string[];
  category: 'traditional' | 'modern' | 'nature' | 'cultural';
}

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, isOpen, onClose }) => {
  if (!isOpen || !destination) return null;

  const detailedInfo = {
    1: { // Fushimi Inari Shrine
      fullDescription: "Fushimi Inari Shrine is famous for its thousands of vermillion torii gates that create tunnels up the mountainside. This sacred site is dedicated to Inari, the Shinto god of rice, and features fox statues throughout the grounds. The hike to the summit takes 2-3 hours and offers stunning views of Kyoto.",
      bestTime: "Early morning (6-8 AM) or late afternoon to avoid crowds",
      admission: "Free",
      transportation: "JR Inari Station (5-minute walk) or Keihan Fushimi-Inari Station (7-minute walk)",
      tips: ["Wear comfortable walking shoes", "Bring water for the hike", "Visit early morning for best photos", "Look for fox statues throughout the shrine"],
      nearbyAttractions: ["Kiyomizu-dera Temple", "Gion District", "Nijo Castle"],
      gallery: [
        "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    2: { // Tokyo Skytree
      fullDescription: "Tokyo Skytree stands at 634 meters tall, making it the world's second tallest structure. The tower features two observation decks offering breathtaking 360-degree views of Tokyo. The complex also includes shopping, dining, and an aquarium.",
      bestTime: "Sunset time for day-to-night views, or clear mornings",
      admission: "¥2,100-3,400 depending on deck level",
      transportation: "Tokyo Skytree Station or Oshiage Station",
      tips: ["Book tickets online to skip lines", "Visit on clear days for Mount Fuji views", "Explore the shopping complex below", "Check for special illumination events"],
      nearbyAttractions: ["Senso-ji Temple", "Sumida River", "Tokyo National Museum"],
      gallery: [
        "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    3: { // Mount Fuji
      fullDescription: "Mount Fuji is Japan's highest mountain at 3,776 meters and a sacred symbol of the country. This active volcano is surrounded by five lakes and offers hiking opportunities during climbing season. The mountain is a UNESCO World Heritage site.",
      bestTime: "Climbing season: July-September. Best views: October-February",
      admission: "¥1,000 climbing fee during season",
      transportation: "Various routes from Tokyo via train and bus",
      tips: ["Climbing season is limited", "Book mountain huts in advance", "Weather changes quickly", "Respect the sacred nature of the mountain"],
      nearbyAttractions: ["Lake Kawaguchi", "Hakone", "Chureito Pagoda"],
      gallery: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    }
  };

  const info = detailedInfo[destination.id as keyof typeof detailedInfo] || {
    fullDescription: destination.description,
    bestTime: "Varies by season",
    admission: "Check official website",
    transportation: "Public transport available",
    tips: ["Plan ahead", "Check weather conditions", "Respect local customs"],
    nearbyAttractions: ["Various attractions nearby"],
    gallery: [destination.image]
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center space-x-4 text-white mb-3">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-japan-gold fill-current" />
                <span className="text-sm font-medium">{destination.rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{destination.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">{destination.visitors}</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{destination.name}</h2>
            <div className="flex items-center text-white/90">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{destination.prefecture}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-264px)]">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">About This Destination</h3>
            <p className="text-gray-700 leading-relaxed">{info.fullDescription}</p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-japan-red" />
                Best Time to Visit
              </h4>
              <p className="text-gray-700 text-sm">{info.bestTime}</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-japan-red" />
                Admission
              </h4>
              <p className="text-gray-700 text-sm">{info.admission}</p>
            </div>
          </div>

          {/* Transportation */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-japan-red" />
              Getting There
            </h4>
            <p className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3">{info.transportation}</p>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Highlights</h4>
            <div className="grid grid-cols-2 gap-2">
              {destination.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-japan-red rounded-full" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Tips */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Travel Tips</h4>
            <div className="space-y-2">
              {info.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-japan-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Attractions */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Nearby Attractions</h4>
            <div className="flex flex-wrap gap-2">
              {info.nearbyAttractions.map((attraction, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-japan-cherry/10 text-japan-red rounded-full text-sm"
                >
                  {attraction}
                </span>
              ))}
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Camera className="w-4 h-4 mr-2 text-japan-red" />
              Photo Gallery
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {info.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${destination.name} ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-japan-red to-japan-cherry text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Add to Wishlist</span>
            </button>
            
            <button className="flex-1 border-2 border-japan-red text-japan-red py-3 rounded-lg font-medium hover:bg-japan-red hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Plan Visit</span>
            </button>
            
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              <span>View More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;