import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxpHTIwCBTRUB_eOJaKMF-8vPguTSTKs8",
  authDomain: "yash-rajbhar.firebaseapp.com",
  projectId: "yash-rajbhar",
  storageBucket: "yash-rajbhar.firebasestorage.app",
  messagingSenderId: "519693640058",
  appId: "1:519693640058:web:506ddeb04fadf3e2fff6c3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

/* 🔥 FORCE FIRESTORE LONG POLLING */
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
