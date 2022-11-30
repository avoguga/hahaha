import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Guguinha from "../screens/guguinha";
import Home from "../screens/home";
import Frases from "../screens/quotes";
import About from "../screens/about";
import Login from "../screens/login";
import SignScreen from "../screens/sign";
import Onboarding from "../components/Onboarding";
import PokemonList from "../screens/pokemon";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator<any>();

const Tab = createBottomTabNavigator<any>();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <MaterialIcons name="home" size={20} />,
        }}
      />
      <Tab.Screen
        name="about"
        component={About}
        options={{
          tabBarLabel: "Sobre",
          tabBarIcon: () => <MaterialIcons name="info" size={20} />,
        }}
      />
      <Tab.Screen
        name="aaa"
        component={About}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: () => <MaterialIcons name="info" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}

export const NavegacaoPrincipal = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="sign" component={SignScreen} />
      <Stack.Screen name="home" component={HomeTabs} />
      <Stack.Screen name="quotes" component={Frases} />
      <Stack.Screen name="pokemon" component={PokemonList} />
      <Stack.Screen name="gugas" component={Guguinha} />
    </Stack.Navigator>
  </NavigationContainer>
);
