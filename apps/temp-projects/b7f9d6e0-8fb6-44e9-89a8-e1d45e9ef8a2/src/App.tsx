import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BlogPost from './components/BlogPost';
import BlogList from './components/BlogList';
import Footer from './components/Footer';
import { BlogPostType } from './types/blog';
import { samplePosts } from './data/samplePosts';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const filteredPosts = samplePosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onHomeClick={() => setSelectedPost(null)}
      />
      
      <main className="pt-20">
        {selectedPost ? (
          <BlogPost 
            post={selectedPost} 
            onBack={() => setSelectedPost(null)}
          />
        ) : (
          <BlogList 
            posts={filteredPosts}
            onPostSelect={setSelectedPost}
            searchTerm={searchTerm}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;