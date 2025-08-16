// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3GAcGfYdZxLttApxEaGGThKl4Q-n88as",
  authDomain: "playasmanager.firebaseapp.com",
  projectId: "playasmanager",
  storageBucket: "playasmanager.appspot.com",
  messagingSenderId: "773463658146",
  appId: "1:773463658146:web:7920b02952ac56c75ed1fb",
  measurementId: "G-BZE2J894SX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getFirestore();