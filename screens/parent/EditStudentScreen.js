import { View, Text, Image, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react'
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
import { addStudent, updateStudent } from "../../api/student";
import { fetchUser } from "../../store/features/authSlice";
import { Icon, Button } from "@rneui/themed";
import { storage } from "../../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { format } from 'date-fns';
import LoadingModal from "../../components/LoadingModal"
import { useNavigation } from "@react-navigation/native";
import { callGoogleVisionAsync } from "../../api/google";
import SpinnerLoading from "../../components/SpinnerLoading";
import Header from "../../components/header/Header";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function EditStudentScreen({ route, navigation }) {

    const [studentDetail, setStudentDetail] = useState({
        image: "",
        fullName: route?.params?.studentDetail?.fullName,
        dateOfBirth: new Date(
            new Date(route?.params?.studentDetail?.dateOfBirth).getFullYear(),
            new Date(route?.params?.studentDetail?.dateOfBirth).getMonth(),
            new Date(route?.params?.studentDetail?.dateOfBirth).getDate()
        ),
        gender: route?.params?.studentDetail?.gender,
    })
    const [loading, setLoading] = useState(false)
    const [selectImageLoading, setSelectImageLoading] = useState(false)
    const [isShowDatePicker, setShowDatePicker] = useState(false);
    const [imageError, setImageError] = useState(null)

    // useEffect(() => {
    //     loadImage(route?.params?.studentDetail?.avatarImage)
    // }, [route?.params?.studentDetail])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        if (!result.canceled) {
            try {
                setSelectImageLoading(true)
                const base64Data = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                const data = await callGoogleVisionAsync(base64Data)
                const faces = data.responses[0].faceAnnotations
                if (faces && faces.length === 1) {
                    setImageError(null)
                    setStudentDetail({ ...studentDetail, image: result.assets[0].uri })
                } else if (faces && faces.length > 0) {
                    setImageError("Vui lòng chỉ chọn hình của một mình bé")
                    setLoading(false);
                } else {
                    setImageError("Vui lòng chọn hình rõ mặt bé")
                    setLoading(false);
                }
                setSelectImageLoading(false)
            } catch (error) {
                console.log(error)
                setImageError("Vui lòng chọn hình ảnh khác")
                setSelectImageLoading(false)
                setLoading(false);
            }
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        let data = {}
        if (studentDetail.image) {
            const { uri } = await FileSystem.getInfoAsync(studentDetail?.image);
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
            const filename = studentDetail?.image.substring(studentDetail?.image.lastIndexOf('/') + 1);
            const imageRef = ref(storage, `childrens/${filename}`)
            try {
                await uploadBytes(imageRef, blob).then(() => {
                    getDownloadURL(imageRef).then(async (url) => {

                        const response = await updateStudent({
                            fullName: studentDetail?.fullName,
                            dateOfBirth: studentDetail?.dateOfBirth?.toISOString(),
                            avatarImage: url,
                            student: route?.params?.studentDetail,
                            fullName: studentDetail?.fullName,
                            gender: studentDetail?.gender,
                        })
                        if (response.status === 200) {
                            console.log("update successfull");
                            navigation.pop()
                        } else {
                            console.log(response?.response?.data);
                        }
                    })
                })
            } catch (error) {
                console.error("Error during image upload or URL retrieval:", error);
            }
        } else {
            data = {
                student: route?.params?.studentDetail,
                fullName: studentDetail?.fullName,
                dateOfBirth: studentDetail?.dateOfBirth,
                gender: studentDetail?.gender,
            }
            const response = await updateStudent({ ...data })
            if (response.status === 200) {
                console.log("update successfull");
                navigation.pop()
            } else {
                console.log(response?.response?.data);
            }
        }
        setLoading(false);
    }

    return (
        <>
            {loading && (<LoadingModal />)}
            <Header navigation={navigation} goback={() => navigation.pop()} title={"Thay đổi thông tin học sinh"} />
            <View style={styles.container}>
                {/* {loading && (<SpinnerLoading />)} */}
                <Image style={{ width: 180, height: 180 }} source={studentDetail.image ?
                    { uri: studentDetail.image }
                    : route?.params?.studentDetail?.avatarImage ?
                        { uri: route?.params?.studentDetail?.avatarImage }
                        :
                        require('../../assets/images/empty_avatar.png')} />
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
                        value={studentDetail.fullName}
                        onChangeText={(text) => { setStudentDetail({ ...studentDetail, fullName: text }) }}
                        // onBlur={handleBlur('fullName')}
                        style={styles.textInput}
                    />
                    {/* <View style={{ height: 25, width: '75%', justifyContent: 'center' }}>
                        {errors.fullName && touched.fullName &&
                            <Text style={{ fontSize: 12, color: 'red' }}>{errors.fullName}</Text>
                        }
                    </View> */}
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputTitle}> <Text style={{ color: 'red' }}>* </Text>Ngày sinh</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                        <Text style={styles.dateText}>{format(studentDetail.dateOfBirth, 'dd/MM/yyyy')}</Text>
                    </TouchableOpacity>
                    {isShowDatePicker && (
                        <DateTimePicker
                            value={studentDetail.dateOfBirth}
                            maximumDate={new Date(new Date().getFullYear() - 3, new Date().getMonth(), new Date().getDate())}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false)
                                setStudentDetail({ ...studentDetail, dateOfBirth: selectedDate })
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
                                checked={studentDetail.gender === 'Nữ'}
                                onPress={() => setStudentDetail({ ...studentDetail, gender: 'Nữ' })}
                                iconType="material-community"
                                checkedIcon="radiobox-marked"
                                uncheckedIcon="radiobox-blank"
                            />
                            <Text style={{ fontSize: 15, fontFamily: 'Inter_400Regular' }}>Nữ</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                checked={studentDetail.gender === 'Nam'}
                                onPress={() => setStudentDetail({ ...studentDetail, gender: 'Nam' })}
                                iconType="material-community"
                                checkedIcon="radiobox-marked"
                                uncheckedIcon="radiobox-blank"
                            />
                            <Text style={{ fontSize: 15, fontFamily: 'Inter_400Regular' }}>Nam</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                checked={studentDetail.gender === 'Khác'}
                                onPress={() => setStudentDetail({ ...studentDetail, gender: 'Khác' })}
                                iconType="material-community"
                                checkedIcon="radiobox-marked"
                                uncheckedIcon="radiobox-blank"
                            />
                            <Text style={{ fontSize: 15, fontFamily: 'Inter_400Regular', marginRight: 20 }}>Khác</Text>
                        </View>
                    </View>
                </View>
                {
                    selectImageLoading ?
                        <MainButton onPress={() => { console.log("Đang tải ảnh") }} title="Đang tải ảnh..." />
                        :
                        <MainButton onPress={handleSubmit} title="Xác nhận" />
                }
            </View>
        </>
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
