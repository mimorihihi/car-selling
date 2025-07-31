import { NextResponse } from 'next/server';
import { getCarById, updateCar, deleteCar } from '@/lib/firebase-helpers';

// PUT - Cập nhật sản phẩm
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { 
      name, 
      brand, 
      price, 
      maxSpeed, 
      seats, 
      doors,
      mileage, 
      fuelType, 
      transmission, 
      color, 
      description, 
      image
    } = body;

    // Kiểm tra sản phẩm tồn tại
    const existingProduct = await getCarById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Sản phẩm không tồn tại' },
        { status: 404 }
      );
    }

    // Validation
    if (!name || !brand || !price || !maxSpeed || !seats || !doors || !image) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc: tên xe, thương hiệu, giá, tốc độ tối đa, số chỗ ngồi, số cửa, hình ảnh' },
        { status: 400 }
      );
    }

    // Kiểm tra giá có phải là số hợp lệ không
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return NextResponse.json(
        { error: 'Giá phải là số lớn hơn 0' },
        { status: 400 }
      );
    }

    // Kiểm tra giá không vượt quá giới hạn (15 chữ số)
    if (priceNum > 999999999999999) {
      return NextResponse.json(
        { error: 'Giá không được vượt quá 999,999,999,999,999 VNĐ' },
        { status: 400 }
      );
    }

    if (maxSpeed <= 0 || maxSpeed > 500) {
      return NextResponse.json(
        { error: 'Tốc độ tối đa phải từ 1-500 km/h' },
        { status: 400 }
      );
    }

    if (seats <= 0 || seats > 20) {
      return NextResponse.json(
        { error: 'Số chỗ ngồi phải từ 1-20' },
        { status: 400 }
      );
    }

    if (doors <= 0 || doors > 10) {
      return NextResponse.json(
        { error: 'Số cửa phải từ 1-10' },
        { status: 400 }
      );
    }

    // Cập nhật sản phẩm
    const updatedProduct = {
      name,
      brand,
      price: Number(price), // Đảm bảo price là số
      maxSpeed: Number(maxSpeed),
      seats: Number(seats),
      doors: Number(doors),
      mileage: mileage || '0 km',
      fuelType: fuelType || 'Xăng',
      transmission: transmission || 'Tự động',
      color: color || 'Trắng',
      description: description || '',
      image
    };

    const result = await updateCar(id, updatedProduct);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa sản phẩm
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Kiểm tra sản phẩm tồn tại
    const existingProduct = await getCarById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Sản phẩm không tồn tại' },
        { status: 404 }
      );
    }

    // Xóa sản phẩm
    await deleteCar(id);

    return NextResponse.json({ message: 'Xóa sản phẩm thành công' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 