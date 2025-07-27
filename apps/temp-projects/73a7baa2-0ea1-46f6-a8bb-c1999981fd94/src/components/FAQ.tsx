import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does Nicotex gum work?',
      answer: 'Nicotex gum provides controlled amounts of nicotine to help reduce withdrawal symptoms and cravings when you quit smoking. The nicotine is absorbed through the lining of your mouth, providing relief from cravings while you break the habit of smoking.'
    },
    {
      question: 'Which strength should I choose - 2mg or 4mg?',
      answer: 'Choose 2mg if you smoke less than 20 cigarettes per day or if you smoke your first cigarette more than 30 minutes after waking up. Choose 4mg if you smoke 20 or more cigarettes per day or if you smoke your first cigarette within 30 minutes of waking up.'
    },
    {
      question: 'How long should I use Nicotex gum?',
      answer: 'The recommended program is 12 weeks. Weeks 1-6: Use as needed (up to 24 pieces per day). Weeks 7-9: Gradually reduce usage. Weeks 10-12: Further reduce until you can stop completely. Don\'t use for more than 12 weeks without consulting a healthcare provider.'
    },
    {
      question: 'Can I eat or drink while using the gum?',
      answer: 'Avoid eating or drinking anything except water for 15 minutes before and while chewing Nicotex gum. Food and drinks (especially acidic ones like coffee, juice, or soda) can reduce nicotine absorption and make the gum less effective.'
    },
    {
      question: 'What is the "chew and park" method?',
      answer: 'Chew the gum slowly until you taste nicotine or feel tingling (usually 15-20 chews), then "park" it between your cheek and gum. When the taste fades, chew a few more times and park again. Repeat for about 30 minutes per piece.'
    },
    {
      question: 'Are there any side effects?',
      answer: 'Common side effects include mouth or throat irritation, jaw muscle aches, hiccups, or upset stomach. These usually improve as you get used to the gum. Chewing too fast or swallowing the gum can cause nausea or heartburn.'
    },
    {
      question: 'Can I smoke while using Nicotex gum?',
      answer: 'No, do not smoke while using Nicotex gum. This can lead to nicotine overdose and is dangerous. The gum is designed to replace cigarettes completely. Set a quit date and stop smoking entirely when you start using the gum.'
    },
    {
      question: 'How effective is Nicotex compared to quitting cold turkey?',
      answer: 'Studies show that nicotine replacement therapy like Nicotex gum can double your chances of successfully quitting smoking compared to trying to quit without assistance. The gradual reduction helps manage withdrawal symptoms more effectively.'
    },
    {
      question: 'Can I use Nicotex if I\'m pregnant or breastfeeding?',
      answer: 'Consult your healthcare provider before using Nicotex if you\'re pregnant, planning to become pregnant, or breastfeeding. While nicotine replacement may be safer than smoking, it\'s important to discuss the risks and benefits with your doctor.'
    },
    {
      question: 'What if I accidentally swallow the gum?',
      answer: 'Accidentally swallowing a piece of Nicotex gum occasionally is usually not harmful, but it may cause stomach upset. The gum is not meant to be swallowed. If you frequently swallow the gum or experience severe symptoms, contact your healthcare provider.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about Nicotex gum and your quit journey.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you succeed in your quit journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Download Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;