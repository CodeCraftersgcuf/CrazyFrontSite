// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4ysLm79qwIWjjAqaHs4Gf7ZYzuI2A1BA",
  authDomain: "crazyfrontsite.firebaseapp.com",
  projectId: "crazyfrontsite",
  storageBucket: "crazyfrontsite.firebasestorage.app",
  messagingSenderId: "689333919168",
  appId: "1:689333919168:web:f39d28b5c301815762fc25",
  measurementId: "G-CBY1GQXCLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported (not in SSR/Node environments)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((error) => {
    console.warn('Analytics initialization failed:', error);
  });
}

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore with better error handling
const db = getFirestore(app);

// Only connect to emulators in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Uncomment these lines if you're using Firebase emulators
  // try {
  //   connectAuthEmulator(auth, "http://localhost:9099");
  //   connectFirestoreEmulator(db, 'localhost', 8080);
  // } catch (error) {
  //   console.log('Emulator connection failed:', error);
  // }
}

export { auth, analytics, db };
export default app;