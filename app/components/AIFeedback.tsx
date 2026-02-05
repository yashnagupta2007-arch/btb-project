'use client';
import { Sparkles, ThumbsUp, AlertCircle, TrendingUp } from 'lucide-react';
import '../styles/components.css';

// Demo feedback generator
const generateFeedback = (skillName: string) => {
  const feedbackTemplates: Record<string, any> = {
    "Build First Website": {
      strengths: [
        "Clean and organized HTML structure",
        "Responsive design principles applied",
        "Good use of semantic HTML tags"
      ],
      improvements: [
        "Add more whitespace for better readability",
        "Consider using CSS Grid for layout",
        "Optimize images for faster loading"
      ],
      skillImpact: "Beginner → Intermediate Web Development"
    },
    "JavaScript Fundamentals": {
      strengths: [
        "Good understanding of functions",
        "Proper variable naming conventions",
        "Clean code formatting"
      ],
      improvements: [
        "Add error handling with try-catch",
        "Use const/let instead of var",
        "Add comments for complex logic"
      ],
      skillImpact: "Beginner → Intermediate JavaScript"
    },
    "HTML/CSS Basics": {
      strengths: [
        "Proper HTML5 semantic structure",
        "Good color scheme selection",
        "Mobile-first approach visible"
      ],
      improvements: [
        "Improve accessibility with ARIA labels",
        "Add CSS animations for better UX",
        "Use CSS variables for consistency"
      ],
      skillImpact: "Beginner → Intermediate Frontend"
    }
  };

  return feedbackTemplates[skillName] || feedbackTemplates["Build First Website"];
};

interface AIFeedbackProps {
  upload: any;
  onComplete: () => void;
}

export default function AIFeedback({ upload, onComplete }: AIFeedbackProps) {
  const feedback = generateFeedback(upload.skillName);

  return (
    <div className="full-height">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="card">
          {/* Header */}
          <div className="flex gap-2 mb-3" style={{ alignItems: 'center' }}>
            <Sparkles size={32} color="#667eea" />
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>
                AI Feedback
              </h2>
              <p style={{ color: '#6b7280' }}>For: {upload.skillName}</p>
            </div>
          </div>

          {/* Strengths */}
          <div className="feedback-section">
            <div className="flex gap-1 mb-2" style={{ alignItems: 'center' }}>
              <ThumbsUp size={24} color="#10b981" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#065f46' }}>
                Strengths
              </h3>
            </div>
            <div>
              {feedback.strengths.map((strength: string, idx: number) => (
                <div key={idx} className="feedback-item feedback-strength">
                  <p style={{ color: '#065f46' }}>✓ {strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div className="feedback-section">
            <div className="flex gap-1 mb-2" style={{ alignItems: 'center' }}>
              <AlertCircle size={24} color="#f97316" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#9a3412' }}>
                Areas to Improve
              </h3>
            </div>
            <div>
              {feedback.improvements.map((improvement: string, idx: number) => (
                <div key={idx} className="feedback-item feedback-improvement">
                  <p style={{ color: '#9a3412' }}>→ {improvement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Impact */}
          <div className="feedback-impact">
            <div className="flex gap-1 mb-1" style={{ alignItems: 'center' }}>
              <TrendingUp size={24} color="#667eea" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#5b21b6' }}>
                Skill Growth
              </h3>
            </div>
            <p style={{ fontSize: '1.125rem', color: '#6b21a8' }}>
              Implementing these improvements will advance you from{' '}
              <span style={{ fontWeight: '700' }}>{feedback.skillImpact}</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <button 
              onClick={onComplete}
              style={{
                flex: 1,
                background: '#10b981',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#059669')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#10b981')}
            >
              ✅ Mark Complete & Continue
            </button>
            <button 
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              🔁 Upload New Version
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
