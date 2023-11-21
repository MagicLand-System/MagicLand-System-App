import { View, Text } from 'react-native'
import React from 'react'
import MainButton from '../components/MainButton'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { removeUser } from '../store/features/authSlice'

export default function ProfileScreen() {
  const dispatch = useDispatch()
  return (
    <View>
      <MainButton onPress={async () => {
        await signOut(auth)
        await AsyncStorage.removeItem('accessToken')
        dispatch(removeUser())
      }} title="Đăng xuất" />
    </View>
  )
}