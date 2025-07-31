# CarStore - Website Bán Xe Demo

Một ứng dụng demo website bán xe được xây dựng với Next.js và Tailwind CSS

##Tính năng

- **Trang chủ**: Hero section và danh sách xe nổi bật
- **Danh sách xe**: Hiển thị tất cả xe với thông tin chi tiết
- **Chi tiết xe**: Thông tin đầy đủ về từng xe
- **Wishlist**: Lưu trữ danh sách xe yêu thích
- **Đặt lịch lái xe thử**: Form đặt lịch lái xe thử
- **Admin Panel**: Quản lý users và lịch lái xe thử
- **Responsive Design**: Tương thích với mọi thiết bị

## Công nghệ sử dụng

- **Frontend**: Next.js 15, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase
- **Deployment**: Vercel


##  Các trang chính

### 1. Trang chủ (`/`)

- Hero section với call-to-action
- Danh sách 6 xe nổi bật
- Navigation menu

### 2. Danh sách xe (`/cars`)

- Hiển thị tất cả xe
- Grid layout responsive
- Thông tin cơ bản: tên, giá, thương hiệu

### 3. Chi tiết xe (`/cars/[id]`)

- Thông tin đầy đủ về xe
- Ảnh lớn
- Nút "Thêm vào Wishlist"

### 4. Wishlist (`/wishlist`)

- Danh sách xe yêu thích
- Chức năng xóa xe khỏi wishlist
- Link đến trang chi tiết xe

### 5. Admin Dashboard (`/admin`)

- **Authentication**: Đăng nhập bảo mật với email/password
- **Protected Routes**: Tất cả trang admin được bảo vệ
- Tổng quan hệ thống với thống kê
- Quản lý users (CRUD operations) với password
- Quản lý lịch lái xe thử với các trạng thái
- Xác nhận/từ chối/hoàn thành lịch lái xe thử

## API Endpoints

### Cars API

- `GET /api/cars` - Lấy danh sách tất cả xe
- `GET /api/cars/[id]` - Lấy thông tin chi tiết xe

### Wishlist API

- `GET /api/wishlist` - Lấy danh sách wishlist
- `POST /api/wishlist` - Thêm xe vào wishlist
- `DELETE /api/wishlist/[id]` - Xóa xe khỏi wishlist

### Test Drives API

- `POST /api/test-drives` - Đặt lịch lái xe thử

### Admin API

- `POST /api/admin/auth/login` - Đăng nhập admin
- `GET /api/admin/users` - Lấy danh sách users
- `POST /api/admin/users` - Thêm user mới
- `PUT /api/admin/users/[id]` - Cập nhật user
- `DELETE /api/admin/users/[id]` - Xóa user
- `GET /api/admin/test-drives` - Lấy danh sách lịch lái xe thử
- `PUT /api/admin/test-drives/[id]` - Cập nhật trạng thái lịch
- `DELETE /api/admin/test-drives/[id]` - Xóa lịch lái xe thử

##  UI/UX Features

- **Modern Design**: Sử dụng Tailwind CSS 
- **Responsive**: Tương thích mobile, tablet, desktop
- **Loading States**: Skeleton loading cho trải nghiệm tốt hơn
- **Error Handling**: Xử lý lỗi gracefully
- **Smooth Transitions**: Hiệu ứng hover và transition



## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📄 License

MIT License
