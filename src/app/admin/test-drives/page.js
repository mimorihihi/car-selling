'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminAuth from '@/components/AdminAuth';

export default function AdminTestDrives() {
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedTestDrive, setSelectedTestDrive] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchTestDrives();
  }, []);

  const fetchTestDrives = async () => {
    try {
      const response = await fetch('/api/admin/test-drives');
      const data = await response.json();
      setTestDrives(data);
    } catch (error) {
      console.error('Error fetching test drives:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (testDriveId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/test-drives/${testDriveId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchTestDrives();
        alert('Cập nhật trạng thái thành công!');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  const deleteTestDrive = async (testDriveId) => {
    if (confirm('Bạn có chắc muốn xóa lịch này?')) {
      try {
        const response = await fetch(`/api/admin/test-drives/${testDriveId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchTestDrives();
          alert('Xóa lịch thành công!');
        }
      } catch (error) {
        console.error('Error deleting test drive:', error);
        alert('Có lỗi xảy ra!');
      }
    }
  };

  const showDetail = (testDrive) => {
    setSelectedTestDrive(testDrive);
    setShowDetailModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const filteredTestDrives = testDrives.filter(testDrive => {
    if (filter === 'all') return true;
    return testDrive.status === filter;
  });

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
                <Link href="/admin/test-drives" className="text-blue-600 font-medium">
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
              <h1 className="text-3xl font-bold text-gray-900">Quản lý Lịch lái xe thử</h1>
              <p className="text-gray-600">Quản lý và xác nhận lịch lái xe thử</p>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Tất cả ({testDrives.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'pending' 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Chờ xác nhận ({testDrives.filter(td => td.status === 'pending').length})
              </button>
              <button
                onClick={() => setFilter('confirmed')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'confirmed' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Đã xác nhận ({testDrives.filter(td => td.status === 'confirmed').length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'completed' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Hoàn thành ({testDrives.filter(td => td.status === 'completed').length})
              </button>
            </div>
          </div>

          {/* Test Drives Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Xe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày & Giờ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số điện thoại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ghi chú
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTestDrives.map((testDrive) => (
                  <tr key={testDrive.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{testDrive.customerName}</div>
                      <div className="text-sm text-gray-500">{testDrive.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{testDrive.carName}</div>
                      <div className="text-sm text-gray-500">{testDrive.carBrand}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(testDrive.scheduledDate).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="text-sm text-gray-500">{testDrive.scheduledTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{testDrive.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(testDrive.status)}`}>
                        {getStatusText(testDrive.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {testDrive.notes || 'Không có ghi chú'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => showDetail(testDrive)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Chi tiết
                        </button>
                        {testDrive.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(testDrive.id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Xác nhận
                            </button>
                            <button
                              onClick={() => updateStatus(testDrive.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Từ chối
                            </button>
                          </>
                        )}
                        {testDrive.status === 'confirmed' && (
                          <button
                            onClick={() => updateStatus(testDrive.id, 'completed')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Hoàn thành
                          </button>
                        )}
                        <button
                          onClick={() => deleteTestDrive(testDrive.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTestDrives.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Không có lịch lái xe thử
              </h2>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'Chưa có lịch lái xe thử nào được đặt.' 
                  : `Không có lịch nào ở trạng thái "${getStatusText(filter)}"`
                }
              </p>
            </div>
          )}

          {/* Detail Modal */}
          {showDetailModal && selectedTestDrive && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Chi tiết lịch lái xe thử</h3>
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Thông tin khách hàng */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Thông tin khách hàng</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Họ tên:</span>
                          <p className="text-sm text-gray-900">{selectedTestDrive.customerName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Email:</span>
                          <p className="text-sm text-gray-900">{selectedTestDrive.customerEmail}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Số điện thoại:</span>
                          <p className="text-sm text-gray-900">{selectedTestDrive.customerPhone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Thông tin xe */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Thông tin xe</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Tên xe:</span>
                          <p className="text-sm text-gray-900">{selectedTestDrive.carName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Hãng xe:</span>
                          <p className="text-sm text-gray-900">{selectedTestDrive.carBrand}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">ID xe:</span>
                          <p className="text-sm text-gray-900">{selectedTestDrive.carId}</p>
                        </div>
                      </div>
                    </div>

                    {/* Thông tin lịch */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Thông tin lịch</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Ngày:</span>
                          <p className="text-sm text-gray-900">
                            {new Date(selectedTestDrive.scheduledDate).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Giờ:</span>
                          <p className="text-sm text-gray-900">{selectedTestDrive.scheduledTime}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Trạng thái:</span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTestDrive.status)}`}>
                            {getStatusText(selectedTestDrive.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Thông tin khác */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Thông tin khác</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Ngày tạo:</span>
                          <p className="text-sm text-gray-900">
                            {new Date(selectedTestDrive.createdAt).toLocaleString('vi-VN')}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">ID lịch:</span>
                          <p className="text-sm text-gray-900">{selectedTestDrive.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ghi chú */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Ghi chú</h4>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-900">
                        {selectedTestDrive.notes || 'Không có ghi chú'}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Đóng
                    </button>
                    {selectedTestDrive.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            updateStatus(selectedTestDrive.id, 'confirmed');
                            setShowDetailModal(false);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          Xác nhận
                        </button>
                        <button
                          onClick={() => {
                            updateStatus(selectedTestDrive.id, 'cancelled');
                            setShowDetailModal(false);
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          Từ chối
                        </button>
                      </>
                    )}
                    {selectedTestDrive.status === 'confirmed' && (
                      <button
                        onClick={() => {
                          updateStatus(selectedTestDrive.id, 'completed');
                          setShowDetailModal(false);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Hoàn thành
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  );
} 