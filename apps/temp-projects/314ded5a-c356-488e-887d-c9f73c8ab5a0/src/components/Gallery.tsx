import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      alt: 'Tokyo Skyline',
      title: 'Tokyo Skyline',
      description: 'Modern Tokyo with its iconic skyscrapers'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      alt: 'Kyoto Temple',
      title: 'Kyoto Temple',
      description: 'Traditional architecture in ancient Kyoto'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop',
      alt: 'Cherry Blossoms',
      title: 'Cherry Blossoms',
      description: 'Beautiful sakura in full bloom'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      alt: 'Mount Fuji',
      title: 'Mount Fuji',
      description: 'Japan\'s iconic sacred mountain'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop',
      alt: 'Tea Ceremony',
      title: 'Tea Ceremony',
      description: 'Traditional Japanese tea ceremony'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop',
      alt: 'Osaka Street',
      title: 'Osaka Street',
      description: 'Vibrant street life in Osaka'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1570492850768-d4bb5d4d5027?w=800&h=600&fit=crop',
      alt: 'Hiroshima Peace Memorial',
      title: 'Hiroshima Peace Memorial',
      description: 'Memorial park in Hiroshima'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&h=600&fit=crop',
      alt: 'Nara Deer',
      title: 'Nara Deer Park',
      description: 'Friendly deer in Nara Park'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
      alt: 'Sushi',
      title: 'Fresh Sushi',
      description: 'Authentic Japanese sushi'
    }
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A visual journey through Japan's most beautiful destinations and experiences
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => openModal(index)}
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200 z-10"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image */}
              <div className="relative">
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {images[selectedImage].title}
                  </h3>
                  <p className="text-white/90">{images[selectedImage].description}</p>
                </div>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                {selectedImage + 1} / {images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;