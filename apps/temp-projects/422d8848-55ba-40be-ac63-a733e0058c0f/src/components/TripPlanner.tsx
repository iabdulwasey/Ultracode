import React, { useState } from 'react';
import { X, MapPin, Calendar, Users, Clock, Plane, Hotel, Camera, ArrowRight, Check } from 'lucide-react';

interface TripPlannerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  interests: string[];
  accommodation: string;
  transportation: string;
}

const TripPlanner: React.FC<TripPlannerProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: '',
    interests: [],
    accommodation: '',
    transportation: ''
  });

  const destinations = [
    { id: 'tokyo', name: 'Tokyo', description: 'Modern metropolis with traditional charm' },
    { id: 'kyoto', name: 'Kyoto', description: 'Ancient capital with temples and gardens' },
    { id: 'osaka', name: 'Osaka', description: 'Food capital and vibrant nightlife' },
    { id: 'hiroshima', name: 'Hiroshima', description: 'Historical significance and natural beauty' },
    { id: 'mount-fuji', name: 'Mount Fuji', description: 'Sacred mountain and natural wonder' },
    { id: 'hokkaido', name: 'Hokkaido', description: 'Northern island with pristine nature' }
  ];

  const interests = [
    { id: 'temples', name: 'Temples & Shrines', icon: '⛩️' },
    { id: 'food', name: 'Food & Cuisine', icon: '🍣' },
    { id: 'culture', name: 'Traditional Culture', icon: '🎌' },
    { id: 'nature', name: 'Nature & Hiking', icon: '🏔️' },
    { id: 'cities', name: 'Modern Cities', icon: '🏙️' },
    { id: 'festivals', name: 'Festivals & Events', icon: '🎆' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'nightlife', name: 'Nightlife', icon: '🌃' }
  ];

  const budgetRanges = [
    { id: 'budget', name: 'Budget', range: '$50-100/day', description: 'Hostels, local food, public transport' },
    { id: 'mid-range', name: 'Mid-range', range: '$100-200/day', description: 'Hotels, mix of restaurants, some tours' },
    { id: 'luxury', name: 'Luxury', range: '$200+/day', description: 'Premium hotels, fine dining, private tours' }
  ];

  const accommodationTypes = [
    { id: 'hotel', name: 'Hotels', icon: Hotel },
    { id: 'ryokan', name: 'Traditional Ryokan', icon: Hotel },
    { id: 'hostel', name: 'Hostels', icon: Hotel },
    { id: 'apartment', name: 'Apartments', icon: Hotel }
  ];

  const transportationTypes = [
    { id: 'jr-pass', name: 'JR Pass', icon: Plane },
    { id: 'local-transport', name: 'Local Transport', icon: Plane },
    { id: 'rental-car', name: 'Rental Car', icon: Plane },
    { id: 'domestic-flights', name: 'Domestic Flights', icon: Plane }
  ];

  const handleInterestToggle = (interestId: string) => {
    setTripDetails(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Trip Details:', tripDetails);
    alert('Trip plan created! We\'ll send you a customized itinerary soon.');
    onClose();
    setStep(1);
    setTripDetails({
      destination: '',
      startDate: '',
      endDate: '',
      travelers: 2,
      budget: '',
      interests: [],
      accommodation: '',
      transportation: ''
    });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-japan-red to-japan-cherry p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Plan Your Japan Trip</h2>
              <p className="text-white/90">Step {step} of 4</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Step 1: Destination & Dates */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Where & When?</h3>
                <p className="text-gray-600">Choose your destination and travel dates</p>
              </div>

              {/* Destinations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Destination
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => setTripDetails(prev => ({ ...prev, destination: dest.id }))}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        tripDetails.destination === dest.id
                          ? 'border-japan-red bg-japan-red/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{dest.name}</h4>
                          <p className="text-sm text-gray-600">{dest.description}</p>
                        </div>
                        {tripDetails.destination === dest.id && (
                          <Check className="w-5 h-5 text-japan-red" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={tripDetails.startDate}
                    onChange={(e) => setTripDetails(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-japan-red focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={tripDetails.endDate}
                    onChange={(e) => setTripDetails(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-japan-red focus:border-transparent"
                  />
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Travelers
                </label>
                <select
                  value={tripDetails.travelers}
                  onChange={(e) => setTripDetails(prev => ({ ...prev, travelers: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-japan-red focus:border-transparent"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Budget & Interests */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Budget & Interests</h3>
                <p className="text-gray-600">Tell us about your budget and what you love</p>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Budget Range
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {budgetRanges.map((budget) => (
                    <button
                      key={budget.id}
                      onClick={() => setTripDetails(prev => ({ ...prev, budget: budget.id }))}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        tripDetails.budget === budget.id
                          ? 'border-japan-red bg-japan-red/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-900">{budget.name}</h4>
                      <p className="text-japan-red font-medium">{budget.range}</p>
                      <p className="text-xs text-gray-600 mt-1">{budget.description}</p>
                      {tripDetails.budget === budget.id && (
                        <Check className="w-5 h-5 text-japan-red mx-auto mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What interests you? (Select multiple)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        tripDetails.interests.includes(interest.id)
                          ? 'border-japan-red bg-japan-red/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{interest.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{interest.name}</div>
                      {tripDetails.interests.includes(interest.id) && (
                        <Check className="w-4 h-4 text-japan-red mx-auto mt-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Accommodation & Transportation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Accommodation & Transport</h3>
                <p className="text-gray-600">Choose your preferred options</p>
              </div>

              {/* Accommodation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Accommodation Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {accommodationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setTripDetails(prev => ({ ...prev, accommodation: type.id }))}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        tripDetails.accommodation === type.id
                          ? 'border-japan-red bg-japan-red/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <type.icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                      <div className="text-sm font-medium text-gray-900">{type.name}</div>
                      {tripDetails.accommodation === type.id && (
                        <Check className="w-4 h-4 text-japan-red mx-auto mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transportation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Transportation Preference
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {transportationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setTripDetails(prev => ({ ...prev, transportation: type.id }))}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        tripDetails.transportation === type.id
                          ? 'border-japan-red bg-japan-red/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <type.icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                      <div className="text-sm font-medium text-gray-900">{type.name}</div>
                      {tripDetails.transportation === type.id && (
                        <Check className="w-4 h-4 text-japan-red mx-auto mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Trip Summary</h3>
                <p className="text-gray-600">Review your trip details</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Destination</h4>
                    <p className="text-gray-600 capitalize">{tripDetails.destination.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-600">{tripDetails.startDate} to {tripDetails.endDate}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Travelers</h4>
                    <p className="text-gray-600">{tripDetails.travelers} {tripDetails.travelers === 1 ? 'person' : 'people'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Budget</h4>
                    <p className="text-gray-600 capitalize">{tripDetails.budget.replace('-', ' ')}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {tripDetails.interests.map(interestId => {
                      const interest = interests.find(i => i.id === interestId);
                      return (
                        <span key={interestId} className="px-3 py-1 bg-japan-red/10 text-japan-red rounded-full text-sm">
                          {interest?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-japan-red/10 to-japan-cherry/10 rounded-2xl p-6 text-center">
                <Camera className="w-12 h-12 text-japan-red mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Your Custom Itinerary is Ready!
                </h4>
                <p className="text-gray-600">
                  We'll create a personalized itinerary based on your preferences and email it to you within 24 hours.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {step < 4 ? (
              <button
                onClick={nextStep}
                disabled={
                  (step === 1 && (!tripDetails.destination || !tripDetails.startDate || !tripDetails.endDate)) ||
                  (step === 2 && (!tripDetails.budget || tripDetails.interests.length === 0)) ||
                  (step === 3 && (!tripDetails.accommodation || !tripDetails.transportation))
                }
                className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span>Create My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;