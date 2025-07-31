'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminAuth from '@/components/AdminAuth';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTestDrives: 0,
    pendingTestDrives: 0,
    totalCars: 8
  });

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const [usersRes, testDrivesRes, productsRes] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/test-drives'),
          fetch('/api/admin/products')
        ]);
        
        const users = await usersRes.json();
        const testDrives = await testDrivesRes.json();
        const products = await productsRes.json();
        
        setStats({
          totalUsers: users.length,
          totalTestDrives: testDrives.length,
          pendingTestDrives: testDrives.filter(td => td.status === 'pending').length,
          totalCars: products.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
  <AdminAuth>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <nav className="flex space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Về trang chủ
              </Link>
              <Link 
                href="/admin/users" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Quản lý Users
              </Link>
              <Link 
                href="/admin/test-drives" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Lịch lái xe thử
              </Link>
              <Link 
                href="/admin/products" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Quản lý Sản phẩm
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Tổng quan hệ thống
          </h2>
          <p className="text-gray-600">
            Quản lý người dùng và lịch lái xe thử
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalUsers || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Total Test Drives Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lịch lái xe thử</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalTestDrives || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Pending Test Drives Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.pendingTestDrives || 0}
                </p>
                {stats?.pendingTestDrives > 0 && (
                  <span className="inline-block px-2 py-1 mt-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    Cần xử lý
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Total Cars Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng xe</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalCars || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

                 {/* Quick Actions */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
             <div className="flex items-start justify-between mb-4">
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Quản lý Users</h3>
                 <p className="text-gray-600 mb-4">
                   Xem danh sách, thêm, sửa, xóa tài khoản người dùng
                 </p>
               </div>
               <div className="p-2 bg-blue-100 rounded-lg">
                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                 </svg>
               </div>
             </div>
             <Link
               href="/admin/users"
               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
             >
               Quản lý Users
               <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </Link>
           </div>

           <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
             <div className="flex items-start justify-between mb-4">
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Lịch lái xe thử</h3>
                 <p className="text-gray-600 mb-4">
                   Quản lý đặt lịch, xác nhận và theo dõi lịch lái xe thử
                 </p>
               </div>
               <div className="p-2 bg-green-100 rounded-lg">
                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
               </div>
             </div>
             <Link
               href="/admin/test-drives"
               className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
             >
               Quản lý lịch
               <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </Link>
           </div>

           <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
             <div className="flex items-start justify-between mb-4">
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Quản lý Sản phẩm</h3>
                 <p className="text-gray-600 mb-4">
                   Thêm, sửa, xóa xe hơi và quản lý danh mục sản phẩm
                 </p>
               </div>
               <div className="p-2 bg-purple-100 rounded-lg">
                 <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                 </svg>
               </div>
             </div>
             <Link
               href="/admin/products"
               className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
             >
               Quản lý Sản phẩm
               <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </Link>
           </div>
         </div>

        {/* Recent Activity Section (Optional) */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
            <div className="text-gray-600 text-center py-8">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>Chưa có hoạt động nào</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminAuth>
);
}