'use client';
import { useState } from 'react';
import { Code, BarChart, Palette, Shield, Brain, Users, LucideIcon } from 'lucide-react';
import '../styles/components.css';

interface Option {
  text: string;
  icon: LucideIcon;
  career: string;
  color: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What excites you most?",
    options: [
      { text: "Building Apps", icon: Code, career: "software", color: "blue" },
      { text: "Analyzing Data", icon: BarChart, career: "data", color: "green" },
      { text: "Designing Experiences", icon: Palette, career: "design", color: "orange" },
      { text: "Protecting Systems", icon: Shield, career: "security", color: "red" }
    ]
  },
  {
    id: 2,
    question: "How do you solve problems?",
    options: [
      { text: "Write code to automate", icon: Code, career: "software", color: "blue" },
      { text: "Look for patterns in data", icon: BarChart, career: "data", color: "green" },
      { text: "Sketch solutions visually", icon: Palette, career: "design", color: "orange" },
      { text: "Think about vulnerabilities", icon: Shield, career: "security", color: "red" }
    ]
  },
  {
    id: 3,
    question: "What sounds most interesting?",
    options: [
      { text: "AI & Machine Learning", icon: Brain, career: "ai", color: "purple" },
      { text: "User Research & Testing", icon: Users, career: "design", color: "orange" },
      { text: "Database Optimization", icon: BarChart, career: "data", color: "green" },
      { text: "API Development", icon: Code, career: "software", color: "blue" }
    ]
  },
  {
    id: 4,
    question: "What's your ideal work style?",
    options: [
      { text: "Deep focus on logic", icon: Brain, career: "software", color: "blue" },
      { text: "Collaborate with teams", icon: Users, career: "design", color: "orange" },
      { text: "Investigate and analyze", icon: BarChart, career: "data", color: "green" },
      { text: "Stay ahead of threats", icon: Shield, career: "security", color: "red" }
    ]
  },
  {
    id: 5,
    question: "What tool excites you?",
    options: [
      { text: "VS Code & Git", icon: Code, career: "software", color: "blue" },
      { text: "Tableau & SQL", icon: BarChart, career: "data", color: "green" },
      { text: "Figma & Sketch", icon: Palette, career: "design", color: "orange" },
      { text: "Wireshark & Metasploit", icon: Shield, career: "security", color: "red" }
    ]
  }
];

interface CareerQuizProps {
  onComplete: (scores: Record<string, number>) => void;
}

export default function CareerQuiz({ onComplete }: CareerQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (option: Option) => {
    const newAnswers = [...answers, option.career];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const scores: Record<string, number> = {};
      newAnswers.forEach(career => {
        scores[career] = (scores[career] || 0) + 1;
      });
      onComplete(scores);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const current = questions[currentQuestion];

  return (
    <div className="full-height">
      <div className="quiz-container container">
        <div className="mb-3">
          <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4b5563' }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#667eea' }}>
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h2 className="quiz-question text-center">
          {current.question}
        </h2>

        <div className="grid grid-2">
          {current.options.map((option, idx) => {
            const Icon = option.icon;
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className={`quiz-option quiz-option-${option.color}`}
              >
                <Icon size={40} style={{ marginBottom: '12px' }} />
                <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                  {option.text}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
