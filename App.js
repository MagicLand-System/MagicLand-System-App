import { StyleSheet, Text, View } from 'react-native';
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
      <View style={styles.container}>
        <NavigationContainer>
          {userInfo ? <StackNavigator /> : <StackNavigatorLogin/>}
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
