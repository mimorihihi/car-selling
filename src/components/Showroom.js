'use client';
import Link from 'next/link';

export default function Showroom() {
  const showrooms = [
    {
      id: 1,
      name: 'Showroom Mercedes-Benz Hà Nội',
      address: '123 Đường Lê Lợi, Quận Hoàn Kiếm, Hà Nội',
      phone: '03616278421',
      hours: '8:00 - 20:00 (Thứ 2 - Chủ nhật)',
      image: 'https://auto360.com.vn/images/Dealer/Mercedes/dien-bien-phu/Mercedes_Haxaco_Hang_Xanh.jpg'
    },
    {
      id: 2,
      name: 'Showroom Mercedes-Benz Thái Nguyên',
      address: '456 Đường Thống Nhất, TP. Thái Nguyên',
      phone: '01231256123',
      hours: '8:00 - 19:00 (Thứ 2 - Chủ nhật)',
      image: 'https://auto360.com.vn/images/Dealer/Mercedes/mien-nam/Mercedes_phu_my_hung_01.jpg'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hệ thống Showroom
          </h2>
          <p className="text-lg text-gray-600">
            Khám phá các showroom CarStore
          </p>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {showrooms.map((showroom) => (
            <div key={showroom.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Showroom Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={showroom.image}
                  alt={showroom.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    imageRendering: 'auto',
                    filter: 'contrast(1.1) saturate(1.1)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translate3d(0, 0, 0)',
                    WebkitTransform: 'translate3d(0, 0, 0)'
                  }}
                  onError={(e) => {
                    e.target.src = '/car-placeholder.jpg';
                  }}
                />
              </div>

              {/* Showroom Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {showroom.name}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-600 text-sm">{showroom.address}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-gray-600 text-sm">{showroom.phone}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600 text-sm">{showroom.hours}</p>
                  </div>
                </div>

                {/* Contact Button */}
                <div className="flex space-x-3">
                  <a
                    href={`tel:${showroom.phone}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Gọi điện
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 