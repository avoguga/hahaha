import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Guguinha from '../screens/guguinha';
import Home from '../screens/home';
import Login from '../screens/login';


export type NavegacaoPrincipalParams = {
    login: undefined,
    home: {user:string},
    gugas: {user:string},

}

const Stack = createStackNavigator<NavegacaoPrincipalParams>();

export const NavegacaoPrincipal = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={Login}/>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="gugas" component={Guguinha} />
        </Stack.Navigator>
    </NavigationContainer>
)