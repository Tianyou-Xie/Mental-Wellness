//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDoYY2YzzFB6OfBR-EKMh3IQerG4NNQ6Oo",
    authDomain: "mental-wellness-ca12e.firebaseapp.com",
    projectId: "mental-wellness-ca12e",
    storageBucket: "mental-wellness-ca12e.appspot.com",
    messagingSenderId: "558069897153",
    appId: "1:558069897153:web:da97a3c4f9fa6f544f0140"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
