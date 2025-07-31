import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Helper functions cho Users
export const usersCollection = db ? collection(db, 'users') : null;

export const getUsers = async () => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    const querySnapshot = await getDocs(usersCollection);
    const users = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Đảm bảo các trường bắt buộc có giá trị
        name: data.name || 'N/A',
        username: data.username || 'N/A',
        phone: data.phone || 'N/A',
        role: data.role || 'user'
      };
    });
    console.log('Users from Firestore:', users);
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    const q = query(usersCollection, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user by username:', error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = await addDoc(usersCollection, {
      ...userData,
      createdAt: serverTimestamp()
    });
    // Trả về user với timestamp đã được xử lý
    return { 
      id: docRef.id, 
      ...userData,
      createdAt: new Date().toISOString() // Fallback timestamp cho response
    };
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = doc(db, 'users', id);
    await updateDoc(docRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
    return { id, ...userData };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = doc(db, 'users', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Helper functions cho Test Drives
export const testDrivesCollection = db ? collection(db, 'testDrives') : null;

export const getTestDrives = async () => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    const querySnapshot = await getDocs(testDrivesCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting test drives:', error);
    throw error;
  }
};

export const getTestDriveById = async (id) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    const docRef = doc(db, 'testDrives', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting test drive:', error);
    throw error;
  }
};

export const addTestDrive = async (testDriveData) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = await addDoc(testDrivesCollection, {
      ...testDriveData,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...testDriveData, status: 'pending' };
  } catch (error) {
    console.error('Error adding test drive:', error);
    throw error;
  }
};

export const updateTestDrive = async (id, testDriveData) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = doc(db, 'testDrives', id);
    await updateDoc(docRef, {
      ...testDriveData,
      updatedAt: serverTimestamp()
    });
    return { id, ...testDriveData };
  } catch (error) {
    console.error('Error updating test drive:', error);
    throw error;
  }
};

export const deleteTestDrive = async (id) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = doc(db, 'testDrives', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting test drive:', error);
    throw error;
  }
};

// Helper functions cho Wishlist
export const wishlistCollection = db ? collection(db, 'wishlist') : null;

export const getWishlist = async () => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    const querySnapshot = await getDocs(wishlistCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting wishlist:', error);
    throw error;
  }
};

export const getWishlistByUser = async (userId) => {
  try {
    console.log('getWishlistByUser: Looking for userId:', userId);
    console.log('getWishlistByUser: Firebase configured:', !!db);
    
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    console.log('getWishlistByUser: Using Firebase to get wishlist');
    const q = query(wishlistCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const wishlist = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('getWishlistByUser: Firebase wishlist:', wishlist);
    return wishlist;
  } catch (error) {
    console.error('Error getting user wishlist:', error);
    throw error;
  }
};

export const addToWishlist = async (wishlistData) => {
  try {
    console.log('addToWishlist: Adding wishlist data:', wishlistData);
    console.log('addToWishlist: Firebase configured:', !!db);
    
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    console.log('addToWishlist: Using Firebase to add wishlist item');
    const docRef = await addDoc(wishlistCollection, {
      ...wishlistData,
      createdAt: serverTimestamp()
    });
    const result = { id: docRef.id, ...wishlistData };
    console.log('addToWishlist: Firebase result:', result);
    return result;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async (id) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = doc(db, 'wishlist', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Helper functions cho Cars
export const carsCollection = db ? collection(db, 'cars') : null;



export const getCars = async () => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    const querySnapshot = await getDocs(carsCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting cars:', error);
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    console.log('getCarById: Looking for car with ID:', id);
    console.log('getCarById: Firebase configured:', !!db);
    
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    console.log('getCarById: Using Firebase to get car');
    const docRef = doc(db, 'cars', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('getCarById: Car found in Firebase');
      return { id: docSnap.id, ...docSnap.data() };
    }
    
    console.log('getCarById: Car not found in Firebase');
    return null;
  } catch (error) {
    console.error('getCarById: Error getting car:', error);
    throw error;
  }
};

export const addCar = async (carData) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = await addDoc(carsCollection, {
      ...carData,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...carData };
  } catch (error) {
    console.error('Error adding car:', error);
    throw error;
  }
};

export const updateCar = async (id, carData) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = doc(db, 'cars', id);
    await updateDoc(docRef, {
      ...carData,
      updatedAt: serverTimestamp()
    });
    return { id, ...carData };
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

export const deleteCar = async (id) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = doc(db, 'cars', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
}; 