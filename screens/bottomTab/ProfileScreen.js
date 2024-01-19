import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

export default function ProfileScreen() {

  const dispatch = useDispatch()

  const handleLogout = async () => {
    await signOut(auth)
    await AsyncStorage.removeItem('accessToken')
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