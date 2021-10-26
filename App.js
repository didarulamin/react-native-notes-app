import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, createContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import create from "./src/screens/create";
import Home from "./src/screens/home";
import Login from "./src/screens/Login";
import signup from "./src/screens/signup";
import update from "./src/screens/update";
import useFirebase from "./hooks/useFirebase";
import FlashMessage from "react-native-flash-message";
// import useAuth from "./hooks/useAuth";

const Stack = createNativeStackNavigator();

function App() {
  const { user, setUser, firebase } = useFirebase();

  // observe user state change

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
        {user.email ? (
          <>
            {/*   <Stack.Screen name="Home">
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen> */}

            <Stack.Screen name="Home" component={Home} />
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
      <FlashMessage position="top" />
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
