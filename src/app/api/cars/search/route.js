import { NextResponse } from 'next/server';
import { getCarsWithFilters } from '@/lib/firebase-helpers';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Lấy các tham số tìm kiếm từ query string
    const filters = {
      name: searchParams.get('name') || '',
      brand: searchParams.get('brand') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || ''
    };

    // Loại bỏ các filter rỗng
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );

    console.log('Search filters:', cleanFilters);

    const cars = await getCarsWithFilters(cleanFilters);
    
    return NextResponse.json({
      cars,
      count: cars.length,
      filters: cleanFilters
    });
  } catch (error) {
    console.error('Error searching cars:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { filters } = body;

    console.log('Search filters (POST):', filters);

    const cars = await getCarsWithFilters(filters);
    
    return NextResponse.json({
      cars,
      count: cars.length,
      filters
    });
  } catch (error) {
    console.error('Error searching cars:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
