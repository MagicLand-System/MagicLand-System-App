import { View, Text, Image, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from 'react'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CheckBox } from "@rneui/themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import MainButton from "../../components/MainButton";
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { addStudent } from "../../api/student";
import { fetchUser } from "../../store/features/authSlice";
import { Icon, Button } from "@rneui/themed";
import { storage } from "../../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { format } from 'date-fns';
import LoadingModal from "../../components/LoadingModal"
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function AddStudentScreen() {
    const navigation = useNavigation()
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Baloo2_700Bold,
    })
    const dispatch = useDispatch()
    const [isShowDatePicker, setShowDatePicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(new Date().getFullYear() - 3, new Date().getMonth(), new Date().getDate()))
    const [gender, setGender] = useState('Khác')
    const [imageError, setImageError] = useState(null)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        if (!result.canceled) {
            try {
                const base64Data = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                const data = await callGoogleVisionAsync(base64Data)
                const faces = data.responses[0].faceAnnotations
                if (faces && faces.length === 1) {
                    setImageError(null)
                    setImage(result.assets[0].uri)
                } else if (faces && faces.length > 0) {
                    setImageError("Vui lòng chỉ chọn hình của một mình bé")
                    setLoading(false);
                } else {
                    setImageError("Vui lòng chọn hình rõ mặt bé")
                    setLoading(false);
                }
            } catch (error) {
                console.log(error)
                setImageError("Vui lòng chọn hình ảnh khác")
                setLoading(false);
            }
            setImage(result.assets[0].uri)
        }
    }
    const registerValidationSchema = Yup.object().shape({
        fullName: Yup.string().required("Vui lòng nhập họ và tên").matches(/(\w.+\s).+/, 'Vui lòng nhập ít nhất 2 từ')
    })
    if (!fontsLoaded) {
        return null
    }
    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            {loading && (<LoadingModal />)}
            <Formik
                initialValues={{
                    fullName: '',
                }}
                onSubmit={async values => {
                    setLoading(true)
                    try {
                        if (image) {
                            const { uri } = await FileSystem.getInfoAsync(image);
                            const blob = await new Promise((resolve, reject) => {
                                const xhr = new XMLHttpRequest();
                                xhr.onload = () => {
                                    resolve(xhr.response)
                                };
                                xhr.onerror = (e) => {
                                    reject(new TypeError('Network request failed'))
                                };
                                xhr.responseType = 'blob';
                                xhr.open('GET', uri, true);
                                xhr.send(null);
                            })
                            const filename = image.substring(image.lastIndexOf('/') + 1);
                            const imageRef = ref(storage, `childrens/${filename}`)
                            uploadBytes(imageRef, blob).then(() => {
                                getDownloadURL(imageRef).then((url) => {
                                    addStudent({ ...values, gender, dateOfBirth: dateOfBirth.toISOString(), avatarImage: url })
                                        .then(dispatch(fetchUser()))
                                        .then(setLoading(false))
                                        .then(Alert.alert("Đăng kí thành công"))
                                        .then(navigation.goBack())
                                })
                            })
                        } else {
                            setImageError("Hãy cung cấp hình ảnh học viên")
                        }
                    } catch (e) {
                        console.log(e)
                        setLoading(false)
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
                        <Image style={{ width: 180, height: 180 }} source={image ? { uri: image } : require('../../assets/images/empty_avatar.png')}></Image>
                        <View style={{ height: 25, width: '75%', justifyContent: 'center' }}>
                            {imageError &&
                                <Text style={{ fontSize: 12, color: 'red' }}>{imageError}</Text>
                            }
                        </View>
                        <Button radius={"xl"} type="solid" onPress={pickImage} containerStyle={{
                            width: 200,
                            marginBottom: 10
                        }}
                            buttonStyle={{ backgroundColor: '#F2C955' }}
                            titleStyle={{ color: 'black', marginHorizontal: 20 }}>
                            Tải hình lên
                            <Icon name="cloud-upload" color="black" />
                        </Button>
                        <View style={styles.input}>
                            <Text style={styles.inputTitle}> <Text style={{ color: 'red' }}>* </Text>Họ và tên</Text>
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
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputTitle}> <Text style={{ color: 'red' }}>* </Text>Ngày sinh</Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                                <Text style={styles.dateText}>{format(dateOfBirth, 'dd/MM/yyyy')}</Text>
                            </TouchableOpacity>
                            {isShowDatePicker && (
                                <DateTimePicker
                                    value={dateOfBirth}
                                    maximumDate={new Date(new Date().getFullYear() - 3, new Date().getMonth(), new Date().getDate())}
                                    onChange={(event, selectedDate) => {
                                        setShowDatePicker(false)
                                        setDateOfBirth(selectedDate)
                                    }}
                                    mode='date'
                                />
                            )}
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputTitle}> <Text style={{ color: 'red' }}>* </Text>Giới tính</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox
                                        checked={gender === 'Nữ'}
                                        onPress={() => setGender('Nữ')}
                                        iconType="material-community"
                                        checkedIcon="radiobox-marked"
                                        uncheckedIcon="radiobox-blank"
                                    />
                                    <Text style={{ fontSize: 15, fontFamily: 'Inter_400Regular' }}>Nữ</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox
                                        checked={gender === 'Nam'}
                                        onPress={() => setGender('Nam')}
                                        iconType="material-community"
                                        checkedIcon="radiobox-marked"
                                        uncheckedIcon="radiobox-blank"
                                    />
                                    <Text style={{ fontSize: 15, fontFamily: 'Inter_400Regular' }}>Nam</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox
                                        checked={gender === 'Khác'}
                                        onPress={() => setGender('Khác')}
                                        iconType="material-community"
                                        checkedIcon="radiobox-marked"
                                        uncheckedIcon="radiobox-blank"
                                    />
                                    <Text style={{ fontSize: 15, fontFamily: 'Inter_400Regular', marginRight: 20 }}>Khác</Text>
                                </View>
                            </View>
                        </View>
                        <MainButton onPress={handleSubmit} title="Xác nhận" />
                    </>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        width: '75%'
    },
    inputTitle: {
        fontFamily: 'Inter_400Regular',
        marginBottom: 5,
        fontSize: 14,
    },
    textInput: {
        height: 40,
        borderColor: '#3A0CA3',
        borderStyle: 'solid',
        borderWidth: 0.5,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        borderRadius: 5,
        paddingLeft: 10,
    },
    dateInput: {
        height: 40,
        borderColor: '#3A0CA3',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingLeft: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 14,
    },
    dateText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
})