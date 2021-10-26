import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import { showMessage } from "react-native-flash-message";
// import useAuth from "../../hooks/useAuth";
import useFirebase from "../../hooks/useFirebase";
import Button from "../components/Button";
import Input from "../components/Input";
import RadioInput from "../components/RadioInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// import AuthContext from "../../App";

const OPTIONS = ["red", "green", "blue"];

const update = ({ navigation }) => {
  const { user, firebase } = useFirebase();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("white");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  // console.log(user.uid);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const onSave = () => {
    setIsLoading(true);

    note = {
      title: title,
      description: description,
      noteColor: noteColor,
      authorId: user.uid,
      timestamp: new Date(),
    };

    const userRef = firebase.firestore().collection("notes");
    // userRef.doc(uid).set(note);
    userRef
      .add(note)
      .then((_doc) => {
        console.log(_doc);
        setIsLoading(false);
        showMessage({
          message: "Note Save successfully",
          type: "success",
        });
      })
      .catch((err) => (err) => {
        console.log(err);
        setIsLoading(false);
      });

    navigation.goBack();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  console.log(image);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 15 }}>
        <Pressable>
          <MaterialCommunityIcons
            onPress={pickImage}
            style={{ alignSelf: "center", marginBottom: 10 }}
            name="image-plus"
            size={60}
            color="green"
          />
        </Pressable>
      </View>

      <Input
        onChangeText={(title) => setTitle(title)}
        placeholder="Set the title"
      />
      <Input
        onChangeText={(des) => setDescription(des)}
        placeholder="Set the Description"
      />

      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          Select Your note color
        </Text>
        {OPTIONS.map((option, index) => (
          <RadioInput
            key={index}
            label={option}
            value={noteColor}
            setValue={setNoteColor}
          />
        ))}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 30,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <Button
            onPress={onSave}
            customStyles={{ alignSelf: "center" }}
            title="Submit"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, margin: 20 },
});

export default update;
