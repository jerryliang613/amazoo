import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB5At29lKlpgFNGHHLOT80KShCkUrxJmk0",
    authDomain: "jerryliang.firebaseapp.com",
    databaseURL: "https://jerryliang-default-rtdb.firebaseio.com/",
    projectId: "jerryliang",
    storageBucket: "jerryliang.appspot.com",
    messagingSenderId: "413888982770",
    appId: "1:413888982770:web:bdab53db1c9a907349aa6b",
    measurementId: "G-8418NQHPT1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };