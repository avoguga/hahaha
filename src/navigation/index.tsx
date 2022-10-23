import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Guguinha from '../screens/guguinha';
import Home from '../screens/home';
import Login from '../screens/login';



const Stack = createStackNavigator<any>();

const Tab = createBottomTabNavigator<any>();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="gugas" component={Guguinha} />
    </Tab.Navigator>
  );
}

export const NavegacaoPrincipal = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={Login}/>
            <Stack.Screen name="home" component={HomeTabs} />
            <Stack.Screen name="gugas" component={Guguinha} />
        </Stack.Navigator>
    </NavigationContainer>
)