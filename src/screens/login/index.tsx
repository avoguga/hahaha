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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../config";

const auth = getAuth(app);

export default function LoginScreen() {
  // Hooks
  const [erro, setErro] = useState<null | string>(null);

  // Constantes

  /** Constante para ajustar o input e dimensionar corretamente a tela */
  const windowHeight = useWindowDimensions().height;

  const navigate = useNavigation<any>();

  // Funções

  /** Função de logar do Fã do Guga */
  const logar = async ({ email, password }: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    signInWithEmailAndPassword(auth, email, password).then(
      logado => navigate.navigate("home")
    ).catch(error => (setErro("Email ou senha inválidos!")))
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Informe o email fazendo o favor!")
          .email("O Email deve ser válido!"),
        password: Yup.string()
          .required("Digite a senha")
          .min(6, "Só aceito no minimo 6 caracteres meu bom!"),
      })}
      onSubmit={logar}
    >
      {({
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
      }) => (
        <View
          style={[
            styles.mainContainer,
            { minHeight: Math.round(windowHeight) },
          ]}
        >
          <Text style={styles.title}>Bem-vindo ao Código Fácil!</Text>
          <Text style={styles.text}>Logue na sua conta!</Text>

          <View>
            <View style={styles.inputContainer}>
              <Input
                label="E-mail"
                placeholder="Escreva aqui seu e-mail"
                style={styles.input}
                onChangeText={handleChange("email")}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <Input
                label="Senha"
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
                  title="Login"
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
                <Text style={styles.textSingIn}>Não tem uma conta? </Text>
                <Button
                  buttonStyle={[styles.signButton, { marginTop: 28 }]}
                  type="clear"
                  titleStyle={{ fontSize: 20, color: "white" }}
                  title="Cadastre-se!"
                  onPress={() => navigate.navigate("sign")}
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
    marginTop: 50,
    marginBottom: 100,
    width: 400,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 25,
  },
  title: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 24,
    color: "#fff",
    marginTop: 30,
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
  signButton: {},
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
