import "firebase/firestore";
import "firebase/auth";

import firebase from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNcpEncD6i1h0Zq3-toUNwoQZcakQ66CI",
  authDomain: "audio-book-app-flavius.firebaseapp.com",
  databaseURL:
    "https://audio-book-app-flavius-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "audio-book-app-flavius",
  storageBucket: "audio-book-app-flavius.appspot.com",
  messagingSenderId: "186210728423",
  appId: "1:186210728423:web:b482886f41d021d9152542",
  measurementId: "G-4Q4KH0JHVT",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
