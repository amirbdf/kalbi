// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import 'firebase/auth';
import 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArio9FoteSgCyFdONNlno-KCE5O-t13so",
  authDomain: "kalbi-4cbe6.firebaseapp.com",
  projectId: "kalbi-4cbe6",
  storageBucket: "kalbi-4cbe6.appspot.com",
  messagingSenderId: "853190916279",
  appId: "1:853190916279:web:d377ea96cff894a338b532",
  measurementId: "G-HWZVF61DRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth , db , storage};
try {
    // Firebase initialization code
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    // Other Firebase services initialization
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }