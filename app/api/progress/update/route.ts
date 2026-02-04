import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export async function PATCH(req: NextRequest) {
  try {
    const { userId, skillName, newStatus } = await req.json();

    if (!userId || !skillName || !newStatus) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const progressRef = doc(db, 'progress', userId);
    const progressSnap = await getDoc(progressRef);

    if (!progressSnap.exists()) {
      return NextResponse.json(
        { error: 'Progress not found for this user' },
        { status: 404 }
      );
    }

    const progressData = progressSnap.data();
    const roadmap = progressData.roadmap || [];

    // Update skill
    const updatedRoadmap = roadmap.map((skill: any) => {
      if (skill.name === skillName) {
        return {
          ...skill,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date().toISOString() : null
        };
      }
      return skill;
    });

    // Recalculate score
    const completed = updatedRoadmap.filter((s: any) => s.status === 'completed').length;
    const inProgress = updatedRoadmap.filter((s: any) => s.status === 'in-progress').length;
    const readinessScore = Math.round(((completed + inProgress * 0.5) / updatedRoadmap.length) * 100);

    await updateDoc(progressRef, {
      roadmap: updatedRoadmap,
      readinessScore,
      lastUpdated: serverTimestamp()
    });

    return NextResponse.json({
      success: true,
      readinessScore,
      updatedRoadmap
    });

  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}