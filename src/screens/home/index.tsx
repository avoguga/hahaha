import { View, Text, StyleSheet, Vibration } from "react-native";
import { Button } from "@rneui/base";
import { Audio } from "expo-av";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  // Constantes do nav
  const navigate = useNavigation<any>();

  // Hooks
  const [sound, setSound] = React.useState();
  const [changeButtonTitle, setChangeButtonTitle] = React.useState(
    "Esse botão aparentemente não faz nada!"
  );

  /** Função de ESSENCIAL do Fã do Guga */
  async function playSoundAndNavigate() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/mexico.mp3")
    );
    // @ts-ignore
    setSound(sound);
    Vibration.vibrate(20 * 1000, true)
    console.log("Playing Sound");
    await sound.playAsync();
    setChangeButtonTitle("Stop nas músicas!");
    navigate.navigate("gugas");
  }

  async function stopSound() {
    console.log("Stoping Sound");
    Vibration.cancel()
    // @ts-ignore
    await sound.stopAsync();
  }

  const gugasQuotesList = () => {
    navigate.navigate("quotes");
  }

  return (
    <View style={styles.mainContainer}>
      <Text
        style={{
          fontSize: 45,
          color: "#790808",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Parabéns por ser um Super Fã!!
      </Text>
      <Text
        style={{
          fontSize: 45,
          color: "#ffe23c",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Gustavo agradece!
      </Text>
      {/* <Text
        style={{
          fontSize: 30,
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Se estiver preparado aperte no botão!
      </Text> */}
      <Button
        buttonStyle={styles.button}
        titleStyle={{ fontSize: 30 }}
        title={"Dale daleeee"}
        onPress={playSoundAndNavigate}
      />
      <Button
        buttonStyle={styles.button}
        titleStyle={{ fontSize: 30 }}
        title={"Frases do Gugas (Em inglês...)"}
        onPress={gugasQuotesList}
      />
      <Button
        buttonStyle={styles.button} 
        titleStyle={{ fontSize: 30 }}
        title={changeButtonTitle}
        onPress={stopSound}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#112",
    justifyContent: "center",
    alignItems: "center",
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

export default Home;
