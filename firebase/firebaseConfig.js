// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_SB,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGESENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = async () => await isSupported() && getMessaging(app) 
