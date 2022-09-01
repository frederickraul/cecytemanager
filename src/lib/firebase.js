// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJPyP0Pui79ECD9wNpZsTjAHE7BMc4fF4",
  authDomain: "cachanillamanager.firebaseapp.com",
  projectId: "cachanillamanager",
  storageBucket: "cachanillamanager.appspot.com",
  messagingSenderId: "679398847980",
  appId: "1:679398847980:web:e0af933195f1dc9ef47cc9",
  measurementId: "G-5RP5KLMPN9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getFirestore();