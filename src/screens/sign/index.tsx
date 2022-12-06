import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/base";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../config";
import { doc, getFirestore, setDoc, collection } from "firebase/firestore";
const auth = getAuth(app);

export default function SignScreen() {
  // Hooks
  const [erro, setErro] = useState<null | string>(null);

  // Constantes

  const navigate = useNavigation<any>();

  // Funções

  const db = getFirestore();
  const document = doc(collection(db, "usuarios"));
  const setUser = (usuario, senha, email, nome, sobrenome) => {
    setDoc(document, {
      id: document.id,
      usuario: usuario,
      senha: senha,
      email: email,
      nome: nome,
      sobrenome: sobrenome,
    });
  };

  /** Função de logar do Fã do Guga */
  const sign = async ({ user, password, email, name, lastname }: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(user, password, email, name, lastname);
        console.log("User criado!");
      })
      .catch((error) => console.log(error));
    navigate.navigate("login");
  };

  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
        email: "",
        name: "",
        lastname: "",
      }}
      validationSchema={Yup.object({
        user: Yup.string().required("Informe o user fazendo o favor!"),
        password: Yup.string()
          .required("Digite a senha!")
          .min(6, "Só aceito no minimo 6 caracteres meu bom!"),
        email: Yup.string()
          .required("Digite o E-mail!")
          .email("O e-mail deve ser valido!"),
        name: Yup.string().required("Digite seu nome!"),
        lastname: Yup.string().required("Digite seu sobrenome!"),
      })}
      onSubmit={sign}
    >
      {({
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
      }) => (
        <View style={[styles.mainContainer]}>
          <Text style={styles.title}>Bem vindo ao Código Fácil!</Text>
          <Text style={styles.text}>Faça seu cadastro!</Text>

          <View>
            <View style={styles.inputContainer}>
              <Input
                label="Primeiro Nome"
                labelStyle={{ color: "white" }}
                placeholder="Escreva seu primeiro nome"
                style={styles.input}
                onChangeText={handleChange("name")}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
              <Input
                label="Sobrenome"
                labelStyle={{ color: "white" }}
                placeholder="Escreva seu sobrenome"
                style={styles.input}
                onChangeText={handleChange("lastname")}
              />
              {touched.lastname && errors.lastname && (
                <Text style={styles.error}>{errors.lastname}</Text>
              )}
              <Input
                label="E-mail"
                labelStyle={{ color: "white" }}
                placeholder="Escreva aqui seu e-mail"
                style={styles.input}
                onChangeText={handleChange("email")}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <Input
                label="Usuário"
                labelStyle={{ color: "white" }}
                placeholder="Escreva aqui seu usuário"
                style={styles.input}
                onChangeText={handleChange("user")}
              />
              {touched.user && errors.user && (
                <Text style={styles.error}>{errors.user}</Text>
              )}
              <Input
                label="Senha"
                labelStyle={{ color: "white" }}
                placeholder="Escreva aqui sua senha"
                secureTextEntry
                style={styles.input}
                onChangeText={handleChange("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              {erro && <Text style={styles.erroLogin}>{erro}</Text>}

              {isSubmitting && (
                <ActivityIndicator size="large" color="#790808" />
              )}
              {!isSubmitting && (
                <Button
                  buttonStyle={styles.button}
                  titleStyle={{ fontSize: 25, color: "#493d8a" }}
                  title="Criar conta"
                  onPress={() => handleSubmit()}
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.textSingIn}>Já tem conta? </Text>
                <Button
                  buttonStyle={[{ marginTop: 28 }]}
                  type="clear"
                  titleStyle={{ fontSize: 20, color: "white" }}
                  title="Faça o login!"
                  onPress={() => navigate.navigate("login")}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 400,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    height: 40,
  },
  title: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 50,
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
  button: {
    width: 250,
    backgroundColor: "white",
    borderRadius: 20,
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
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#493d8a",
    justifyContent: "center",
  },
});
