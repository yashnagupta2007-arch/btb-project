export type SkillDomain = 'code' | 'design' | 'data-analysis' | 'communication' | 'critical-thinking' | 'logical-reasoning' | 'problem-solving';

export interface Task {
  id: string;
  domain: SkillDomain;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in minutes
  prompt: string;
  sampleAnswer?: string;
  inputType: 'text' | 'code' | 'file-upload' | 'multiple-choice';
}

export interface TaskSubmission {
  code?: string;
  text?: string;
  fileUrl?: string;
  selectedOption?: string;
}

export interface AIAnalysis {
