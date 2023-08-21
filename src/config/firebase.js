// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDocAeQih33odJSK2DyVp-U5OIDZ7mvESc",
  authDomain: "todobuddy-react-app.firebaseapp.com",
  projectId: "todobuddy-react-app",
  storageBucket: "todobuddy-react-app.appspot.com",
  messagingSenderId: "890293121531",
  appId: "1:890293121531:web:68a1aac21bdfa21c899b5e",
  measurementId: "G-KW2Q8WGJC5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore();
