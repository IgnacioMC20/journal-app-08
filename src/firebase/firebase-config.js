import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBMR1-UjpJU3mabwvFTe0hVSM7KKvA0qRk",
  authDomain: "react-app-cursos-131d9.firebaseapp.com",
  projectId: "react-app-cursos-131d9",
  storageBucket: "react-app-cursos-131d9.appspot.com",
  messagingSenderId: "971967565309",
  appId: "1:971967565309:web:a4883d39d36c984148dd94"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase,
}