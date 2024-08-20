// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2r08F5EhR8a7GvE7EDcNzMMPyk-c47KA",
  authDomain: "flashca-3d67f.firebaseapp.com",
  projectId: "flashca-3d67f",
  storageBucket: "flashca-3d67f.appspot.com",
  messagingSenderId: "564343579682",
  appId: "1:564343579682:web:d5ce7afae38e210563d67b",
  measurementId: "G-D3MN499VF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app)
const db = getFirestore(app)

export {db}
// const db = getFirestore(app);
// export default db;
// const analytics = getAnalytics(app);