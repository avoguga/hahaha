import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

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
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigate.navigate("cart", {
          cartElements: {
            title: text,
            price: price,
            img: img,
            description: description,
            type: type,
          },
        })
      }
    >
      <Image
        style={styles.cardImg}
        source={{
          uri: img,
        }}
      />
      <Text style={[styles.cardTitle, { marginTop: 30 }]}>{text}</Text>
      <View style={{ flexDirection: "row" }}>
        <Icon name="star" color="gold" />
        <Icon name="star" color="gold" />
        <Icon name="star" color="gold" />
        <Icon name="star" color="gold" />
        <Icon name="star" color="gold" />
        <Text style={{ color: "#fff", marginLeft: 30 }}>8 Reviews</Text>
      </View>
      {/* <Text style={[styles.cardText]}>Descrição: {description}</Text> */}
      {/* <Text style={[styles.cardText]}>Tipo do template: {type}</Text> */}
      <Text style={[styles.cardText, { marginTop: 40 }]}>
        Preço: R$ {price}
      </Text>

      {/* <Button
        buttonStyle={[styles.button]}
        type="clear"
        titleStyle={{ fontSize: 20, color: "#493d8a" }}
        title="Comprar agora!"
        onPress={() =>
          navigate.navigate("cart", {
            cartElements: {
              title: text,
              price: price,
              img: img,
              description: description,
              type: type
            },
          })
        }
      /> */}
    </TouchableOpacity>
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
    height: 400,
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
    width: 370,
    height: 200,
    resizeMode: "stretch",
  },
});
