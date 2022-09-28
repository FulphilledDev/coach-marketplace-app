import { initializeApp } from "firebase/app";
// Import firestore as database to use
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9SL-E0O97DgzjSuG0mSegvmqroVnCFWA",
  authDomain: "coach-marketplace-app.firebaseapp.com",
  projectId: "coach-marketplace-app",
  storageBucket: "coach-marketplace-app.appspot.com",
  messagingSenderId: "356720326664",
  appId: "1:356720326664:web:233c860f4d679aeb2679bd"
};

// Initialize Firebase - Don't need variable "const". Just call the "initializeApp"
// const app = 
initializeApp(firebaseConfig);

export const db = getFirestore()