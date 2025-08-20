'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    username: '', 
    phone: '', 
    password: '', 
    confirmPassword: '' 
  });

  const router = useRouter();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi component mount
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (userToken && userData) {
      try {
        const userInfo = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(userInfo);
      } catch (error) {
        // Dữ liệu không hợp lệ, xóa đi
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  // Lắng nghe event mở modal đăng nhập từ bên ngoài
  useEffect(() => {
    const handleOpenLoginModal = () => {
      setShowLoginModal(true);
    };

    window.addEventListener('openLoginModal', handleOpenLoginModal);
    
    return () => {
      window.removeEventListener('openLoginModal', handleOpenLoginModal);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUser(data.user);
        setShowLoginModal(false);
        setLoginForm({ username: '', password: '' });
        alert('Đăng nhập thành công!');
      } else {
        setError(data.error || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerForm.name,
          username: registerForm.username,
          phone: registerForm.phone,
          password: registerForm.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUser(data.user);
        setShowRegisterModal(false);
        setRegisterForm({ name: '', username: '', phone: '', password: '', confirmPassword: '' });
        alert('Đăng ký thành công!');
      } else {
        setError(data.error || 'Đăng ký thất bại');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700">Xin chào, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors"
            >
              Đăng ký
            </button>
          </>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Đăng nhập</h3>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleLogin}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md mb-4">
                    {error}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                                     <input
                     type="text"
                     placeholder="Nhập username của bạn"
                     value={loginForm.username}
                     onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                     className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                     required
                   />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu
                  </label>
                                     <input
                     type="password"
                     placeholder="Nhập mật khẩu của bạn"
                     value={loginForm.password}
                     onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                     className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                     required
                   />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Đăng ký</h3>
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleRegister}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md mb-4">
                    {error}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ tên
                  </label>
                                     <input
                     type="text"
                     placeholder="Nhập họ tên của bạn"
                     value={registerForm.name}
                     onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                     className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                     required
                   />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                                     <input
                     type="text"
                     placeholder="Chọn username duy nhất"
                     value={registerForm.username}
                     onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                     className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                     required
                   />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                                     <input
                     type="tel"
                     placeholder="Ví dụ: 0912345678"
                     value={registerForm.phone}
                     onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                     className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                     required
                   />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu
                  </label>
                                     <input
                     type="password"
                     placeholder="Ít nhất 6 ký tự"
                     value={registerForm.password}
                     onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                     className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                     required
                   />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác nhận mật khẩu
                  </label>
                                     <input
                     type="password"
                     placeholder="Nhập lại mật khẩu"
                     value={registerForm.confirmPassword}
                     onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                     className="w-full px-4 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder-gray-400"
                     required
                   />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 