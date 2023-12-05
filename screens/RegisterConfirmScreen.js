import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../components/header/Header';

import { formatPrice } from '../util/util';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const voucherListDedault = [
    {

    }
]

export default function RegisterConfirmScreen({ route, navigation }) {

    let classDetail = route?.params?.classDetail
    const [studentList, setStudentList] = useState(route?.params?.studentList)

    useEffect(() => {
        classDetail = route?.params?.classDetail
        setStudentList(route?.params?.studentList)
    }, [route?.params?.studentList, route?.params?.course, route?.params?.classDetail])


    const handleConfirm = () => {
        navigation.navigate("PaymentScreen", { classDetail: classDetail, studentList: studentList })
    }

    return (
        <>
            <Header navigation={navigation} background={"#FF8F8F"} title={"Thông tin thanh toán"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.checkPayment}>
                    <Icon name={"account"} color={"#FF8D9D"} size={28} />
                    <Text style={{ color: "#FF8F8F" }}>Vui lòng kiểm tra lại thông tin thanh toán:</Text>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Thông Tin Đăng Ký</Text>
                </View>
                {
                    studentList?.map((item, index) => {
                        return (
                            <View style={styles.studentDetail} key={index}>
                                {
                                    index !== 0 &&
                                    <View style={styles.dashline} />
                                }
                                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                    <Text style={styles.detailViewTitle}>Tên học viên:</Text>
                                    <Text style={styles.boldText}>{item.name}</Text>
                                </View>
                                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                    <Text style={styles.detailViewTitle}>Khóa Học:</Text>
                                    <Text style={styles.boldText}>{classDetail.title}</Text>
                                </View>
                                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                    <Text style={styles.detailViewTitle}>Lịch Học:</Text>
                                    <Text style={{ ...styles.boldText, color: "#2ECFFB" }}>Thứ 2-4-6 / tuần (7h30 - 9h)</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={styles.titleView}>
                    <Text style={styles.title}>Chọn phương thức thanh toán</Text>
                </View>

                <View style={styles.studentDetail} >
                    <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5, borderBottomWidth: 1, paddingBottom: 10, borderColor: "#F9ACC0" }}>
                        <Text style={styles.detailViewTitle}>Học Phí:</Text>
                        <Text style={styles.boldText}>200000đ</Text>
                    </View>
                    <TouchableOpacity style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5, borderBottomWidth: 1, paddingBottom: 10, borderColor: "#F9ACC0" }}>
                        <Text style={styles.detailViewTitle}>Vourcher Giảm Giá</Text>
                        <Icon name={"chevron-right"} color={"#FF8D9D"} size={28} />
                    </TouchableOpacity>
                    <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                        <Text style={styles.detailViewTitle}>Tổng tiền:</Text>
                        <Text style={{ ...styles.boldText }}>200000đ</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: "#FF8D9D" }} onPress={handleConfirm}>
                        <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    flexColumnAround: {
        width: WIDTH,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    flexColumnCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
    },

    checkPayment: {
        flexDirection: "row",
        width: WIDTH,
        paddingVertical: 10,
        backgroundColor: "rgba(255, 141, 157, 0.25)",
        alignItems: "center",
        justifyContent: "center",
    },
    titleView: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderLeftWidth: 5,
        borderLeftColor: "#FF8F8F",
        marginVertical: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#FF8F8F",
        fontWeight: "600",
        fontSize: 18,
    },
    studentDetail: {
        marginHorizontal: WIDTH * 0.1,
    },
    detailViewTitle: {
        color: "#C4C4C4",
        fontSize: 15,
        fontWeight: "600"
    },
    dashline: {
        width: "95%",
        height: 2,
        backgroundColor: "#FF8D9D",
        marginVertical: 10
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 15,
        backgroundColor: "white"
    },
    button: {
        width: WIDTH * 0.7,
        borderColor: "#C71212",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    }
});