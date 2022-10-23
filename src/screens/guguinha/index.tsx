import { View, Text, StyleSheet, Animated } from "react-native";
import { Button } from "@rneui/base";
import Gugas from "../../assets/imgs/gugas.jpg";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

const Guguinha = () => {
  // Params do navigate

  //Constantes
  const nav = useNavigation<any>();

  // Hooks
  const fadeAnim = useRef(new Animated.Value(0)).current;

  /**  */

  const stopSongAndGoBack = () => {

  }

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
        Parabéns por ser um! Super fã!
      </Animated.Text>
      <Animated.Image source={Gugas} style={[styles.gugasImage, {opacity: fadeAnim}]} />
      <Button
        buttonStyle={styles.button}
        titleStyle={{ fontSize: 30 }}
        title={"Botão de voltar, MAS VOLTAR PARA QUÊ?"}
        onPress={() => nav.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#112",
    justifyContent: "center",
    alignItems: "center"
  },
  gugasImage: {
    width: 400,
    height: 400,
  },
  button: {
    width: 250,
    backgroundColor: "black",
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "red",
  },
});

export default Guguinha;
