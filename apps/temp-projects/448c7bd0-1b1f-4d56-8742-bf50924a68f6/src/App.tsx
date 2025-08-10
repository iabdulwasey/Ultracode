import React, { useState, useEffect } from 'react';
import { User, Challenge, Category, GameState, Notification } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChallengeList from './components/ChallengeList';
import CreateChallenge from './components/CreateChallenge';
import GameArena from './components/GameArena';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import AuthModal from './components/AuthModal';
import NotificationCenter from './components/NotificationCenter';
import { mockUser, mockCategories, mockChallenges } from './data/mockData';

type ActiveView = 'dashboard' | 'challenges' | 'create' | 'game' | 'leaderboard' | 'profile';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    currentUser: null,
    activeChallenge: null,
    gameSession: null,
    currentQuestionIndex: 0,
    timeRemaining: 0,
    score: 0,
    answers: [],
    isGameActive: false,
  });

  // Initialize user session
  useEffect(() => {
    const savedUser = localStorage.getItem('saudiKnowledgeUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setGameState(prev => ({ ...prev, currentUser: user }));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('saudiKnowledgeUser');
      }
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simulate login - in real app, this would call an API
    const user = { ...mockUser, email };
    setCurrentUser(user);
    setGameState(prev => ({ ...prev, currentUser: user }));
    localStorage.setItem('saudiKnowledgeUser', JSON.stringify(user));
    setShowAuthModal(false);
  };

  const handleRegister = (username: string, email: string, password: string) => {
    // Simulate registration - in real app, this would call an API
    const newUser: User = {
      ...mockUser,
      id: Date.now().toString(),
      username,
      email,
      level: 1,
      experience: 0,
      totalScore: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      winRate: 0,
      badges: [],
      createdAt: new Date(),
    };
    setCurrentUser(newUser);
    setGameState(prev => ({ ...prev, currentUser: newUser }));
    localStorage.setItem('saudiKnowledgeUser', JSON.stringify(newUser));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setGameState(prev => ({ ...prev, currentUser: null }));
    localStorage.removeItem('saudiKnowledgeUser');
    setActiveView('dashboard');
  };

  const handleJoinChallenge = (challenge: Challenge) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      activeChallenge: challenge,
      isGameActive: true,
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      timeRemaining: challenge.questions[0]?.timeLimit || 30,
    }));
    setActiveView('game');
  };

  const handleCreateChallenge = (challengeData: any) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    
    // In a real app, this would send data to the server
    console.log('Creating challenge:', challengeData);
    setActiveView('challenges');
  };

  const renderActiveView = () => {
    if (!currentUser && activeView !== 'dashboard') {
      return <Dashboard 
        user={currentUser} 
        onJoinChallenge={handleJoinChallenge}
        onViewChallenges={() => setActiveView('challenges')}
        onCreateChallenge={() => setActiveView('create')}
      />;
    }

    switch (activeView) {
      case 'challenges':
        return <ChallengeList 
          challenges={mockChallenges}
          categories={mockCategories}
          onJoinChallenge={handleJoinChallenge}
        />;
      case 'create':
        return <CreateChallenge 
          categories={mockCategories}
          onCreateChallenge={handleCreateChallenge}
        />;
      case 'game':
        return <GameArena 
          gameState={gameState}
          setGameState={setGameState}
          onGameEnd={() => setActiveView('dashboard')}
        />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile user={currentUser!} />;
      default:
        return <Dashboard 
          user={currentUser} 
          onJoinChallenge={handleJoinChallenge}
          onViewChallenges={() => setActiveView('challenges')}
          onCreateChallenge={() => setActiveView('create')}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saudi-green/5 to-saudi-gold/5 saudi-pattern">
      <Header 
        user={currentUser}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onShowNotifications={() => setShowNotifications(true)}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          activeView={activeView}
          onViewChange={setActiveView}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:mr-64' : ''}`}>
          <div className="p-4 lg:p-6">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}

      {showNotifications && (
        <NotificationCenter
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
}

export default App;