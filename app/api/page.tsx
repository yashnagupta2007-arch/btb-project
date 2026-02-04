'use client';

import { useState } from 'react';
import LandingPage from './components/LandingPage';
import SkillSelector from './components/SkillSelector';
import TaskInterface from './components/TaskInterface';
import ResultsView from './components/ResultsView';
import Dashboard from './components/Dashboard';
import { SkillDomain, AIAnalysis } from './types';

export default function Home() {
  const [stage, setStage] = useState<'landing' | 'select' | 'task' | 'results' | 'dashboard'>('landing');
  const [userId] = useState(`user-${Date.now()}`);
  const [selectedDomain, setSelectedDomain] = useState<SkillDomain | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysis | null>(null);

  const handleStart = () => setStage('select');

  const handleDomainSelect = (domain: SkillDomain) => {
    setSelectedDomain(domain);
    setStage('task');
  };

  const handleTaskComplete = (analysis: AIAnalysis) => {
    setAnalysisResult(analysis);
    setStage('results');
  };

  const handleViewDashboard = () => setStage('dashboard');

  const handleTryAgain = () => {
    setSelectedDomain(null);
    setAnalysisResult(null);
    setStage('select');
  };

  return (
    <main className="min-h-screen">
      {stage === 'landing' && <LandingPage onStart={handleStart} />}
      {stage === 'select' && <SkillSelector onSelect={handleDomainSelect} />}
      {stage === 'task' && selectedDomain && (
        <TaskInterface
          userId={userId}
          domain={selectedDomain}
          onComplete={handleTaskComplete}
        />
      )}
      {stage === 'results' && analysisResult && selectedDomain && (
        <ResultsView
          analysis={analysisResult}
          domain={selectedDomain}
          userId={userId}
          onViewDashboard={handleViewDashboard}
          onTryAgain={handleTryAgain}
        />
      )}
      {stage === 'dashboard' && <Dashboard userId={userId} onBack={() => setStage('select')} />}
    </main>
  );
}