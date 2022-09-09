import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/base";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [erro, setErro] = useState<null | string>(null);

  //Funções

  /** Função de logar do Fã do Guga */
  const logar = async ({ user, password }: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (user.trim() == "Fã do Gugas" && password == "soufan")
      console.log("oiii");
    else setErro("Email ou senha incorreta!");
  };

  return (
    <Formik
      initialValues={{ user: "", password: "" }}
      validationSchema={Yup.object({
        user: Yup.string().required("Informe o user fazendo o favor!"),
        password: Yup.string()
          .required("Digite a senha")
          .min(6, "Só aceito acima de 8 caracteres meu bom!"),
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
        <>
          <Text style={styles.title}>Fã Clube Do Gugas</Text>
          <View>
            <View style={styles.inputContainer}>
              <Input
                label="Usuário"
                placeholder="Escreva aqui seu usuário"
                style={styles.input}
                onChangeText={handleChange("user")}
              />
              {touched.user && errors.user && (
                <Text style={styles.error}>{errors.user}</Text>
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
                  titleStyle={{ fontSize: 25 }}
                  title="Login"
                  onPress={() => handleSubmit()}
                />
              )}
            </View>
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 50,
    marginBottom: 100,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    width: 100,
    borderRadius: 10,
    padding: 10,
    fontSize: 25,
  },
  title: {
    fontSize: 40,
    color: "#790808",
    fontWeight: "bold",
    marginLeft: 30,
  },
  button: {
    width: 250,
    backgroundColor: "black",
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
});
