// Import the functions you need from the SDKs you need
import { initializeApp , getApp ,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO_rmzQcyK_rZiGv-E0igGtp7hZBiMBLc",
  authDomain: "suresuccess-6745c.firebaseapp.com",
  projectId: "suresuccess-6745c",
  storageBucket: "suresuccess-6745c.firebasestorage.app",
  messagingSenderId: "681782551902",
  appId: "1:681782551902:web:68bb8cafe81f3241c79bcf",
  measurementId: "G-DC1JP0VJSF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);