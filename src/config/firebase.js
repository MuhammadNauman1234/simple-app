// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVZFUZ229D8BWOF7XYOa1f4abD_3Y-mJc",
  authDomain: "mern-task-ef997.firebaseapp.com",
  projectId: "mern-task-ef997",
  storageBucket: "mern-task-ef997.appspot.com",
  messagingSenderId: "77447553378",
  appId: "1:77447553378:web:5438ec1181840811330c3b",
  measurementId: "G-F7KVNTKSLV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);