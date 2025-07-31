import { NextResponse } from 'next/server';
import { updateTestDrive, deleteTestDrive } from '@/lib/firebase-helpers';

// PUT - Cập nhật trạng thái test drive
export async function PUT(request, { params }) {
  try {
    const testDriveId = params.id;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    const updatedTestDrive = await updateTestDrive(testDriveId, { status });
    
    if (!updatedTestDrive) {
      return NextResponse.json(
        { error: 'Test drive not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTestDrive);
  } catch (error) {
    console.error('Error updating test drive:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa test drive
export async function DELETE(request, { params }) {
  try {
    const testDriveId = params.id;
    
    if (!testDriveId) {
      return NextResponse.json(
        { error: 'Invalid test drive ID' },
        { status: 400 }
      );
    }

    const result = await deleteTestDrive(testDriveId);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Test drive not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Test drive deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting test drive:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 