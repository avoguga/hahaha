import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

interface ICard {
  text: String;
  onClick?: any;
  description?: String;
  price?: String;
  type?: String;
  img?: any;
}

export default function TemplateCard({
  text,
  onClick,
  type,
  description,
  price,
  img,
}: ICard) {
  const navigate = useNavigation<any>();

  return (
    <View style={styles.card}>
      <Text style={[styles.cardTitle]}>{text}</Text>
      <Text style={[styles.cardText]}>Descrição: {description}</Text>
      <Text style={[styles.cardText]}>Tipo do template: {type}</Text>
      <Text style={[styles.cardText]}>Preço: R$ {price}</Text>
      <Image
        style={styles.cardImg}
        source={{
          uri: img,
        }}
      />
      <Button
        buttonStyle={[styles.button]}
        type="clear"
        titleStyle={{ fontSize: 20, color: "#493d8a" }}
        title="Comprar agora!"
        onPress={() => navigate.navigate("cart", { cartElements: {
          title: text,
          price: price,
          img: img
        } })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  description: {},
  price: {},
  button: {
    width: 250,
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: 55,
  },
  type: {},
  card: {
    backgroundColor: "#493d8a",
    width: 390,
    height: 700,
    borderRadius: 15,
    margin: 10,
    alignItems: "baseline",
    padding: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 5,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  cardImg: {
    aspectRatio: 1,
    width: 370,
    resizeMode: "contain",
  },
});
