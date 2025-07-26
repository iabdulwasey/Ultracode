import React from 'react';
import { Award, Shield, Truck, Heart } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: '100% Human Hair',
      description: 'Premium quality hair sourced ethically from trusted suppliers worldwide.',
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'Every product comes with our satisfaction guarantee and quality assurance.',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Complimentary shipping on all orders over $200 with fast delivery.',
    },
    {
      icon: Heart,
      title: 'Expert Care',
      description: 'Professional styling tips and care instructions included with every purchase.',
    },
  ];

  return (
    <section id="about" className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Why Choose MBeauty?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              At MBeauty, we're passionate about helping you achieve your dream hair. 
              Our premium extensions are crafted from the finest 100% human hair, 
              ensuring a natural look and feel that seamlessly blends with your own hair.
            </p>
            <p className="text-muted-foreground mb-8">
              With over 10 years of experience in the beauty industry, we understand 
              that every client is unique. That's why we offer a diverse range of textures, 
              lengths, and colors to match your individual style and preferences.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Learn More About Us
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-medium">Crafted with Love</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;