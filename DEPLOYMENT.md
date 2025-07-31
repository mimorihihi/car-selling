# 🚀 Hướng dẫn Deploy lên Vercel từ GitHub

## 📋 Chuẩn bị

### 1. Đảm bảo dự án đã sẵn sàng
- ✅ Firebase config đã được cập nhật để sử dụng environment variables
- ✅ File `.gitignore` đã bảo vệ file `.env.local`
- ✅ Tất cả dependencies đã được cài đặt

### 2. Tạo file `.env.local` (chỉ cho development)
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCKxgWVkFnluDO4iQC3ACldXdZN4B0fruQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=car-selling-web.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=car-selling-web
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=car-selling-web.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=650981979065
NEXT_PUBLIC_FIREBASE_APP_ID=1:650981979065:web:2eb2bde8a7afdf7db3fc68
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-EE0DWQFQZZ
```

## 🔄 Bước 1: Push code lên GitHub

### 1.1 Khởi tạo Git repository
```bash
git init
git add .
git commit -m "Initial commit: Car selling website with Firebase"
```

### 1.2 Tạo repository trên GitHub
1. Truy cập https://github.com
2. Click "New repository"
3. Đặt tên: `car-selling`
4. Chọn "Public" hoặc "Private"
5. **KHÔNG** chọn "Add a README file"
6. Click "Create repository"

### 1.3 Push code lên GitHub
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/car-selling.git
git push -u origin main
```

## 🚀 Bước 2: Deploy lên Vercel

### 2.1 Truy cập Vercel
1. Mở https://vercel.com
2. Đăng nhập bằng GitHub account

### 2.2 Import project
1. Click "New Project"
2. Chọn "Import Git Repository"
3. Tìm và chọn repository `car-selling`
4. Click "Import"

### 2.3 Cấu hình project
Vercel sẽ tự động detect:
- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅

### 2.4 Cấu hình Environment Variables
**QUAN TRỌNG**: Đây là bước quan trọng nhất!

1. Trong phần "Environment Variables", thêm các biến sau:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCKxgWVkFnluDO4iQC3ACldXdZN4B0fruQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=car-selling-web.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=car-selling-web
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=car-selling-web.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=650981979065
NEXT_PUBLIC_FIREBASE_APP_ID=1:650981979065:web:2eb2bde8a7afdf7db3fc68
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-EE0DWQFQZZ
```

2. Chọn cả **Production** và **Preview** environments
3. Click "Add" cho mỗi biến

### 2.5 Deploy
1. Click "Deploy"
2. Chờ quá trình build hoàn tất (2-5 phút)
3. Vercel sẽ cung cấp URL: `https://car-selling-xxx.vercel.app`

## ✅ Bước 3: Kiểm tra sau deploy

### 3.1 Test các chức năng chính
1. **Trang chủ**: Kiểm tra hiển thị xe
2. **Đăng ký/Đăng nhập**: Test Firebase Auth
3. **Wishlist**: Thêm/xóa xe yêu thích
4. **Admin Panel**: Truy cập `/admin/login`

### 3.2 Kiểm tra Firebase
1. Vào Firebase Console
2. Kiểm tra dữ liệu được tạo trong Firestore
3. Xem Authentication users

## 🔄 Bước 4: Continuous Deployment

Sau khi setup xong:
- Mỗi khi push code lên `main` branch → Vercel tự động deploy
- Pull requests → Tạo preview deployments
- Có thể rollback về version cũ trong Vercel Dashboard

## 🛠️ Troubleshooting

### Lỗi Build
- Kiểm tra console logs trong Vercel Dashboard
- Đảm bảo tất cả dependencies đã được cài đặt

### Lỗi Firebase
- Kiểm tra environment variables đã được cấu hình đúng
- Đảm bảo Firebase project đã được setup

### Lỗi Runtime
- Kiểm tra browser console
- Xem Function logs trong Vercel Dashboard

## 🎉 Hoàn thành!

Sau khi hoàn thành các bước trên, ứng dụng của bạn sẽ:
- ✅ Được deploy lên Vercel
- ✅ Có URL public có thể truy cập từ mọi nơi
- ✅ Tự động deploy khi có code mới
- ✅ Bảo mật API keys Firebase
- ✅ Tích hợp với Firebase hoàn chỉnh 