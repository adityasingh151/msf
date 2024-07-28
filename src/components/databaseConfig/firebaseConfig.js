import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication

const firebaseConfig = {
    apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
    authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    databaseURL: String(import.meta.env.VITE_FIREBASE_DATABASE_URL),
    projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
    measurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID)
};

const app = initializeApp(firebaseConfig);
const txtdb = getDatabase(app);
const imgdb = getStorage(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { txtdb, imgdb, auth }; // Export the auth module for use in other parts of your application
