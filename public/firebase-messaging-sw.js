importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_SB,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGESENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
