// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB85dLsfKG54t_P9lIlCWA9oVn5cR9jAYI",
  authDomain: "codelanches.firebaseapp.com",
  projectId: "codelanches",
  storageBucket: "codelanches.appspot.com",
  messagingSenderId: "397538742363",
  appId: "1:397538742363:web:871b706fd962bbdd75af7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };