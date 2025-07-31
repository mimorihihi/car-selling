import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
// Sử dụng environment variables cho bảo mật
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Kiểm tra xem config có hợp lệ không
const isFirebaseConfigured = firebaseConfig.apiKey !== "your-api-key";

let app, db, auth;

if (isFirebaseConfigured) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Firestore
    db = getFirestore(app);
    
    // Initialize Auth
    auth = getAuth(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
    // Fallback to null values
    app = null;
    db = null;
    auth = null;
  }
} else {
  console.warn('Firebase not configured. Using fallback mode.');
  app = null;
  db = null;
  auth = null;
}

export { db, auth };
export default app; 