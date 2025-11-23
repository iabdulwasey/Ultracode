import React, { useState } from 'react';
import Header from './components/Header';
import LeagueTables from './components/LeagueTables';
import PlayerStats from './components/PlayerStats';
import PlayerProfiles from './components/PlayerProfiles';
import KeyStats from './components/KeyStats';
import TopPerformers from './components/TopPerformers';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<'leagues' | 'players' | 'profiles' | 'stats'>('leagues');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'leagues' && <LeagueTables />}
        {activeTab === 'players' && <PlayerStats />}
        {activeTab === 'profiles' && <PlayerProfiles />}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <KeyStats />
            <TopPerformers />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;