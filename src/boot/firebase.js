import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:
var firebaseConfig = {
  apiKey: "AIzaSyBpdPqgV-v8YTcuGxa3lqFcn2SK7NepwrQ",
  authDomain: "daily-8db6f.firebaseapp.com",
  databaseURL: "https://daily-8db6f.firebaseio.com",
  projectId: "daily-8db6f",
  storageBucket: "daily-8db6f.appspot.com",
  messagingSenderId: "770462436251",
  appId: "1:770462436251:web:10731d564cd13dd7efef3e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db, firebase };
