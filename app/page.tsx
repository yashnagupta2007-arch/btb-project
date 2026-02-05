'use client';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import CareerQuiz from './components/CareerQuiz';
import QuizResults from './components/QuizResults';
import Roadmap from './components/Roadmap';
import PortfolioUpload from './components/PortfolioUpload';
import AIFeedback from './components/AIFeedback';
import ProgressDashboard from './components/ProgressDashboard';

type Screen = 'landing' | 'quiz' | 'results' | 'roadmap' | 'upload' | 'feedback' | 'dashboard';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [quizResults, setQuizResults] = useState<Record<string, number> | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string>('software');
  const [uploadData, setUploadData] = useState<any>(null);

  const handleStart = (type: 'quiz' | 'roadmap') => {
    if (type === 'quiz') {
      setCurrentScreen('quiz');
    } else {
      setCurrentScreen('roadmap');
    }
  };

  const handleQuizComplete = (scores: Record<string, number>) => {
    setQuizResults(scores);
    setCurrentScreen('results');
  };

  const handleViewRoadmap = (career: string) => {
    setSelectedCareer(career);
    setCurrentScreen('roadmap');
  };

  const handleUpload = (skillName: string) => {
    setUploadData({ skillName });
    setCurrentScreen('upload');
  };

  const handleGetFeedback = (upload: any) => {
    setUploadData(upload);
    setCurrentScreen('feedback');
  };

  const handleFeedbackComplete = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <main>
      {currentScreen === 'landing' && <LandingPage onStart={handleStart} />}
      {currentScreen === 'quiz' && <CareerQuiz onComplete={handleQuizComplete} />}
      {currentScreen === 'results' && quizResults && (
        <QuizResults scores={quizResults} onViewRoadmap={handleViewRoadmap} />
      )}
      {currentScreen === 'roadmap' && (
        <Roadmap career={selectedCareer} onUpload={handleUpload} />
      )}
      {currentScreen === 'upload' && uploadData && (
        <PortfolioUpload skillName={uploadData.skillName} onGetFeedback={handleGetFeedback} />
      )}
      {currentScreen === 'feedback' && uploadData && (
        <AIFeedback upload={uploadData} onComplete={handleFeedbackComplete} />
      )}
      {currentScreen === 'dashboard' && <ProgressDashboard />}
      
      {/* Navigation Bar */}
      {currentScreen !== 'landing' && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          display: 'flex',
          gap: '12px'
        }}>
          <button 
            onClick={() => setCurrentScreen('roadmap')}
            style={{
              background: 'white',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              padding: '12px 16px',
              borderRadius: '999px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            🗺️ Roadmap
          </button>
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            style={{
              background: 'white',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              padding: '12px 16px',
              borderRadius: '999px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            📊 Progress
          </button>
        </div>
      )}
    </main>
  );
}

