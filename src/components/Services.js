'use client';
import { useState } from 'react';

export default function Services() {
  const [activeTab, setActiveTab] = useState('after-sales');

  const tabs = [
    { id: 'after-sales', label: 'DỊCH VỤ SAU BÁN HÀNG' },
    { id: 'value-added', label: 'DỊCH VỤ GIA TĂNG' },
    { id: 'genuine', label: 'SẢN PHẨM CHÍNH HÃNG' }
  ];

  const services = [
    {
      id: 1,
      title: 'Bảo dưỡng định kỳ',
      description: 'Trong quá trình vận hành, nhiều chi tiết trên xe bị mài mòn hoặc hư hỏng theo thời gian sử dụng. Điều này xảy ra với bất kỳ cơ cấu máy móc nào.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=400&q=80',
      link: '#'
    },
    {
      id: 2,
      title: 'Dịch vụ sửa chữa',
      description: 'CarStore cũng cung cấp dịch vụ sửa chữa đối với những hư hỏng do va chạm mà chiếc xe của bạn gặp phải trong quá trình sử dụng với kỹ thuật chuyên nghiệp.',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80',
      link: '#'
    },
    {
      id: 3,
      title: 'Dịch vụ chăm sóc làm đẹp xe',
      description: 'Chăm sóc và làm đẹp tập trung vào thẩm mỹ, làm đẹp nội ngoại thất xe, mang lại các trải nghiệm cao cấp và sang trọng cho người dùng.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80',
      link: '#'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            DỊCH VỤ
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-8 border-b border-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors z-10">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors z-10">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Service Image */}
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Service+Image';
                    }}
                  />
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <a
                    href={service.link}
                    className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
                  >
                    XEM THÊM
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 