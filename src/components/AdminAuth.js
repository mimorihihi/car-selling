'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      const user = localStorage.getItem('adminUser');

      // Đơn giản cho demo - chỉ kiểm tra có token và user hay không
      if (!token || !user) {
        router.push('/admin/login');
        return;
      }

      // Có token và user thì cho phép truy cập
      setIsAuthenticated(true);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    // Xóa dữ liệu đăng nhập
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Xóa cookies
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'adminToken=; path=/admin; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    // Chuyển về trang login
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Wrap children với logout button
  return (
    <div>
      {/* Logout button ở header */}
      <div className="bg-gray-800 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-sm">Admin Panel</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </div>
      {children}
    </div>
  );
} 