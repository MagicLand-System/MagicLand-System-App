import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selector';

import ProfileScreen from '../screens/bottomTab/ProfileScreen';
import ScanScreen from '../screens/bottomTab/ScanScreen';
import DocumentScreen from '../screens/bottomTab/parent/DocumentScreen';
import ScheduleScreen from '../screens/bottomTab/parent/ScheduleScreen';
import CourseScreen from '../screens/bottomTab/parent/CourseScreen';
import HomeScreen from '../screens/bottomTab/teacher/HomeScreen';
import WorkScheduleScreen from '../screens/bottomTab/teacher/WorkScheduleScreen';
import RateStudentScreen from '../screens/teacher/RateStudentScreen';

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
import ChoosePairScreen from '../screens/parent/ChoosePairScreen';

import AttendanceScreen from '../screens/teacher/AttendanceScreen';
import ClassOptionScreen from '../screens/teacher/ClassOptionScreen';

import StudentHomeScreen from '../screens/bottomTab/student/StudentHomeScreen';
import StudentScoreScreen from '../screens/bottomTab/student/StudentScoreScreen';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { constants } from '../constants/constants';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const activeColor = "#FFC90C"
    const inactiveColor = "#FFFFFF"
    const user = useSelector(userSelector);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabNavigator,
                tabBarInactiveTintColor: inactiveColor,
                tabBarActiveTintColor: activeColor,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={
                    user?.role?.name === 'LECTURER' ?
                        HomeScreen
                        :
                        user?.role?.name === 'PARENT' ?
                            CourseScreen
                            :
                            StudentHomeScreen
                }
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon name={"home-minus"} color={focused ? activeColor : inactiveColor} size={28} />
                    },
                    tabBarLabel: 'Trang Chủ',
                }} />
            {
                user?.role?.name === 'PARENT' &&
                <Tab.Screen name="Document" component={DocumentScreen} options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon name={"school"} color={focused ? activeColor : inactiveColor} size={28} />
                    },
                    tabBarLabel: 'Học Viên',
                }} />
            }
            {
                user?.role?.name === 'PARENT' &&
                <Tab.Screen name="Scan" component={ScanScreen} options={{
                    tabBarIcon: ({ focused }) => {
                        let icon = focused == true ? require('./../assets/images/scan_active_icon.png') : require('./../assets/images/scan_icon.png');
                        return <Image source={icon} style={styles.tabIcon} />
                    },
                    tabBarLabel: 'Quét QR',
                }} />
            }
            <Tab.Screen name="Schedule"
                component={
                    user?.role?.name === 'LECTURER' ?
                        WorkScheduleScreen
                        :
                        user?.role?.name === 'PARENT' ?
                            ScheduleScreen
                            :
                            StudentScoreScreen
                }
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon name={"calendar-month"} color={focused ? activeColor : inactiveColor} size={28} />
                    },
                    tabBarLabel: user?.role?.name === 'LECTURER' ? 'Lịch Làm Việc' : 'Lịch học',
                }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => {
                    return <Icon name={"account"} color={focused ? activeColor : inactiveColor} size={28} />
                },
                tabBarLabel: 'Tài Khoản',
            }} />
            <Tab.Screen name="CourseDetailScreen" component={CourseDetailScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassScreen" component={ClassScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassDetailScreen" component={ClassDetailScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassRegisterScreen" component={ClassRegisterScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassConfirmScreen" component={ClassConfirmScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="RegisterConfirmScreen" component={RegisterConfirmScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="PaymentScreen" component={PaymentScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="CartScreen" component={CartScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ChooseVoucherScreen" component={ChooseVoucherScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="RegisterClassScreen" component={RegisterClassScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="MultiplePaymentScreen" component={MultiplePaymentScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassStudyDetailScreen" component={ClassStudyDetailScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassContentScreen" component={ClassContentScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="MutilpleChoiceScreen" component={MutilpleChoiceScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ChoosePairScreen" component={ChoosePairScreen} options={{ tabBarButton: () => null }} />

            <Tab.Screen name="AttendanceScreen" component={AttendanceScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassOptionScreen" component={ClassOptionScreen} options={{ tabBarButton: () => null }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabIcon: {
        width: 24,
        height: 24,
    },
    tabNavigator: {
        paddingTop: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: constants.background
    }
});

