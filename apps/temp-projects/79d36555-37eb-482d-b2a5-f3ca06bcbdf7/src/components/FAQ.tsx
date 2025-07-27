import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does Nicotex gum work?",
      answer: "Nicotex gum contains nicotine that is absorbed through the lining of your mouth when chewed correctly. This helps reduce withdrawal symptoms and cravings by providing a controlled amount of nicotine without the harmful chemicals found in cigarettes."
    },
    {
      question: "Which strength should I choose - 2mg or 4mg?",
      answer: "Choose 4mg if you smoke 20+ cigarettes per day or smoke within 30 minutes of waking up. Choose 2mg if you smoke fewer than 20 cigarettes per day or wait more than 30 minutes after waking before your first cigarette."
    },
    {
      question: "How long should I use Nicotex gum?",
      answer: "The typical program lasts 12 weeks. You'll gradually reduce the number of pieces per day. Most people use 8-12 pieces daily in weeks 1-6, 4-8 pieces in weeks 7-9, and 2-4 pieces in weeks 10-12 before stopping completely."
    },
    {
      question: "Are there any side effects?",
      answer: "Common mild side effects may include jaw discomfort, hiccups, or stomach upset if chewed too quickly. These usually improve with proper chewing technique. Serious side effects are rare but consult your doctor if you experience irregular heartbeat or severe nausea."
    },
    {
      question: "Can I use Nicotex if I'm pregnant or breastfeeding?",
      answer: "Consult your healthcare provider before using any nicotine replacement therapy during pregnancy or breastfeeding. While NRT is generally safer than smoking, medical supervision is recommended."
    },
    {
      question: "What's the proper way to chew Nicotex gum?",
      answer: "Chew slowly until you taste nicotine (peppery taste), then 'park' the gum between your cheek and gum. When the taste fades, chew again. Repeat this 'chew and park' method for about 30 minutes per piece."
    },
    {
      question: "Can I eat or drink while using the gum?",
      answer: "Avoid eating or drinking (except water) for 15 minutes before and during gum use, as acidic foods and drinks can reduce nicotine absorption."
    },
    {
      question: "What if I accidentally swallow the gum?",
      answer: "Swallowing a piece occasionally is not dangerous, but try to avoid it as the nicotine won't be properly absorbed. The gum will pass through your system naturally."
    },
    {
      question: "Is Nicotex gum addictive?",
      answer: "While Nicotex contains nicotine, it's much less addictive than cigarettes because it delivers nicotine more slowly and at lower levels. Most people successfully stop using the gum after completing the 12-week program."
    },
    {
      question: "Can I use Nicotex with other quit-smoking aids?",
      answer: "Don't use multiple nicotine products simultaneously without medical supervision. However, you can combine Nicotex with non-nicotine support like counseling, apps, or support groups."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-nicotex-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about Nicotex and your quit-smoking journey.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="h-5 w-5 text-nicotex-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-nicotex-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-nicotex-100 mb-6">
            Our quit-smoking specialists are here to help you succeed. 
            Get personalized support and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-nicotex-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Call 1-800-NICOTEX
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-nicotex-600 transition-colors">
              Live Chat Support
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h4 className="text-xl font-bold text-gray-900 mb-4">💡 Pro Tips for Success</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Set a quit date and stick to it</li>
              <li>• Remove all cigarettes from your environment</li>
              <li>• Tell friends and family about your quit plan</li>
              <li>• Identify your smoking triggers</li>
              <li>• Keep gum handy at all times</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h4 className="text-xl font-bold text-gray-900 mb-4">🚫 What to Avoid</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Don't chew too fast or hard</li>
              <li>• Avoid acidic drinks while chewing</li>
              <li>• Don't use more than 24 pieces per day</li>
              <li>• Don't swallow the gum</li>
              <li>• Don't give up if you have a slip</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;