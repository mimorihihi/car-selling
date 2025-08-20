'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CarCard from '@/components/CarCard';
import Layout from '@/components/Layout';

export default function WishlistPage() {
  const [wishlistCars, setWishlistCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (userToken && userData) {
      try {
        const userInfo = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(userInfo);
      } catch (error) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setError('login_required');
        setLoading(false);
      }
    } else {
      setError('login_required');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isLoggedIn || !user) return;
      
      try {
        const userToken = localStorage.getItem('userToken');
        console.log('Fetching wishlist for user:', user.id);
        
        const response = await fetch(`/api/wishlist?userId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
        
        if (response.status === 401) {
          setError('login_required');
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        
        const data = await response.json();
        console.log('Wishlist data:', data);
        
        // Lấy thông tin chi tiết của các xe trong wishlist
        const carsWithDetails = await Promise.all(
          data.map(async (item) => {
            console.log('Fetching car with ID:', item.carId);
            const carResponse = await fetch(`/api/cars/${item.carId}`);
            console.log('Car response status:', carResponse.status);
            
            if (carResponse.ok) {
              const carData = await carResponse.json();
              console.log('Car data:', carData);
              return carData;
            } else {
              console.error('Failed to fetch car:', item.carId);
              return null;
            }
          })
        );
        
        // Lọc bỏ các xe null
        const validCars = carsWithDetails.filter(car => car !== null);
        console.log('Valid cars:', validCars);
        setWishlistCars(validCars);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setError('general_error');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isLoggedIn, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải wishlist...</p>
        </div>
      </div>
    );
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              {error === 'login_required' && (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Yêu cầu đăng nhập</h3>
                  <p className="text-gray-600 mb-6">Bạn cần đăng nhập để xem và quản lý wishlist của mình.</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => router.push('/')}
                      className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Trang chủ
                    </button>
                    <button
                      onClick={() => router.push('/?login=true')}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </>
              )}
              
              {error === 'general_error' && (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h3>
                  <p className="text-gray-600 mb-6">Không thể tải wishlist. Vui lòng thử lại sau.</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => router.push('/')}
                      className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Trang chủ
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Thử lại
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Wishlist của tôi
            </h1>
            <p className="text-lg text-gray-600">
              Những xe bạn đã yêu thích
            </p>
          </div>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {wishlistCars.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Wishlist trống
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn chưa có xe nào trong wishlist. Hãy khám phá và thêm xe yêu thích!
              </p>
              <Link
                href="/cars"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Xem tất cả xe
              </Link>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <p className="text-gray-600">
                  Bạn có {wishlistCars.length} xe trong wishlist
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wishlistCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 