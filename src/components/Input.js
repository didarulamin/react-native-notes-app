import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, onChangeText, secureTextEntry }) => {
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    marginBottom: 15,
  },
});

export default Input;
