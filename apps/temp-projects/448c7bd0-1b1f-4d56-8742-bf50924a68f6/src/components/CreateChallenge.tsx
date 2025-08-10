import React, { useState } from 'react';
import { Plus, Minus, Clock, Users, Trophy, Target } from 'lucide-react';
import { Category, Question } from '../types';

interface CreateChallengeProps {
  categories: Category[];
  onCreateChallenge: (challengeData: any) => void;
}

const CreateChallenge: React.FC<CreateChallengeProps> = ({ categories, onCreateChallenge }) => {
  const [step, setStep] = useState(1);
  const [challengeData, setChallengeData] = useState({
    title: '',
    titleAr: '',
    description: '',
    descriptionAr: '',
    categoryId: '',
    difficulty: 'medium',
    maxParticipants: 10,
    duration: 30,
    entryFee: 0,
    prizePool: 0,
    questions: [] as Question[],
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    textAr: '',
    options: ['', '', '', ''],
    optionsAr: ['', '', '', ''],
    correctAnswer: 0,
    timeLimit: 30,
    points: 10,
  });

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const addQuestion = () => {
    if (currentQuestion.textAr.trim() && currentQuestion.optionsAr.every(opt => opt.trim())) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: currentQuestion.text,
        textAr: currentQuestion.textAr,
        options: currentQuestion.options,
        optionsAr: currentQuestion.optionsAr,
        correctAnswer: currentQuestion.correctAnswer,
        difficulty: challengeData.difficulty as 'easy' | 'medium' | 'hard',
        category: categories.find(c => c.id === challengeData.categoryId)!,
        timeLimit: currentQuestion.timeLimit,
        points: currentQuestion.points,
      };

      setChallengeData(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion]
      }));

      setCurrentQuestion({
        text: '',
        textAr: '',
        options: ['', '', '', ''],
        optionsAr: ['', '', '', ''],
        correctAnswer: 0,
        timeLimit: 30,
        points: 10,
      });
    }
  };

  const removeQuestion = (index: number) => {
    setChallengeData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (challengeData.questions.length >= 5) {
      onCreateChallenge(challengeData);
    }
  };

  const selectedCategory = categories.find(c => c.id === challengeData.categoryId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-saudi-green to-green-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">إنشاء تحدي جديد</h1>
        <p className="text-saudi-gold/90">أنشئ تحدي معرفي مخصص وتحدى اللاعبين الآخرين</p>
        
        {/* Progress */}
        <div className="flex items-center gap-4 mt-6">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : 'text-white/50'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-white text-saudi-green' : 'bg-white/20'}`}>
              1
            </div>
            <span>المعلومات الأساسية</span>
          </div>
          <div className="flex-1 h-px bg-white/20"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : 'text-white/50'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-white text-saudi-green' : 'bg-white/20'}`}>
              2
            </div>
            <span>الأسئلة</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <form onSubmit={handleBasicInfoSubmit} className="space-y-6">
            {/* Title */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان التحدي (بالعربية) *
                </label>
                <input
                  type="text"
                  required
                  value={challengeData.titleAr}
                  onChange={(e) => setChallengeData(prev => ({ ...prev, titleAr: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                  placeholder="مثال: تحدي الثقافة العامة"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge Title (English)
                </label>
                <input
                  type="text"
                  value={challengeData.title}
                  onChange={(e) => setChallengeData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                  placeholder="e.g., General Knowledge Challenge"
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف التحدي (بالعربية) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={challengeData.descriptionAr}
                  onChange={(e) => setChallengeData(prev => ({ ...prev, descriptionAr: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                  placeholder="اكتب وصفاً مفصلاً للتحدي..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge Description (English)
                </label>
                <textarea
                  rows={4}
                  value={challengeData.description}
                  onChange={(e) => setChallengeData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                  placeholder="Write a detailed description of the challenge..."
                />
              </div>
            </div>

            {/* Category and Difficulty */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التصنيف *
                </label>
                <select
                  required
                  value={challengeData.categoryId}
                  onChange={(e) => setChallengeData(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                >
                  <option value="">اختر التصنيف</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.nameAr}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مستوى الصعوبة *
                </label>
                <select
                  value={challengeData.difficulty}
                  onChange={(e) => setChallengeData(prev => ({ ...prev, difficulty: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                >
                  <option value="easy">سهل</option>
                  <option value="medium">متوسط</option>
                  <option value="hard">صعب</option>
                </select>
              </div>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  عدد المشاركين
                </label>
                <input
                  type="number"
                  min="2"
                  max="100"
                  value={challengeData.maxParticipants}
                  onChange={(e) => setChallengeData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  المدة (دقيقة)
                </label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={challengeData.duration}
                  onChange={(e) => setChallengeData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رسم الدخول (ريال)
                </label>
                <input
                  type="number"
                  min="0"
                  value={challengeData.entryFee}
                  onChange={(e) => setChallengeData(prev => ({ ...prev, entryFee: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Trophy className="w-4 h-4 inline mr-1" />
                  الجائزة (ريال)
                </label>
                <input
                  type="number"
                  min="0"
                  value={challengeData.prizePool}
                  onChange={(e) => setChallengeData(prev => ({ ...prev, prizePool: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-saudi-green text-white px-8 py-3 rounded-lg font-medium hover:bg-saudi-green/90 transition-colors"
              >
                التالي: إضافة الأسئلة
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          {/* Questions Summary */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">الأسئلة المضافة</h2>
              <span className="text-sm text-gray-600">
                {challengeData.questions.length} سؤال (الحد الأدنى: 5)
              </span>
            </div>

            {challengeData.questions.length > 0 ? (
              <div className="space-y-3">
                {challengeData.questions.map((question, index) => (
                  <div key={question.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="w-8 h-8 bg-saudi-green text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{question.textAr}</p>
                      <p className="text-sm text-gray-600">
                        {question.points} نقطة • {question.timeLimit} ثانية
                      </p>
                    </div>
                    <button
                      onClick={() => removeQuestion(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">لم يتم إضافة أسئلة بعد</p>
            )}
          </div>

          {/* Add Question Form */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">إضافة سؤال جديد</h3>

            <div className="space-y-4">
              {/* Question Text */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نص السؤال (بالعربية) *
                  </label>
                  <textarea
                    rows={3}
                    value={currentQuestion.textAr}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, textAr: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                    placeholder="اكتب السؤال هنا..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Text (English)
                  </label>
                  <textarea
                    rows={3}
                    value={currentQuestion.text}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                    placeholder="Write the question here..."
                  />
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الخيارات *
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {currentQuestion.optionsAr.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={currentQuestion.correctAnswer === index}
                        onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                        className="text-saudi-green focus:ring-saudi-green"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...currentQuestion.optionsAr];
                          newOptions[index] = e.target.value;
                          setCurrentQuestion(prev => ({ ...prev, optionsAr: newOptions }));
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                        placeholder={`الخيار ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    وقت السؤال (ثانية)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="120"
                    value={currentQuestion.timeLimit}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 inline mr-1" />
                    النقاط
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={currentQuestion.points}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saudi-green focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={addQuestion}
                disabled={!currentQuestion.textAr.trim() || !currentQuestion.optionsAr.every(opt => opt.trim())}
                className="w-full bg-saudi-green text-white py-3 rounded-lg font-medium hover:bg-saudi-green/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                إضافة السؤال
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              العودة للمعلومات الأساسية
            </button>
            <button
              onClick={handleSubmit}
              disabled={challengeData.questions.length < 5}
              className="bg-saudi-green text-white px-8 py-3 rounded-lg font-medium hover:bg-saudi-green/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              إنشاء التحدي
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateChallenge;