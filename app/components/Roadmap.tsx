'use client';
import { useState } from 'react';
import { CheckCircle, Clock, Lock } from 'lucide-react';
import '../styles/components.css';

interface Skill {
  name: string;
  status: 'completed' | 'in-progress' | 'locked';
  resources: string[];
}

interface Level {
  name: string;
  duration: string;
  color: string;
  skills: Skill[];
}

const roadmapData: Record<string, any> = {
  software: {
    title: "Software Developer Roadmap",
    levels: [
      {
        name: "Beginner",
        duration: "2-3 months",
        color: "green",
        skills: [
          { name: "HTML/CSS Basics", status: "completed", resources: ["MDN Docs", "freeCodeCamp"] },
          { name: "JavaScript Fundamentals", status: "in-progress", resources: ["JavaScript.info", "Eloquent JavaScript"] },
          { name: "Build First Website", status: "in-progress", resources: ["Project Ideas", "GitHub Pages"] },
          { name: "Git & GitHub", status: "locked", resources: ["Git Handbook", "GitHub Learning Lab"] }
        ]
      },
      {
        name: "Intermediate",
        duration: "3-4 months",
        color: "yellow",
        skills: [
          { name: "React Framework", status: "locked", resources: ["React Docs", "React Tutorial"] },
          { name: "APIs & Databases", status: "locked", resources: ["REST API Tutorial", "SQL Basics"] },
          { name: "Build 3 Projects", status: "locked", resources: ["Project Ideas", "Portfolio Tips"] }
        ]
      },
      {
        name: "Advanced",
        duration: "4-6 months",
        color: "orange",
        skills: [
          { name: "System Design", status: "locked", resources: ["System Design Primer"] },
          { name: "Deploy Applications", status: "locked", resources: ["AWS", "Vercel", "Netlify"] },
          { name: "Portfolio Website", status: "locked", resources: ["Portfolio Examples"] }
        ]
      }
    ]
  },
  data: {
    title: "Data Analyst Roadmap",
    levels: [
      {
        name: "Beginner",
        duration: "2-3 months",
        color: "green",
        skills: [
          { name: "Excel Mastery", status: "completed", resources: ["Excel Tutorial", "Data Analysis"] },
          { name: "SQL Basics", status: "in-progress", resources: ["SQLBolt", "W3Schools SQL"] },
          { name: "Statistics Fundamentals", status: "locked", resources: ["Khan Academy", "Statistics Course"] }
        ]
      },
      {
        name: "Intermediate",
        duration: "3-4 months",
        color: "yellow",
        skills: [
          { name: "Python for Data", status: "locked", resources: ["Python Tutorial", "Pandas"] },
          { name: "Data Visualization", status: "locked", resources: ["Tableau", "Power BI"] },
          { name: "Analysis Projects", status: "locked", resources: ["Kaggle", "Dataset Hub"] }
        ]
      },
      {
        name: "Advanced",
        duration: "4-6 months",
        color: "orange",
        skills: [
          { name: "Advanced Analytics", status: "locked", resources: ["ML Basics", "Predictive Models"] },
          { name: "Dashboard Building", status: "locked", resources: ["Tableau Advanced"] },
          { name: "Business Intelligence", status: "locked", resources: ["BI Tools"] }
        ]
      }
    ]
  },
  design: {
    title: "UI/UX Designer Roadmap",
    levels: [
      {
        name: "Beginner",
        duration: "2-3 months",
        color: "green",
        skills: [
          { name: "Design Principles", status: "completed", resources: ["Design Basics", "Color Theory"] },
          { name: "Figma Basics", status: "in-progress", resources: ["Figma Tutorial", "UI Kit"] },
          { name: "First UI Design", status: "locked", resources: ["Dribbble", "Behance"] }
        ]
      },
      {
        name: "Intermediate",
        duration: "3-4 months",
        color: "yellow",
        skills: [
          { name: "User Research", status: "locked", resources: ["UX Research", "Interviews"] },
          { name: "Wireframing", status: "locked", resources: ["Wireframe Kit", "Balsamiq"] },
          { name: "Prototyping", status: "locked", resources: ["Figma Proto", "InVision"] }
        ]
      },
      {
        name: "Advanced",
        duration: "4-6 months",
        color: "orange",
        skills: [
          { name: "Design Systems", status: "locked", resources: ["Material Design", "iOS HIG"] },
          { name: "Usability Testing", status: "locked", resources: ["User Testing"] },
          { name: "Portfolio Projects", status: "locked", resources: ["Case Studies"] }
        ]
      }
    ]
  }
};

interface RoadmapProps {
  career: string;
  onUpload: (skillName: string) => void;
}

export default function Roadmap({ career, onUpload }: RoadmapProps) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const roadmap = roadmapData[career] || roadmapData.software;

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle size={24} color="#10b981" />;
    if (status === 'in-progress') return <Clock size={24} color="#f59e0b" />;
    return <Lock size={24} color="#9ca3af" />;
  };

  return (
    <div style={{ minHeight: '100vh', padding: '48px 20px' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '16px' }}>
            {roadmap.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Your personalized learning path</p>
        </div>

        {/* Roadmap Levels */}
        <div>
          {roadmap.levels.map((level: Level, levelIdx: number) => (
            <div key={levelIdx} className="roadmap-level">
              {/* Level Header */}
              <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 className="gradient-text" style={{ fontSize: '2rem', fontWeight: '700' }}>
                    {level.name} Level
                  </h2>
                  <p style={{ color: '#6b7280' }}>Estimated: {level.duration}</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                {level.skills.map((skill: Skill, skillIdx: number) => (
                  <div key={skillIdx}>
                    <div 
                      className="roadmap-skill"
                      onClick={() => setExpandedSkill(expandedSkill === `${levelIdx}-${skillIdx}` ? null : `${levelIdx}-${skillIdx}`)}
                    >
                      <div className="flex gap-2" style={{ alignItems: 'center' }}>
                        {getStatusIcon(skill.status)}
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>{skill.name}</span>
                      </div>
                      {skill.status !== 'locked' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpload(skill.name);
                          }}
                          className="btn-primary"
                          style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                        >
                          📂 Upload Project
                        </button>
                      )}
                    </div>

                    {/* Expanded Resources */}
                    {expandedSkill === `${levelIdx}-${skillIdx}` && (
                      <div style={{ 
                        marginTop: '8px', 
                        padding: '16px', 
                        background: '#dbeafe', 
                        borderRadius: '12px',
                        border: '2px solid #93c5fd'
                      }}>
                        <h4 style={{ fontWeight: '600', color: '#1e3a8a', marginBottom: '8px' }}>📚 Resources:</h4>
                        <ul style={{ marginLeft: '20px' }}>
                          {skill.resources.map((resource: string, idx: number) => (
                            <li key={idx} style={{ color: '#1e40af', marginBottom: '4px' }}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
