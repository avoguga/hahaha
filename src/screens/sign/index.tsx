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

export default function SignScreen() {
  // Hooks
  const [erro, setErro] = useState<null | string>(null);

  // Constantes

  /** Constante para ajustar o input e dimensionar corretamente a tela */
  const windowHeight = useWindowDimensions().height;

  const navigate = useNavigation<any>();

  // Funções

  /** Função de logar do Fã do Guga */
  const logar = async ({ user, password }: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (user.trim() == "aaa" && password == "aaaaaa") {
      navigate.navigate("home");
    } else setErro("Email ou senha incorreta!");
  };

  return (
    <Formik
      initialValues={{ user: "", password: "" }}
      validationSchema={Yup.object({
        user: Yup.string().required("Informe o user fazendo o favor!"),
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
          <Text style={styles.title}>Bem vindo ao Código Fácil!</Text>
          <Text style={styles.text}>Faça seu cadastro!</Text>

          <View>
            <View style={styles.inputContainer}>
              <Input
                label="Primeiro Nome"
                labelStyle={{ color: "white" }}
                placeholder="Escreva seu primeiro nome"
                style={styles.input}
                onChangeText={handleChange("user")}
              />
              {touched.user && errors.user && (
                <Text style={styles.error}>{errors.user}</Text>
              )}
              <Input
                label="Sobrenome"
                labelStyle={{ color: "white" }}
                placeholder="Escreva seu sobrenome"
                style={styles.input}
                onChangeText={handleChange("user")}
              />
              {touched.user && errors.user && (
                <Text style={styles.error}>{errors.user}</Text>
              )}
              <Input
                label="Email"
                labelStyle={{ color: "white" }}
                placeholder="Escreva aqui seu email"
                style={styles.input}
                onChangeText={handleChange("user")}
              />
              {touched.user && errors.user && (
                <Text style={styles.error}>{errors.user}</Text>
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
                  onPress={() => alert("Conta criada!")}
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
    height: 50,
  },
  title: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 70,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    marginTop: 30,
    marginBottom: 20
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
