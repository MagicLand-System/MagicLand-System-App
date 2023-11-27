import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DocumentScreen from '../screens/DocumentScreen';
import ScanScreen from '../screens/ScanScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';

import CourseScreen from '../screens/CourseScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import ClassScreen from '../screens/ClassScreen';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import ClassRegisterScreen from '../screens/ClassRegisterScreen';
import ClassConfirmScreen from '../screens/ClassConfirmScreen';
import RegisterConfirmScreen from '../screens/RegisterConfirmScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CartScreen from '../screens/CartScreen';
import ChooseVoucherScreen from '../screens/ChooseVoucherScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabNavigator,
                tabBarInactiveTintColor: '#B8B8D2',
                tabBarActiveTintColor: '#83A2FF',
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/home_active_icon.png') : require('./../assets/images/home_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Trang Chủ',
            }} />
            <Tab.Screen name="Document" component={DocumentScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/document_active_icon.png') : require('./../assets/images/document_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Tài liệu',
            }} />
            <Tab.Screen name="Scan" component={ScanScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/scan_active_icon.png') : require('./../assets/images/scan_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Quét QR',
            }} />
            <Tab.Screen name="Schedule" component={ScheduleScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/schedule_active_icon.png') : require('./../assets/images/schedule_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Lịch học',
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/profile_active_icon.png') : require('./../assets/images/profile_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Cá nhân',
            }} />
            <Tab.Screen name="CourseScreen" component={CourseScreen} options={{ tabBarButton: () => null }} />
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
        backgroundColor: '#3A0CA3'
    }
});

