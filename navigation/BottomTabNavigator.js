import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DocumentScreen from '../screens/DocumentScreen';
import ScanScreen from '../screens/ScanScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/home_active_icon.png') : require('./../assets/images/home_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Trang Chủ',
                tabBarInactiveTintColor: '#484C52',
                tabBarActiveTintColor: '#F2C955',
                headerShown: false,
            }} />
            <Tab.Screen name="Document" component={DocumentScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/document_active_icon.png') : require('./../assets/images/document_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Tài liệu',
                tabBarInactiveTintColor: '#484C52',
                tabBarActiveTintColor: '#F2C955',
                headerShown: false,
            }} />
            <Tab.Screen name="Scan" component={ScanScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/scan_active_icon.png') : require('./../assets/images/scan_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Quét QR',
                tabBarInactiveTintColor: '#484C52',
                tabBarActiveTintColor: '#F2C955',
                headerShown: false,
            }} />
            <Tab.Screen name="Schedule" component={ScheduleScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/schedule_active_icon.png') : require('./../assets/images/schedule_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Lịch học',
                tabBarInactiveTintColor: '#484C52',
                tabBarActiveTintColor: '#F2C955',
                headerShown: false,
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/profile_active_icon.png') : require('./../assets/images/profile_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Cá nhân',
                tabBarInactiveTintColor: '#484C52',
                tabBarActiveTintColor: '#F2C955',
                headerShown: false,
            }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabIcon: {
        width: 24,
        height: 24,
    },
});

