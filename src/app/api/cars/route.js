import { NextResponse } from 'next/server';
import { getCars } from '@/lib/firebase-helpers';

export async function GET() {
  try {
    const cars = await getCars();
    return NextResponse.json(cars);
  } catch (error) {
    console.error('Error getting cars:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 