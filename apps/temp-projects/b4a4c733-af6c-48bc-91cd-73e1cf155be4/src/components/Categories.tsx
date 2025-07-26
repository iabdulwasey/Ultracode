import React from 'react';

const categories = [
  {
    id: 1,
    name: 'Wooden Combs',
    description: 'Natural and eco-friendly',
    image: 'bg-gradient-to-br from-amber-100 to-amber-200',
    count: '24 products'
  },
  {
    id: 2,
    name: 'Metal Combs',
    description: 'Durable and precise',
    image: 'bg-gradient-to-br from-gray-100 to-gray-200',
    count: '18 products'
  },
  {
    id: 3,
    name: 'Pocket Combs',
    description: 'Compact and portable',
    image: 'bg-gradient-to-br from-blue-100 to-blue-200',
    count: '15 products'
  },
  {
    id: 4,
    name: 'Wide Tooth',
    description: 'Perfect for curly hair',
    image: 'bg-gradient-to-br from-green-100 to-green-200',
    count: '12 products'
  }
];

const Categories: React.FC = () => {
  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of combs, each designed for specific hair types and styling needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`${category.image} h-48 relative`}>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <p className="text-sm text-primary-600 font-medium">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;