import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All Styles' },
    { id: 'clip-in', label: 'Clip-In' },
    { id: 'tape-in', label: 'Tape-In' },
    { id: 'keratin', label: 'Keratin Bond' },
    { id: 'halo', label: 'Halo' }
  ];

  const galleryItems = [
    {
      id: 1,
      category: 'clip-in',
      title: 'Beach Waves Clip-In',
      description: 'Natural beach waves with clip-in extensions',
      color: 'Honey Blonde',
      length: '22 inches'
    },
    {
      id: 2,
      category: 'tape-in',
      title: 'Straight Tape-In',
      description: 'Sleek straight look with tape-in extensions',
      color: 'Dark Brown',
      length: '20 inches'
    },
    {
      id: 3,
      category: 'keratin',
      title: 'Curly Keratin Bond',
      description: 'Voluminous curls with keratin bond extensions',
      color: 'Caramel Highlights',
      length: '24 inches'
    },
    {
      id: 4,
      category: 'halo',
      title: 'Halo Volume',
      description: 'Instant volume with halo extensions',
      color: 'Platinum Blonde',
      length: '18 inches'
    },
    {
      id: 5,
      category: 'clip-in',
      title: 'Layered Clip-In',
      description: 'Layered look with clip-in extensions',
      color: 'Auburn',
      length: '20 inches'
    },
    {
      id: 6,
      category: 'tape-in',
      title: 'Balayage Tape-In',
      description: 'Beautiful balayage with tape-in extensions',
      color: 'Balayage Blend',
      length: '22 inches'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Work Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our stunning transformations and see how our premium hair extensions 
            can enhance your natural beauty.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className="aspect-w-4 aspect-h-5 bg-gradient-to-br from-primary-100 to-gold-100 relative">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-3xl">💇‍♀️</span>
                    </div>
                    <p className="text-lg font-medium text-gray-700">{item.title}</p>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-500">Color:</span>
                    <span className="ml-1 font-medium text-gray-900">{item.color}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Length:</span>
                    <span className="ml-1 font-medium text-gray-900">{item.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Before & After Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Before & After Transformations
            </h3>
            <p className="text-lg text-gray-600">
              See the amazing transformations our clients have achieved with MBeauty extensions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-2xl">📷</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">BEFORE</span>
                </div>
                <div className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-primary-200 to-gold-200 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-2xl">✨</span>
                  </div>
                  <span className="text-sm font-medium text-primary-600">AFTER</span>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Volume & Length Transformation
              </h4>
              <p className="text-gray-600 text-sm">
                22" Tape-In Extensions in Honey Blonde
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-2xl">📷</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">BEFORE</span>
                </div>
                <div className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-primary-200 to-gold-200 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-2xl">✨</span>
                  </div>
                  <span className="text-sm font-medium text-primary-600">AFTER</span>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Color & Texture Enhancement
              </h4>
              <p className="text-gray-600 text-sm">
                20" Keratin Bond Extensions with Balayage
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="btn-primary text-lg px-8 py-4">
            Book Your Transformation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;