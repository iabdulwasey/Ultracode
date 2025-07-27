import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I know which strength of Nicotex to choose?",
          answer: "Choose 4mg if you smoke 25 or more cigarettes per day, or if you smoke your first cigarette within 30 minutes of waking up. Choose 2mg if you smoke less than 25 cigarettes per day. When in doubt, consult with your healthcare provider or pharmacist."
        },
        {
          question: "How long should I use Nicotex?",
          answer: "The recommended treatment period is 12 weeks. Start with frequent use (every 1-2 hours) for the first 6 weeks, then gradually reduce over the remaining 6 weeks. Don't use Nicotex for more than 12 weeks without consulting your doctor."
        },
        {
          question: "Can I smoke while using Nicotex?",
          answer: "No, you should not smoke while using Nicotex. The combination can lead to nicotine overdose, causing nausea, dizziness, and other serious side effects. Commit to your quit date and use Nicotex as your only source of nicotine."
        }
      ]
    },
    {
      category: "Usage & Safety",
      questions: [
        {
          question: "What's the proper way to chew Nicotex?",
          answer: "Chew slowly until you taste nicotine or feel a slight tingling (usually 15 chews). Stop chewing and park the gum between your cheek and gum. When the tingling stops, resume chewing slowly. Repeat this process for 30 minutes, then dispose of the gum."
        },
        {
          question: "What are the common side effects?",
          answer: "Common side effects include mouth irritation, hiccups, nausea, jaw discomfort, and upset stomach. These usually decrease as you get used to the gum. If side effects persist or worsen, consult your healthcare provider."
        },
        {
          question: "Who should not use Nicotex?",
          answer: "Don't use Nicotex if you're pregnant or breastfeeding, under 18, have recent heart problems, stomach ulcers, or are allergic to any ingredients. Always consult your doctor before starting any nicotine replacement therapy."
        }
      ]
    },
    {
      category: "Effectiveness",
      questions: [
        {
          question: "How effective is Nicotex compared to other quit methods?",
          answer: "Clinical studies show that Nicotex doubles your chances of quitting successfully compared to willpower alone. It's one of the most effective over-the-counter smoking cessation aids, with success rates of up to 85% when used as directed."
        },
        {
          question: "What if I've tried to quit before and failed?",
          answer: "Previous quit attempts don't predict future success. Many people require multiple attempts before quitting permanently. Nicotex can help manage withdrawal symptoms that may have caused previous attempts to fail. Consider combining it with counseling or support groups for better results."
        },
        {
          question: "How quickly will I feel the benefits of quitting?",
          answer: "Benefits start immediately: within 20 minutes, your heart rate drops; within 12 hours, carbon monoxide levels normalize; within 2 weeks, circulation improves. Long-term benefits include reduced risk of heart disease, stroke, and cancer."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about Nicotex and your journey to quit smoking. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-primary/20">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex; // Create unique index
                  const isOpen = openFAQ === globalIndex;
                  
                  return (
                    <div key={faqIndex} className="bg-gray-50 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our dedicated support team is here to help you succeed in your quit journey. 
              Get personalized advice and support when you need it most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center bg-white rounded-lg px-6 py-3 shadow-lg">
                <span className="font-semibold text-gray-900 mr-2">Call:</span>
                <span className="text-primary font-bold">1-800-NICOTEX</span>
              </div>
              <div className="flex items-center justify-center bg-white rounded-lg px-6 py-3 shadow-lg">
                <span className="font-semibold text-gray-900 mr-2">Email:</span>
                <span className="text-primary font-bold">support@nicotex.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Contact Support Team
              </button>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Medical Information</h4>
            <p className="text-yellow-700 text-sm leading-relaxed">
              This information is for educational purposes only and is not intended to replace professional medical advice. 
              Always consult with your healthcare provider before starting any smoking cessation program, especially if you have 
              medical conditions or take medications. Individual results may vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;