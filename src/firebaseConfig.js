// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA89JiR9sUzENTOf55GuzYAot_CuZUe_zg',
  authDomain: 'react-linkedin-7f33b.firebaseapp.com',
  projectId: 'react-linkedin-7f33b',
  storageBucket: 'react-linkedin-7f33b.appspot.com',
  messagingSenderId: '194249569278',
  appId: '1:194249569278:web:f3a43a6d2ef432fb9a86af',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage };

export default db;
