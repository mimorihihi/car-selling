'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminAuth from '@/components/AdminAuth';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 6;
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    maxSpeed: '',
    seats: '',
    doors: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    color: '',
    description: '',
    image: ''
  });
  const [formError, setFormError] = useState('');

  // Function để format số với dấu phẩy
  const formatNumberWithCommas = (num) => {
    if (!num) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };



  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      setProducts(data);
      setTotalPages(Math.ceil(data.length / productsPerPage));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const submitData = { 
        ...formData,
        price: Number(formData.price), // Sử dụng Number thay vì parseInt để hỗ trợ số lớn
        maxSpeed: parseInt(formData.maxSpeed),
        seats: parseInt(formData.seats),
        doors: parseInt(formData.doors)
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowAddModal(false);
        setEditingProduct(null);
        setFormData({
          name: '',
          brand: '',
          price: '',
          maxSpeed: '',
          seats: '',
          doors: '',
          mileage: '',
          fuelType: '',
          transmission: '',
          color: '',
          description: '',
          image: ''
        });
        setFormError('');
        fetchProducts();
        alert(editingProduct ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
      } else {
        setFormError(data.error || 'Có lỗi xảy ra!');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setFormError('Có lỗi xảy ra khi kết nối server!');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price ? formatNumberWithCommas(product.price) : '',
      maxSpeed: product.maxSpeed ? product.maxSpeed.toString() : '',
      seats: product.seats ? product.seats.toString() : '',
      doors: product.doors ? product.doors.toString() : '',
      mileage: product.mileage,
      fuelType: product.fuelType,
      transmission: product.transmission,
      color: product.color,
      description: product.description,
      image: product.image
    });
    setShowAddModal(true);
  };

  const handleDelete = async (productId) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
          fetchProducts();
          alert('Xóa sản phẩm thành công!');
        } else {
          alert(data.error || 'Có lỗi xảy ra khi xóa sản phẩm!');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Có lỗi xảy ra khi kết nối server!');
      }
    }
  };





  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: '',
      maxSpeed: '',
      seats: '',
      doors: '',
      mileage: '',
      fuelType: '',
      transmission: '',
      color: '',
      description: '',
      image: ''
    });
    setEditingProduct(null);
    setShowAddModal(false);
    setFormError('');
  };



  // Tính toán sản phẩm hiển thị cho trang hiện tại
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/admin" className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </Link>
              </div>
              <nav className="flex space-x-8">
                <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Link href="/admin/users" className="text-gray-700 hover:text-blue-600 font-medium">
                  Quản lý Users
                </Link>
                <Link href="/admin/products" className="text-blue-600 font-medium">
                  Quản lý Sản phẩm
                </Link>
                <Link href="/admin/test-drives" className="text-gray-700 hover:text-blue-600 font-medium">
                  Lịch lái xe thử
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
              <p className="text-gray-600">Quản lý danh sách xe hơi</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Thêm Sản phẩm
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên xe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thương hiệu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tốc độ tối đa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chỗ ngồi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số cửa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentPageProducts().map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-16 w-24 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.brand}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.price ? formatNumberWithCommas(product.price) : '0'} VNĐ
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.maxSpeed} km/h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.seats}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.doors}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <div className="flex justify-center items-center space-x-2">
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

              {/* Page Info */}
              <div className="text-center text-gray-600 text-sm mt-4">
                Trang {currentPage} của {totalPages} ({products.length} sản phẩm)
              </div>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingProduct ? 'Sửa Sản phẩm' : 'Thêm Sản phẩm'}
                </h3>
                {formError && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    {formError}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên xe *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thương hiệu *
                      </label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giá (VNĐ) *
                      </label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => {
                          // Chỉ cho phép nhập số và dấu phẩy
                          const value = e.target.value.replace(/[^\d,]/g, '');
                          setFormData({...formData, price: value});
                        }}
                        onBlur={(e) => {
                          // Chuyển đổi format khi blur (loại bỏ dấu phẩy)
                          const numericValue = e.target.value.replace(/,/g, '');
                          if (numericValue && !isNaN(numericValue)) {
                            setFormData({...formData, price: numericValue});
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="Nhập giá xe (VD: 850,000,000)"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Có thể nhập tối đa 15 chữ số (999,999,999,999,999 VNĐ)
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tốc độ tối đa (km/h) *
                      </label>
                      <input
                        type="number"
                        value={formData.maxSpeed}
                        onChange={(e) => setFormData({...formData, maxSpeed: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số chỗ ngồi *
                      </label>
                      <input
                        type="number"
                        value={formData.seats}
                        onChange={(e) => setFormData({...formData, seats: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số cửa *
                      </label>
                      <input
                        type="number"
                        value={formData.doors}
                        onChange={(e) => setFormData({...formData, doors: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số km đã đi
                      </label>
                      <input
                        type="text"
                        value={formData.mileage}
                        onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nhiên liệu
                      </label>
                      <select
                        value={formData.fuelType}
                        onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      >
                        <option value="">Chọn nhiên liệu</option>
                        <option value="Xăng">Xăng</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Điện">Điện</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hộp số
                      </label>
                      <select
                        value={formData.transmission}
                        onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      >
                        <option value="">Chọn hộp số</option>
                        <option value="Tự động">Tự động</option>
                        <option value="Số sàn">Số sàn</option>
                        <option value="Vô cấp">Vô cấp</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Màu sắc
                      </label>
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData({...formData, color: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      />
                    </div>
                  </div>
                  
                                                        <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Hình ảnh sản phẩm *
                     </label>
                     <input
                       type="url"
                       value={formData.image}
                       onChange={(e) => setFormData({...formData, image: e.target.value})}
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                       placeholder="https://example.com/image.jpg"
                       required
                     />
                     <p className="text-xs text-gray-500 mt-1">
                       Nhập URL ảnh từ internet (JPG, PNG, GIF)
                     </p>
                     
                     {/* Hiển thị ảnh khi có URL */}
                     {formData.image && (
                       <div className="mt-3">
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Preview ảnh
                         </label>
                         <img
                           src={formData.image}
                           alt="Preview"
                           className="w-32 h-24 object-cover rounded border"
                           onError={(e) => {
                             e.target.style.display = 'none';
                             setFormError('Không thể tải ảnh từ URL này');
                           }}
                         />
                       </div>
                     )}
                   </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      rows="3"
                    />
                  </div>



                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Hủy
                    </button>
                                         <button
                       type="submit"
                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                     >
                       {editingProduct ? 'Cập nhật' : 'Thêm'}
                     </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminAuth>
  );
} 