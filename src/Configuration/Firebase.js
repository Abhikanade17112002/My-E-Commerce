// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb8PyyipWCpcEsTav33AY_iGH3wHlHZgQ",
  authDomain: "e-commerce-8503a.firebaseapp.com",
  projectId: "e-commerce-8503a",
  storageBucket: "e-commerce-8503a.appspot.com",
  messagingSenderId: "386175090164",
  appId: "1:386175090164:web:64edf7a9c6ee7d53a00da1",
  measurementId: "G-XKPJ9BCL3C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
const analytics = getAnalytics(app);