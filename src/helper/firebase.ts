// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdMuI1wT1mK1Y5drZ8O6GaFxH3f_zmJUY",
  authDomain: "chatxo-message-auth.firebaseapp.com",
  projectId: "chatxo-message-auth",
  storageBucket: "chatxo-message-auth.appspot.com",
  messagingSenderId: "778420375918",
  appId: "1:778420375918:web:7e964011c5fe8799fab17f",
  measurementId: "G-185F8X0PE5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
