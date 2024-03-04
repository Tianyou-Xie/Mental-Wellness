//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCw1QrevjUcEZX1_1d56YwUX3ujRd9SUYY",
    authDomain: "comp1800-demo-d3acd.firebaseapp.com",
    projectId: "comp1800-demo-d3acd",
    storageBucket: "comp1800-demo-d3acd.appspot.com",
    messagingSenderId: "387059243675",
    appId: "1:387059243675:web:0447f865eb2bd59539043e"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
