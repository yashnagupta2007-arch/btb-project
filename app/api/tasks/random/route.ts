import { NextRequest, NextResponse } from 'next/server';
import { getRandomTask, TASK_POOLS } from '@/app/lib/taskPools';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain parameter is required' },
        { status: 400 }
      );
    }

    if (!Object.keys(TASK_POOLS).includes(domain)) {
        return NextResponse.json(
            { error: `Domain '${domain}' not found.` },
            { status: 404 }
        );
    }

    const task = getRandomTask(domain);

    return NextResponse.json({
      success: true,
      task
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}