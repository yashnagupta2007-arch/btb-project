import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    // Fetch assessments
    const assessmentsQuery = query(
      collection(db, 'assessments'),
      where('userId', '==', userId)
    );
    const assessmentsSnap = await getDocs(assessmentsQuery);
    const assessments = assessmentsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Fetch progress
    const progressDoc = await getDoc(doc(db, 'progress', userId));
    const progress = progressDoc.exists() ? progressDoc.data() : null;

    // Calculate stats
    const totalAssessments = assessments.length;
    const avgScore = totalAssessments > 0
      ? Math.round(assessments.reduce((sum, a: any) => sum + (a.aiAnalysis?.overallScore || 0), 0) / totalAssessments)
      : 0;
    
    const skillsCompleted = progress?.roadmap?.filter((s: any) => s.status === 'completed').length || 0;
    const skillsInProgress = progress?.roadmap?.filter((s: any) => s.status === 'in-progress').length || 0;

    return NextResponse.json({
      success: true,
      data: {
        assessments,
        progress,
        stats: {
          totalAssessments,
          averageScore: avgScore,
          skillsCompleted,
          skillsInProgress,
          readinessScore: progress?.readinessScore || 0
        }
      }
    });

  } catch (error: any) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}