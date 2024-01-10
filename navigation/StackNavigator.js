import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userSelector } from '../store/selector';
import { fetchUser } from '../store/features/authSlice';
import { ActivityIndicator, View } from 'react-native';

import StartedScreen from '../screens/StartedScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FillInfoScreen from '../screens/FillInfoScreen';

import CourseScreen from '../screens/bottomTab/parent/CourseScreen';
import HomeScreen from '../screens/bottomTab/teacher/HomeScreen';
import WorkScheduleScreen from '../screens/bottomTab/teacher/WorkScheduleScreen';
import RateStudentScreen from '../screens/bottomTab/teacher/RateStudentScreen';

import AddStudentScreen from '../screens/parent/AddStudentScreen';
import CourseDetailScreen from '../screens/parent/CourseDetailScreen';
import ClassScreen from '../screens/parent/ClassScreen';
import ClassDetailScreen from '../screens/parent/ClassDetailScreen';
import ClassRegisterScreen from '../screens/parent/ClassRegisterScreen';
import ClassConfirmScreen from '../screens/parent/ClassConfirmScreen';
import RegisterConfirmScreen from '../screens/parent/RegisterConfirmScreen';
import PaymentScreen from '../screens/parent/PaymentScreen';
import CartScreen from '../screens/parent/CartScreen';
import ChooseVoucherScreen from '../screens/parent/ChooseVoucherScreen';
import TransactionDetailScreen from '../screens/parent/TransactionDetailScreen';
import RegisterClassScreen from '../screens/parent/RegisterClassScreen';
import MultiplePaymentScreen from '../screens/parent/MultiplePaymentScreen';
import ClassStudyDetailScreen from '../screens/parent/ClassStudyDetailScreen';
import ClassContentScreen from '../screens/parent/ClassContentScreen';
import MutilpleChoiceScreen from '../screens/parent/MutilpleChoiceScreen';

import AttendanceScreen from '../screens/teacher/AttendanceScreen';
import LoadingModal from '../components/LoadingModal';

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
    return (
        <>
            {loading && <LoadingModal />}
            <Stack.Navigator initialRouteName='Started'>
                {user?.role.name === 'PARENT' ? (
                    <>
                        {/* Parent */}
                        <Stack.Screen
                            name="Root"
                            component={BottomTabNavigator}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="AddStudent" component={AddStudentScreen} options={{ headerTitle: 'Thêm bé' }} />

                        <Stack.Screen name="CourseScreen" component={CourseScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ClassScreen" component={ClassScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ClassDetailScreen" component={ClassDetailScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ClassRegisterScreen" component={ClassRegisterScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ClassConfirmScreen" component={ClassConfirmScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="RegisterConfirmScreen" component={RegisterConfirmScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ChooseVoucherScreen" component={ChooseVoucherScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="RegisterClassScreen" component={RegisterClassScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MultiplePaymentScreen" component={MultiplePaymentScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ClassStudyDetailScreen" component={ClassStudyDetailScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ClassContentScreen" component={ClassContentScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MutilpleChoiceScreen" component={MutilpleChoiceScreen} options={{ headerShown: false }} />
                    </>
                ) : user?.role.name === 'LECTURER' ? (
                    <>
                        {/* Teacher */}
                        <Stack.Screen
                            name="Root"
                            component={BottomTabNavigator}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="WorkScheduleScreen" component={WorkScheduleScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="RateStudentScreen" component={RateStudentScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} options={{ headerShown: false }} />

                    </>
                ) : (
                    <>
                        {/* Unlogin */}
                        <Stack.Screen name="Started" component={StartedScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="FillInfo" component={FillInfoScreen} options={{ headerShown: false }} />
                    </>
                )
                }
            </Stack.Navigator >
        </>
    )
}

export default StackNavigator;