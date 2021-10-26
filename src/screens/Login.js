import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import useFirebase from "../../hooks/useFirebase";
// import useFirebase from "../../hooks/useFirebase";
import Button from "../components/Button";
import Input from "../components/Input";
// import { firebase, provider } from "../../hooks/useFirebase";

const Login = ({ navigation }) => {
  const { firebase, setUser } = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        setUser(user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  const googleLoginHandler = () => {
    // var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Never forget your notes!</Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          onChangeText={(email) => setEmail(email)}
          placeholder="email"
        ></Input>
        <Input
          onChangeText={(pass) => setPassword(pass)}
          placeholder="password"
          secureTextEntry={true}
        ></Input>
        <Button
          onPress={loginHandler}
          title="Login"
          customStyles={{ alignSelf: "center", marginTop: 25 }}
        />
        <Button
          onPress={googleLoginHandler}
          title="Continue with Google"
          customStyles={{ alignSelf: "center", marginTop: 25, padding: 5 }}
        />
      </View>

      <View style={styles.account}>
        <Text style={{ marginEnd: 5 }}>Don't have account?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "green" }}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    margin: 25,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  account: {
    margin: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Login;
