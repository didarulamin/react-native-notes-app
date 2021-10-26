import Icon from "react-native-vector-icons/Ionicons";
import AppIntroSlider from "react-native-app-intro-slider";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const slides = [
  {
    key: 1,
    title: "Document",
    text1: "Make yourself better",
    text2: "Learn new stuffs and get professional",
    image: require("../../assets/banner1.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Learn",
    text1: "Learn and grow",
    text2: "You can earn professionally with our bootcamps",
    image: require("../../assets/banner2.png"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Help",
    text1: "Help others by education",
    text2: "Create your own bootcamps and help others",
    image: require("../../assets/banner3.png"),
    backgroundColor: "#22bcb5",
  },
];

const OnBoarding = ({ setOnboarded }) => {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          // backgroundColor: item.backgroundColor,
        }}
      >
        <Image style={{ marginTop: 20 }} source={item.image} />
        <Text
          style={{
            fontSize: 25,
            color: "#16a281",
            fontWeight: "bold",
            margin: 20,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#16a281",
            fontWeight: "bold",
            margin: 20,
          }}
        >
          {item.text1}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#16a281",

            margin: 20,
          }}
        >
          {item.text2}
        </Text>
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  const onDone = () => {
    setOnboarded(true);
  };

  const makeOnBoardingTrue = async () => {
    try {
      await AsyncStorage.setItem("onboarding", JSON.stringify(true));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    makeOnBoardingTrue();
  }, []);

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      keyExtractor={(item) => item.key.toString()}
      renderDoneButton={_renderDoneButton}
      activeDotStyle={{ backgroundColor: "green" }}
      showNextButton={false}
    />
  );
};

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnBoarding;
