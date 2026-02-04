import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function GET() {
  try {
    const testRef = await addDoc(collection(db, 'test'), {
      message: 'Backend is operational!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });

    return NextResponse.json({
      success: true,
      message: '✅ Firebase connected successfully!',
      docId: testRef.id,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      hint: 'Check your .env.local file and Firebase configuration'
    }, { status: 500 });
  }
}