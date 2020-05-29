import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: "bodenchufe-client.firebaseapp.com",
  databaseURL: "https://bodenchufe-client.firebaseio.com",
  projectId: "bodenchufe-client",
  storageBucket: "bodenchufe-client.appspot.com",
  messagingSenderId: "143017378586",
  appId: "1:143017378586:web:e4dc27f5a99e49b101a2a3",
  measurementId: "G-05MT486Z8N",
};

const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const fs = firebase.storage();

const fa = firebase.auth();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();

export { fb, db, fs, fa, providerGoogle, providerFacebook };
