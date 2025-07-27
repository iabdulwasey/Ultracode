import React, { useState } from 'react';
import { Calendar, Target, Award, CheckCircle, ArrowRight } from 'lucide-react';

const QuitPlan = () => {
  const [formData, setFormData] = useState({
    cigarettesPerDay: '',
    smokingYears: '',
    previousAttempts: '',
    motivation: '',
    quitDate: ''
  });

  const [showPlan, setShowPlan] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generatePlan = () => {
    if (formData.cigarettesPerDay && formData.smokingYears) {
      setShowPlan(true);
    }
  };

  const getRecommendedStrength = () => {
    const cigarettes = parseInt(formData.cigarettesPerDay);
    return cigarettes >= 25 ? '4mg' : '2mg';
  };

  const getEstimatedSavings = () => {
    const cigarettes = parseInt(formData.cigarettesPerDay) || 0;
    const packsPerDay = cigarettes / 20;
    const costPerPack = 8; // Average cost
    const dailySavings = packsPerDay * costPerPack;
    const yearlySavings = dailySavings * 365;
    return {
      daily: dailySavings.toFixed(2),
      monthly: (dailySavings * 30).toFixed(0),
      yearly: yearlySavings.toFixed(0)
    };
  };

  const weeks = [
    {
      week: "1-6",
      title: "Initial Phase",
      description: "Use one piece every 1-2 hours",
      pieces: "Up to 24 pieces per day",
      focus: "Manage withdrawal symptoms and establish new routines"
    },
    {
      week: "7-9",
      title: "Reduction Phase",
      description: "Reduce to one piece every 2-4 hours",
      pieces: "12-16 pieces per day",
      focus: "Build confidence and strengthen new habits"
    },
    {
      week: "10-12",
      title: "Final Phase",
      description: "Use one piece every 4-8 hours",
      pieces: "6-8 pieces per day",
      focus: "Complete nicotine independence"
    }
  ];

  return (
    <section id="quit-plan" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your Personalized Quit Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Answer a few questions to receive a customized 12-week quit plan designed specifically 
            for your smoking habits and lifestyle.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!showPlan ? (
            /* Assessment Form */
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Tell Us About Your Smoking</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        How many cigarettes do you smoke per day?
                      </label>
                      <select
                        name="cigarettesPerDay"
                        value={formData.cigarettesPerDay}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select range</option>
                        <option value="5">1-10 cigarettes</option>
                        <option value="15">11-20 cigarettes</option>
                        <option value="30">21-40 cigarettes</option>
                        <option value="50">More than 40</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        How long have you been smoking?
                      </label>
                      <select
                        name="smokingYears"
                        value={formData.smokingYears}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select duration</option>
                        <option value="1">Less than 1 year</option>
                        <option value="3">1-5 years</option>
                        <option value="8">6-10 years</option>
                        <option value="15">11-20 years</option>
                        <option value="25">More than 20 years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        How many times have you tried to quit?
                      </label>
                      <select
                        name="previousAttempts"
                        value={formData.previousAttempts}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select number</option>
                        <option value="0">This is my first time</option>
                        <option value="1">1-2 times</option>
                        <option value="3">3-5 times</option>
                        <option value="6">More than 5 times</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        When do you want to quit?
                      </label>
                      <input
                        type="date"
                        name="quitDate"
                        value={formData.quitDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Motivation</h3>
                  
                  <div className="space-y-4 mb-8">
                    <label className="block text-gray-700 font-medium mb-2">
                      What's your main reason for quitting?
                    </label>
                    {[
                      'Improve my health',
                      'Save money',
                      'Family/loved ones',
                      'Doctor recommendation',
                      'Pregnancy',
                      'Other'
                    ].map((reason) => (
                      <label key={reason} className="flex items-center">
                        <input
                          type="radio"
                          name="motivation"
                          value={reason}
                          onChange={handleInputChange}
                          className="mr-3 text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700">{reason}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={generatePlan}
                    disabled={!formData.cigarettesPerDay || !formData.smokingYears}
                    className="w-full bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    Generate My Quit Plan
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Generated Plan */
            <div className="space-y-8">
              {/* Plan Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Target className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">Recommended</div>
                    <div className="text-primary-foreground/90">Nicotex {getRecommendedStrength()}</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">12 Weeks</div>
                    <div className="text-primary-foreground/90">Complete Program</div>
                  </div>
                  <div className="text-center">
                    <Award className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">${getEstimatedSavings().yearly}</div>
                    <div className="text-primary-foreground/90">Estimated Yearly Savings</div>
                  </div>
                </div>
              </div>

              {/* Savings Breakdown */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Potential Savings</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${getEstimatedSavings().daily}</div>
                    <div className="text-gray-600">Per Day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${getEstimatedSavings().monthly}</div>
                    <div className="text-gray-600">Per Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${getEstimatedSavings().yearly}</div>
                    <div className="text-gray-600">Per Year</div>
                  </div>
                </div>
              </div>

              {/* Weekly Plan */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Your 12-Week Journey</h3>
                <div className="space-y-6">
                  {weeks.map((phase, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Week {phase.week}: {phase.title}</h4>
                          <p className="text-gray-600">{phase.description}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 ml-14">
                        <div>
                          <span className="font-medium text-gray-700">Usage: </span>
                          <span className="text-gray-600">{phase.pieces}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Focus: </span>
                          <span className="text-gray-600">{phase.focus}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Order Nicotex {getRecommendedStrength()}
                </button>
                <button className="flex-1 border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                  Download PDF Plan
                </button>
                <button 
                  onClick={() => setShowPlan(false)}
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Modify Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuitPlan;