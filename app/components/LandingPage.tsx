'use client';
import { Compass, Rocket, Briefcase } from 'lucide-react';
import '../styles/components.css';

interface LandingPageProps {
  onStart: (type: 'quiz' | 'roadmap') => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="full-height">
      <div className="container">
        <div className="text-center mb-3">
          <h1 className="hero-title gradient-text">
            From Confused to Career-Ready
          </h1>
          <p className="hero-subtitle">
            Discover your path. Build your skills. Get hired.
          </p>
          
          <div className="flex justify-center gap-2" style={{ flexWrap: 'wrap' }}>
            <button onClick={() => onStart('quiz')} className="btn-primary">
              🧭 Discover Your Career
            </button>
            <button onClick={() => onStart('roadmap')} className="btn-secondary">
              🚀 Build Your Roadmap
            </button>
          </div>
        </div>

        <div className="grid grid-3">
          <div className="feature-card feature-card-purple">
            <Compass size={48} color="#7c3aed" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px', color: '#581c87' }}>
              Take Career Quiz
            </h3>
            <p style={{ color: '#4b5563' }}>15 smart questions to find your perfect match</p>
          </div>

          <div className="feature-card feature-card-blue">
            <Rocket size={48} color="#2563eb" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px', color: '#1e3a8a' }}>
              Get Custom Roadmap
            </h3>
            <p style={{ color: '#4b5563' }}>AI-powered learning path just for you</p>
          </div>

          <div className="feature-card feature-card-green">
            <Briefcase size={48} color="#059669" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px', color: '#065f46' }}>
              Build Portfolio
            </h3>
            <p style={{ color: '#4b5563' }}>Get AI feedback on your projects</p>
          </div>
        </div>
      </div>
    </div>
  );
}
