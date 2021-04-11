import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDTM1F5lbQWWH87KznEiueStiros92r0EE",
  authDomain: "chat-webapp-c7988.firebaseapp.com",
  projectId: "chat-webapp-c7988",
  storageBucket: "chat-webapp-c7988.appspot.com",
  messagingSenderId: "1050695098606",
  appId: "1:1050695098606:web:d9dcbe7610b1ac693853ff"
});

const auth = firebase.auth(),
  storage = firebase.storage(),
  db = firebase.firestore();

export default { auth, storage, db };
