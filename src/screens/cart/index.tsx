import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Input } from "@rneui/base";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import BuyCard from "../../components/BuyCard";

const Cart = ({ route }) => {
  // Constantes do nav
  const navigate = useNavigation<any>();
  const [paymentIsDisable, setPaymentIsDisable] = useState(false);
  const [publishedKey, setPublishedKey] = useState("");
  const [erro, setErro] = useState<null | string>(null);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Checkout</Text>
        </View>
      </View>
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BuyCard
          text={route.params?.cartElements?.title}
          price={route.params?.cartElements?.price}
          img={route.params?.cartElements?.img}
        />
      
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 400,
    alignItems: "center",
  },

  text: {
    fontSize: 24,
    color: "#fff",
    marginTop: 30,
    marginBottom: 20,
  },
  textSingIn: {
    fontSize: 20,
    color: "#fff",
    marginTop: 30,
  },
  error: {
    color: "white",
    fontSize: 15,
    textAlign: "right",
    marginBottom: 5,
    marginTop: -10,
  },
  erroLogin: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  adressTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 5,
  },
  adressView: {
    backgroundColor: "#493d8a",
    width: 420,
    height: 450,
    margin: 10,
    alignItems: "baseline",
    padding: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    fontSize: 20,
    marginTop: 20,
    marginRight: 30,
  },
  headerContainer: {
    flex: 0.2,
    backgroundColor: "#493d8a",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 0.8,
    backgroundColor: "#fff",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginRight: 250,
    marginTop: 30,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 70,
  },
  button: {
    width: 270,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Cart;
