import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
 apiKey: "AIzaSyAENtZuklMMfZ8wziQaT78C3jLUSv8Uxp8",
  authDomain: "e-commerce-512.firebaseapp.com",
  projectId: "e-commerce-512",
  storageBucket: "e-commerce-512.firebasestorage.app",
  messagingSenderId: "290392343124",
  appId: "1:290392343124:web:55fb3b6280dc07031ee3c1",
  measurementId: "G-FHHB9KTGY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db=getFirestore(app);

export {analytics,auth,db}