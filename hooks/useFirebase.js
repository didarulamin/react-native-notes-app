import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import { useState, useEffect } from "react";

export default function useFirebase() {
  const [user, setUser] = useState(false);
  const firebaseConfig = {
    apiKey: "AIzaSyCBEXQi3wQa2OV8INZn9tBbKuyI4HrQMCY",
    authDomain: "react-native-notes-app-9b615.firebaseapp.com",
    projectId: "react-native-notes-app-9b615",
    storageBucket: "react-native-notes-app-9b615.appspot.com",
    messagingSenderId: "621337562819",
    appId: "1:621337562819:web:f39393c7bb8b491c6c5c76",
  };

  var provider = new firebase.auth.GoogleAuthProvider();

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    const unsubscribed = firebase.auth().onAuthStateChanged((userl) => {
      if (userl) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log(userl);
        setUser(userl);
        // ...
      } else {
        // User is signed out
        // ...
        setUser({});
      }
    });

    return () => unsubscribed;
  }, []);

  console.log(user, "from useFirebase");
  return {
    firebase,
    provider,
    user,
    setUser,
  };
}
