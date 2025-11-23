import React, { useState } from 'react';
import { X } from 'lucide-react';

interface QuitPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlanData {
  currentUsage: string;
  quitDate: string;
  motivation: string;
  supportSystem: string;
  triggers: string[];
  replacementActivities: string[];
}

const QuitPlanModal: React.FC<QuitPlanModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [planData, setPlanData] = useState<PlanData>({
    currentUsage: '',
    quitDate: '',
    motivation: '',
    supportSystem: '',
    triggers: [],
    replacementActivities: []
  });

  const totalSteps = 5;

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically save the plan data
    console.log('Plan created:', planData);
    onClose();
    // Reset form
    setStep(1);
    setPlanData({
      currentUsage: '',
      quitDate: '',
      motivation: '',
      supportSystem: '',
      triggers: [],
      replacementActivities: []
    });
  };

  const handleTriggerChange = (trigger: string, checked: boolean) => {
    if (checked) {
      setPlanData(prev => ({
        ...prev,
        triggers: [...prev.triggers, trigger]
      }));
    } else {
      setPlanData(prev => ({
        ...prev,
        triggers: prev.triggers.filter(t => t !== trigger)
      }));
    }
  };

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      setPlanData(prev => ({
        ...prev,
        replacementActivities: [...prev.replacementActivities, activity]
      }));
    } else {
      setPlanData(prev => ({
        ...prev,
        replacementActivities: prev.replacementActivities.filter(a => a !== activity)
      }));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Current Smoking Habits</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many cigarettes do you smoke per day?
              </label>
              <select
                value={planData.currentUsage}
                onChange={(e) => setPlanData(prev => ({ ...prev, currentUsage: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your daily usage</option>
                <option value="1-5">1-5 cigarettes</option>
                <option value="6-10">6-10 cigarettes</option>
                <option value="11-20">11-20 cigarettes</option>
                <option value="21-30">21-30 cigarettes</option>
                <option value="30+">More than 30 cigarettes</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Set Your Quit Date</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                When would you like to quit smoking?
              </label>
              <input
                type="date"
                value={planData.quitDate}
                onChange={(e) => setPlanData(prev => ({ ...prev, quitDate: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 Tip: Choose a date within the next 2-4 weeks for the best chance of success.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Your Motivation</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why do you want to quit smoking?
              </label>
              <textarea
                value={planData.motivation}
                onChange={(e) => setPlanData(prev => ({ ...prev, motivation: e.target.value }))}
                placeholder="e.g., For my health, to save money, for my family..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who will support you in this journey?
              </label>
              <input
                type="text"
                value={planData.supportSystem}
                onChange={(e) => setPlanData(prev => ({ ...prev, supportSystem: e.target.value }))}
                placeholder="e.g., Family, friends, support group, healthcare provider..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Identify Your Triggers</h3>
            <p className="text-gray-600">Select situations that make you want to smoke:</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Stress', 'After meals', 'With coffee', 'Social situations',
                'Driving', 'Work breaks', 'Alcohol', 'Boredom',
                'Phone calls', 'After exercise', 'Morning routine', 'Before bed'
              ].map((trigger) => (
                <label key={trigger} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={planData.triggers.includes(trigger)}
                    onChange={(e) => handleTriggerChange(trigger, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{trigger}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Replacement Activities</h3>
            <p className="text-gray-600">Choose healthy activities to replace smoking:</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Deep breathing', 'Chew gum', 'Drink water', 'Take a walk',
                'Call a friend', 'Listen to music', 'Meditation', 'Exercise',
                'Hobby time', 'Healthy snack', 'Brush teeth', 'Play games'
              ].map((activity) => (
                <label key={activity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={planData.replacementActivities.includes(activity)}
                    onChange={(e) => handleActivityChange(activity, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{activity}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Create Your Quit Plan</h2>
              <p className="text-gray-600">Step {step} of {totalSteps}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {step < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create My Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuitPlanModal;