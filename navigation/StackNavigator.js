import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userSelector } from '../store/selector';
import StartedScreen from '../screens/StartedScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FillInfoScreen from '../screens/FillInfoScreen';
import { fetchUser } from '../store/features/authSlice';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const [accessToken, setAccessToken] = useState('')
    const fetchToken = async () => {
        try {
            setLoading(true)
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                setAccessToken(accessToken)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useState(() => { fetchToken() }, [])
    useEffect(() => {
        if (accessToken) {
            dispatch(fetchUser())
        }
    }, [accessToken])
    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    return (
        //Screen màn hình chính
        <Stack.Navigator initialRouteName='Started'>
            {user ? (<Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />) : (
                <>
                    <Stack.Screen name="Started" component={StartedScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="FillInfo" component={FillInfoScreen} options={{ headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
    )
}
export default StackNavigator;