import { User, Category, Challenge, Question } from '../types';

export const mockUser: User = {
  id: '1',
  username: 'محمد العلي',
  email: 'mohammed@example.com',
  level: 15,
  experience: 2850,
  totalScore: 15420,
  gamesPlayed: 127,
  gamesWon: 89,
  winRate: 70,
  badges: [],
  createdAt: new Date('2024-01-15'),
  region: 'الرياض',
  preferredLanguage: 'ar'
};

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'محمد العلي',
    email: 'mohammed@example.com',
    level: 15,
    experience: 2850,
    totalScore: 15420,
    gamesPlayed: 127,
    gamesWon: 89,
    winRate: 70,
    badges: [],
    createdAt: new Date('2024-01-15'),
    region: 'الرياض',
    preferredLanguage: 'ar'
  },
  {
    id: '2',
    username: 'فاطمة أحمد',
    email: 'fatima@example.com',
    level: 18,
    experience: 3200,
    totalScore: 18750,
    gamesPlayed: 156,
    gamesWon: 112,
    winRate: 72,
    badges: [],
    createdAt: new Date('2023-12-10'),
    region: 'جدة',
    preferredLanguage: 'ar'
  },
  {
    id: '3',
    username: 'عبدالله سالم',
    email: 'abdullah@example.com',
    level: 12,
    experience: 2100,
    totalScore: 12300,
    gamesPlayed: 98,
    gamesWon: 65,
    winRate: 66,
    badges: [],
    createdAt: new Date('2024-02-20'),
    region: 'الدمام',
    preferredLanguage: 'ar'
  }
];

export const mockCategories: Category[] = [
  {
    id: 'business',
    name: 'Business',
    nameAr: 'الأعمال',
    icon: '💼',
    color: '#1f2937',
    description: 'Business and entrepreneurship knowledge',
    descriptionAr: 'معرفة الأعمال وريادة الأعمال',
    questionCount: 150
  },
  {
    id: 'medical',
    name: 'Medical',
    nameAr: 'الطب',
    icon: '⚕️',
    color: '#dc2626',
    description: 'Medical and health sciences',
    descriptionAr: 'العلوم الطبية والصحية',
    questionCount: 200
  },
  {
    id: 'legal',
    name: 'Legal',
    nameAr: 'القانون',
    icon: '⚖️',
    color: '#7c2d12',
    description: 'Law and legal studies',
    descriptionAr: 'القانون والدراسات القانونية',
    questionCount: 120
  },
  {
    id: 'general',
    name: 'General Knowledge',
    nameAr: 'الثقافة العامة',
    icon: '🧠',
    color: '#059669',
    description: 'General knowledge and culture',
    descriptionAr: 'المعرفة العامة والثقافة',
    questionCount: 300
  },
  {
    id: 'technology',
    name: 'Technology',
    nameAr: 'التكنولوجيا',
    icon: '💻',
    color: '#2563eb',
    description: 'Technology and computer science',
    descriptionAr: 'التكنولوجيا وعلوم الحاسوب',
    questionCount: 180
  },
  {
    id: 'islamic',
    name: 'Islamic Studies',
    nameAr: 'الدراسات الإسلامية',
    icon: '🕌',
    color: '#16a34a',
    description: 'Islamic knowledge and studies',
    descriptionAr: 'المعرفة والدراسات الإسلامية',
    questionCount: 250
  }
];

// Sample questions for different categories
const createMockQuestions = (category: Category): Question[] => {
  const questions: Omit<Question, 'category'>[] = [];
  
  if (category.id === 'general') {
    questions.push(
      {
        id: 'q1',
        text: 'What is the capital of Saudi Arabia?',
        textAr: 'ما هي عاصمة المملكة العربية السعودية؟',
        options: ['Jeddah', 'Riyadh', 'Dammam', 'Mecca'],
        optionsAr: ['جدة', 'الرياض', 'الدمام', 'مكة'],
        correctAnswer: 1,
        difficulty: 'easy',
        timeLimit: 30,
        points: 10
      },
      {
        id: 'q2',
        text: 'In which year was Saudi Arabia founded?',
        textAr: 'في أي عام تأسست المملكة العربية السعودية؟',
        options: ['1930', '1932', '1934', '1936'],
        optionsAr: ['1930', '1932', '1934', '1936'],
        correctAnswer: 1,
        difficulty: 'medium',
        timeLimit: 30,
        points: 15
      }
    );
  } else if (category.id === 'business') {
    questions.push(
      {
        id: 'q3',
        text: 'What does ROI stand for?',
        textAr: 'ماذا يعني اختصار ROI؟',
        options: ['Return on Investment', 'Rate of Interest', 'Revenue Operations Index', 'Risk Operations Indicator'],
        optionsAr: ['العائد على الاستثمار', 'معدل الفائدة', 'مؤشر عمليات الإيرادات', 'مؤشر عمليات المخاطر'],
        correctAnswer: 0,
        difficulty: 'medium',
        timeLimit: 30,
        points: 15
      }
    );
  } else if (category.id === 'medical') {
    questions.push(
      {
        id: 'q4',
        text: 'What is the normal human body temperature?',
        textAr: 'ما هي درجة حرارة الجسم الطبيعية للإنسان؟',
        options: ['36°C', '37°C', '38°C', '39°C'],
        optionsAr: ['36 درجة مئوية', '37 درجة مئوية', '38 درجة مئوية', '39 درجة مئوية'],
        correctAnswer: 1,
        difficulty: 'easy',
        timeLimit: 30,
        points: 10
      }
    );
  }
  
  // Fill remaining slots with generic questions
  while (questions.length < 10) {
    questions.push({
      id: `q${questions.length + 1}`,
      text: `Sample question ${questions.length + 1} for ${category.name}`,
      textAr: `سؤال تجريبي ${questions.length + 1} في ${category.nameAr}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      optionsAr: ['الخيار أ', 'الخيار ب', 'الخيار ج', 'الخيار د'],
      correctAnswer: Math.floor(Math.random() * 4),
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as 'easy' | 'medium' | 'hard',
      timeLimit: 30,
      points: 10
    });
  }
  
  return questions.map(q => ({ ...q, category }));
};

export const mockChallenges: Challenge[] = mockCategories.map((category, index) => ({
  id: `challenge-${index + 1}`,
  title: `${category.name} Challenge`,
  titleAr: `تحدي ${category.nameAr}`,
  description: `Test your knowledge in ${category.description}`,
  descriptionAr: `اختبر معرفتك في ${category.descriptionAr}`,
  category,
  creator: mockUsers[index % mockUsers.length],
  participants: mockUsers.slice(0, Math.floor(Math.random() * 3) + 1),
  maxParticipants: 20,
  questions: createMockQuestions(category),
  status: ['waiting', 'active'][Math.floor(Math.random() * 2)] as 'waiting' | 'active',
  duration: 30,
  entryFee: Math.floor(Math.random() * 50),
  prizePool: Math.floor(Math.random() * 5000) + 1000,
  difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as 'easy' | 'medium' | 'hard',
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
}));