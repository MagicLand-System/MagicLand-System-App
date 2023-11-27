import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
// import { store } from './store/store';
import StackNavigator from './navigation/StackNavigator';
import StackNavigatorLogin from './navigation/StackNavigatorLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function App() {
  const [userInfo, setUserInfo] = useState(true)
  return (
    // <Provider store={store}>
    <>
      <SafeAreaView style={styles.unsafe} />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          {userInfo ? <StackNavigator /> : <StackNavigatorLogin />}
        </NavigationContainer>
      </SafeAreaView>
    </>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A0CA3',
  },
  unsafe: {
    flex: 0,
    backgroundColor: '#000000'
  }
});
