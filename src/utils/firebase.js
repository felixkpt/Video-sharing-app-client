// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "clone-de5e8.firebaseapp.com",
  projectId: "clone-de5e8",
  storageBucket: "clone-de5e8.appspot.com",
  messagingSenderId: "947763741260",
  appId: "1:947763741260:web:834f070c3c79001bb82ae9",
  measurementId: "G-9C7F3FWNLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app