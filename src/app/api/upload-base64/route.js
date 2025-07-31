import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json(
        { error: 'Không có file ảnh được upload' },
        { status: 400 }
      );
    }

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File không phải là ảnh hợp lệ' },
        { status: 400 }
      );
    }

    // Kiểm tra kích thước file (max 2MB cho Base64)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File ảnh không được lớn hơn 2MB' },
        { status: 400 }
      );
    }

    // Chuyển đổi file thành Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString('base64');
    
    // Tạo data URL
    const dataUrl = `data:${file.type};base64,${base64String}`;

    console.log('Image uploaded successfully:', {
      fileName: file.name,
      size: file.size,
      type: file.type
    });

    return NextResponse.json({
      success: true,
      url: dataUrl,
      fileName: file.name,
      method: 'base64'
    });

  } catch (error) {
    console.error('Base64 upload error:', error);
    return NextResponse.json(
      { error: 'Lỗi khi xử lý ảnh: ' + error.message },
      { status: 500 }
    );
  }
} 