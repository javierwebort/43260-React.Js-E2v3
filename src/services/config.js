
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

//apiKey: "AIzaSyCnEYkc6NMyE-oiGlT0Rl2eb0N9Pc-EmAY",


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "coderhouse-4d855.firebaseapp.com",
    projectId: "coderhouse-4d855",
    storageBucket: "coderhouse-4d855.appspot.com",
    messagingSenderId: "763819355267",
    appId: "1:763819355267:web:33880357b826f6ce663fb6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);