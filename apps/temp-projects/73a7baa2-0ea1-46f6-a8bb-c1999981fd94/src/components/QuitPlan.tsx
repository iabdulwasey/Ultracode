import React, { useState } from 'react';
import { Calendar, CheckCircle, Target, TrendingDown } from 'lucide-react';

const QuitPlan: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const weeklyPlan = [
    {
      week: '1-6',
      title: 'Initial Phase',
      gumsPerDay: '8-12 pieces',
      description: 'Use one piece every 1-2 hours when you feel cravings',
      tips: [
        'Use gum whenever you feel the urge to smoke',
        'Don\'t exceed 24 pieces per day',
        'Avoid eating or drinking 15 minutes before and during use'
      ]
    },
    {
      week: '7-9',
      title: 'Reduction Phase',
      gumsPerDay: '4-8 pieces',
      description: 'Gradually reduce usage by spacing out doses longer',
      tips: [
        'Increase time between pieces to 2-4 hours',
        'Focus on your strongest craving times',
        'Replace some gum with healthy alternatives'
      ]
    },
    {
      week: '10-12',
      title: 'Final Phase',
      gumsPerDay: '1-4 pieces',
      description: 'Minimal usage as you prepare to stop completely',
      tips: [
        'Use only during strongest cravings',
        'Practice coping strategies without gum',
        'Prepare for complete cessation'
      ]
    }
  ];

  const milestones = [
    { day: 1, title: 'Quit Day', description: 'Your smoke-free journey begins!' },
    { day: 3, title: 'Nicotine-Free', description: 'All nicotine from cigarettes is out of your system' },
    { day: 7, title: 'One Week', description: 'You\'ve made it through the hardest week' },
    { day: 30, title: 'One Month', description: 'Cravings are becoming less frequent' },
    { day: 90, title: 'Three Months', description: 'Program complete - you\'re smoke-free!' }
  ];

  return (
    <section id="quit-plan" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Your 12-Week Quit Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our structured program to gradually reduce your nicotine dependence 
            and successfully quit smoking for good.
          </p>
        </div>

        {/* Weekly Plan */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Weekly Usage Guide
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {weeklyPlan.map((phase, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-4">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Week {phase.week}
                  </h4>
                  <h5 className="text-lg font-medium text-green-600 mb-2">
                    {phase.title}
                  </h5>
                  <div className="bg-green-50 rounded-lg p-3 mb-4">
                    <div className="text-2xl font-bold text-green-600">
                      {phase.gumsPerDay}
                    </div>
                    <div className="text-sm text-green-700">per day</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-center">
                  {phase.description}
                </p>
                
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">Tips:</h6>
                  <ul className="space-y-1">
                    {phase.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Celebrate Your Milestones
          </h3>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`bg-white rounded-lg shadow-lg p-6 max-w-md ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                    <div className="flex items-center mb-3">
                      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <Target className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{milestone.title}</h5>
                        <p className="text-sm text-gray-600">Day {milestone.day}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 bg-green-600 rounded-full w-4 h-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Start Your Quit Journey?
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Get your personalized quit plan and start your smoke-free life today.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get My Quit Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuitPlan;