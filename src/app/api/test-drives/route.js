import { NextResponse } from 'next/server';
import { addTestDrive } from '@/lib/firebase-helpers';

// POST - Đặt lịch lái xe thử
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      scheduledDate, 
      scheduledTime, 
      notes,
      carId,
      carName,
      carBrand,
      status 
    } = body;

    if (!customerName || !customerEmail || !customerPhone || !scheduledDate || !scheduledTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Tạo test drive mới
    const newTestDrive = {
      customerName,
      customerEmail,
      customerPhone,
      scheduledDate,
      scheduledTime,
      notes: notes || '',
      carId,
      carName,
      carBrand,
      status: status || 'pending'
    };

    const createdTestDrive = await addTestDrive(newTestDrive);

    return NextResponse.json(createdTestDrive, { status: 201 });
  } catch (error) {
    console.error('Error booking test drive:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 