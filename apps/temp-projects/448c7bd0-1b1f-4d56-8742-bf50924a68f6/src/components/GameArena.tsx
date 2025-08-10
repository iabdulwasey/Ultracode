import React, { useState, useEffect } from 'react';
import { Clock, Users, Trophy, CheckCircle, X, RotateCcw } from 'lucide-react';
import { GameState, Answer } from '../types';

interface GameArenaProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onGameEnd: () => void;
}

const GameArena: React.FC<GameArenaProps> = ({ gameState, setGameState, onGameEnd }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = gameState.activeChallenge?.questions[gameState.currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (!gameState.isGameActive || !currentQuestion || isAnswered) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeRemaining <= 1) {
          // Time's up - auto submit
          handleTimeUp();
          return prev;
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isGameActive, gameState.currentQuestionIndex, isAnswered]);

  const handleTimeUp = () => {
    if (isAnswered) return;
    
    const answer: Answer = {
      questionId: currentQuestion!.id,
      selectedAnswer: selectedAnswer ?? -1,
      isCorrect: false,
      timeSpent: currentQuestion!.timeLimit,
      points: 0
    };

    setGameState(prev => ({
      ...prev,
      answers: [...prev.answers, answer]
    }));

    setIsAnswered(true);
    setShowResult(true);
    
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswered) return;

    const isCorrect = selectedAnswer === currentQuestion!.correctAnswer;
    const timeSpent = currentQuestion!.timeLimit - gameState.timeRemaining;
    const points = isCorrect ? Math.max(1, currentQuestion!.points - Math.floor(timeSpent / 2)) : 0;

    const answer: Answer = {
      questionId: currentQuestion!.id,
      selectedAnswer,
      isCorrect,
      timeSpent,
      points
    };

    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      answers: [...prev.answers, answer]
    }));

    setIsAnswered(true);
    setShowResult(true);

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    const nextIndex = gameState.currentQuestionIndex + 1;
    
    if (nextIndex >= (gameState.activeChallenge?.questions.length || 0)) {
      // Game finished
      endGame();
    } else {
      // Next question
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        timeRemaining: gameState.activeChallenge!.questions[nextIndex].timeLimit
      }));
      
      setSelectedAnswer(null);
      setShowResult(false);
      setIsAnswered(false);
    }
  };

  const endGame = () => {
    setGameState(prev => ({
      ...prev,
      isGameActive: false
    }));
  };

  const handleRestartGame = () => {
    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      timeRemaining: prev.activeChallenge!.questions[0].timeLimit,
      score: 0,
      answers: [],
      isGameActive: true
    }));
    
    setSelectedAnswer(null);
    setShowResult(false);
    setIsAnswered(false);
  };

  if (!gameState.activeChallenge || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">لا يوجد تحدي نشط</h2>
          <button
            onClick={onGameEnd}
            className="bg-saudi-green text-white px-6 py-2 rounded-lg hover:bg-saudi-green/90"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (!gameState.isGameActive) {
    const correctAnswers = gameState.answers.filter(a => a.isCorrect).length;
    const totalQuestions = gameState.activeChallenge.questions.length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-saudi-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-saudi-gold" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">انتهى التحدي!</h1>
          <p className="text-gray-600 mb-8">تهانينا على إكمال التحدي</p>
          
          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">{gameState.score}</div>
              <div className="text-sm text-blue-800">النقاط المكتسبة</div>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">{correctAnswers}/{totalQuestions}</div>
              <div className="text-sm text-green-800">الإجابات الصحيحة</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6">
              <div className="text-2xl font-bold text-yellow-600 mb-2">{accuracy}%</div>
              <div className="text-sm text-yellow-800">معدل الدقة</div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">مراجعة الإجابات</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {gameState.answers.map((answer, index) => {
                const question = gameState.activeChallenge!.questions.find(q => q.id === answer.questionId);
                return (
                  <div key={answer.questionId} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg text-right">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      answer.isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {answer.isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <X className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{question?.textAr}</p>
                      <p className="text-xs text-gray-600">
                        {answer.points} نقطة • {answer.timeSpent}s
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestartGame}
              className="bg-saudi-green text-white px-8 py-3 rounded-lg font-medium hover:bg-saudi-green/90 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              إعادة التحدي
            </button>
            <button
              onClick={onGameEnd}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((gameState.currentQuestionIndex + 1) / gameState.activeChallenge.questions.length) * 100;
  const timePercentage = (gameState.timeRemaining / currentQuestion.timeLimit) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{gameState.activeChallenge.titleAr}</h1>
            <p className="text-gray-600">{gameState.activeChallenge.category.nameAr}</p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{gameState.activeChallenge.participants.length} لاعب</span>
            </div>
            <div className="flex items-center gap-2 text-saudi-gold">
              <Trophy className="w-4 h-4" />
              <span>{gameState.score} نقطة</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              السؤال {gameState.currentQuestionIndex + 1} من {gameState.activeChallenge.questions.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-saudi-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-600" />
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold ${gameState.timeRemaining <= 10 ? 'text-red-600' : 'text-gray-900'}`}>
              {gameState.timeRemaining}s
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${
                  timePercentage <= 20 ? 'bg-red-500' : timePercentage <= 50 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${timePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-saudi-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">{gameState.currentQuestionIndex + 1}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-relaxed">
            {currentQuestion.textAr}
          </h2>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
            <span>{currentQuestion.points} نقطة</span>
            <span>•</span>
            <span>{currentQuestion.timeLimit} ثانية</span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentQuestion.optionsAr.map((option, index) => {
            let buttonClass = "w-full p-6 border-2 rounded-xl text-right font-medium transition-all duration-200 ";
            
            if (showResult) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            } else if (selectedAnswer === index) {
              buttonClass += "border-saudi-green bg-saudi-green/10 text-saudi-green";
            } else {
              buttonClass += "border-gray-200 hover:border-saudi-green hover:bg-saudi-green/5 text-gray-700";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    showResult && index === currentQuestion.correctAnswer
                      ? 'bg-green-500 text-white'
                      : showResult && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer
                        ? 'bg-red-500 text-white'
                        : selectedAnswer === index
                          ? 'bg-saudi-green text-white'
                          : 'bg-gray-200 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {showResult && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  {showResult && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                    <X className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit Button */}
        {!showResult && (
          <div className="text-center">
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null || isAnswered}
              className="bg-saudi-green text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-saudi-green/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              تأكيد الإجابة
            </button>
          </div>
        )}

        {/* Result Feedback */}
        {showResult && (
          <div className="text-center">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium ${
              gameState.answers[gameState.answers.length - 1]?.isCorrect
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {gameState.answers[gameState.answers.length - 1]?.isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span>إجابة صحيحة! +{gameState.answers[gameState.answers.length - 1]?.points} نقطة</span>
                </>
              ) : (
                <>
                  <X className="w-6 h-6" />
                  <span>إجابة خاطئة</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameArena;