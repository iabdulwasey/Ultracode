import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plane, Hotel, Camera, DollarSign } from 'lucide-react';

const PlanYourTrip: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState('7-10');
  const [selectedBudget, setSelectedBudget] = useState('moderate');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['culture']);

  const durations = [
    { id: '3-5', label: '3-5 Days', description: 'Quick getaway' },
    { id: '7-10', label: '7-10 Days', description: 'Perfect first visit' },
    { id: '14+', label: '14+ Days', description: 'Deep exploration' }
  ];

  const budgets = [
    { id: 'budget', label: 'Budget', range: '$50-100/day', description: 'Hostels, local food, public transport' },
    { id: 'moderate', label: 'Moderate', range: '$100-200/day', description: 'Mid-range hotels, mix of experiences' },
    { id: 'luxury', label: 'Luxury', range: '$200+/day', description: 'Premium hotels, exclusive experiences' }
  ];

  const interests = [
    { id: 'culture', label: 'Culture & Temples', icon: MapPin },
    { id: 'food', label: 'Food & Dining', icon: DollarSign },
    { id: 'nature', label: 'Nature & Hiking', icon: Camera },
    { id: 'modern', label: 'Modern Cities', icon: Hotel },
    { id: 'adventure', label: 'Adventure Sports', icon: Plane },
    { id: 'relaxation', label: 'Onsen & Relaxation', icon: Clock }
  ];

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const sampleItineraries = {
    '3-5': {
      title: 'Tokyo Highlights',
      days: [
        { day: 1, activities: ['Arrive in Tokyo', 'Explore Shibuya & Harajuku', 'Tokyo Skytree evening'] },
        { day: 2, activities: ['Senso-ji Temple', 'Tsukiji Fish Market', 'Ginza shopping'] },
        { day: 3, activities: ['Day trip to Nikko', 'Toshogu Shrine', 'Return to Tokyo'] }
      ]
    },
    '7-10': {
      title: 'Golden Route',
      days: [
        { day: 1, activities: ['Arrive Tokyo', 'Shibuya & Shinjuku'] },
        { day: 2, activities: ['Traditional Tokyo', 'Asakusa & Ueno'] },
        { day: 3, activities: ['Day trip to Nikko or Kamakura'] },
        { day: 4, activities: ['Travel to Kyoto', 'Gion district'] },
        { day: 5, activities: ['Kyoto temples', 'Bamboo grove'] },
        { day: 6, activities: ['Day trip to Nara'] },
        { day: 7, activities: ['Osaka food tour', 'Dotonbori'] }
      ]
    },
    '14+': {
      title: 'Complete Japan',
      days: [
        { day: '1-4', activities: ['Tokyo exploration', 'Day trips around Kanto'] },
        { day: '5-8', activities: ['Kyoto & Nara', 'Traditional experiences'] },
        { day: '9-10', activities: ['Osaka & Hiroshima', 'Food & history'] },
        { day: '11-12', activities: ['Mount Fuji region', 'Hakone onsen'] },
        { day: '13-14', activities: ['Takayama & Shirakawa-go', 'Alpine route'] }
      ]
    }
  };

  const essentialTips = [
    {
      icon: Plane,
      title: 'Transportation',
      tips: ['Get JR Pass for unlimited train travel', 'IC cards for local transport', 'Book shinkansen seats in advance']
    },
    {
      icon: Hotel,
      title: 'Accommodation',
      tips: ['Book early, especially during peak seasons', 'Try ryokan for traditional experience', 'Capsule hotels for budget option']
    },
    {
      icon: DollarSign,
      title: 'Money Matters',
      tips: ['Japan is still largely cash-based', 'Get cash from 7-Eleven ATMs', 'Budget ¥3000-5000/day for meals']
    },
    {
      icon: Camera,
      title: 'Cultural Tips',
      tips: ['Learn basic Japanese phrases', 'Bow as greeting', 'No tipping culture', 'Respect photography rules']
    }
  ];

  return (
    <section id="plan" className="py-20 bg-gradient-to-br from-sakura-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Plan Your <span className="text-japanese-red">Perfect Trip</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Let us help you create an unforgettable Japanese adventure tailored to your interests, 
            budget, and travel style.
          </p>
        </div>

        {/* Trip Planner */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-japanese-red to-sakura-500 p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Customize Your Journey</h3>
            <p className="text-xl opacity-90">Tell us your preferences and we'll create the perfect itinerary</p>
          </div>

          <div className="p-8">
            {/* Duration Selection */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-japanese-red" />
                How long is your trip?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {durations.map((duration) => (
                  <button
                    key={duration.id}
                    onClick={() => setSelectedDuration(duration.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedDuration === duration.id
                        ? 'border-japanese-red bg-sakura-50 text-japanese-red'
                        : 'border-gray-200 hover:border-sakura-300'
                    }`}
                  >
                    <div className="font-semibold">{duration.label}</div>
                    <div className="text-sm text-gray-600">{duration.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Selection */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-japanese-red" />
                What's your budget?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {budgets.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setSelectedBudget(budget.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedBudget === budget.id
                        ? 'border-japanese-red bg-sakura-50 text-japanese-red'
                        : 'border-gray-200 hover:border-sakura-300'
                    }`}
                  >
                    <div className="font-semibold">{budget.label}</div>
                    <div className="text-sm font-medium">{budget.range}</div>
                    <div className="text-xs text-gray-600 mt-1">{budget.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests Selection */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Camera className="w-6 h-6 mr-2 text-japanese-red" />
                What interests you most?
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                      selectedInterests.includes(interest.id)
                        ? 'border-japanese-red bg-sakura-50 text-japanese-red'
                        : 'border-gray-200 hover:border-sakura-300'
                    }`}
                  >
                    <interest.icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{interest.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Itinerary Button */}
            <div className="text-center">
              <button className="bg-gradient-to-r from-japanese-red to-sakura-500 text-white px-12 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-semibold text-lg">
                Generate My Itinerary
              </button>
            </div>
          </div>
        </div>

        {/* Sample Itinerary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sample Itinerary: {sampleItineraries[selectedDuration as keyof typeof sampleItineraries].title}
            </h3>
            <div className="space-y-4">
              {sampleItineraries[selectedDuration as keyof typeof sampleItineraries].days.map((dayPlan, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-sakura-50 rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 bg-japanese-red text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {typeof dayPlan.day === 'number' ? dayPlan.day : dayPlan.day}
                  </div>
                  <div>
                    <div className="space-y-1">
                      {dayPlan.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="text-gray-700">{activity}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Essential Tips */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Travel Tips</h3>
            <div className="space-y-6">
              {essentialTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-sakura-100 rounded-full flex items-center justify-center">
                    <tip.icon className="w-5 h-5 text-japanese-red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                    <ul className="space-y-1">
                      {tip.tips.map((tipText, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-japanese-red rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {tipText}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Planning Services */}
        <div className="bg-gradient-to-r from-japanese-red to-sakura-500 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Need Personalized Planning?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our Japan travel experts can create a completely customized itinerary based on your specific interests and needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-japanese-red px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Talk to an Expert</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-japanese-red transition-all duration-300 font-semibold flex items-center justify-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Custom Itinerary</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanYourTrip;