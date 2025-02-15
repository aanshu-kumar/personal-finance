// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkd88ymN2zkL0nsYXTNXwynO_ZIP9ezJg",
  authDomain: "financly-748d6.firebaseapp.com",
  projectId: "financly-748d6",
  storageBucket: "financly-748d6.firebasestorage.app",
  messagingSenderId: "273612809795",
  appId: "1:273612809795:web:08c531851bffcdce3916f6",
  measurementId: "G-QGHYX0W7NE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider,doc,setDoc};