import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

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

const auth = getAuth(app);

const providerOAuth = new GoogleAuthProvider();

providerOAuth.setCustomParameters({
  prompt: 'select_account'
});

const providerFC = new FacebookAuthProvider();

providerFC.setCustomParameters({
  prompt: 'select_account'
});

export { auth, providerOAuth, providerFC }