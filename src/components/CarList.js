'use client';
import { useState, useEffect } from 'react';
import CarCard from './CarCard';

export default function CarList({ featured = false, searchFilters = null }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const carsPerPage = 6;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        let response;
        let data;

        // Nếu có search filters và không phải featured, sử dụng search API
        if (searchFilters && !featured && Object.keys(searchFilters).some(key => searchFilters[key])) {
          response = await fetch('/api/cars/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filters: searchFilters }),
          });
          const searchResult = await response.json();
          data = searchResult.cars;
        } else {
          // Sử dụng API bình thường
          response = await fetch('/api/cars');
          data = await response.json();
        }
        
        if (featured) {
          // Chỉ lấy 6 xe đầu tiên cho trang chủ
          setCars(data.slice(0, 6));
          setTotalPages(1);
        } else {
          setCars(data);
          setTotalPages(Math.ceil(data.length / carsPerPage));
        }
        
        // Reset về trang 1 khi có kết quả tìm kiếm mới
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [featured, searchFilters]);

  // Tính toán xe hiển thị cho trang hiện tại
  const getCurrentPageCars = () => {
    if (featured) return cars;
    
    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    return cars.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded mb-2 w-3/4"></div>
            <div className="bg-gray-200 h-6 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const currentCars = getCurrentPageCars();

  return (
    <div>
      {/* Thông báo kết quả tìm kiếm */}
      {!featured && searchFilters && Object.keys(searchFilters).some(key => searchFilters[key]) && !loading && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            <span className="font-medium">Kết quả tìm kiếm: </span>
            Tìm thấy {cars.length} xe phù hợp
            {cars.length === 0 && (
              <span className="block mt-2 text-blue-600">
                Không tìm thấy xe nào phù hợp với tiêu chí tìm kiếm. Vui lòng thử điều chỉnh bộ lọc.
              </span>
            )}
          </p>
        </div>
      )}

      {/* Cars Grid */}
      {currentCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">
            {searchFilters && Object.keys(searchFilters).some(key => searchFilters[key])
              ? 'Không tìm thấy xe nào phù hợp'
              : 'Chưa có xe nào được thêm vào'
            }
          </p>
        </div>
      )}

      {/* Pagination - Chỉ hiển thị khi không phải featured và có nhiều hơn 1 trang */}
      {!featured && totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Trước
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Sau
          </button>
        </div>
      )}

      {/* Page Info */}
      {!featured && totalPages > 1 && (
        <div className="text-center text-gray-600 text-sm mt-4">
          Trang {currentPage} của {totalPages} ({cars.length} xe)
        </div>
      )}
    </div>
  );
} 