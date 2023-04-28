// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-1nRv8gYpCVhobfm16D-J3GKwJS7hPCM",
  authDomain: "fir-expoauthentication-d9298.firebaseapp.com",
  projectId: "fir-expoauthentication-d9298",
  storageBucket: "fir-expoauthentication-d9298.appspot.com",
  messagingSenderId: "370726785432",
  appId: "1:370726785432:web:da77aa206ed8860f069bed"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
  
} else {
  app = firebase.app()
}

const db = firebase.firestore(app);
const auth = firebase.auth();

export {db};
export const users= db.collection("users")

export { auth };