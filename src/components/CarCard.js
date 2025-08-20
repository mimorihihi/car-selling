'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CarCard({ car }) {
  const [isWishlist, setIsWishlist] = useState(false);

  

  const handleWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carId: car.id,
          action: isWishlist ? 'remove' : 'add',
          userId: 'demo-user'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsWishlist(!isWishlist);
        if (!isWishlist) {
          alert('Đã thêm vào wishlist!');
        } else {
          alert('Đã xóa khỏi wishlist!');
        }
      } else {
        // Hiển thị thông báo lỗi cụ thể từ server
        alert(data.error || 'Có lỗi xảy ra khi cập nhật wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      alert('Có lỗi xảy ra khi cập nhật wishlist');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Hình ảnh xe */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = '/placeholder-car.jpg'; // Fallback image
          }}
        />
        
        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
        >
          <svg
            className={`w-5 h-5 ${isWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Badge cho xe mới */}
        {car.year >= new Date().getFullYear() - 1 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Mới
          </div>
        )}
      </div>

      {/* Thông tin xe */}
      <div className="p-4">
        {/* Tên và thương hiệu */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {car.name}
          </h3>
          <p className="text-sm text-gray-600">{car.brand}</p>
        </div>

        {/* Giá */}
        <div className="mb-3">
          <p className="text-xl font-bold text-blue-600">
            {car.price?.toLocaleString('vi-VN')} VNĐ
          </p>
        </div>

        {/* Thông số cơ bản */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          {car.transmission && (
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {car.transmission}
            </div>
          )}
          {car.fuelType && (
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {car.fuelType}
            </div>
          )}
        </div>



        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/cars/${car.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Chi tiết
          </Link>
          <Link
            href={`/cars/${car.id}?tab=test-drive`}
            className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Đặt lịch
          </Link>
        </div>
      </div>
    </div>
  );
} 