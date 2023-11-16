import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartedScreen from '../screens/StartedScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OTPLoginScreen from '../screens/OTPLoginScreen';
import OTPRegisterScreen from '../screens/OTPRegisterScreen';
import FillInfoScreen from '../screens/FillInfoScreen';

const Stack = createNativeStackNavigator();
const StackNavigatorLogin = () => {
    return (
        <Stack.Navigator initialRouteName="Started">
            <Stack.Screen name="Started" component={StartedScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OTPLogin" component={OTPLoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OTPRegister" component={OTPRegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FillInfo" component={FillInfoScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
export default StackNavigatorLogin;