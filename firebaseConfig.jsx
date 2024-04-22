// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeDjfjVgm4vme4p5u1WPRsnyFZdhi4ag8",
  authDomain: "market-74ca4.firebaseapp.com",
  projectId: "market-74ca4",
  storageBucket: "market-74ca4.appspot.com",
  messagingSenderId: "119447604806",
  appId: "1:119447604806:web:e19595dc574a5eb5ebc447",
  measurementId: "G-V3TR9MD8JF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
