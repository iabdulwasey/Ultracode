import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface ProductQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

interface QuizResult {
  product: string;
  description: string;
  features: string[];
  price: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How long have you been smoking?",
    options: ["Less than 1 year", "1-5 years", "5-10 years", "10+ years"]
  },
  {
    id: 2,
    question: "How many cigarettes do you smoke per day?",
    options: ["1-5 cigarettes", "6-10 cigarettes", "11-20 cigarettes", "More than 20 cigarettes"]
  },
  {
    id: 3,
    question: "What's your main motivation to quit?",
    options: ["Health concerns", "Save money", "Family pressure", "Social reasons"]
  },
  {
    id: 4,
    question: "Have you tried to quit before?",
    options: ["Never tried", "Tried once", "Tried multiple times", "Currently trying"]
  },
  {
    id: 5,
    question: "What's your biggest challenge when trying to quit?",
    options: ["Nicotine cravings", "Stress management", "Social situations", "Habit breaking"]
  }
];

const getRecommendation = (answers: number[]): QuizResult => {
  const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
  
  if (totalScore <= 8) {
    return {
      product: "NicoGum Starter Pack",
      description: "Perfect for light smokers or those just beginning their quit journey.",
      features: ["2mg nicotine gum", "Gradual reduction plan", "Mobile app support", "24/7 helpline"],
      price: "$29.99"
    };
  } else if (totalScore <= 12) {
    return {
      product: "NicoGum Standard Pack",
      description: "Ideal for moderate smokers ready to take control of their habit.",
      features: ["4mg nicotine gum", "8-week program", "Behavioral coaching", "Progress tracking"],
      price: "$49.99"
    };
  } else {
    return {
      product: "NicoGum Premium Pack",
      description: "Comprehensive solution for heavy smokers and multiple quit attempts.",
      features: ["4mg + 2mg nicotine gum", "12-week program", "Personal coach", "Stress management tools"],
      price: "$79.99"
    };
  }
};

const ProductQuizModal: React.FC<ProductQuizModalProps> = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [recommendation, setRecommendation] = useState<QuizResult | null>(null);

  if (!isOpen) return null;

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, show result
      const result = getRecommendation(newAnswers);
      setRecommendation(result);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setRecommendation(null);
  };

  const handleClose = () => {
    handleRestart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {showResult ? 'Your Recommendation' : 'Product Quiz'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!showResult ? (
            <>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{option}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <div className="text-sm text-gray-500">
                  Click an option to continue
                </div>
              </div>
            </>
          ) : (
            /* Results */
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Based on your answers, we recommend:
                </h3>
              </div>

              {recommendation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h4 className="text-2xl font-bold text-blue-900 mb-2">{recommendation.product}</h4>
                  <p className="text-blue-800 mb-4">{recommendation.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-blue-900 mb-2">What's included:</h5>
                    <ul className="space-y-1">
                      {recommendation.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-blue-800">
                          <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-900">{recommendation.price}</span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Get Started
                    </button>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={handleRestart}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductQuizModal;