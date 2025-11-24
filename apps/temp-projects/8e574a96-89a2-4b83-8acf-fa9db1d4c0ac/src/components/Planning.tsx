import React, { useState } from 'react';
import { MapPin, Calendar, Users, Plane, Hotel, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface PlanningStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  timeline: string;
  tips: string[];
}

const planningSteps: PlanningStep[] = [
  {
    id: 1,
    title: 'Visa & Documents',
    description: 'Ensure your passport is valid and check visa requirements for your nationality.',
    icon: Plane,
    timeline: '3-6 months before',
    tips: [
      'Passport valid for 6+ months',
      'Check visa requirements',
      'Get travel insurance',
      'Copy important documents'
    ]
  },
  {
    id: 2,
    title: 'Book Flights',
    description: 'Find the best flight deals and book your international and domestic flights.',
    icon: Plane,
    timeline: '2-4 months before',
    tips: [
      'Compare airline prices',
      'Consider stopovers',
      'Book domestic flights',
      'Check baggage policies'
    ]
  },
  {
    id: 3,
    title: 'Accommodation',
    description: 'Reserve hotels, ryokans, or other accommodations based on your itinerary.',
    icon: Hotel,
    timeline: '2-3 months before',
    tips: [
      'Mix hotel types (hotels, ryokans)',
      'Book popular areas early',
      'Consider location vs price',
      'Read recent reviews'
    ]
  },
  {
    id: 4,
    title: 'JR Pass & Transport',
    description: 'Purchase Japan Rail Pass and plan your transportation between cities.',
    icon: MapPin,
    timeline: '1-2 months before',
    tips: [
      'Calculate JR Pass value',
      'Reserve seat reservations',
      'Download transport apps',
      'Get IC card for local transport'
    ]
  },
  {
    id: 5,
    title: 'Money & Budget',
    description: 'Plan your budget and arrange cash, as Japan is still largely cash-based.',
    icon: CreditCard,
    timeline: '1 month before',
    tips: [
      'Japan is cash-heavy',
      'Get yen before arrival',
      'Notify banks of travel',
      'Budget ¥10,000-15,000/day'
    ]
  },
  {
    id: 6,
    title: 'Final Preparations',
    description: 'Complete last-minute preparations and downloads for your trip.',
    icon: CheckCircle,
    timeline: '1 week before',
    tips: [
      'Download offline maps',
      'Learn basic Japanese phrases',
      'Pack appropriate clothing',
      'Confirm all bookings'
    ]
  }
];

const budgetRanges = [
  {
    type: 'Budget',
    daily: '¥8,000-12,000',
    description: 'Hostels, street food, public transport',
    color: 'from-green-400 to-green-600'
  },
  {
    type: 'Mid-Range',
    daily: '¥15,000-25,000',
    description: 'Hotels, restaurants, some experiences',
    color: 'from-blue-400 to-blue-600'
  },
  {
    type: 'Luxury',
    daily: '¥30,000+',
    description: 'Luxury hotels, fine dining, premium experiences',
    color: 'from-purple-400 to-purple-600'
  }
];

const Planning: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<PlanningStep>(planningSteps[0]);
  const [tripDuration, setTripDuration] = useState(7);
  const [budgetType, setBudgetType] = useState('Mid-Range');

  const calculateBudget = () => {
    const ranges = {
      'Budget': { min: 8000, max: 12000 },
      'Mid-Range': { min: 15000, max: 25000 },
      'Luxury': { min: 30000, max: 50000 }
    };
    const range = ranges[budgetType as keyof typeof ranges];
    return {
      min: (range.min * tripDuration).toLocaleString(),
      max: (range.max * tripDuration).toLocaleString()
    };
  };

  return (
    <section id="planning" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plan Your <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our step-by-step guide to plan the perfect trip to Japan
          </p>
        </div>

        {/* Budget Calculator */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Trip Budget Calculator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Duration Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Trip Duration</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="3"
                  max="21"
                  value={tripDuration}
                  onChange={(e) => setTripDuration(Number(e.target.value))}
                  className="flex-1"
                />
                <div className="bg-japan-red text-white px-4 py-2 rounded-full font-medium min-w-[80px] text-center">
                  {tripDuration} days
                </div>
              </div>
            </div>

            {/* Budget Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Travel Style</label>
              <div className="grid grid-cols-3 gap-2">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.type}
                    onClick={() => setBudgetType(budget.type)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      budgetType === budget.type
                        ? `bg-gradient-to-r ${budget.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {budget.type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Budget Result */}
          <div className="bg-gradient-to-r from-japan-navy to-slate-800 rounded-2xl p-6 text-white text-center">
            <h4 className="text-xl font-bold mb-2">Estimated Total Budget</h4>
            <div className="text-3xl font-bold mb-2">
              ¥{calculateBudget().min} - ¥{calculateBudget().max}
            </div>
            <p className="text-gray-300">
              For {tripDuration} days • {budgetType} style travel
            </p>
          </div>
        </div>

        {/* Planning Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Planning Timeline</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planningSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${
                    selectedStep.id === step.id
                      ? 'ring-2 ring-japan-red transform scale-105'
                      : 'hover:shadow-xl hover:-translate-y-1'
                  }`}
                  onClick={() => setSelectedStep(step)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-japan-red/10 rounded-full p-3">
                      <IconComponent className="w-6 h-6 text-japan-red" />
                    </div>
                    <div className="bg-japan-cherry/20 text-japan-red px-3 py-1 rounded-full text-sm font-medium">
                      {step.timeline}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  
                  <div className="space-y-1">
                    {step.tips.slice(0, 2).map((tip, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-500">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{tip}</span>
                      </div>
                    ))}
                    {step.tips.length > 2 && (
                      <div className="text-sm text-gray-400 mt-2">
                        +{step.tips.length - 2} more tips
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Step Details */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-japan-red to-japan-cherry text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-4">
                <selectedStep.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{selectedStep.title}</h3>
                <p className="text-white/80">{selectedStep.timeline}</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-gray-700 text-lg mb-6">{selectedStep.description}</p>
            
            <h4 className="text-xl font-bold text-gray-900 mb-4">Essential Tips:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedStep.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Essential Apps & Resources */}
        <div className="bg-gradient-to-r from-japan-navy to-slate-800 rounded-3xl p-8 md:p-12 text-white mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Essential Apps & Resources
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-japan-cherry/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-japan-cherry" />
              </div>
              <h4 className="text-lg font-bold mb-2">Google Translate</h4>
              <p className="text-gray-300 text-sm">Camera translation for signs and menus</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-japan-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-japan-gold" />
              </div>
              <h4 className="text-lg font-bold mb-2">Hyperdia</h4>
              <p className="text-gray-300 text-sm">Train schedules and route planning</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-japan-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-japan-sage" />
              </div>
              <h4 className="text-lg font-bold mb-2">Tabelog</h4>
              <p className="text-gray-300 text-sm">Restaurant reviews and recommendations</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-lg font-bold mb-2">Safety Tips</h4>
              <p className="text-gray-300 text-sm">Emergency numbers and safety info</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Planning?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get our comprehensive Japan travel guide with detailed itineraries, insider tips, and booking assistance
          </p>
          <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            Get Travel Guide
          </button>
        </div>
      </div>
    </section>
  );
};

export default Planning;