import React from 'react';
import { Target, Clock, TrendingDown, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Target,
      title: "Choose Your Strength",
      description: "Select the right nicotine strength based on your smoking habits. Heavy smokers start with 4mg, lighter smokers with 2mg.",
      details: ["2mg for <25 cigarettes/day", "4mg for 25+ cigarettes/day", "Personalized recommendations available"]
    },
    {
      icon: Clock,
      title: "Follow the Schedule",
      description: "Chew one piece every 1-2 hours for the first 6 weeks, then gradually reduce frequency over 12 weeks.",
      details: ["Weeks 1-6: Every 1-2 hours", "Weeks 7-9: Every 2-4 hours", "Weeks 10-12: Every 4-8 hours"]
    },
    {
      icon: TrendingDown,
      title: "Gradual Reduction",
      description: "Slowly decrease the number of pieces per day to wean your body off nicotine dependency naturally.",
      details: ["Start with up to 24 pieces/day", "Reduce by 1-2 pieces weekly", "Complete program in 12 weeks"]
    },
    {
      icon: CheckCircle,
      title: "Achieve Freedom",
      description: "Successfully break free from both the physical addiction and psychological habits of smoking.",
      details: ["Manage withdrawal symptoms", "Break smoking triggers", "Build new healthy habits"]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Nicotex Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our scientifically proven 4-step process helps you quit smoking gradually and comfortably, 
            reducing withdrawal symptoms while breaking the smoking habit.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary to-primary/20 transform translate-x-4"></div>
                )}
                
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm text-gray-500 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-primary to-nicotex-600 rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">The Science Behind Nicotex</h3>
              <p className="text-nicotex-100 mb-6">
                Nicotex delivers controlled amounts of nicotine through your mouth's lining, 
                satisfying cravings without the harmful chemicals found in cigarettes. This allows 
                your body to gradually adjust to lower nicotine levels.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold mb-1">4,000+</div>
                  <div className="text-sm text-nicotex-200">Harmful chemicals avoided</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold mb-1">15min</div>
                  <div className="text-sm text-nicotex-200">Time to feel relief</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4">Proper Chewing Technique</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                  <span>Chew slowly until you taste nicotine or feel tingling</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                  <span>Stop chewing and park the gum between cheek and gum</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                  <span>When tingling stops, resume chewing slowly</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                  <span>Repeat for 30 minutes, then dispose of gum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;