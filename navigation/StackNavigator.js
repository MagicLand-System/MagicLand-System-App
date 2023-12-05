import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator'
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
import RegisterClassScreen from '../screens/RegisterClassScreen';
import MultipleRegisScreen from '../screens/MultipleRegisScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        //Screen màn hình chính
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
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
            <Stack.Screen name="MultipleRegisScreen" component={MultipleRegisScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
export default StackNavigator;