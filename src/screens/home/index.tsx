import { View, Text, StyleSheet, Vibration } from "react-native";
import { Button, Input } from "@rneui/base";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import Card from "../../components/Card";
import { FlatList } from "react-native-gesture-handler";
import ReactLogo from "../../assets/imgs/react.png";
import JavaLogo from "../../assets/imgs/java.png";
import PhpLogo from "../../assets/imgs/php.png";
import PythonLogo from "../../assets/imgs/python.png";
import SwiftLogo from "../../assets/imgs/swift.png";
import HtmlLogo from "../../assets/imgs/html.png";
import IonicLogo from "../../assets/imgs/ionic.png";


const Home = () => {
  // Constantes do nav
  const navigate = useNavigation<any>();
  

  const codes = [
    {
      id: 1,
      type: "React Templates",
      img: ReactLogo,
      onClick: () => navigate.navigate("templates", {dbName: "react"}),
    },
    {
      id: 2,
      type: "Java Templates",
      img: JavaLogo,
      onClick: () => navigate.navigate("templates", {dbName: "java"}),
    },
    {
      id: 3,
      type: "Python Templates",
      img: PythonLogo,
      onClick: () => navigate.navigate("templates", {dbName: "python"}),
    },
    {
      id: 4,
      type: "Php Templates",
      img: PhpLogo,
      onClick: () => navigate.navigate("templates", {dbName: "php"}),
    },
    {
      id: 5,
      type: "Swift Templates",
      img: SwiftLogo,
      onClick: () => navigate.navigate("templates", {dbName: "swift"}),
    },
    {
      id: 6,
      type: "Ionic Templates",
      img: IonicLogo,
      onClick: () => navigate.navigate("templates", {dbName: "ionic"}),
    },
    {
      id: 7,
      type: "Html Templates",
      img: HtmlLogo,
      onClick: () => navigate.navigate("templates", {dbName: "react"}),
    },
  ];

  const [cardElements, setCardElements] = useState(codes);

  const filterCardElements = (e) => {
    const search = e.toLowerCase();
    const filteredCardsElements = codes.filter((elements) =>
      elements.type.toLowerCase().includes(search)
    );
    setCardElements(filteredCardsElements);
  };

  const renderItem = ({ item }) => (
    <Card
      text={item.type}
      key={item.key}
      img={item.img}
      onClick={item.onClick}
    />
  );


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Código Fácil</Text>
          <Icon size={40} name="favorite" color="white" />
          <Icon
            size={40}
            style={{ marginLeft: 20 }}
            name="shopping-cart"
            color="white"
            onPress={() => navigate.navigate("cart")}
          />
        </View>
        <Input
          style={styles.input}
          inputContainerStyle={{ borderWidth: 0, borderColor: "transparent" }}
          onChangeText={(event) => filterCardElements(event)}
          labelStyle={{ color: "#fff" }}
          placeholder="Busque um template!"
          leftIconContainerStyle={{
            marginTop: 20,
          }}
          leftIcon={{
            name: "search",
            size: 40,
            color: "#fff",
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        {cardElements.length == 0 ? (
          <Text style={{fontSize: 20}}>Não foram encontrados resultados!</Text>
        ) : (
          <FlatList data={cardElements} renderItem={renderItem} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    fontSize: 20,
    marginTop: 20,
    marginRight: 30,
  },
  headerContainer: {
    flex: 0.3,
    backgroundColor: "#493d8a",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 0.7,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginRight: 125,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
