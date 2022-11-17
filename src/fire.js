import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfwLx1aUZc---8BR3vMC7w_S88uFttGoY",
  authDomain: "finhac-997e9.firebaseapp.com",
  projectId: "finhac-997e9",
  storageBucket: "finhac-997e9.appspot.com",
  messagingSenderId: "465122667967",
  appId: "1:465122667967:web:f992d0062221159259450a",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
