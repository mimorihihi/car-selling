import { NextResponse } from 'next/server';
import { removeFromWishlist } from '@/lib/firebase-helpers';

// DELETE - Xóa xe khỏi wishlist
export async function DELETE(request, { params }) {
  try {
    const wishlistId = params.id;
    
    if (!wishlistId) {
      return NextResponse.json(
        { error: 'Invalid wishlist ID' },
        { status: 400 }
      );
    }

    const result = await removeFromWishlist(wishlistId);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Car not found in wishlist' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Car removed from wishlist successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 