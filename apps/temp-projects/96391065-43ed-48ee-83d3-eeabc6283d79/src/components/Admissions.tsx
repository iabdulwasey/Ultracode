import React, { useState } from 'react';
import { FileText, Calendar, DollarSign, CheckCircle, Clock, Users, ArrowRight } from 'lucide-react';

const Admissions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('process');

  const admissionSteps = [
    {
      step: 1,
      title: 'Submit Application',
      description: 'Complete our online application form with required documents.',
      icon: FileText
    },
    {
      step: 2,
      title: 'Schedule Visit',
      description: 'Tour our campus and meet with admissions counselors.',
      icon: Calendar
    },
    {
      step: 3,
      title: 'Assessment',
      description: 'Student assessment and interview with academic team.',
      icon: Users
    },
    {
      step: 4,
      title: 'Decision',
      description: 'Receive admission decision and enrollment information.',
      icon: CheckCircle
    }
  ];

  const requirements = [
    'Completed application form',
    'Birth certificate or passport',
    'Previous school transcripts',
    'Immunization records',
    'Two letters of recommendation',
    'Student essay or personal statement',
    'Application fee ($100)'
  ];

  const tuitionInfo = [
    {
      grade: 'Kindergarten - 2nd Grade',
      tuition: '$12,000',
      features: ['Full-day program', 'After-school care', 'Hot lunch included']
    },
    {
      grade: '3rd - 5th Grade',
      tuition: '$14,000',
      features: ['Advanced curriculum', 'Technology integration', 'Extracurricular activities']
    },
    {
      grade: '6th - 8th Grade',
      tuition: '$16,000',
      features: ['Middle school program', 'College prep courses', 'Leadership opportunities']
    },
    {
      grade: '9th - 12th Grade',
      tuition: '$18,000',
      features: ['AP courses available', 'College counseling', 'Dual enrollment options']
    }
  ];

  const tabs = [
    { id: 'process', label: 'Admission Process', icon: Clock },
    { id: 'requirements', label: 'Requirements', icon: FileText },
    { id: 'tuition', label: 'Tuition & Fees', icon: DollarSign }
  ];

  return (
    <section id="admissions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Admissions Information
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of learners! We welcome students who are eager to grow, 
            learn, and contribute to our vibrant school environment.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">Rolling</div>
            <div className="text-gray-600">Admissions Process</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-secondary-600 mb-2">2-3 Weeks</div>
            <div className="text-gray-600">Decision Timeline</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">Need-Based</div>
            <div className="text-gray-600">Financial Aid Available</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 mx-2 mb-4 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Admission Process */}
          {activeTab === 'process' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Simple 4-Step Process
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {admissionSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto">
                        <step.icon className="h-8 w-8 text-primary-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <button className="btn-primary mr-4">
                  Start Application
                </button>
                <button className="btn-secondary">
                  Schedule Tour
                </button>
              </div>
            </div>
          )}

          {/* Requirements */}
          {activeTab === 'requirements' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Application Requirements
              </h3>
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">Required Documents</h4>
                  <div className="space-y-4">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-primary-50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Important Dates</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Priority Deadline:</span>
                      <span className="font-semibold text-primary-600">February 1st</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Regular Deadline:</span>
                      <span className="font-semibold text-primary-600">April 15th</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Late Applications:</span>
                      <span className="font-semibold text-primary-600">Space Available</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Financial Aid</h5>
                    <p className="text-sm text-gray-600">
                      Need-based financial aid is available. Submit your FAFSA 
                      application by March 1st for priority consideration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tuition & Fees */}
          {activeTab === 'tuition' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Tuition & Fees 2024-2025
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {tuitionInfo.map((info, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{info.grade}</h4>
                    <div className="text-3xl font-bold text-primary-600 mb-4">{info.tuition}</div>
                    <div className="text-sm text-gray-600 mb-4">per year</div>
                    <ul className="space-y-2">
                      {info.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-secondary-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-secondary-50 rounded-xl p-8">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Additional Information
                  </h4>
                  <p className="text-gray-600">
                    We believe education should be accessible to all qualified students.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-secondary-600 mb-2">40%</div>
                    <div className="text-sm text-gray-600">Students Receive Financial Aid</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-600 mb-2">$500K+</div>
                    <div className="text-sm text-gray-600">Annual Aid Distributed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-600 mb-2">Flexible</div>
                    <div className="text-sm text-gray-600">Payment Plans Available</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Take the first step towards an exceptional education. Our admissions team 
            is here to guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors">
              Contact Admissions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;