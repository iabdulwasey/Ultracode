import React, { useState } from 'react';
import { ChefHat, Star, MapPin, Clock } from 'lucide-react';

interface Dish {
  id: number;
  name: string;
  region: string;
  image: string;
  rating: number;
  prepTime: string;
  description: string;
  ingredients: string[];
  category: string;
  spiceLevel: number;
}

const Cuisine: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const dishes: Dish[] = [
    {
      id: 1,
      name: "Peking Duck",
      region: "Beijing",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&h=600&fit=crop",
      rating: 4.9,
      prepTime: "3 hours",
      description: "Crispy-skinned duck served with thin pancakes, scallions, and hoisin sauce.",
      ingredients: ["Duck", "Hoisin Sauce", "Scallions", "Pancakes", "Cucumber"],
      category: "main",
      spiceLevel: 1
    },
    {
      id: 2,
      name: "Xiaolongbao",
      region: "Shanghai",
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&h=600&fit=crop",
      rating: 4.8,
      prepTime: "45 mins",
      description: "Delicate soup dumplings filled with pork and savory broth.",
      ingredients: ["Pork", "Ginger", "Soy Sauce", "Flour", "Broth"],
      category: "dim sum",
      spiceLevel: 0
    },
    {
      id: 3,
      name: "Mapo Tofu",
      region: "Sichuan",
      image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=600&fit=crop",
      rating: 4.7,
      prepTime: "20 mins",
      description: "Silky tofu in spicy, numbing Sichuan peppercorn sauce with ground pork.",
      ingredients: ["Tofu", "Ground Pork", "Sichuan Peppercorns", "Chili Oil", "Garlic"],
      category: "main",
      spiceLevel: 4
    },
    {
      id: 4,
      name: "Hot Pot",
      region: "Chongqing",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
      rating: 4.9,
      prepTime: "30 mins",
      description: "Interactive dining experience with boiling broth and fresh ingredients.",
      ingredients: ["Beef", "Lamb", "Vegetables", "Noodles", "Spicy Broth"],
      category: "main",
      spiceLevel: 5
    },
    {
      id: 5,
      name: "Dan Dan Noodles",
      region: "Sichuan",
      image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&h=600&fit=crop",
      rating: 4.6,
      prepTime: "15 mins",
      description: "Spicy noodles with preserved vegetables, chili oil, and ground pork.",
      ingredients: ["Noodles", "Ground Pork", "Preserved Vegetables", "Sesame Paste", "Chili Oil"],
      category: "noodles",
      spiceLevel: 4
    },
    {
      id: 6,
      name: "Mooncakes",
      region: "Various",
      image: "https://images.unsplash.com/photo-1601314002957-dd7f982bde72?w=800&h=600&fit=crop",
      rating: 4.5,
      prepTime: "2 hours",
      description: "Traditional pastries filled with sweet or savory fillings, perfect for festivals.",
      ingredients: ["Flour", "Lotus Seed Paste", "Egg Yolk", "Golden Syrup", "Oil"],
      category: "dessert",
      spiceLevel: 0
    }
  ];

  const categories = [
    { id: 'all', name: 'All Dishes' },
    { id: 'main', name: 'Main Courses' },
    { id: 'dim sum', name: 'Dim Sum' },
    { id: 'noodles', name: 'Noodles' },
    { id: 'dessert', name: 'Desserts' }
  ];

  const filteredDishes = activeCategory === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.category === activeCategory);

  const renderSpiceLevel = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full ${
          i < level ? 'bg-red-500' : 'bg-gray-200'
        }`}
      />
    ));
  };

  return (
    <section id="cuisine" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Culinary</span> Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Embark on a gastronomic adventure through China's diverse regional cuisines, 
            from street food to imperial banquets
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-chinese-red to-chinese-gold text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-chinese-gold fill-current" />
                  <span className="text-sm font-medium">{dish.rating}</span>
                </div>
                <div className="absolute top-4 left-4 bg-chinese-red/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {dish.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-chinese-red" />
                    <span className="text-sm text-gray-600">{dish.region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{dish.prepTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-chinese-red transition-colors">
                  {dish.name}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {dish.description}
                </p>

                {/* Spice Level */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Spice Level:</span>
                  <div className="flex space-x-1">
                    {renderSpiceLevel(dish.spiceLevel)}
                  </div>
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 mb-2 block">Key Ingredients:</span>
                  <div className="flex flex-wrap gap-2">
                    {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-chinese-red to-chinese-gold text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                  <ChefHat className="w-4 h-4" />
                  <span>Find Recipe</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fun Facts */}
        <div className="mt-16 bg-gradient-to-r from-chinese-red/10 to-chinese-gold/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Did You Know?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-chinese-red mb-2">8</div>
              <div className="text-gray-700">Major Regional Cuisines</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-chinese-red mb-2">5000+</div>
              <div className="text-gray-700">Years of Culinary History</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-chinese-red mb-2">1000+</div>
              <div className="text-gray-700">Traditional Dishes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cuisine;