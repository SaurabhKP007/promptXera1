/*
import { useState } from 'react';
import NeuralBackground from './components/NeuralBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AITools from './pages/AITools';
import PracticePrompt from './pages/PracticePrompt';
import TutorialNew from './pages/TutorialNew';
import PromptLegendsNew from './pages/PromptLegendsNew';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<any>(null);

  function handleNavigate(page: string, data?: any) {
    setCurrentPage(page);
    setPageData(data || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderPage() {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'tools':
        return <AITools />;
      case 'practice':
        return <PracticePrompt initialPromptId={pageData?.promptId} />;
      case 'tutorial':
        return <TutorialNew />;
      case 'legends':
        return <PromptLegendsNew />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] overflow-x-hidden">
      <NeuralBackground />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="relative z-10">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
*/
import { useState, useEffect } from 'react';
import NeuralBackground from './components/NeuralBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AITools from './pages/AITools';
import PracticePrompt from './pages/PracticePrompt';
import TutorialNew from './pages/TutorialNew';
import PromptLegendsNew from './pages/PromptLegendsNew';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile view dynamically
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // mobile breakpoint (Tailwind 'md')
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleNavigate(page: string, data?: any) {
    setCurrentPage(page);
    setPageData(data || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderPage() {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'tools':
        return <AITools />;
      case 'practice':
        return <PracticePrompt initialPromptId={pageData?.promptId} />;
      case 'tutorial':
        return <TutorialNew />;
      case 'legends':
        return <PromptLegendsNew />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] overflow-x-hidden">
      <NeuralBackground />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="relative z-10">
        {renderPage()}
      </main>

      {/* ✅ Hide Footer on Tutorial page or on Mobile */}
      {!isMobile && currentPage !== 'tutorial' && <Footer />}
    </div>
  );
}

export default App;

