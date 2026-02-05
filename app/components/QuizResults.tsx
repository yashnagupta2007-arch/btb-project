'use client';
import { Trophy } from 'lucide-react';
import '../styles/components.css';

const careerData: Record<string, any> = {
  software: {
    title: "Software Developer",
    description: "You love building and problem-solving through code",
    strengths: ["Logical thinking", "Problem solver", "Enjoys building"],
    color: "blue"
  },
  data: {
    title: "Data Analyst",
    description: "You excel at finding patterns and insights",
    strengths: ["Analytical mindset", "Pattern recognition", "Detail-oriented"],
    color: "green"
  },
  design: {
    title: "UI/UX Designer",
    description: "You think visually and love creating experiences",
    strengths: ["Creative thinking", "User empathy", "Visual problem-solving"],
    color: "orange"
  },
  security: {
    title: "Cybersecurity Specialist",
    description: "You think like an attacker to protect systems",
    strengths: ["Security mindset", "Risk assessment", "Investigative"],
    color: "red"
  },
  ai: {
    title: "AI/ML Engineer",
    description: "You're fascinated by intelligent systems",
    strengths: ["Mathematical thinking", "Research-oriented", "Innovative"],
    color: "purple"
  }
};

interface QuizResultsProps {
  scores: Record<string, number>;
  onViewRoadmap: (career: string) => void;
}

export default function QuizResults({ scores, onViewRoadmap }: QuizResultsProps) {
  const sortedCareers = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const totalAnswers = Object.values(scores).reduce((a, b) => a + b, 0);
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="full-height">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="text-center mb-3">
          <Trophy size={80} color="#eab308" style={{ margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
            Your Career Matches
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>
            Based on your unique strengths and interests
          </p>
        </div>

        <div>
          {sortedCareers.map(([career, score], index) => {
            const data = careerData[career];
            const percentage = Math.round((score / totalAnswers) * 100);

            return (
              <div key={career} className="result-card">
                <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div className="flex gap-2" style={{ alignItems: 'center' }}>
                    <span style={{ fontSize: '2.5rem' }}>{medals[index]}</span>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                        {data.title}
                      </h2>
                      <p style={{ color: '#6b7280' }}>{data.description}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="match-percentage gradient-text">
                      {percentage}%
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Match</div>
                  </div>
                </div>

                <div className="mb-2">
                  {data.strengths.map((strength: string, idx: number) => (
                    <span key={idx} className="strength-badge">
                      ✅ {strength}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => onViewRoadmap(career)}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  📚 View {data.title} Roadmap
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
