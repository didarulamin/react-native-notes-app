import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBEXQi3wQa2OV8INZn9tBbKuyI4HrQMCY",
  authDomain: "react-native-notes-app-9b615.firebaseapp.com",
  projectId: "react-native-notes-app-9b615",
  storageBucket: "react-native-notes-app-9b615.appspot.com",
  messagingSenderId: "621337562819",
  appId: "1:621337562819:web:f39393c7bb8b491c6c5c76",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
