import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import RadioInput from "../components/RadioInput";
// import { firebase } from "../../hooks/useFirebase";
import { LogBox } from "react-native";
import useFirebase from "../../hooks/useFirebase";
// import useAuth from "../../hooks/useAuth";

LogBox.ignoreLogs(["Setting a timer"]);

const OPTIONS = ["Male", "Female"];

const signup = () => {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");

  const handleSignup = () => {
    const { firebase } = useFirebase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const uid = result.user.uid;
        const userProfile = {
          id: uid,
          name: fullName,
          age: age,
          email: email,
          gender: gender,
        };

        result.user
          .updateProfile({
            displayName: fullName,
          })
          .then(() => {
            // Update successful
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });

        const userRef = firebase.firestore().collection("user");
        userRef.doc(uid).set(userProfile);
      })
      .catch((error) => {
        console.log(error);
      });

    // const user = firebase.auth().currentUser;
  };

  return (
    <View style={styles.container}>
      <Input onChangeText={(text) => setEmail(text)} placeholder="Email" />
      <Input
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Input
        onChangeText={(text) => setFullName(text)}
        placeholder="Full name"
      />
      <Input onChangeText={(text) => setAge(text)} placeholder="Age" />
      <Text style={{ marginBottom: 10 }}>Select you Gender</Text>
      {OPTIONS.map((option, index) => (
        <RadioInput
          label={option}
          key={index}
          value={gender}
          setValue={setGender}
        />
      ))}
      <Button
        onPress={handleSignup}
        title="Submit"
        customStyles={{ alignSelf: "center", marginTop: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
  },
});

export default signup;
