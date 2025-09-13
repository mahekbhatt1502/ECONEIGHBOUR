import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7evIY1hkmwVeMMrGnqoGIVWirJKDdT2s",
  authDomain: "econeighbour-1518.firebaseapp.com",
  projectId: "econeighbour-1518",
  storageBucket: "econeighbour-1518.firebasestorage.app",
  messagingSenderId: "22760084572",
  appId: "1:22760084572:web:0845cfd58528052f9d4299",
  measurementId: "G-H4NGEQWQN5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore instance
export default app;