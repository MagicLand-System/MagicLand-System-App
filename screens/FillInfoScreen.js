import { View, Text, Image, TextInput, StyleSheet, Alert, ActivityIndicator, Button, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import MainButton from "../components/MainButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { register } from "../api/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CheckBox } from "@rneui/themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";

export default function FillInfoScreen() {
  const routes = useRoute();
  const phone = routes.params?.phone;

  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Baloo2_700Bold,
  })
  const [dateOfBirth, setDateOfBirth] = useState(new Date(new Date().getFullYear() - 3, new Date().getMonth(), new Date().getDate()))
  const [gender, setGender] = useState('Khác')

  if (!fontsLoaded) {
    return null
  }
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"large"} />
      </View>
    )
  }
  const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập họ và tên").matches(/(\w.+\s).+/, 'Vui lòng nhập ít nhất 2 từ'),
    email: Yup.string().email("Vui lòng nhập đúng email").required("Vui lòng nhập email"),
    city: Yup.string().required("Vui lòng nhập địa chỉ"),
    district: Yup.string().required("Vui lòng nhập địa chỉ"),
    street: Yup.string().required("Vui lòng nhập địa chỉ"),
  })
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          city: '',
          district: '',
          street: '',
        }}
        onSubmit={async values => {
          setLoading(true)
          const data = await register({ ...values, phone, gender, dateOfBirth: dateOfBirth.toISOString() })
          if (data) {
            setLoading(true)
            alert("Đăng kí thành công")
            navigation.navigate('Login')
          }
        }}
        validationSchema={registerValidationSchema}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <Text style={styles.title}>Thông tin</Text>
            <TextInput
              placeholder="Họ và tên"
              name='fullName'
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              style={styles.textInput}
            />
            <View style={{ height: 25, width: '75%', justifyContent: 'center' }}>
              {errors.fullName && touched.fullName &&
                <Text style={{ fontSize: 12, color: 'red' }}>{errors.fullName}</Text>
              }
            </View>
            <TextInput
              placeholder="Email"
              name='email'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              style={styles.textInput}
              keyboardType="email-address"
            />
            <View style={{ height: 25, width: '75%', justifyContent: 'center' }}>
              {errors.email && touched.email &&
                <Text style={{ fontSize: 12, color: 'red' }}>{errors.email}</Text>
              }
            </View>
            <View style={{ width: '75%', marginTop: 0 }}>
              <Text style={{ width: '100%', color: '#c0c0c0', fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 5 }}>Ngày sinh</Text>
              <View style={{width: '100%', alignItems: 'center', paddingTop: 5, marginBottom: 5}}>
                <DateTimePicker
                  value={dateOfBirth}
                  maximumDate={new Date(new Date().getFullYear() - 3, new Date().getMonth(), new Date().getDate())}
                  onChange={(event, selectedDate) => {
                    setDateOfBirth(selectedDate)
                  }}
                  mode='date'
                />
              </View>
            </View>
            <Text style={{ width: '75%', color: '#c0c0c0', fontSize: 16, fontFamily: 'Inter_400Regular', marginTop: 10 }}>Giới tính</Text>
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  checked={gender === 'Nữ'}
                  onPress={() => setGender('Nữ')}
                  iconType="material-community"
                  checkedIcon="radiobox-marked"
                  uncheckedIcon="radiobox-blank"
                />
                <Text style={{ fontSize: 16, fontFamily: 'Inter_400Regular' }}>Nữ</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  checked={gender === 'Nam'}
                  onPress={() => setGender('Nam')}
                  iconType="material-community"
                  checkedIcon="radiobox-marked"
                  uncheckedIcon="radiobox-blank"
                />
                <Text style={{ fontSize: 16, fontFamily: 'Inter_400Regular' }}>Nam</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  checked={gender === 'Khác'}
                  onPress={() => setGender('Khác')}
                  iconType="material-community"
                  checkedIcon="radiobox-marked"
                  uncheckedIcon="radiobox-blank"
                />
                <Text style={{ fontSize: 16, fontFamily: 'Inter_400Regular', marginRight: 20 }}>Khác</Text>
              </View>
            </View>
            <TextInput
              placeholder="Thành phố"
              name='city'
              value={values.city}
              onBlur={handleBlur('city')}
              onChangeText={handleChange('city')}
              style={styles.textInput}
            />
            <View style={{ height: 25, width: '75%', justifyContent: 'center' }}>
              {errors.city && touched.city &&
                <Text style={{ fontSize: 12, color: 'red' }}>{errors.city}</Text>
              }
            </View>
            <TextInput
              placeholder="Quận / Huyện"
              name='district'
              value={values.district}
              onBlur={handleBlur('district')}
              onChangeText={handleChange('district')}
              style={styles.textInput}
            />
            <View style={{ height: 25, width: '75%', justifyContent: 'center' }}>
              {errors.district && touched.district &&
                <Text style={{ fontSize: 12, color: 'red' }}>{errors.district}</Text>
              }
            </View>
            <TextInput
              placeholder="Số nhà - Tên Đường"
              name='street'
              value={values.street}
              onBlur={handleBlur('street')}
              onChangeText={handleChange('street')}
              style={styles.textInput}
            />
            <View style={{ height: 25, width: '75%', justifyContent: 'center' }}>
              {errors.street && touched.street &&
                <Text style={{ fontSize: 12, color: 'red' }}>{errors.street}</Text>
              }
            </View>
            <MainButton onPress={handleSubmit} disabled={!isValid} title="Xác nhận" />
          </>
        )}
      </Formik>
      <Image source={require('./../assets/images/logo.png')} style={styles.logo} />
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    color: '#3A0CA3',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: "Baloo2_700Bold",
    marginBottom: 40,
    marginTop: 100,
  },
  textInput: {
    width: '75%',
    height: 40,
    borderColor: '#3A0CA3',
    borderStyle: 'solid',
    borderWidth: 0.5,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    borderRadius: 5,
    paddingLeft: 10,
  },
  logo: {
    marginTop: 20,
    alignSelf: 'center',
    width: 120,
    height: 120,
  },
})