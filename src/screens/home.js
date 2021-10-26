import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnBoarding from "../components/Onbording";
import useFirebase from "../../hooks/useFirebase";
import { AntDesign } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

const home = ({ navigation }) => {
  // const [checking, setChecking] = useState(true);
  const [onboarded, setOnboarded] = useState(false);
  const { firebase, user } = useFirebase();
  const [notes, setNotes] = useState([]);
  /*  const noteRef = ;
  console.log(noteRef, "note ref"); */
  /*   const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log(user);
      })
      .catch((error) => {
        // An error happened.
      });
  }; */
  useEffect(() => {
    const user = firebase.auth().currentUser;
    const subscriber = firebase
      .firestore()
      .collection("notes")
      .where("authorId", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        const newNotes = [];
        querySnapshot.forEach((doc) => {
          newNotes.push({ id: doc.id, ...doc.data() });
        });
        setNotes(newNotes);
      });

    return subscriber;
  }, []);

  const getOnBoardingValue = async () => {
    try {
      let value = await AsyncStorage.getItem("onboarding");
      value = JSON.parse(value);
      if (value) {
        setOnboarded(true);
      }
      // setChecking(false);
    } catch (error) {
      console.log(error);
      // setChecking(false);
    }
  };

  useEffect(() => {
    getOnBoardingValue();
  }, []);

  /* if (checking) {
    return null;
  } */
  if (!onboarded) {
    return <OnBoarding setOnboarded={setOnboarded} />;
  }

  const onEdit = () => {
    console.log("onEdit");
  };
  const onDelete = (id) => {
    // firebase.firestore().collection("notes")
    console.log(id);

    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .delete()
      .then(() => {
        showMessage({
          message: "Note deleted successfully",
          type: "danger",
        });
      })
      .catch((error) => {
        showMessage({
          message: error,
          type: "danger",
        });
      });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: item.noteColor,
        borderRadius: 12,
        padding: 15,
        margin: 5,
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, color: "white" }}>{item.title}</Text>
        <Text style={{ fontSize: 14, color: "white" }}>{item.description}</Text>
      </View>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign
          onPress={() => navigation.navigate("update")}
          style={{ marginHorizontal: 10 }}
          name="edit"
          size={24}
          color="white"
        />
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign
          onPress={() => onDelete(item.id)}
          style={{ marginHorizontal: 10 }}
          name="delete"
          size={24}
          color="white"
        />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 24, color: "#188180", fontWeight: "bold" }}>
          My Notes
        </Text>
        <Pressable style={{ marginTop: 5 }}>
          <AntDesign
            onPress={() => navigation.navigate("Create")}
            name="pluscircle"
            size={24}
            color="#188180"
          />
        </Pressable>
      </View>

      {notes.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={require("../../assets/nonotes.png")} />
          <Text>You don't have any notes</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default home;
