import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCPq9fAggv9zzYLnXTUT_ZPfUE9SSRy4MU",
    authDomain: "qanda-5798a.firebaseapp.com",
    databaseURL: "https://qanda-5798a.firebaseio.com",
    projectId: "qanda-5798a",
    storageBucket: "qanda-5798a.appspot.com",
    messagingSenderId: "687945914999",
    appId: "1:687945914999:web:94df954b7c53ae95824472",
    measurementId: "G-15L4860YWF"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
export const database = firebase.database();
