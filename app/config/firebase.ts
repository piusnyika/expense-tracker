// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaQHdFFdFct3rfdQkK8UYltlqxdf-dpUM",
  authDomain: "expense-tracker-7ff0e.firebaseapp.com",
  projectId: "expense-tracker-7ff0e",
  storageBucket: "expense-tracker-7ff0e.firebasestorage.app",
  messagingSenderId: "706181922603",
  appId: "1:706181922603:web:069d9868fa2b82618f4f6e",
  measurementId: "G-6C7H0N1R7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

//db
export const firestore = getFirestore(app);