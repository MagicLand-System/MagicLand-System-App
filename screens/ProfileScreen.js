import { View, Text } from 'react-native'
import React from 'react'
import MainButton from '../components/MainButton'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.config'

export default function ProfileScreen() {
  return (
    <View>
      <MainButton onPress={async () => {
        await signOut(auth)
      }} title="Đăng xuất" />
    </View>
  )
}