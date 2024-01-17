import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from 'react'

import Header from '../../components/header/Header';
import { formatPrice } from '../../util/util';
import InputOtpModal from '../../components/modal/InputOtpModal';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function TransactionWalletScreen({ route, navigation }) {

    const paymentMethod = route.params.paymentMethod
    const price = route.params.price
    const [modalVisible, setModalVisible] = useState({ otp: false, notifi: false })

    const hanldeCloseOtpModal = () => {
        setModalVisible({ ...modalVisible, otp: false })

    }

    const handleSubmitOtp = async (otp) => {
        // classDetail?.map(async (classItem) => {
        //     const response = await modifyCart(studentList.map(item => item.id), classItem.id)
        //     if (response?.status === 200) {
        //         console.log(`Đã đăng ký ${studentList.map(item => item.fullName)} vào lớp ${classItem.name}`);
        //         setModalVisible({ ...modalVisible, otp: false, notifi: true })
        //     } else {
        //         console.log(`Đăng ký ${studentList.map(item => item.fullName)} vào lớp ${classItem.name} thất bại`);
        //     }
        // })
        hanldeCloseOtpModal()
        navigation.push("TransactionDetailScreen", { total: price, lable: "+", handleClose: true })
    }

    return (
        <View style={styles.container}>
            <View style={styles.safeArea} />
            <Header navigation={navigation} background={"#241468"} goback={navigation.pop} title={"Nạp Tiền"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.paymentMethodList}>
                <View style={styles.priceInput}>
                    <View style={styles.flexDirectionBetween}>
                        <Text style={{ ...styles.boldText, color: "#888888" }}>Loại dịch vụ:</Text>
                        <Text style={{ ...styles.boldText, color: "#241468" }}>Nạp tiền vào {paymentMethod.name}</Text>
                    </View>
                    <View style={styles.flexDirectionBetween}>
                        <Text style={{ ...styles.boldText, color: "#888888" }}>Phương thức thanh toán:</Text>
                        <Text style={{ ...styles.boldText, color: "#241468" }}>VN Pay</Text>
                    </View>
                    <View style={styles.flexDirectionBetween}>
                        <Text style={{ ...styles.boldText, color: "#888888" }}>Số tiền:</Text>
                        <Text style={{ ...styles.boldText, color: "#241468" }}>{formatPrice(price)}đ</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomButonContainer}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setModalVisible({ ...modalVisible, otp: true })}>
                    <Text style={{ ...styles.boldText, color: "white" }}>Xác Nhận</Text>
                </TouchableOpacity>
            </View>
            <InputOtpModal
                visible={modalVisible.otp}
                phone={"12345689"}
                onCancle={hanldeCloseOtpModal}
                onSubmit={handleSubmitOtp}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: "#DDDDDD"
    },
    safeArea: {
        width: WIDTH,
        height: 50,
        backgroundColor: "#241468"
    },
    paymentMethodList: {
        position: "relative"
    },
    priceInput: {
        width: WIDTH * 0.9,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        marginVertical: 20,
        backgroundColor: "white",
        // flexDirection: "row",
    },
    priceInputField: {
        borderBottomWidth: 1,
        borderColor: "#4582E6"
    },
    priceButton: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#4582E6",
        marginTop: 10,
    },
    bottomButonContainer: {
        width: WIDTH,
        position: "absolute",
        bottom: HEIGHT * 0.05,
        justifyContent: 'center',
        alignItems: "center"
    },
    bottomButton: {
        backgroundColor: "#241468",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },

    flexColumn: {
        flexDirection: "row",
    },
    flexDirectionBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },
    boldText: {
        fontWeight: "600"
    },
});