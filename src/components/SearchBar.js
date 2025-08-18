'use client';
import { useState, useEffect } from 'react';

export default function SearchBar({ onSearchChange, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    name: initialFilters.name || '',
    brand: initialFilters.brand || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    ...initialFilters
  });

  const [availableBrands, setAvailableBrands] = useState([]);

  // Lấy danh sách thương hiệu có sẵn
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/cars');
        const cars = await response.json();
        const brands = [...new Set(cars.map(car => car.brand))].filter(Boolean).sort();
        setAvailableBrands(brands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  // Gọi callback khi filters thay đổi
  useEffect(() => {
    onSearchChange(filters);
  }, [filters, onSearchChange]);

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    const resetFilters = {
      name: '',
      brand: '',
      minPrice: '',
      maxPrice: ''
    };
    setFilters(resetFilters);
  };

  const formatPrice = (value) => {
    // Xử lý định dạng giá khi người dùng nhập
    const numericValue = value.replace(/[^\d]/g, '');
    return numericValue;
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Tìm kiếm xe
        </h2>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Xóa bộ lọc
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tên xe */}
        <div>
          <label htmlFor="carName" className="block text-sm font-medium text-gray-700 mb-2">
            Tên xe
          </label>
          <input
            id="carName"
            type="text"
            placeholder="Nhập tên xe..."
            value={filters.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-gray-900"
          />
        </div>

        {/* Thương hiệu */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
            Thương hiệu
          </label>
          <select
            id="brand"
            value={filters.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
          >
            <option value="">Tất cả thương hiệu</option>
            {availableBrands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Giá tối thiểu */}
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Giá từ (VNĐ)
          </label>
          <input
            id="minPrice"
            type="text"
            placeholder="0"
            value={filters.minPrice ? parseInt(filters.minPrice).toLocaleString('vi-VN') : ''}
            onChange={(e) => handleInputChange('minPrice', formatPrice(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-gray-900"
          />
        </div>

        {/* Giá tối đa */}
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Giá đến (VNĐ)
          </label>
          <input
            id="maxPrice"
            type="text"
            placeholder="999,999,999"
            value={filters.maxPrice ? parseInt(filters.maxPrice).toLocaleString('vi-VN') : ''}
            onChange={(e) => handleInputChange('maxPrice', formatPrice(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </div>

      {/* Bộ lọc nhanh theo giá */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Khoảng giá phổ biến
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Dưới 500 triệu', min: '', max: '500000000' },
            { label: '500tr - 1 tỷ', min: '500000000', max: '1000000000' },
            { label: '1 - 2 tỷ', min: '1000000000', max: '2000000000' },
            { label: '2 - 3 tỷ', min: '2000000000', max: '3000000000' },
            { label: 'Trên 3 tỷ', min: '3000000000', max: '' }
          ].map((range, index) => (
            <button
              key={index}
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  minPrice: range.min,
                  maxPrice: range.max
                }));
              }}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hiển thị số lượng bộ lọc đang áp dụng */}
      {(filters.name || filters.brand || filters.minPrice || filters.maxPrice) && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-md">
          <span>
            Đang áp dụng {[filters.name, filters.brand, filters.minPrice, filters.maxPrice].filter(Boolean).length} bộ lọc
          </span>
          <button
            onClick={handleReset}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Xóa tất cả
          </button>
        </div>
      )}
    </div>
  );
}
