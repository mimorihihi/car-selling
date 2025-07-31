'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CarCard from '@/components/CarCard';
import Layout from '@/components/Layout';

export default function WishlistPage() {
  const [wishlistCars, setWishlistCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        console.log('Fetching wishlist for user: demo-user');
        const response = await fetch('/api/wishlist?userId=demo-user');
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
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

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