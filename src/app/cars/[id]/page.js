'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [testDriveForm, setTestDriveForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    scheduledDate: '',
    scheduledTime: '',
    notes: ''
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        console.log('Fetching car with ID:', params.id);
        const response = await fetch(`/api/cars/${params.id}`);
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Car data:', data);
          setCar(data);
        } else {
          console.error('Car not found, redirecting to cars page');
          router.push('/cars');
        }
      } catch (error) {
        console.error('Error fetching car:', error);
        router.push('/cars');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCar();
    }
  }, [params.id, router]);

  const addToWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carId: car.id,
          action: 'add',
          userId: 'demo-user'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Đã thêm vào wishlist!');
        router.push('/wishlist');
      } else {
        // Hiển thị thông báo lỗi cụ thể từ server
        alert(data.error || 'Có lỗi xảy ra khi thêm vào wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Có lỗi xảy ra khi thêm vào wishlist');
    }
  };

  const submitTestDrive = async (e) => {
    e.preventDefault();
    try {
      const testDriveData = {
        ...testDriveForm,
        carId: car.id,
        carName: car.name,
        carBrand: car.brand,
        status: 'pending'
      };

      const response = await fetch('/api/test-drives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testDriveData),
      });

      if (response.ok) {
        alert('Đặt lịch lái xe thử thành công! Chúng tôi sẽ liên hệ sớm nhất.');
        setShowTestDriveModal(false);
        setTestDriveForm({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          scheduledDate: '',
          scheduledTime: '',
          notes: ''
        });
      } else {
        alert('Có lỗi xảy ra khi đặt lịch');
      }
    } catch (error) {
      console.error('Error booking test drive:', error);
      alert('Có lỗi xảy ra khi đặt lịch');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy xe</h2>
          <Link href="/cars" className="text-blue-600 hover:underline">
            Quay lại danh sách xe
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {/* Car Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Car Image */}
            <div className="relative h-96 lg:h-full">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Car+Image';
                }}
              />
            </div>

            {/* Car Info */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {car.name}
              </h1>
              
              <div className="text-3xl font-bold text-blue-600 mb-6">
                {car.price ? car.price.toLocaleString('vi-VN') : '0'} VNĐ
              </div>

              {/* Thông tin cơ bản */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Thông tin cơ bản
                </h3>
                                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <span className="text-gray-600 text-sm">Thương hiệu:</span>
                     <p className="text-xl font-bold text-gray-900">{car.brand}</p>
                   </div>
                   {car.color && (
                     <div>
                       <span className="text-gray-600 text-sm">Màu sắc:</span>
                       <p className="text-xl font-bold text-gray-900">{car.color}</p>
                     </div>
                   )}
                   {car.mileage && (
                     <div>
                       <span className="text-gray-600 text-sm">Số km đã đi:</span>
                       <p className="text-xl font-bold text-gray-900">{car.mileage}</p>
                     </div>
                   )}
                </div>
              </div>

              {/* Thông số kỹ thuật */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Thông số kỹ thuật
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {car.seats && (
                    <div>
                      <span className="text-gray-600 text-sm">Số chỗ ngồi:</span>
                      <p className="text-xl font-bold text-gray-900">{car.seats} chỗ</p>
                    </div>
                  )}
                  {car.doors && (
                    <div>
                      <span className="text-gray-600 text-sm">Số cửa:</span>
                      <p className="text-xl font-bold text-gray-900">{car.doors} cửa</p>
                    </div>
                  )}
                  {car.transmission && (
                    <div>
                      <span className="text-gray-600 text-sm">Hộp số:</span>
                      <p className="text-xl font-bold text-gray-900">{car.transmission}</p>
                    </div>
                  )}
                  {car.fuelType && (
                    <div>
                      <span className="text-gray-600 text-sm">Nhiên liệu:</span>
                      <p className="text-xl font-bold text-gray-900">{car.fuelType}</p>
                    </div>
                  )}
                  {car.maxSpeed && (
                    <div>
                      <span className="text-gray-600 text-sm">Tốc độ tối đa:</span>
                      <p className="text-xl font-bold text-gray-900">{car.maxSpeed} km/h</p>
                    </div>
                  )}
                </div>
              </div>

              {car.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Mô tả:</h3>
                  <p className="text-gray-600">{car.description}</p>
                </div>
              )}

              {car.features && car.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Tính năng:</h3>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={addToWishlist}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  ❤️ Thêm vào Wishlist
                </button>
                <button
                  onClick={() => setShowTestDriveModal(true)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  🚗 Đặt lịch lái thử
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Drive Modal */}
      {showTestDriveModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Đặt lịch lái xe thử - {car.name}
              </h3>
              <form onSubmit={submitTestDrive}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ tên *
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên của bạn"
                    value={testDriveForm.customerName}
                    onChange={(e) => setTestDriveForm({...testDriveForm, customerName: e.target.value})}
                    className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={testDriveForm.customerEmail}
                    onChange={(e) => setTestDriveForm({...testDriveForm, customerEmail: e.target.value})}
                    className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    placeholder="Ví dụ: 0912345678"
                    value={testDriveForm.customerPhone}
                    onChange={(e) => setTestDriveForm({...testDriveForm, customerPhone: e.target.value})}
                    className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày lái thử *
                  </label>
                  <input
                    type="date"
                    value={testDriveForm.scheduledDate}
                    onChange={(e) => setTestDriveForm({...testDriveForm, scheduledDate: e.target.value})}
                    className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giờ lái thử *
                  </label>
                  <select
                    value={testDriveForm.scheduledTime}
                    onChange={(e) => setTestDriveForm({...testDriveForm, scheduledTime: e.target.value})}
                    className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                    required
                  >
                    <option value="">Chọn giờ</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    placeholder="Bạn có yêu cầu đặc biệt nào không?"
                    value={testDriveForm.notes}
                    onChange={(e) => setTestDriveForm({...testDriveForm, notes: e.target.value})}
                    className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                    rows="3"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowTestDriveModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Đặt lịch
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
} 