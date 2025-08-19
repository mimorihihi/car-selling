'use client';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80"
          alt="Luxury Car"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      {/* Content - Bottom left positioning */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-end pb-16">
        <div className="max-w-lg">
          {/* Text content left aligned */}
          <div className="text-white">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              CarStore
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-gray-200 leading-relaxed">
              Sự tổng hòa giữa tính thẩm mỹ đương đại và không gian sang trọng bậc nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/cars"
                className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-all duration-300 text-center"
              >
                Tìm xe có sẵn
              </Link>
              <Link 
                href="/showroom"
                className="border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-black transition-all duration-300 text-center"
              >
                Hệ thống showroom
              </Link>


            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rounded-full"></div>
      <div className="absolute bottom-40 left-10 w-16 h-16 border border-white/10 rounded-full"></div>
      <div className="absolute top-1/2 right-10 w-8 h-8 border border-white/15 rounded-full"></div>
    </section>
  );
} 