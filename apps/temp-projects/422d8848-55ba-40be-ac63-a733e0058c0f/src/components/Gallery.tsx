import React, { useState } from 'react';
import { Camera, Heart, Share2, Download, X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  title: string;
  location: string;
  photographer: string;
  date: string;
  description: string;
  category: 'temples' | 'nature' | 'cities' | 'culture' | 'food' | 'festivals';
  likes: number;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const photos: Photo[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Fushimi Inari Shrine',
      location: 'Kyoto, Japan',
      photographer: 'Takeshi Yamamoto',
      date: 'March 2024',
      description: 'Thousands of vermillion torii gates create mystical tunnels up the sacred mountain.',
      category: 'temples',
      likes: 1247
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Kinkaku-ji Temple',
      location: 'Kyoto, Japan',
      photographer: 'Yuki Tanaka',
      date: 'April 2024',
      description: 'The Golden Pavilion reflects beautifully in the surrounding pond during cherry blossom season.',
      category: 'temples',
      likes: 2156
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Mount Fuji at Sunrise',
      location: 'Shizuoka, Japan',
      photographer: 'Hiroshi Sato',
      date: 'February 2024',
      description: 'Japan\'s sacred mountain emerges from morning clouds in this breathtaking sunrise view.',
      category: 'nature',
      likes: 3421
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Tokyo Skyline',
      location: 'Tokyo, Japan',
      photographer: 'Akira Suzuki',
      date: 'January 2024',
      description: 'The neon-lit metropolis of Tokyo showcases Japan\'s modern architectural marvels.',
      category: 'cities',
      likes: 1876
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Arashiyama Bamboo Grove',
      location: 'Kyoto, Japan',
      photographer: 'Mei Watanabe',
      date: 'May 2024',
      description: 'Towering bamboo creates natural green tunnels with ethereal light filtering through.',
      category: 'nature',
      likes: 2934
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Fresh Sushi Platter',
      location: 'Tokyo, Japan',
      photographer: 'Kenji Nakamura',
      date: 'March 2024',
      description: 'Artfully prepared sushi showcasing the finest ingredients from Tokyo\'s fish markets.',
      category: 'food',
      likes: 1654
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Shibuya Crossing',
      location: 'Tokyo, Japan',
      photographer: 'Ryo Ishida',
      date: 'December 2023',
      description: 'The world\'s busiest pedestrian crossing comes alive with neon lights and urban energy.',
      category: 'cities',
      likes: 2187
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Cherry Blossom Festival',
      location: 'Tokyo, Japan',
      photographer: 'Sakura Hayashi',
      date: 'April 2024',
      description: 'Hanami celebration under blooming cherry trees in Ueno Park during peak season.',
      category: 'festivals',
      likes: 4521
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Senso-ji Temple',
      location: 'Tokyo, Japan',
      photographer: 'Taro Kimura',
      date: 'June 2024',
      description: 'Tokyo\'s oldest temple stands majestically with traditional architecture and vibrant colors.',
      category: 'temples',
      likes: 1923
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos', count: photos.length },
    { id: 'temples', label: 'Temples', count: photos.filter(p => p.category === 'temples').length },
    { id: 'nature', label: 'Nature', count: photos.filter(p => p.category === 'nature').length },
    { id: 'cities', label: 'Cities', count: photos.filter(p => p.category === 'cities').length },
    { id: 'culture', label: 'Culture', count: photos.filter(p => p.category === 'culture').length },
    { id: 'food', label: 'Food', count: photos.filter(p => p.category === 'food').length },
    { id: 'festivals', label: 'Festivals', count: photos.filter(p => p.category === 'festivals').length }
  ];

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const toggleLike = (photoId: number) => {
    const newLikedPhotos = new Set(likedPhotos);
    if (newLikedPhotos.has(photoId)) {
      newLikedPhotos.delete(photoId);
    } else {
      newLikedPhotos.add(photoId);
    }
    setLikedPhotos(newLikedPhotos);
  };

  const openLightbox = (photo: Photo) => {
    setLightboxPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxPhoto(null);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightboxPhoto.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    } else {
      newIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setLightboxPhoto(filteredPhotos[newIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-japan-gold/10 rounded-full px-4 py-2 mb-4">
            <Camera className="w-4 h-4 text-japan-red" />
            <span className="text-japan-red text-sm font-medium">Photo Gallery</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stunning Views of <span className="gradient-text">Japan</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore Japan through the lens of talented photographers. From ancient temples 
            to modern cityscapes, discover the beauty that awaits you.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-japan-red to-japan-cherry text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => openLightbox(photo)}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-japan-red/90 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                  {photo.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-japan-red transition-colors">
                  {photo.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{photo.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {photo.description}
                </p>

                {/* Photo Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>by {photo.photographer}</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{photo.date}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLike(photo.id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        likedPhotos.has(photo.id) ? 'text-japan-red' : 'text-gray-400 hover:text-japan-red'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedPhotos.has(photo.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm">{photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}</span>
                    </button>
                    
                    <button className="text-gray-400 hover:text-japan-red transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button className="text-gray-400 hover:text-japan-red transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-japan-red text-japan-red px-8 py-3 rounded-full font-semibold hover:bg-japan-red hover:text-white transition-all duration-300 hover:scale-105">
            Load More Photos
          </button>
        </div>

        {/* Lightbox */}
        {lightboxPhoto && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Photo Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{lightboxPhoto.title}</h3>
                <div className="flex items-center space-x-4 text-sm mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{lightboxPhoto.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{lightboxPhoto.date}</span>
                  </div>
                </div>
                <p className="text-white/90 mb-3">{lightboxPhoto.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Photo by {lightboxPhoto.photographer}</span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLike(lightboxPhoto.id)}
                      className={`flex items-center space-x-1 ${
                        likedPhotos.has(lightboxPhoto.id) ? 'text-japan-cherry' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedPhotos.has(lightboxPhoto.id) ? 'fill-current' : ''}`} />
                      <span>{lightboxPhoto.likes + (likedPhotos.has(lightboxPhoto.id) ? 1 : 0)}</span>
                    </button>
                    <button className="text-white/70 hover:text-white">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;