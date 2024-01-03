import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import OTPTextInput from "react-native-otp-textinput"
import Icon from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function InputOtpModal({ visible, phone, onCancle, onSubmit }) {

    const [otp, setOtp] = useState()

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <TouchableOpacity style={styles.layout} />
            <View style={styles.container}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>NHẬP MÃ XÁC NHẬN</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onCancle}>
                        <Icon name={"close"} color={"#794BFF"} size={22} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalHeader}>
                    <Text style={styles.phoneNumber}>MÃ XÁC NHẬN GỬI QUA SỐ ĐIỆN THOẠI {phone}</Text>
                </View>
                <View style={styles.modalContent}>
                    <OTPTextInput
                        inputCount={6}
                        handleTextChange={setOtp}
                        tintColor="#72AFD3"
                        containerStyle={{ marginBottom: 20 }}
                        textInputStyle={styles.otpInput}
                    />
                </View>
                <View style={styles.footer}>
                    <Text>Chưa nhận được mã?
                        <TouchableOpacity>
                            <Text style={styles.resendText}>
                                GỬI LẠI
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <View style={styles.confirm}>
                    <TouchableOpacity style={styles.confirmButton} onPress={()=>onSubmit(otp)}>
                        <Text style={styles.confirmText}>
                            XÁC NHẬN
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: HEIGHT * 0.35,
        left: WIDTH * 0.05,
        right: WIDTH * 0.05,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    layout: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    modalHeader: {
        position: "relative",
        width: "100%",
        padding: 20,
        paddingBottom: 0,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#C8A9F1"
    },
    modalHeaderText: {
        fontWeight: "600",
        color: "#3A0CA3"
    },
    phoneNumber: {
        color: "#858597",
        textAlign: "center",
        marginBottom: 10,
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    otpInput: {
        width: WIDTH * 0.1,
        height: WIDTH * 0.10,
        // borderColor: '#72AFD3',
        color: '#72AFD3',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
    },
    footer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    resendText: {
        color: "#3A0CA3",
        fontWeight: "600",
        marginLeft: 5,
        transform: [{ translateY: 2.5 }]
    },
    confirm: {
        marginBottom: 20,
    },
    confirmButton: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: "#3D5CFF",
    },
    confirmText: {
        color: "white"
    },
    closeButton: {
        position: "absolute",
        right: 20,
    }
});