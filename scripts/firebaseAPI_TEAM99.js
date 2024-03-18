//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCVozM07YItWZQxuIKkcQVWYsNtF5okOkY",
    authDomain: "comp1800-202410-demo-6ed4e.firebaseapp.com",
    projectId: "comp1800-202410-demo-6ed4e",
    storageBucket: "comp1800-202410-demo-6ed4e.appspot.com",
    messagingSenderId: "314989920198",
    appId: "1:314989920198:web:18616c49c4dd2279adbcc7"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
