import firebase from 'firebase';
import sha256 from 'crypto-js/sha256';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp2ion2KwUTZyGm0HEk87k0jfd-xI7Ml4",
  authDomain: "tasktimer-8d3f8.firebaseapp.com",
  projectId: "tasktimer-8d3f8",
  storageBucket: "tasktimer-8d3f8.appspot.com",
  messagingSenderId: "848250977858",
  appId: "1:848250977858:web:590ad63223395cc4d277db",
  measurementId: "G-P0LSR2HV2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const PrivateKey = '6T4T9'

const db = firebase.firestore();
const Users = db.collection('users');

export function encrypt(message)
{
    // result of hash using sha256 => binary bytes
    const hashDigest = sha256(message);
    // encrypt using Private Key
    const hmacDigest = hmacSHA256(hashDigest, PrivateKey);
    // Base64 is usually used to convert binary bytes into string
    return Base64.stringify(hmacDigest);

    
}

export function signUp(email, username, name, password, passwordconf) {
    return new Promise((resolve, reject) => {

        if (password === passwordconf) {

            Users.add({
                email,
                username,
                name,
                password : encrypt(password)
            })
            .then(() => resolve(true))
            .catch((err) => reject(err))
        }

    })
}

export function logIn(username, password) {
    return new Promise((resolve, reject) => {

        if(username && password) {

            Users.where('username', '==', username)
            .where('password', '==', encrypt(password))
            .get()
            .then(() => resolve(true))
            .catch((err) => reject(err))
        }

    })
}