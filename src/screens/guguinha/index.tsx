import { View, Text, StyleSheet, Animated } from "react-native";
import { Image } from "@rneui/base";
import Gugas from "../../assets/imgs/gugas.jpg";

import React, { useEffect, useRef } from "react";

const Guguinha = ({ route }) => {
  // Params do navigate
  const { user } = route.params;

  // Hooks
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.mainContainer}>
      <Animated.Text
        style={{
          fontSize: 40,
          color: "#790808",
          fontWeight: "bold",
          marginLeft: 30,
          opacity: fadeAnim
        }}
      >
        Parabéns por ser um! {user}!
      </Animated.Text>
      <Animated.Image source={Gugas} style={[styles.gugasImage, {opacity: fadeAnim}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#112",
    justifyContent: "center",
  },
  gugasImage: {
    width: 400,
    height: 400,
  },
});

export default Home;
