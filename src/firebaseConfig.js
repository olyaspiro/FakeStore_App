// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApmO6nCDVJmJM4hTsBIGSkNFOh3H6YTWo",
  authDomain: "e-commerce-app-92bbe.firebaseapp.com",
  projectId: "e-commerce-app-92bbe",
  storageBucket: "e-commerce-app-92bbe.firebasestorage.app",
  messagingSenderId: "588352598060",
  appId: "1:588352598060:web:23ab912f31878fda292189",
  measurementId: "G-NVYTHWSXXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
