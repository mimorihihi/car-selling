import { NextResponse } from 'next/server';
import { updateUser, deleteUser } from '@/lib/firebase-helpers';

// PUT - Cập nhật user
export async function PUT(request, { params }) {
  try {
    const userId = params.id;
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

    // Kiểm tra username đã tồn tại chưa (trừ user hiện tại)
    const { getUserByUsername, getUserById } = await import('@/lib/firebase-helpers');
    const existingUser = await getUserByUsername(username);
    const currentUser = await getUserById(userId);
    
    if (existingUser && existingUser.id !== userId) {
      return NextResponse.json(
        { error: 'Username đã được sử dụng' },
        { status: 400 }
      );
    }

    // Chuẩn bị dữ liệu cập nhật
    const updateData = {
      name,
      username,
      phone,
      role: role || 'user'
    };

    // Chỉ cập nhật password nếu có
    if (password && password.trim() !== '') {
      updateData.password = password;
    }

    const updatedUser = await updateUser(userId, updateData);
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Không tìm thấy user' },
        { status: 404 }
      );
    }

    // Trả về user không bao gồm password
    const { password: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi cập nhật user. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa user
export async function DELETE(request, { params }) {
  try {
    const userId = params.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const result = await deleteUser(userId);
    
    if (!result) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi xóa user. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
} 