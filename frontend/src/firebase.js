
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "autonix-fee8d.firebaseapp.com",
  projectId: "autonix-fee8d",
  storageBucket: "autonix-fee8d.firebasestorage.app",
  messagingSenderId: "733268039610",
  appId: "1:733268039610:web:87d5bbc07364e03398ef83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
