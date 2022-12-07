import { View, Text, StyleSheet, Vibration } from "react-native";
import { Button, Input } from "@rneui/base";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Avatar } from "@rneui/themed";
import { getAuth } from "firebase/auth";
import { app } from "../../../config";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Formik } from "formik";
import * as Yup from "yup";

const auth = getAuth(app);

const Profile = () => {
  // Constantes do nav
  const navigate = useNavigation<any>();

  const [user, setUser]: any = useState();
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

  const userId = () => {
    if(user[0]){
      return user[0]?.id;
    }
  }

  const update = ({nome, sobrenome, usuario, email}) => {
    updateDoc(doc(db, "usuarios", userId()), {
      nome: nome,
      sobrenome: sobrenome,
      usuario: usuario,
      email: email
    })
  }

  const signOut = () => {
    auth.signOut();
    navigate.navigate("login");
  }
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Perfil</Text>
          <Icon size={40} name="favorite" color="white" />
          <Icon
            size={40}
            style={{ marginLeft: 20 }}
            type="materialicon"
            name="logout"
            color="white"
            onPress={signOut}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        {user ? (
          <Text style={[styles.contentText]}>Bem vindo! {user[0]?.nome}!</Text>
        ) : null}

        <Text style={styles.contentText}>
          Gostaria de mudar algo na sua conta?
        </Text>
        <Formik
          initialValues={{
            nome: "",
            sobrenome: "",
            email: "",
            usuario: "",
          }}
          onSubmit={update}
        >
          {({ handleChange, handleBlur, handleSubmit }) => (
            <View>
              <Input label="Nome" onChangeText={handleChange("nome")} />
              <Input label="Sobrenome" onChangeText={handleChange("sobrenome")} />
              <Input label="Usuário" onChangeText={handleChange("usuario")} />
              <Input label="E-mail" onChangeText={handleChange("email")} />
              <Button
                  buttonStyle={styles.button}
                  titleStyle={{ fontSize: 25, color: "white" }}
                  title="Mudar dados"
                  onPress={() => handleSubmit()}
                />
            </View>
          )}
        </Formik>
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
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 0.7,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginRight: 200,
  },
  contentText: {
    color: "#493d8a",
    fontSize: 24,
    fontWeight: "800",
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

export default Profile;
