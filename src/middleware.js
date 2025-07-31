import { NextResponse } from 'next/server';

// Middleware đơn giản cho demo - chỉ kiểm tra có token hay không
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Chỉ kiểm tra admin routes
  if (pathname.startsWith('/admin')) {
    // Bỏ qua trang login
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Chỉ kiểm tra có token hay không (đơn giản cho demo)
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Có token thì cho phép truy cập (không kiểm tra chi tiết)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
}; 