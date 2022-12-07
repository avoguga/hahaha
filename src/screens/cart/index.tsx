import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import emailjs from "emailjs-com";

import {
  CardNumberTextInput,
  CardDateTextInput,
} from "rn-credit-card-textinput";

import { Button, Input } from "@rneui/base";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon, Dialog } from "@rneui/themed";
import BuyCard from "../../components/BuyCard";
import { Modalize } from "react-native-modalize";
import { Formik } from "formik";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../../config";


const Cart = ({ route }) => {
  const [cardValue, setCardValue] = useState("");
  const [focusCardNum, setFocusCardNum] = useState<boolean>(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [cardDateValue, setCardDateValue] = useState("");
  const [focusCardDateNum, setFocusCardDateNum] = useState<boolean>(false);
  const [user, setUser]: any = useState();
  const [userName, setUserName]: any = useState();

  const form: any = useRef(null);
  const auth = getAuth(app);

  const email = auth.currentUser?.email;

  const db = getFirestore();
  const colQuery = query(
    collection(db, "usuarios"),
    where("email", "==", email)
  );

  getDocs(colQuery).then((results) => {
    const userResult: any[] = [];
    results.forEach((result) => {
      userResult.push(result.data());
    });
    setUser(userResult);
  });

  const userId =  async () => {
    if(user){
      const nome = await user[0]?.nome
      return nome;
    }
  }

  
  const openModal = () => {
    userId().then(
      result => setUserName(result)
    ),
    modal.current?.open()
  }

  const toggleDialog1 = () => {
    setVisible1(!visible1);
    setTimeout(() => {
      setVisible2(!visible2);
    }, 1000);
    const templateParams = {
      email: email,
      name: userName,
      template: route.params?.cartElements?.title,
      price: route.params?.cartElements?.price
  };
    emailjs.send(
      "service_cycmc4n",
      "template_z74f0zj",
      templateParams,
      "2nkFZvtFxcz_PH8GS"
    );
  };

  const toggleDialog2 = () => {
    setVisible1(!visible1);
    setVisible2(!visible2);
  };

  const updateText = (cardNum: string) => {
    setCardValue(cardNum);
  };
  const updateCardDate = (cardNum: string) => {
    setCardDateValue(cardNum);
  };

  // Constantes do nav
  const navigate = useNavigation<any>();
  const modal = useRef<Modalize>();
  return (
    <View style={{ flex: 1 }}>
      {/* <View style={styles.headerContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Checkout</Text>
        </View>
      </View> */}
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
          description={route.params?.cartElements?.description}
          type={route.params?.cartElements?.type}
        />
        <Button
          buttonStyle={[styles.button]}
          type="clear"
          titleStyle={{ fontSize: 20, color: "#fff" }}
          title="Comprar agora!"
          onPress={() => openModal()}
        />
        <Modalize ref={modal} modalStyle={{ padding: 20 }} modalHeight={560}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              width: "90%",
            }}
          >
            <Formik
              initialValues={{
                email: email,
              }}
              onSubmit={toggleDialog1}
            >
              {({ handleChange, handleBlur, handleSubmit }) => (
                <View>
                  <CardNumberTextInput
                    autoFocus={true}
                    focus={focusCardNum}
                    onFocus={() => setFocusCardNum(true)}
                    onBlur={(e) => {
                      setFocusCardNum(false);
                    }}
                    label="Número do cartão"
                    errorColor={"red"}
                    defaultBorderColor={"#ddd"}
                    inputWrapStyle={{
                      width: "100%",
                      height: 60,
                      marginLeft: 10,
                      marginBottom: -10,
                    }}
                    inputStyle={{
                      color: "#333",
                    }}
                    defaultValue={cardValue}
                    focusColor={"blue"}
                    placeholder={"Cartão de crédito"}
                    updateTextVal={(text) => {
                      updateText(text);
                    }}
                  />

                  <CardDateTextInput
                    errorColor={"red"}
                    labelColor={"#ddd"}
                    focusColor={"#1c32a0"}
                    defaultBorderColor={"#ddd"}
                    placeholder={"MM/YY"}
                    label={"Validade"}
                    focus={focusCardDateNum}
                    updateCardDateText={(t) => {
                      updateCardDate(t);
                    }}
                    onFocus={() => setFocusCardDateNum(true)}
                    labelStyle={{
                      color: "#333",
                      fontWeight: "400",
                    }}
                    inputWrapStyle={{
                      marginLeft: 10,
                    }}
                    placeholderTextColor={"#ccc"}
                    value={cardDateValue}
                    defaultValue={cardDateValue}
                    inputStyle={{
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  />
                  <Input
                    label="CVC"
                    placeholder="CVC"
                    placeholderTextColor={"#ccc"}
                    labelStyle={{
                      fontWeight: "400",
                      fontSize: 14,
                      color: "#000",
                      marginBottom: 10,
                    }}
                    inputStyle={{
                      borderWidth: 1,
                      borderColor: "rgba(0, 0, 0, .1)",
                      padding: 10,
                    }}
                    containerStyle={{
                      width: 100,
                    }}
                    style={{ color: "#000" }}
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                      backgroundColor: "transparent",
                    }}
                  />
                  <Input
                    label="Nome do Titular"
                    placeholder="Nome do titular do cartão"
                    placeholderTextColor={"#ccc"}
                    labelStyle={{
                      fontWeight: "400",
                      fontSize: 14,
                      color: "#000",
                      marginBottom: 10,
                    }}
                    inputStyle={{
                      borderWidth: 1,
                      borderColor: "rgba(0, 0, 0, .1)",
                      padding: 10,
                    }}
                    style={{ color: "#000" }}
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                      backgroundColor: "transparent",
                    }}
                  />
                  <Button
                    buttonStyle={[styles.button, { marginLeft: 40 }]}
                    type="clear"
                    titleStyle={{ fontSize: 20, color: "#fff" }}
                    title="Comprar agora!"
                    onPress={() => handleSubmit()}
                  />
                  <Dialog
                    isVisible={visible1}
                    onBackdropPress={toggleDialog2}
                    overlayStyle={{
                      backgroundColor: "#493d8a",
                    }}
                  >
                    {!visible2 ? (
                      <Dialog.Loading />
                    ) : (
                      <View
                        style={{
                          height: 200,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#493d8a",
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 20 }}>
                          Compra realizada!
                        </Text>
                      </View>
                    )}
                  </Dialog>
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </Modalize>
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
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
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
    backgroundColor: "#493d8a",
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Cart;
