import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt32qVmiURcIOb19F5w8RBHr7GRNEMKoA",
  authDomain: "where-s-my-pet-36f8c.firebaseapp.com",
  databaseURL: "https://where-s-my-pet-36f8c-default-rtdb.firebaseio.com",
  projectId: "where-s-my-pet-36f8c",
  storageBucket: "where-s-my-pet-36f8c.firebasestorage.app",
  messagingSenderId: "338760108657",
  appId: "1:338760108657:web:2392035f7ef3c831cf29d0",
  measurementId: "G-T6STPFEL90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); //inicializa o firestore
const auth = getAuth(app); //inicializa o authentication para maior segurança

export { db, auth };