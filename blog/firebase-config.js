import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBqQclilPlmgOAxKCCqebHcyNiJqaTHNRg",
    authDomain: "my-blog-ba5b5.firebaseapp.com",
    projectId: "my-blog-ba5b5",
    storageBucket: "my-blog-ba5b5.firebasestorage.app",
    messagingSenderId: "701815874034",
    appId: "1:701815874034:web:a141158c931c79d49e8b6b",
    measurementId: "G-2XVVXK3Z1Q"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
