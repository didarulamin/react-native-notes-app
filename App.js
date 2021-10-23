import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import create from "./src/screens/create";
import home from "./src/screens/home";
import Login from "./src/screens/Login";
import signup from "./src/screens/signup";
import update from "./src/screens/update";
import { firebase } from "./hooks/useFirebase";

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState(false);

  // observe user state change
  useEffect(() => {
    const unsubscribed = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        setUser(false);
      }
    });

    return () => unsubscribed;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Home" component={home} />
            <Stack.Screen name="Create" component={create} />
            <Stack.Screen name="update" component={update} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
