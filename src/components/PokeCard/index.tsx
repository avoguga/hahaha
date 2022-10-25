import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SvgUri } from "react-native-svg";

export default function PokeCard({ text, img }) {
  return (
    <View style={styles.card}>
      <Text style={[styles.cardText]}>{text}</Text>
      {/* <Text style={styles.cardText}>{date}</Text> */}
      {/* <Image source={img}
                style={{ height: 100, width: 100,  resizeMode: 'contain'}} /> */}
      <SvgUri fill="none" width={100} height={50} uri={img} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    width: 370,
    height: 70,
    borderRadius: 15,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cardText: {
    color: "#444140",
    fontSize: 16,
  },
  img: {
    height: 50,
    width: 50,
    backgroundColor: "black",
  },
});
