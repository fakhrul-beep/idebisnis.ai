import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHSVAAUhUMFa_mjnGOruArVihpWu93OB0",
  authDomain: "idebisnisai-639e4.firebaseapp.com",
  projectId: "idebisnisai-639e4",
  storageBucket: "idebisnisai-639e4.firebasestorage.app",
  messagingSenderId: "799357681340",
  appId: "1:799357681340:web:9c895994556d2641c09ab9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);