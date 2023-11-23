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

import AddStudentScreen from '../screens/AddStudentScreen';
import StudentMenuScreen from '../screens/StudentMenuScreen';
import StudentClassScreen from '../screens/StudentClassScreen';

import CourseScreen from '../screens/CourseScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import ClassScreen from '../screens/ClassScreen';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import ClassRegisterScreen from '../screens/ClassRegisterScreen';
import ClassConfirmScreen from '../screens/ClassConfirmScreen';
import RegisterConfirmScreen from '../screens/RegisterConfirmScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useState(null)
    const user = useSelector(userSelector);
    const fetchToken = async () => {
        setLoading(true)
        try {
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
            {user ? (
                <>
                    <Stack.Screen
                        name="Root"
                        component={BottomTabNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="AddStudent" component={AddStudentScreen} options={{ headerTitle: 'Thêm học viên' }} />
                    <Stack.Screen name="StudentMenu" component={StudentMenuScreen} options={{ headerTitle: 'Học viên' }} />
                    <Stack.Screen name="StudentClass" component={StudentClassScreen} options={{ headerTitle: 'Lớp học' }} />

                    <Stack.Screen name="CourseScreen" component={CourseScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ClassScreen" component={ClassScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ClassDetailScreen" component={ClassDetailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ClassRegisterScreen" component={ClassRegisterScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ClassConfirmScreen" component={ClassConfirmScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="RegisterConfirmScreen" component={RegisterConfirmScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
                </>
            ) : (
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