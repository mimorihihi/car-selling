import { NextResponse } from 'next/server';
import { getUsers, addUser, updateUser, deleteUser } from '@/lib/firebase-helpers';

// GET - Lấy danh sách users
export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lấy danh sách users. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}

// POST - Thêm user mới
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, username, phone, role, password } = body;

    if (!name || !username || !phone) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400 }
      );
    }

    if (password && password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    // Kiểm tra username đã tồn tại chưa
    const { getUserByUsername } = await import('@/lib/firebase-helpers');
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username đã được sử dụng' },
        { status: 400 }
      );
    }

    // Tạo user mới
    const newUser = {
      name,
      username,
      phone,
      password: password || 'password123', // Default password
      role: role || 'user'
    };

    const createdUser = await addUser(newUser);

    // Trả về user không bao gồm password
    const { password: _, ...userWithoutPassword } = createdUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi tạo user. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
} 