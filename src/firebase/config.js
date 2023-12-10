// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDldmNAo0I-LjFeXcRD6DpKPvbd1_EqZpg",
  authDomain: "fb-project-arof.firebaseapp.com",
  projectId: "fb-project-arof",
  storageBucket: "fb-project-arof.appspot.com",
  messagingSenderId: "1064394003073",
  appId: "1:1064394003073:web:86ed1d49f686299161f380",
  measurementId: "G-087MSZEV70",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
