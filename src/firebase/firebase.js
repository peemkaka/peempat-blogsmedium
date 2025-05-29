import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcuwFc1bkmVZhPP2RK0yvXSy9_wcJqzME",
  authDomain: "react-blogs-medium.firebaseapp.com",
  projectId: "react-blogs-medium",
  storageBucket: "react-blogs-medium.firebasestorage.app",
  messagingSenderId: "753881513873",
  appId: "1:753881513873:web:6c1e8ab8c53f57a1a3e430",
  measurementId: "G-XBCR7TZ010"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);