import { View, Text, StyleSheet, Vibration } from "react-native";
import { Button, Input } from "@rneui/base";
import { Audio } from "expo-av";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

const About = () => {
  // Constantes do nav
  const navigate = useNavigation<any>();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Código Fácil</Text>
          <Icon size={40} name="favorite" color="white" />
          <Icon
            size={40}
            style={{ marginLeft: 20 }}
            name="shopping-cart"
            color="white"
          />
        </View>
      </View>
      <View style={styles.contentContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    fontSize: 20,
    marginTop: 20,
    marginRight: 30
  },
  headerContainer: {
    flex: 0.3,
    backgroundColor: "#493d8a",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 0.7,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginRight: 125,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    width: 270,
    backgroundColor: "black",
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "red",
  },
});

export default About;
