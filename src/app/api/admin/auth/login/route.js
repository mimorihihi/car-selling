import { NextResponse } from 'next/server';
import { getUserByUsername } from '@/lib/firebase-helpers';

// Tạo JWT token đơn giản (trong thực tế nên dùng thư viện như jsonwebtoken)
const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 giờ
  };
  
  // Encode base64 đơn giản (không bảo mật cao)
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

// POST - Đăng nhập admin
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username và mật khẩu là bắt buộc' },
        { status: 400 }
      );
    }

    // Tìm user với username
    const user = await getUserByUsername(username);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Username hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    // Kiểm tra role admin
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Username hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    // Kiểm tra password (trong thực tế nên hash và so sánh)
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Username hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    // Tạo token
    const token = generateToken(user);

    // Trả về thông tin user (không bao gồm password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      token,
      user: userWithoutPassword,
      message: 'Đăng nhập thành công'
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
} 