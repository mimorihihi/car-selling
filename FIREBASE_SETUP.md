# 🔥 Firebase Setup Guide

## 📋 Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" hoặc "Add project"
3. Đặt tên project (ví dụ: `car-selling-app`)
4. Chọn có/không bật Google Analytics (tùy chọn)
5. Click "Create project"

## 🔧 Bước 2: Bật Firestore Database

1. Trong Firebase Console, chọn project vừa tạo
2. Vào menu bên trái, chọn "Firestore Database"
3. Click "Create database"
4. Chọn "Start in test mode" (cho demo)
5. Chọn location gần nhất (ví dụ: `asia-southeast1`)
6. Click "Done"

## 🔑 Bước 3: Lấy Firebase Config

1. Trong Firebase Console, click vào icon ⚙️ (Settings)
2. Chọn "Project settings"
3. Scroll xuống phần "Your apps"
4. Click icon web (</>) để thêm web app
5. Đặt tên app (ví dụ: `car-selling-web`)
6. Click "Register app"
7. Copy config object:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 📝 Bước 4: Cập nhật Config trong Code

1. Mở file `src/lib/firebase.js`
2. Thay thế config mẫu bằng config thực tế từ Firebase Console
3. Lưu file

## 🗂️ Bước 5: Tạo Collections trong Firestore

Firebase sẽ tự động tạo collections khi có dữ liệu đầu tiên, nhưng bạn có thể tạo trước:

### Collections cần thiết:
- `users` - Lưu thông tin người dùng
- `testDrives` - Lưu lịch lái xe thử
- `wishlist` - Lưu danh sách yêu thích

## 👤 Bước 6: Tạo Admin User

Sau khi setup xong, bạn cần tạo admin user đầu tiên:

1. Chạy app: `npm run dev`
2. Truy cập: `http://localhost:3000/admin/login`
3. Đăng ký admin user đầu tiên qua API hoặc thêm trực tiếp vào Firestore

### Thêm admin user qua Firestore Console:
1. Vào Firestore Database
2. Click "Start collection"
3. Collection ID: `users`
4. Document ID: `admin1`
5. Fields:
   ```
   name: "Admin"
   email: "admin@carstore.com"
   phone: "0123456789"
   password: "admin123"
   role: "admin"
   createdAt: [timestamp]
   ```

## 🚀 Bước 7: Test App

1. Chạy app: `npm run dev`
2. Test các chức năng:
   - Đăng ký/đăng nhập user
   - Đăng nhập admin
   - Thêm xe vào wishlist
   - Đặt lịch lái xe thử
   - Quản lý users và test drives trong admin panel

## 📊 Bước 8: Kiểm tra dữ liệu

1. Vào Firebase Console > Firestore Database
2. Xem các collections và documents được tạo
3. Dữ liệu sẽ được sync real-time

## 🔒 Bước 9: Security Rules (Tùy chọn)

Để bảo mật hơn, bạn có thể cập nhật Firestore Security Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cho phép đọc/ghi cho tất cả (chỉ cho demo)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## ✅ Hoàn thành!

App đã được chuyển đổi hoàn toàn sang Firebase. Dữ liệu sẽ được lưu trữ trong cloud và không bị mất khi deploy lên Vercel.

### Lợi ích:
- ✅ Dữ liệu không mất khi deploy
- ✅ Real-time sync
- ✅ Scalable
- ✅ Backup tự động
- ✅ Có thể làm việc offline 