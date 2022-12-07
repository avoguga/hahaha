import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { AirbnbRating } from '@rneui/themed';
interface ICard {
  text: String;
  onClick?: any;
  description?: String;
  price?: String;
  type?: String;
  img?: any;
}

export default function BuyCard({
  text,
  onClick,
  type,
  description,
  price,
  img,
}: ICard) {
  const navigate = useNavigation<any>();
  const ratingCompleted = (rating: number) => {
    console.log('Rating is: ' + rating);
  };
  const [a, setA] = useState(8)
  return (
    <View style={styles.card}>
      <Image
        style={styles.cardImg}
        source={{
          uri: img,
        }}
      />
      <Text style={[styles.cardTitle]}>{text}</Text>
      <View style={{ flexDirection: "row" }}>
        <AirbnbRating defaultRating={4} showRating={false} size={20} onFinishRating={() => {setA(9)}} />
        <Text style={{ color: "#fff", marginLeft: 30 }}>{a} Reviews</Text>
      </View>
      <Text style={[styles.cardText, {marginTop: 20}]}>Preço: R$ {price}</Text>

      <Text style={[styles.cardText]}>Descrição: {description}</Text>
      <Text style={[styles.cardText]}>Tipo do template: {type}</Text>
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
    width: 420,
    height: 500,
    margin: 10,
    alignItems: "baseline",
    padding: 10,
    paddingLeft: 20,
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
