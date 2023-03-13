// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe5mcH9VngxReygpV1bePTgFQSRBFwhd0",
  authDomain: "wechat-60443.firebaseapp.com",
  projectId: "wechat-60443",
  storageBucket: "wechat-60443.appspot.com",
  messagingSenderId: "474296456810",
  appId: "1:474296456810:web:dd716423a4cd69d9315c13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();