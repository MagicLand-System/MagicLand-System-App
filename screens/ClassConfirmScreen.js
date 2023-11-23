import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../components/header/Header';

import { formatPrice } from '../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ClassConfirmScreen({ route, navigation }) {

    const [studentList, setStudentList] = useState(route?.params?.studentList)
    let course = route?.params?.course
    let classDetail = route?.params?.classDetail
    let goback = route?.params?.goback

    useEffect(() => {
        course = route?.params?.course
        classDetail = route?.params?.classDetail
        goback = route?.params?.goback
        setStudentList(route?.params?.studentList)
    }, [route?.params?.course, route?.params?.classDetail, route?.params?.goback, route?.params?.studentList])

    const hanldeGoback = () => {
        navigation.navigate("ClassRegisterScreen", { course: course, classDetail: classDetail, goback: goback })
    }

    const getStudentAmount = () => {
        const selectedStudents = studentList.filter(student => student.check === true);
        return selectedStudents.length
    }

    return (
        <>
            <Header navigation={navigation} background={"#F5F5F5"} goback={hanldeGoback} />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Đăng Ký Lớp Học Ngay</Text>
                <Text style={{ ...styles.title, backgroundColor: "#EAEAFF", fontSize: 16, color: "#3A0CA3" }}>Thông Tin Đăng Ký:</Text>
                <View style={{ ...styles.flexColumn, padding: 20, paddingHorizontal: WIDTH * 0.1 }}>
                    <Text style={{ ...styles.boldText, color: "#C8A9F1" }}>Phụ Huynh:</Text>
                </View>
                
                <View style={styles.dashLine} />
                <View style={{ ...styles.flexColumn, padding: 20, paddingHorizontal: WIDTH * 0.1 }}>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>Thông Tin  Lớp Học: </Text>
                </View>
                <View style={{ ...styles.detailCard }}>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                        <Text style={styles.boldText}>Lớp học:</Text>
                        <Text style={styles.cardText}>Toán Tư Duy cho trẻ mới bắt đầu (Cơ Bản)</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                        <Text style={styles.boldText}>Giáo Viên:</Text>
                        <Text style={styles.cardText}>Cô Hà My</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                        <Text style={styles.boldText}>Số Buổi:</Text>
                        <Text style={styles.cardText}>4 buổi / tuần</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                        <Text style={styles.boldText}>Ngày Học:</Text>
                        <Text style={styles.cardText}>8,9,10,11 / 11</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                        <Text style={styles.boldText}>Thời Gian:</Text>
                        <Text style={styles.cardText}>18:00 - 20:00</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                        <Text style={styles.boldText}>Hình Thức</Text>
                        <Text style={styles.cardText}>Online</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                        <Text style={styles.boldText}>Cơ Sở:</Text>
                        <Text style={styles.cardText}>Không có</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                        <Text style={styles.boldText}>Địa Chỉ:</Text>
                        <Text style={styles.cardText}>Không có</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                        <Text style={styles.boldText}>Phòng:</Text>
                        <Text style={styles.cardText}>Không có</Text>
                    </View>
                </View>
                <View style={styles.dashLine} />
                <View style={{ ...styles.flexColumnBetween, padding: 20 }} >
                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>Thông Tin  Lớp Học: </Text>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>{formatPrice(classDetail.price * getStudentAmount())} đ</Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{ ...styles.button, backgroundColor: "#C71212" }}>
                    <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>Đăng Ký Ngay</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginBottom: 80,
    },
    title: {
        width: WIDTH,
        textAlign: "center",
        padding: 20,
        // marginVertical: 20,
        fontSize: 25,
        fontWeight: "600",
        backgroundColor: "#F5F5F5"
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
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
    },
    parentDetail: {
        width: WIDTH * 0.5,
        marginHorizontal: WIDTH * 0.2,
    },
    dashLine: {
        width: WIDTH * 0.9,
        height: 2,
        borderRadius: 15,
        marginHorizontal: WIDTH * 0.05,
        marginVertical: 10,
        backgroundColor: "#000000"
    },
    addButton: {
        padding: 10,
        borderRadius: 15,
        marginHorizontal: 20,
        backgroundColor: "rgba(200, 169, 241, 0.7)",
    },
    selectBox: {
        width: 29,
        height: 29,
        borderWidth: 2,
        borderColor: "#794BFF",
        marginRight: 10,
    },
    detailCard: {
        width: WIDTH * 0.9,
        padding: 20,
        borderRadius: 15,
        marginHorizontal: WIDTH * 0.05,
        // backgroundColor: "rgba(218, 218, 247, 0.6)"
    },
    cardText: {
        width: WIDTH * 0.5,
        textAlign: "right"
    },

    buttonContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 15,
        backgroundColor: "white"
    },
    button: {
        width: WIDTH * 0.45,
        borderWidth: 1,
        borderColor: "#C71212",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    }
});