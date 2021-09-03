import firebase from 'firebase'
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCkAPtlHMh9TsWfz54vyEtksDKAQ1u4So4",
    authDomain: "chat-app-realtime-d0909.firebaseapp.com",
    projectId: "chat-app-realtime-d0909",
    storageBucket: "chat-app-realtime-d0909.appspot.com",
    messagingSenderId: "300873498538",
    appId: "1:300873498538:web:1f05f3a40d031767a0f5d3",
    measurementId: "G-QWTWT1WS7X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// if(window.location.hostname === 'localhost') {
//     db.useEmulator('localhost','8080');
// }

export {db, auth, storage};

export default firebase
