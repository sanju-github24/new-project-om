// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-47ec9.firebaseapp.com",
  projectId: "auth-47ec9",
  storageBucket: "auth-47ec9.firebasestorage.app",
  messagingSenderId: "716184380739",
  appId: "1:716184380739:web:f3b7310934fe97a3febbf6",
  measurementId: "G-5SHLZCZ73G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);