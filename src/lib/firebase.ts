import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase web config is not a secret — it identifies the project, not a
// credential. Access is controlled by Firestore/Auth security rules, not by
// hiding this object. See /firestore.rules for the rules this app expects.
const firebaseConfig = {
  apiKey: "AIzaSyBF8577VqwR_YavtOqV9UrvWAJjGg4hy6o",
  authDomain: "cogniheim.firebaseapp.com",
  projectId: "cogniheim",
  storageBucket: "cogniheim.firebasestorage.app",
  messagingSenderId: "451563252951",
  appId: "1:451563252951:web:33142db11f255ddc1f1492",
  measurementId: "G-LR0VXTBML5",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
