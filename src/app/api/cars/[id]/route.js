import { NextResponse } from 'next/server';
import { getCarById } from '@/lib/firebase-helpers';

export async function GET(request, { params }) {
  try {
    const carId = params.id;
    console.log('API: Getting car with ID:', carId);
    
    const car = await getCarById(carId);
    console.log('API: Car found:', car ? 'Yes' : 'No');
    
    if (!car) {
      console.log('API: Car not found, returning 404');
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }
    
    console.log('API: Returning car data');
    return NextResponse.json(car);
  } catch (error) {
    console.error('API: Error getting car:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 