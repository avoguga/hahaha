import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button, Input } from "@rneui/base";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import {
  getFirestore,
  getDocs,
  collection,
} from "firebase/firestore";
import TemplateCard from "../../components/TemplateCards";

const Templates = ({ route }) => {
  // Constantes do nav
  const navigate = useNavigation<any>();
  const [templates, setTemplates]: any = useState();

  const db = getFirestore();
  getDocs(collection(db, route.params.dbName)).then((results) => {
    const templateResults: any[] = [];
    results.forEach((result) => {
      templateResults.push(result.data());
    });
    setTemplates(templateResults);
  });

  const [cardElements, setCardElements] = useState(templates);

  const filterCardElements = (e) => {
    const search = e.toLowerCase();
    const filteredCardsElements = templates.filter((elements) =>
      elements.nome.toLowerCase().includes(search)
    );
    setCardElements(filteredCardsElements);
  };


  const lowerCaseDbName = route.params.dbName;
  const capitalizedDbName =
    lowerCaseDbName[0].toUpperCase() + lowerCaseDbName.substr(1);

  const renderItem = ({ item }) => (
    <TemplateCard
      text={item.nome}
      key={item.key}
      description={item.descricao}
      price={item.preco}
      type={item.tipo}
      img={item.imagem}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{capitalizedDbName} Templates</Text>
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
        <FlatList data={templates} renderItem={renderItem} />
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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginRight: 150,
    marginTop: 30
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

export default Templates;
