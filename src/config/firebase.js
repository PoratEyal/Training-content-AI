// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwqgCEflWya7SDKG99vUDPE9LPOZoBv4s",
    authDomain: "activity-builder-45923.firebaseapp.com",
    projectId: "activity-builder-45923",
    storageBucket: "activity-builder-45923.appspot.com",
    messagingSenderId: "193920685822",
    appId: "1:193920685822:web:31c34d66047ea8a027b7af",
    measurementId: "G-QQL1B4VZRP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);