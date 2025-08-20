import { NextResponse } from 'next/server';
import { getWishlist, addToWishlist, removeFromWishlist, getWishlistByUser } from '@/lib/firebase-helpers';

export async function POST(request) {
  try {
    // Kiểm tra authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để sử dụng wishlist' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    const { carId, action, userId } = await request.json();
    console.log('Wishlist API: Received data:', { carId, action, userId });

    if (!carId) {
      return NextResponse.json(
        { error: 'Car ID là bắt buộc' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID là bắt buộc' },
        { status: 400 }
      );
    }

    const currentUserId = userId;
    console.log('Wishlist API: Using userId:', currentUserId);

    if (action === 'add') {
      // Kiểm tra xem xe đã có trong wishlist chưa
      const existingWishlist = await getWishlistByUser(currentUserId);
      const isAlreadyInWishlist = existingWishlist.some(item => item.carId === carId);
      
      if (isAlreadyInWishlist) {
        console.log('Wishlist API: Car already in wishlist');
        return NextResponse.json(
          { error: 'Xe này đã có trong wishlist rồi!' },
          { status: 400 }
        );
      }
      
      const wishlistData = {
        userId: currentUserId,
        carId: carId
      };
      console.log('Wishlist API: Adding to wishlist:', wishlistData);
      const result = await addToWishlist(wishlistData);
      console.log('Wishlist API: Add result:', result);
      return NextResponse.json({ success: true, message: 'Đã thêm vào wishlist' });
    } else if (action === 'remove') {
      // Tìm wishlist item để lấy ID
      const wishlist = await getWishlistByUser(currentUserId);
      const wishlistItem = wishlist.find(item => item.carId === carId);
      
      if (wishlistItem) {
        const result = await removeFromWishlist(wishlistItem.id);
        return NextResponse.json({ success: true, message: 'Đã xóa khỏi wishlist' });
      } else {
        return NextResponse.json(
          { error: 'Không tìm thấy xe trong wishlist' },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Action không hợp lệ' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Wishlist error:', error);
    return NextResponse.json(
      { error: 'Lỗi khi xử lý wishlist' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Kiểm tra authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để xem wishlist' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID là bắt buộc' },
        { status: 400 }
      );
    }
    
    console.log('Wishlist API: Getting wishlist for userId:', userId);

    const wishlist = await getWishlistByUser(userId);
    console.log('Wishlist API: Retrieved wishlist:', wishlist);
    return NextResponse.json(wishlist);

  } catch (error) {
    console.error('Get wishlist error:', error);
    return NextResponse.json(
      { error: 'Lỗi khi lấy wishlist' },
      { status: 500 }
    );
  }
} 