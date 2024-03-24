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
import RateStudentScreen from '../screens/teacher/RateStudentScreen';

import AddStudentScreen from '../screens/parent/AddStudentScreen';
import StudentMenuScreen from '../screens/parent/StudentMenuScreen';
import StudentClassScreen from '../screens/parent/StudentClassScreen';
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
import RechargeScreen from '../screens/parent/RechargeScreen';
import TransactionWalletScreen from '../screens/parent/TransactionWalletScreen';
import TransactionHistoryScreen from '../screens/parent/TransactionHistoryScreen';
import TransactionDetailSceen from '../screens/parent/TransactionDetailSceen';
import AccountSettingScreen from '../screens/parent/AccountSettingScreen';
import StudentListScreen from '../screens/parent/StudentListScreen';
import StudentDetailScreen from '../screens/parent/StudentDetailScreen';
import EditStudentScreen from '../screens/parent/EditStudentScreen';
import ChoosePairScreen from '../screens/parent/ChoosePairScreen';

import StudentHomeScreen from '../screens/bottomTab/student/StudentHomeScreen';
import StudentScoreScreen from '../screens/bottomTab/student/StudentScoreScreen';
import CourseSyllabus from '../screens/student/CourseSyllabus';
import QuizDetailScreen from '../screens/student/QuizDetailScreen';

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
            {user?.role?.name === 'PARENT' ? (
                <>
                    {/* Parent */}
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
                    <Stack.Screen name="ChooseVoucherScreen" component={ChooseVoucherScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="RegisterClassScreen" component={RegisterClassScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MultiplePaymentScreen" component={MultiplePaymentScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ClassStudyDetailScreen" component={ClassStudyDetailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ClassContentScreen" component={ClassContentScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="RechargeScreen" component={RechargeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="TransactionWalletScreen" component={TransactionWalletScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="TransactionDetailSceen" component={TransactionDetailSceen} options={{ headerShown: false }} />
                    <Stack.Screen name="AccountSettingScreen" component={AccountSettingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="StudentListScreen" component={StudentListScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="StudentDetailScreen" component={StudentDetailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="EditStudentScreen" component={EditStudentScreen} options={{ headerShown: false }} />
                </>
            ) : user?.role?.name === 'STUDENT' ? (
                <>
                    <Stack.Screen
                        name="Root"
                        component={BottomTabNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="StudentHomeScreen" component={StudentHomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="StudentScoreScreen" component={StudentScoreScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CourseSyllabus" component={CourseSyllabus} options={{ headerShown: false }} />
                    <Stack.Screen name="QuizDetailScreen" component={QuizDetailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MutilpleChoiceScreen" component={MutilpleChoiceScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ChoosePairScreen" component={ChoosePairScreen} options={{ headerShown: false }} />
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
    )
}

export default StackNavigator;