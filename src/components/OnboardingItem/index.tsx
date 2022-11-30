import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import React from "react";
import { Button, Input } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

export default function index({ item }: any) {
  const navigate = useNavigation<any>();
  const { width } = useWindowDimensions();
  const endingOnboarding = () => {
    navigate.navigate("login");
  };
  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={[styles.image, { width, resizeMode: "contain" }]} />
      </View>

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        {item.button ? null : (
          <Text style={styles.description}>{item.description}</Text>
        )}
        {item.button ? (
        <Button
          buttonStyle={styles.button}
          titleStyle={{ fontSize: 25, color: "#fff" }}
          title="Avançar"
          onPress={() => endingOnboarding()}
        />
      ) : null}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
    backgroundColor: "#493d8a",
  },
  image: {
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "#493d8a",
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    color: "#62656b",
    textAlign: "center",
    paddingHorizontal: 64,
  },
  button: {
    width: 250,
    backgroundColor: "#493d8a",
    borderRadius: 20,
    alignSelf: "center"
  },
});
