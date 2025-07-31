import { NextResponse } from 'next/server';
import { getTestDrives } from '@/lib/firebase-helpers';

// GET - Lấy danh sách test drives cho admin
export async function GET() {
  try {
    const testDrives = await getTestDrives();
    return NextResponse.json(testDrives);
  } catch (error) {
    console.error('Error getting test drives:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 