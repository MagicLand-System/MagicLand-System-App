import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeUser } from '../../store/features/authSlice';
import { useDispatch } from 'react-redux';

export default function ProfileScreen() {

  const dispatch = useDispatch()

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken')
      .then(dispatch(removeUser())) 
  }

  return (
    <View>
      <Text>ProfileScreen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>
          Đăng xuất
        </Text>
      </TouchableOpacity>

    </View>
  )
}