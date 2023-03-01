// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDkVb-WwbKtM0qPWIJkIag4Xt2WZsfpGVw",
  authDomain: "shouldi-3db33.firebaseapp.com",
  projectId: "shouldi-3db33",
  storageBucket: "shouldi-3db33.appspot.com",
  messagingSenderId: "1001532927236",
  appId: "1:1001532927236:web:c378b41cf063cb21543451"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = async () => await isSupported() && getMessaging(app) 
