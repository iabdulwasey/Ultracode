import React from 'react';
import { Heart, Lungs, DollarSign, Smile, Shield, Zap } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Improved Heart Health",
      description: "Reduce your risk of heart disease by 50% within just one year of quitting smoking.",
      stat: "50% risk reduction"
    },
    {
      icon: Lungs,
      title: "Better Breathing",
      description: "Experience improved lung function and reduced coughing within weeks of quitting.",
      stat: "2-12 weeks improvement"
    },
    {
      icon: DollarSign,
      title: "Save Money",
      description: "Save thousands of dollars annually by breaking free from expensive cigarette habits.",
      stat: "$3,000+ saved yearly"
    },
    {
      icon: Smile,
      title: "Enhanced Taste & Smell",
      description: "Regain your sense of taste and smell, making food more enjoyable than ever.",
      stat: "48 hours to notice"
    },
    {
      icon: Shield,
      title: "Reduced Cancer Risk",
      description: "Significantly lower your risk of lung, throat, and other smoking-related cancers.",
      stat: "90% risk reduction"
    },
    {
      icon: Zap,
      title: "More Energy",
      description: "Feel more energetic and less fatigued as your body recovers from smoking damage.",
      stat: "2-4 weeks improvement"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Life by Quitting Smoking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the immediate and long-term benefits of quitting smoking with Nicotex. 
            Your body starts healing within minutes of your last cigarette.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <IconComponent className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    <span className="text-sm text-primary font-medium">{benefit.stat}</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Timeline: What Happens When You Quit
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    20m
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">20 Minutes</h4>
                    <p className="text-gray-600">Heart rate and blood pressure drop</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    12h
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">12 Hours</h4>
                    <p className="text-gray-600">Carbon monoxide level normalizes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    2w
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">2 Weeks</h4>
                    <p className="text-gray-600">Circulation improves, lung function increases</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    1y
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">1 Year</h4>
                    <p className="text-gray-600">Risk of heart disease is cut in half</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">85%</div>
                <p className="text-gray-700 font-medium mb-4">Success Rate with Nicotex</p>
                <p className="text-gray-600 text-sm">
                  Clinical studies show that Nicotex doubles your chances of quitting successfully 
                  compared to willpower alone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;