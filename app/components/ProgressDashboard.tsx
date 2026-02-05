'use client';
import { Rocket, Target } from 'lucide-react';
import '../styles/components.css';

export default function ProgressDashboard() {
  const overallProgress = 68;
  const skillBreakdown = [
    { name: "Core Skills", progress: 80, color: "blue" },
    { name: "Projects Built", progress: 60, color: "green" },
    { name: "Tools Mastery", progress: 50, color: "purple" }
  ];

  const nextSteps = [
    "Complete 'Build API Project'",
    "Upload 2 more portfolio pieces",
    "Add GitHub profile to roadmap"
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '48px 20px' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <div className="text-center mb-3">
          <Rocket size={64} color="#667eea" style={{ margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '8px', color: '#1f2937' }}>
            Your Progress
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>
            Track your journey to career-ready
          </p>
        </div>

        {/* Overall Readiness */}
        <div className="dashboard-card">
          <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Job Readiness</h2>
            <div style={{ fontSize: '3.5rem', fontWeight: '700' }}>{overallProgress}%</div>
          </div>
          <div style={{ 
            width: '100%', 
            background: 'rgba(255, 255, 255, 0.3)', 
            borderRadius: '999px', 
            height: '16px',
            overflow: 'hidden'
          }}>
            <div 
              style={{ 
                background: 'white', 
                height: '16px', 
                borderRadius: '999px',
                width: `${overallProgress}%`,
                transition: 'width 1s ease'
              }}
            />
          </div>
          <p style={{ marginTop: '16px', color: 'rgba(255, 255, 255, 0.9)' }}>
            You're making great progress! Keep going.
          </p>
        </div>

        {/* Skill Breakdown */}
        <div className="card mb-3">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
            📊 Breakdown
          </h2>
          <div>
            {skillBreakdown.map((skill, idx) => (
              <div key={idx} style={{ marginBottom: '24px' }}>
                <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#4b5563' }}>{skill.name}</span>
                  <span style={{ fontWeight: '700', color: '#1f2937' }}>{skill.progress}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className={`skill-bar-fill skill-bar-${skill.color}`}
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="card">
          <div className="flex gap-1 mb-3" style={{ alignItems: 'center' }}>
            <Target size={28} color="#f97316" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
              🎯 Next Steps
            </h2>
          </div>
          <div>
            {nextSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="flex gap-2"
                style={{ 
                  alignItems: 'flex-start',
                  padding: '12px',
                  background: '#fed7aa',
                  borderRadius: '12px',
                  borderLeft: '4px solid #f97316',
                  marginBottom: '12px'
                }}
              >
                <span style={{ color: '#f97316', fontWeight: '700' }}>{idx + 1}.</span>
                <p style={{ color: '#9a3412', fontWeight: '600' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
