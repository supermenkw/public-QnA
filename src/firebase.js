import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_CONFIG",
    authDomain: "YOUR_FIREBASE_CONFIG",
    databaseURL: "YOUR_FIREBASE_CONFIG",
    projectId: "YOUR_FIREBASE_CONFIG",
    storageBucket: "YOUR_FIREBASE_CONFIG",
    messagingSenderId: "YOUR_FIREBASE_CONFIG",
    appId: "1YOUR_FIREBASE_CONFIG",
    measurementId: "YOUR_FIREBASE_CONFIG"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
export const database = firebase.database();
