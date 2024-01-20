import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import { PhoneAuthProvider, signInWithCredential, } from "firebase/auth";
import { auth, firebaseConfig } from "../firebase.config"
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import MainButton from "../components/MainButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from 'react-native-phone-input'
import OTPTextInput from 'react-native-otp-textinput'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authUser, checkExist } from "../api/auth";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/features/authSlice";
import LoadingModal from "../components/LoadingModal";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function LoginScreen() {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [otp, setOtp] = useState('');

  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Baloo2_700Bold,
  })
  const dispatch = useDispatch()

  const login = async () => {
    try {
      setErrorMessage('')
      setLoading(true)
      const response = await checkExist({ phone: phoneNumber })
      if (response.status === 200) {
        // const phoneProvider = new PhoneAuthProvider(auth);
        // const verificationId = await phoneProvider.verifyPhoneNumber(
        //   phoneNumber,
        //   recaptchaVerifier.current
        // );
        // setVerificationId(verificationId)

        const data = await authUser({ phone: phoneNumber })
        const accessToken = data.accessToken;
        await AsyncStorage.setItem('accessToken', accessToken)
          .then(dispatch(fetchUser()))
          .then(setLoading(false))
          .then(Alert.alert('Đăng nhập thành công'))

        setLoading(false)
        setErrorMessage('')
        // setShowOtp(true)


      }
    } catch (error) {
      console.error(error);
      setLoading(false)
      if (error.response?.status === 404) {
        setErrorMessage("Tài khoản của bạn không tồn tại, hãy đăng kí để tiếp tục");
      }
    }
  };

  const verifyOtp = async () => {
    try {
      setErrorMessage('')
      setLoading(true)
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      const data = await authUser({ phone: phoneNumber })
      const accessToken = data.accessToken;
      await AsyncStorage.setItem('accessToken', accessToken)
        .then(dispatch(fetchUser()))
        .then(setLoading(false))
        .then(Alert.alert('Đăng nhập thành công'))
    } catch (error) {
      console.log(error)
      setErrorMessage("Xác thực OTP không thành công")
      setLoading(false)
    }
  };

  if (!fontsLoaded) {
    return null
  }
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {loading && (<LoadingModal />)}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      {!showOtp ? (
        <>
          <Text style={styles.title}>Đăng nhập</Text>
          <PhoneInput
            initialCountry={'vn'}
            style={styles.textInput}
            onChangePhoneNumber={setPhoneNumber}
            textProps={{
              placeholder: 'Nhập số điện thoại'
            }}
            textStyle={styles.textInputStyle}
            flagStyle={{ width: 50, height: 30 }}
          />
          <View style={styles.buttonView}>
            {phoneNumber === '' ? (
              <MainButton onPress={login} title="Gửi OTP" disabled={true} />
            ) : (
              <MainButton onPress={login} title="Gửi OTP" />
            )}
            <View style={styles.navigationView}>
              <Text style={styles.navigationText}>Chưa có tài khoản</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.navigationButtonText}>Đăng kí ngay</Text>
              </TouchableOpacity>
            </View>
            {errorMessage !== '' && (
              <View style={styles.errorMessage}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Xác thực OTP</Text>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, margin: 20, marginBottom: 40 }}>Chúng tôi đã gửi một mã xác thực đến số điện thoại {phoneNumber.substring(0, 6)}*****:</Text>
          <OTPTextInput
            handleTextChange={setOtp}
            keyboardType="number-pad"
            inputCount={6}
            tintColor='#f2c955'
            textInputStyle={styles.otpInput}
            autoFocus={true}
          />
          <View style={styles.navigationView}>
            <Text style={styles.navigationText}>Chưa nhận được mã</Text>
            <TouchableOpacity
              onPress={login}
            >
              <Text style={styles.navigationButtonText}>Gửi lại</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            {otp.length < 6 ? (
              <MainButton onPress={verifyOtp} title="Xác thực" disabled={true} />
            ) : (
              <MainButton onPress={verifyOtp} title="Xác thực" />
            )}
            {errorMessage !== '' && (
              <View style={styles.errorMessage}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}
          </View>
        </>
      )}
      <View style={styles.logoView}>
        <Image source={require('./../assets/images/logo.png')} style={styles.logo} />
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    color: '#3A0CA3',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: "Baloo2_700Bold",
    marginBottom: 80,
    marginTop: 80,
  },
  textInput: {
    padding: 5,
    borderColor: '#3A0CA3',
    borderStyle: 'solid',
    borderWidth: 0.5,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40,
  },
  textInputStyle: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  buttonView: {
    minHeight: 200,
  },
  errorMessage: {
    borderColor: '#ffccc7',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff2f0',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
  },
  logoView: {
    position: 'absolute',
    bottom: 60,
  },
  logo: {
    alignSelf: 'center',
    width: 120,
    height: 120,
  },
  navigationView: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigationText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  navigationButtonText: {
    paddingLeft: 8,
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#f2c955',
    textDecorationLine: 'underline',
  }
})