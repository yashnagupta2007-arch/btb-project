import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

export async function POST(req: NextRequest) {
  try {
    const { userId, skillDomain, taskId, taskTitle, submission } = await req.json();

    if (!userId || !skillDomain || !submission) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    console.log('Analyzing submission for domain:', skillDomain);

    const analysis = await analyzeSubmission(skillDomain, taskTitle, submission);

    const docRef = await addDoc(collection(db, 'assessments'), {
      userId,
      skillDomain,
      taskId,
      taskTitle,
      submission,
      aiAnalysis: analysis,
      submittedAt: serverTimestamp()
    });

    return NextResponse.json({
      success: true,
      assessmentId: docRef.id,
      analysis
    });

  } catch (error: any) {
    console.error('Assessment error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

async function analyzeSubmission(domain: string, taskTitle: string, submission: any) {
  const prompt = getAnalysisPrompt(domain, taskTitle, submission);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert skill assessor. Provide objective, constructive analysis with specific scores (0-100) and actionable recommendations. Always return valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    });

    const content = completion.choices[0].message.content;
    return content ? JSON.parse(content) : getDefaultAnalysis(domain);
  } catch (error) {
    console.error('AI analysis failed:', error);
    return getDefaultAnalysis(domain);
  }
}

function getAnalysisPrompt(domain: string, taskTitle: string, submission: any): string {
  const submissionText = submission.code || submission.text || '';

  const prompts: { [key: string]: string } = {
    'code': `Analyze this code submission for: "${taskTitle}"

CODE:
\\\`\\\`\\\`
${submissionText}
\\\`\\\`\\\`

Evaluate (0-100 each):
1. Correctness: Does it solve the problem?
2. Code Quality: Clean, readable, maintainable?
3. Efficiency: Good time/space complexity?
4. Best Practices: Proper naming, structure, patterns?

Return JSON:
{
  "overallScore": 75,
  "breakdown": {"correctness": 80, "quality": 75, "efficiency": 70, "practices": 75},
  "strengths": ["Clear logic", "Good structure"],
  "weaknesses": ["Could optimize loop", "Missing edge cases"],
  "recommendations": {
    "immediate": ["Add input validation", "Handle edge cases"],
    "resources": ["Clean Code by Robert Martin", "LeetCode practice"]
  }
}`,

    'design': `Analyze this design work for: "${taskTitle}"

DESIGN DESCRIPTION:
${submissionText}

Evaluate (0-100 each):
1. Visual Hierarchy: Clear structure and focus?
2. Color Theory: Appropriate palette usage?
3. Spacing & Layout: Proper whitespace?
4. UX Principles: User-centered thinking?

Return JSON:
{
  "overallScore": 72,
  "breakdown": {"hierarchy": 75, "colorTheory": 70, "spacing": 70, "uxPrinciples": 73},
  "strengths": ["Good contrast", "Clear flow"],
  "weaknesses": ["Spacing inconsistent", "Color accessibility"],
  "recommendations": {
    "immediate": ["Study 8pt grid", "Check WCAG contrast ratios"],
    "resources": ["Refactoring UI", "Don't Make Me Think"]
  }
}`,

    'data-analysis': `Analyze this data analysis for: "${taskTitle}"

ANALYSIS:
${submissionText}

Evaluate (0-100 each):
1. Analytical Thinking: Problem decomposition quality?
2. Data Interpretation: Quality of insights?
3. Methodology: Soundness of approach?
4. Communication: Clarity of findings?

Return JSON:
{
  "overallScore": 70,
  "breakdown": {"analyticalThinking": 72, "interpretation": 68, "methodology": 70, "communication": 70},
  "strengths": ["Good pattern recognition", "Clear conclusions"],
  "weaknesses": ["Need statistical rigor", "Visualizations unclear"],
  "recommendations": {
    "immediate": ["Learn hypothesis testing", "Practice data viz"],
    "resources": ["Storytelling with Data", "Statistical Methods course"]
  }
}`,

    'communication': `Analyze this communication piece for: "${taskTitle}"

CONTENT:
${submissionText}

Evaluate (0-100 each):
1. Clarity: Is the message clear and understandable?
2. Structure: Is it well-organized with good flow?
3. Tone: Is the tone appropriate for the context?
4. Persuasiveness: Does it achieve its communication goal?

Return JSON:
{
  "overallScore": 75,
  "breakdown": {"clarity": 78, "structure": 75, "tone": 73, "persuasiveness": 74},
  "strengths": ["Clear main points", "Professional tone"],
  "weaknesses": ["Could be more concise", "Weak opening"],
  "recommendations": {
    "immediate": ["Practice executive summaries", "Study email writing frameworks"],
    "resources": ["Made to Stick", "Writing That Works"]
  }
}`,

    'critical-thinking': `Analyze this critical thinking response for: "${taskTitle}"

RESPONSE:
${submissionText}

Evaluate (0-100 each):
1. Logic: Sound reasoning and valid conclusions?
2. Problem Decomposition: Breaking down complexity well?
3. Bias Detection: Aware of cognitive biases?
4. Evidence Quality: Using evidence effectively?

Return JSON:
{
  "overallScore": 73,
  "breakdown": {"logic": 75, "decomposition": 72, "biasDetection": 70, "evidenceQuality": 75},
  "strengths": ["Systematic approach", "Identified key factors"],
  "weaknesses": ["Missed potential biases", "Could dig deeper"],
  "recommendations": {
    "immediate": ["Study logical fallacies", "Practice root cause analysis"],
  "resources": ["Thinking, Fast and Slow", "The Art of Thinking Clearly"]
  }
}`,

    'logical-reasoning': `Analyze this logical reasoning response for: "${taskTitle}"

RESPONSE:
${submissionText}

Evaluate (0-100 each):
1. Deductive Reasoning: Valid logical steps?
2. Pattern Recognition: Identifying patterns accurately?
3. Problem Solving: Effective solution approach?
4. Explanation Quality: Can explain the reasoning?

Return JSON:
{
  "overallScore": 76,
  "breakdown": {"deductiveReasoning": 78, "patternRecognition": 75, "problemSolving": 75, "explanation": 76},
  "strengths": ["Correct pattern identified", "Clear explanation"],
  "weaknesses": ["Didn't verify edge cases", "Could show more work"],
  "recommendations": {
    "immediate": ["Practice logic puzzles daily", "Study formal logic"],
    "resources": ["Brilliant.org Logic course", "The Art of Problem Solving"]
  }
}` 
  };

  return prompts[domain] || prompts.code;
}

function getDefaultAnalysis(domain: string) {
  return {
    overallScore: 50,
    breakdown: { skill1: 50, skill2: 50, skill3: 50, skill4: 50 },
    strengths: ["Attempted the task"],
    weaknesses: ["Unable to fully analyze"],
    recommendations: {
      immediate: ["Try again with more detail"],
      resources: ["Review the task requirements"]
    }
  };
}
