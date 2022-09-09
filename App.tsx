import { View, StyleSheet, useWindowDimensions } from "react-native";
import Login from "./src/screens/login";
export default function App() {
  const windowHeight = useWindowDimensions().height;

  return (
    <View style={[styles.mainContainer, {minHeight: Math.round(windowHeight)}]}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    backgroundColor: "#112",
    justifyContent: "center",
  }
});
