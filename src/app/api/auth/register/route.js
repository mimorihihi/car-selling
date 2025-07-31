import { NextResponse } from 'next/server';
import { addUser, getUserByUsername } from '@/lib/firebase-helpers';

// Tạo JWT token đơn giản
const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 giờ
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

// POST - Đăng ký user
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, username, phone, password } = body;

    // Validation
    if (!name || !username || !phone || !password) {
      return NextResponse.json(
        { error: 'Tất cả các trường là bắt buộc' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    // Kiểm tra username đã tồn tại chưa
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
      password, // Trong thực tế nên hash password
      role: 'user'
    };

    const createdUser = await addUser(newUser);

    // Tạo token
    const token = generateToken(createdUser);

    // Trả về thông tin user (không bao gồm password)
    const { password: _, ...userWithoutPassword } = createdUser;

    return NextResponse.json({
      token,
      user: userWithoutPassword,
      message: 'Đăng ký thành công'
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
} 