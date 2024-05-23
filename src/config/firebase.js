import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
//project-193920685822
//https://activity-builder-45923.firebaseapp.com/__/auth/handler
//https://activity-builder-45923.firebaseapp.com/__/auth/handler
//authDomain: "activity-builder-45923.firebaseapp.com",

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBBsnHK7C2C5wKNoh_U96mK-HHqdLZ-8Bw",
    authDomain: "activity-wizard.firebaseapp.com",
    projectId: "activity-wizard",
    storageBucket: "activity-wizard.appspot.com",
    messagingSenderId: "487708258594",
    appId: "1:487708258594:web:b255d53c7cb5bfcb73757b",
    measurementId: "G-Y7Z04778ES",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const functions = getFunctions(app);
if (process.env.NODE_ENV === "development") {
    connectFunctionsEmulator(functions, "localhost", 5001);
}
