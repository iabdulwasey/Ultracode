import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do SmileAlign clear aligners work?',
      answer: 'SmileAlign uses a series of custom-made, clear plastic aligners that gradually shift your teeth into the desired position. Each aligner is worn for 1-2 weeks before moving to the next one in the series. The aligners apply gentle, consistent pressure to move teeth incrementally.'
    },
    {
      question: 'How long does treatment typically take?',
      answer: 'Most SmileAlign treatments take between 4-8 months, depending on the complexity of your case. Minor corrections may take as little as 2-3 months, while more complex cases might take up to 12 months. Your personalized treatment plan will include an estimated timeline.'
    },
    {
      question: 'Are the aligners really invisible?',
      answer: 'Yes! SmileAlign aligners are made from clear, medical-grade plastic that is virtually invisible when worn. Most people won\'t notice you\'re wearing them unless they look very closely. This makes them perfect for professional and social situations.'
    },
    {
      question: 'How often do I need to wear the aligners?',
      answer: 'For optimal results, you should wear your aligners 20-22 hours per day, removing them only for eating, drinking (except water), brushing, and flossing. Consistent wear is crucial for staying on track with your treatment timeline.'
    },
    {
      question: 'Will the aligners affect my speech?',
      answer: 'You may notice a slight lisp or change in speech for the first few days of wearing aligners, but most patients adjust quickly. The aligners are designed to be thin and comfortable, and any speech changes typically resolve within a week.'
    },
    {
      question: 'Can I eat and drink with aligners in?',
      answer: 'You should remove your aligners when eating or drinking anything other than water. This prevents staining and damage to the aligners. After eating, brush your teeth before putting the aligners back in to maintain good oral hygiene.'
    },
    {
      question: 'How do I clean my aligners?',
      answer: 'Clean your aligners daily with lukewarm water and a soft toothbrush. You can use clear, antibacterial soap or special aligner cleaning tablets. Avoid hot water, which can warp the plastic, and colored or scented soaps that might stain the aligners.'
    },
    {
      question: 'What happens if I lose or break an aligner?',
      answer: 'Contact us immediately if you lose or break an aligner. Depending on where you are in your treatment, we may advise you to move to the next aligner or go back to the previous one. We can provide replacement aligners if needed, though there may be additional costs.'
    },
    {
      question: 'Do I need to see a dentist during treatment?',
      answer: 'SmileAlign treatment is primarily remote, but we recommend maintaining regular dental checkups with your dentist. Our orthodontists monitor your progress through photos and check-ins. For complex cases, in-person consultations may be recommended.'
    },
    {
      question: 'What happens after my treatment is complete?',
      answer: 'After completing your aligner treatment, you\'ll receive retainers to maintain your new smile. Retainers are crucial for preventing teeth from shifting back to their original positions. We provide detailed instructions on retainer wear and care.'
    },
    {
      question: 'Is SmileAlign suitable for teenagers?',
      answer: 'SmileAlign is designed for adults and teens (16+) with fully erupted permanent teeth. For younger patients or more complex orthodontic needs, traditional braces might be more appropriate. We evaluate each case individually.'
    },
    {
      question: 'How much does SmileAlign cost compared to braces?',
      answer: 'SmileAlign typically costs 50-70% less than traditional braces. Our plans range from $1,495 to $3,495 depending on complexity, with flexible payment options starting at $89/month. We also accept HSA/FSA and offer 0% interest financing.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <HelpCircle className="text-primary-600" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to the most common questions about SmileAlign treatment, 
            process, and what to expect on your smile transformation journey.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <Minus className="text-primary-600" size={24} />
                  ) : (
                    <Plus className="text-primary-600" size={24} />
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Support */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our expert team is here to help you understand every aspect of your treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
              Schedule Free Consultation
            </button>
            <button className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
              Chat with Support
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-semibold text-gray-900">Phone Support</div>
                <div className="text-gray-600">(555) 123-4567</div>
                <div className="text-gray-500">Mon-Fri 8AM-8PM EST</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Live Chat</div>
                <div className="text-gray-600">Available 24/7</div>
                <div className="text-gray-500">Instant responses</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Email Support</div>
                <div className="text-gray-600">support@smilealign.com</div>
                <div className="text-gray-500">Response within 2 hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;