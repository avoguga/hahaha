import { View, Text, StyleSheet, Linking, Alert } from 'react-native'
import React, { useCallback } from 'react'
import { Button } from '@rneui/base';

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return <Button title={children} buttonStyle={styles.button} onPress={handlePress} />;
};


export default function About() {
  return (
    <View style={styles.mainContainer}>
       <Text style={{
          fontSize: 30,
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30
        }}>Sobre o APP</Text>
      <Text style={{
          fontSize: 20,
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
        }}>Aplicação realizada em React Native</Text>
        <Text style={{
          fontSize: 20,
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
        }}>O objetivo do APP é mostrar que eu sei mexer em React Native e montar um fan clube do grande Gugas</Text>
      <OpenURLButton url="https://portfoliozinho.vercel.app/">Portfolio do Gugas - Em construção</OpenURLButton>
      <OpenURLButton url="https://github.com/avoguga">Github do Gugas</OpenURLButton>
      <OpenURLButton url="https://www.linkedin.com/in/gustvo/">LinkedIn do Gugas</OpenURLButton>
    </View>
  )
}

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