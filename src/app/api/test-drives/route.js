import { NextResponse } from 'next/server';
import { addTestDrive } from '@/lib/firebase-helpers';

// POST - Đặt lịch lái xe thử
export async function POST(request) {
  try {
    // Kiểm tra authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để đặt lịch lái thử' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Tại đây bạn có thể verify token nếu cần
    // Hiện tại chỉ kiểm tra có token hay không
    
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
      userId,
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
      userId,
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