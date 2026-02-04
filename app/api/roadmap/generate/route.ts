import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { userId, skillDomain, aiAnalysis } = await req.json();

    if (!userId || !skillDomain) {
      return NextResponse.json(
        { error: 'Missing userId or skillDomain' },
        { status: 400 }
      );
    }

    console.log('Generating roadmap for:', userId);

    const roadmap = await generateRoadmap(skillDomain, aiAnalysis);
    const readinessScore = calculateReadiness(roadmap);

    await setDoc(doc(db, 'progress', userId), {
      userId,
      skillDomain,
      roadmap,
      readinessScore,
      lastUpdated: serverTimestamp()
    }, { merge: true });

    return NextResponse.json({
      success: true,
      roadmap,
      readinessScore
    });

  } catch (error: any) {
    console.error('Roadmap error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

async function generateRoadmap(domain: string, analysis: any) {
  const score = analysis?.overallScore || 50;
  const strengths = analysis?.strengths?.join(', ') || 'General knowledge';
  const weaknesses = analysis?.weaknesses?.join(', ') || 'Areas to improve';

  const prompt = `Create a personalized ${domain} development roadmap.\n\nAssessment Results:\n- Current Level: ${score}/100\n- Strengths: ${strengths}\n- Weaknesses: ${weaknesses}\n\nGenerate 10-12 skills from beginner to advanced. Focus on ${domain} development.\n\nReturn EXACTLY this JSON:\n{\n  "skills": [\n    {\n      "name": "HTML & CSS Fundamentals",\n      "category": "fundamentals",\n      "estimatedHours": 20,\n      "prerequisites": [],\n      "resources": ["MDN Web Docs", "freeCodeCamp HTML/CSS course"]\n    },\n    {\n      "name": "JavaScript Basics",\n      "category": "fundamentals",\n      "estimatedHours": 30,\n      "prerequisites": ["HTML & CSS Fundamentals"],\n      "resources": ["JavaScript.info", "Eloquent JavaScript book"]\n    }\n  ]\n}\n\nCategories: "fundamentals", "intermediate", "advanced"\nMake it specific to ${domain} domain.`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.8
} });

  try {
    const systemPrompt = "You are a career development expert. Create structured, actionable learning paths tailored to user's current skill level.";
    const fullPrompt = `${systemPrompt}\n\n${prompt}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const content = response.text();
    
    const parsedResult = JSON.parse(content || '{"skills":[]}');
    
    return parsedResult.skills.map((skill: any, index: number) => ({
      ...skill,
      status: index === 0 ? 'in-progress' : 'locked',
      completedAt: null
    }));
  } catch (error) {
    console.error('Roadmap generation failed:', error);
    return getDefaultRoadmap(domain);
  }
}

function getDefaultRoadmap(domain: string) {
  const roadmaps: any = {
    code: [
      { name: "Programming Fundamentals", category: "fundamentals", estimatedHours: 40, prerequisites: [], resources: ["CS50", "freeCodeCamp"], status: "in-progress", completedAt: null },
      { name: "Data Structures", category: "fundamentals", estimatedHours: 50, prerequisites: ["Programming Fundamentals"], resources: ["AlgoExpert", "LeetCode"], status: "locked", completedAt: null },
      { name: "Algorithms", category: "intermediate", estimatedHours: 60, prerequisites: ["Data Structures"], resources: ["CLRS Book"], status: "locked", completedAt: null }
    ],
    design: [
      { name: "Design Principles", category: "fundamentals", estimatedHours: 30, prerequisites: [], resources: ["Refactoring UI"], status: "in-progress", completedAt: null },
      { name: "Typography", category: "fundamentals", estimatedHours: 20, prerequisites: [], resources: ["Practical Typography"], status: "locked", completedAt: null }
    ],
    data: [
      { name: "Statistics Basics", category: "fundamentals", estimatedHours: 40, prerequisites: [], resources: ["Khan Academy"], status: "in-progress", completedAt: null },
      { name: "SQL", category: "fundamentals", estimatedHours: 30, prerequisites: [], resources: ["Mode SQL Tutorial"], status: "locked", completedAt: null }
    ]
  };

  return roadmaps[domain] || roadmaps.code;
}

function calculateReadiness(roadmap: any[]): number {
  if (!roadmap || roadmap.length === 0) return 0;
  
  const completed = roadmap.filter(s => s.status === 'completed').length;
  const inProgress = roadmap.filter(s => s.status === 'in-progress').length;
  
  return Math.round(((completed + inProgress * 0.5) / roadmap.length) * 100);
}
