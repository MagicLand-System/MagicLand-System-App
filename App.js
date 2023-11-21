import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
import StackNavigator from './navigation/StackNavigator';
import StackNavigatorLogin from './navigation/StackNavigatorLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';
import { getCurrentUser } from './api/user';


export default function App() {
  const [userInfo, setUserInfo] = useState(false)
  const [loading, setLoading] = useState(false)
  const checkLocal = async () => {
    try {
      setLoading(true)
      const accessToken = await AsyncStorage.getItem("accessToken")
      if (accessToken) {
        const data = await getCurrentUser();
        await AsyncStorage.setItem("user", JSON.stringify(data))
        setUserInfo(data)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    checkLocal()
  }, [])
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"large"} />
      </View>
    )
  }
  return (
    // <Provider store={store}>
    <View style={styles.container}>
      <NavigationContainer>
        {userInfo ? <StackNavigator /> : <StackNavigatorLogin />}
      </NavigationContainer>
    </View>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
