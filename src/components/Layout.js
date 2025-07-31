import Link from 'next/link';
import UserAuth from './UserAuth';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                CarStore
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Trang chủ
              </Link>
              <Link href="/cars" className="text-gray-700 hover:text-blue-600 font-medium">
                Xe hơi
              </Link>
              <Link href="/showroom" className="text-gray-700 hover:text-blue-600 font-medium">
                Showroom
              </Link>
              <Link href="/wishlist" className="text-gray-700 hover:text-blue-600 font-medium">
                Wishlist
              </Link>
            </nav>
            <UserAuth />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-900 py-12 mt-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* SẢN PHẨM */}
            <div>
              <h3 className="text-lg font-semibold mb-4">SẢN PHẨM</h3>
              <ul className="space-y-2">
                                 <li>
                   <Link href="/cars?type=hatchback" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                     Hatchback
                     <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </Link>
                 </li>
                 <li>
                   <Link href="/cars?type=sedan" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                     Sedan
                     <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </Link>
                 </li>
                 <li>
                   <Link href="/cars?type=suv" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                     SUV
                     <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </Link>
                 </li>
                 <li>
                   <Link href="/cars?type=hybrid" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                     Hybrid
                     <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </Link>
                 </li>
              </ul>
            </div>

            {/* DỊCH VỤ */}
            <div>
              <h3 className="text-lg font-semibold mb-4">DỊCH VỤ</h3>
              <ul className="space-y-2">
                                 <li>
                   <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                     Giới thiệu chung
                   </a>
                 </li>
                 <li>
                   <a href="/services/repair" className="text-gray-600 hover:text-blue-600 transition-colors">
                     Dịch vụ sửa chữa
                   </a>
                 </li>
                 <li>
                   <a href="/services/maintenance" className="text-gray-600 hover:text-blue-600 transition-colors">
                     Bảo dưỡng định kỳ
                   </a>
                 </li>
                 <li>
                   <a href="/services/warranty" className="text-gray-600 hover:text-blue-600 transition-colors">
                     Chế độ bảo hành
                   </a>
                 </li>
                 <li>
                   <a href="/services/connect" className="text-gray-600 hover:text-blue-600 transition-colors">
                     CarStore Connect
                   </a>
                 </li>
              </ul>
            </div>

            {/* VỀ CARSTORE */}
            <div>
              <h3 className="text-lg font-semibold mb-4">VỀ CARSTORE</h3>
              <ul className="space-y-2">
                                 <li>
                   <a href="/about/global" className="text-gray-600 hover:text-blue-600 transition-colors">
                     CarStore Toàn Cầu
                   </a>
                 </li>
                 <li>
                   <a href="/about/vietnam" className="text-gray-600 hover:text-blue-600 transition-colors">
                     CarStore Việt Nam
                   </a>
                 </li>
                 <li>
                   <a href="/careers" className="text-gray-600 hover:text-blue-600 transition-colors">
                     Tuyển dụng
                   </a>
                 </li>
                 <li>
                   <a href="/news" className="text-gray-600 hover:text-blue-600 transition-colors">
                     Tin tức
                   </a>
                 </li>
              </ul>
            </div>

            {/* LIÊN HỆ */}
            <div>
              <h3 className="text-lg font-semibold mb-4">LIÊN HỆ VỚI CHÚNG TÔI</h3>
              <div className="space-y-3">
                                 <div className="flex items-center">
                   <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                   </svg>
                   <span className="text-gray-600">HOTLINE - 1900 54 55 91</span>
                 </div>
                 <div className="flex items-center">
                   <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                   <a href="mailto:cskh@carstore.vn" className="text-gray-600 hover:text-blue-600 transition-colors">
                     cskh@carstore.vn
                   </a>
                 </div>
                 <div className="flex items-center">
                   <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                   <span className="text-gray-600">Hà Nội & Thái Nguyên</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-300 mt-8 pt-8 text-center">
            <p className="text-gray-500">&copy; 2024 CarStore. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 