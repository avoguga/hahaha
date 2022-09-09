import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Input, Button } from "@rneui/themed";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.container, { flex: 1}]}>
        <Text style={styles.title}>Fã Clube Do Gugas</Text>
      </View>
      <View style={[styles.container, { flex: 2 }]}>
        <View style={{marginBottom: 300}}>
          <Input
            label="Usuário"
            placeholder="Escreva aqui seu usuário"
            style={{ backgroundColor: "white", width: 100 }}
          />
          <Input
            label="Senha"
            placeholder="Escreva aqui sua senha"
            secureTextEntry
            style={{ backgroundColor: "white", width: 100 }}
          />
          <Button>Login</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7EBE8",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "#790808",
    fontWeight: "bold",
    marginLeft: 70,
  },
});
