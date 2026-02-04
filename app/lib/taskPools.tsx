import { Task } from '../types';

export const TASK_POOLS: { [key: string]: Task[] } = {
  code: [
    {
      id: 'code-1',
      domain: 'code',
      title: 'Reverse a String',
      description: 'Write a function that reverses a string without using built-in reverse methods.',
      difficulty: 'easy',
      timeLimit: 10,
      prompt: 'Write a function called reverseString(str) that takes a string and returns it reversed.',
      inputType: 'code',
      sampleAnswer: 'function reverseString(str) { let reversed = ""; for(let i = str.length - 1; i >= 0; i--) { reversed += str[i]; } return reversed; }'
    },
    {
      id: 'code-2',
      domain: 'code',
      title: 'Find Duplicates in Array',
      description: 'Write a function that finds all duplicate values in an array.',
      difficulty: 'medium',
      timeLimit: 15,
      prompt: 'Write a function findDuplicates(arr) that returns an array of duplicate values.',
      inputType: 'code'
    },
    {
      id: 'code-3',
      domain: 'code',
      title: 'Palindrome Checker',
      description: 'Determine if a string is a palindrome (reads same forwards and backwards).',
      difficulty: 'easy',
      timeLimit: 10,
      prompt: 'Write a function isPalindrome(str) that returns true if the string is a palindrome, false otherwise.',
      inputType: 'code'
    },
    {
      id: 'code-4',
      domain: 'code',
      title: 'FizzBuzz',
      description: 'Classic FizzBuzz problem - numbers divisible by 3 and 5.',
      difficulty: 'easy',
      timeLimit: 10,
      prompt: 'Write a function fizzBuzz(n) that prints numbers 1 to n, but for multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz".',
      inputType: 'code'
    }
  ],

  design: [
    {
      id: 'design-1',
      domain: 'design',
      title: 'Redesign a Login Form',
      description: 'You are given a poorly designed login form. Describe how you would redesign it following UX best practices.',
      difficulty: 'medium',
      timeLimit: 15,
      prompt: 'Imagine a login form with: small text, no visual hierarchy, poor color contrast, and confusing button placement. Describe your redesign approach covering: layout, typography, color scheme, and user flow.',
      inputType: 'text'
    },
    {
      id: 'design-2',
      domain: 'design',
      title: 'Create a Color Palette',
      description: 'Design a color palette for a meditation app.',
      difficulty: 'easy',
      timeLimit: 10,
      prompt: 'Create a 5-color palette for a meditation and mindfulness app. Describe each color choice and why it fits the brand.',
      inputType: 'text'
    },
    {
      id: 'design-3',
      domain: 'design',
      title: 'Mobile Navigation Design',
      description: 'Design a mobile navigation system for an e-commerce app with 6 main categories.',
      difficulty: 'medium',
      timeLimit: 15,
      prompt: 'Design a mobile navigation for an e-commerce app with: Home, Categories, Cart, Wishlist, Profile, Search. Describe the navigation pattern you would use and why.',
      inputType: 'text'
    }
  ],

  'data-analysis': [
    {
      id: 'data-1',
      domain: 'data-analysis',
      title: 'Sales Trend Analysis',
      description: 'Analyze sales data and identify trends.',
      difficulty: 'medium',
      timeLimit: 15,
      prompt: 'You have sales data showing: Q1: $100K, Q2: $120K, Q3: $115K, Q4: $140K. Analyze the trend, identify patterns, and provide 3 actionable insights.',
      inputType: 'text'
    },
    {
      id: 'data-2',
      domain: 'data-analysis',
      title: 'Customer Churn Analysis',
      description: 'Identify why customers are leaving.',
      difficulty: 'hard',
      timeLimit: 20,
      prompt: 'A SaaS company has 20% monthly churn. Given this data: 60% of churned users never completed onboarding, 30% cited "too expensive", 10% had technical issues. What is your analysis and recommendations?',
      inputType: 'text'
    },
    {
      id: 'data-3',
      domain: 'data-analysis',
      title: 'Survey Data Interpretation',
      description: 'Interpret survey results and draw conclusions.',
      difficulty: 'easy',
      timeLimit: 10,
      prompt: 'A survey of 1000 students shows: 70% prefer online learning, 20% prefer in-person, 10% no preference. What insights can you draw? What follow-up questions would you ask?',
      inputType: 'text'
    }
  ],

  communication: [
    {
      id: 'comm-1',
      domain: 'communication',
      title: 'Professional Email to Client',
      description: 'Write a professional email explaining a project delay.',
      difficulty: 'medium',
      timeLimit: 15,
      prompt: 'Your team is 2 weeks behind on a client project due to unexpected technical challenges. Write a professional email to the client explaining the situation, taking responsibility, and proposing a solution.',
      inputType: 'text'
    },
    {
      id: 'comm-2',
      domain: 'communication',
      title: 'Explain a Complex Concept',
      description: 'Explain "machine learning" to a 10-year-old.',
      difficulty: 'easy',
      timeLimit: 10,
      prompt: 'Explain what "machine learning" is to a 10-year-old child in 3-4 sentences. Use simple language and analogies.',
      inputType: 'text'
    },
    {
      id: 'comm-3',
      domain: 'communication',
      title: 'Meeting Summary',
      description: 'Summarize a meeting and identify action items.',
      difficulty: 'medium',
      timeLimit: 12,
      prompt: 'Summarize this meeting: Team discussed launching a new product. Sarah suggested a social media campaign. John raised budget concerns. Maria proposed a phased launch. Write a summary with clear action items.',
      inputType: 'text'
    },
    {
      id: 'comm-4',
      domain: 'communication',
      title: 'Constructive Feedback',
      description: 'Provide constructive feedback to a team member.',
      difficulty: 'hard',
      timeLimit: 15,
      prompt: 'A junior team member submitted work with multiple errors and missed the deadline. Write constructive feedback that addresses the issues while maintaining morale and encouraging improvement.',
      inputType: 'text'
    }
  ],

  'critical-thinking': [
    {
      id: 'critical-1',
      domain: 'critical-thinking',
      title: 'Identify the Logical Fallacy',
      description: 'Spot the error in reasoning.',
      difficulty: 'medium',
      timeLimit: 10,
      prompt: 'Statement: "Everyone I know uses iPhone, therefore Android phones must be unpopular." What logical fallacy is this? Explain why the reasoning is flawed.',
      inputType: 'text'
    },
    {
      id: 'critical-2',
      domain: 'critical-thinking',
      title: 'Problem Decomposition',
      description: 'Break down a complex problem into manageable parts.',
      difficulty: 'hard',
      timeLimit: 20,
      prompt: 'A city wants to reduce traffic congestion by 30% in 2 years. Break down this problem into sub-problems, identify key factors to consider, and propose a structured approach to solving it.',
      inputType: 'text'
    },
    {
      id: 'critical-3',
      domain: 'critical-thinking',
      title: 'Root Cause Analysis',
      description: 'Find the real cause behind a problem.',
      difficulty: 'medium',
      timeLimit: 15,
      prompt: 'A company\'s customer satisfaction dropped from 85% to 65% in 3 months. Recent changes: new pricing model, redesigned website, laid off 20% of support staff. Use the "5 Whys" technique to identify the root cause.',
      inputType: 'text'
    },
    {
      id: 'critical-4',
      domain: 'critical-thinking',
      title: 'Decision Matrix',
      description: 'Make a decision using structured analysis.',
      difficulty: 'medium',
      timeLimit: 15,
      prompt: 'You must choose between two job offers: Job A - $80K salary, startup, equity, long hours. Job B - $70K salary, established company, good work-life balance, no equity. What factors would you consider? How would you decide?',
      inputType: 'text'
    }
  ],

  'logical-reasoning': [
    {
      id: 'logic-1',
      domain: 'logical-reasoning',
      title: 'Number Pattern',
      description: 'Find the pattern in the sequence.',
      difficulty: 'easy',
      timeLimit: 10,
      prompt: 'What comes next in this sequence? 2, 4, 8, 16, 32, ___. Explain the pattern.',
      inputType: 'text'
    },
    {
      id: 'logic-2',
      domain: 'logical-reasoning',
      title: 'Syllogism',
      description: 'Determine if the conclusion is valid.',
      difficulty: 'medium',
      timeLimit: 12,
      prompt: 'Premise 1: All managers are leaders. Premise 2: Some leaders are entrepreneurs. Conclusion: Some managers are entrepreneurs. Is this conclusion valid? Explain your reasoning.',
      inputType: 'text'
    },
    {
      id: 'logic-3',
      domain: 'logical-reasoning',
      title: 'The Bridge Problem',
      description: 'Classic logical puzzle.',
      difficulty: 'hard',
      timeLimit: 20,
      prompt: 'Four people need to cross a bridge at night. They have one flashlight. The bridge can hold max 2 people. They take: 1, 2, 5, and 10 minutes respectively to cross. What is the minimum time needed for all to cross?',
      inputType: 'text'
    },
    {
      id: 'logic-4',
      domain: 'logical-reasoning',
      title: 'Letter Pattern',
      description: 'Find the pattern in letters.',
      difficulty: 'easy',
      timeLimit: 8,
      prompt: 'Complete the sequence: A, C, F, J, ___. Explain the pattern.',
      inputType: 'text'
    }
  ]
};

// Helper function to get random task from a domain
export function getRandomTask(domain: string): Task {
  const tasks = TASK_POOLS[domain];
  if (!tasks || tasks.length === 0) {
    throw new Error(`No tasks available for domain: ${domain}`);
  }
  const randomIndex = Math.floor(Math.random() * tasks.length);
  return tasks[randomIndex];
}

// Helper function to get task by ID
export function getTaskById(taskId: string): Task | undefined {
  for (const domain in TASK_POOLS) {
    const task = TASK_POOLS[domain].find(t => t.id === taskId);
    if (task) return task;
  }
  return undefined;
}