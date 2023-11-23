import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../components/header/Header';

import { formatPrice } from '../util/util';

import defaultImage from "../assets/classCard/defaultImage.png"


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function RegisterConfirmScreen({ route, navigation }) {

    let course = route?.params?.course
    let classDetail = route?.params?.classDetail
    let goback = route?.params?.goback
    const [studentList, setStudentList] = useState(route?.params?.studentList)

    useEffect(() => {
        course = route?.params?.course
        classDetail = route?.params?.classDetail
        goback = route?.params?.goback
        setStudentList(route?.params?.studentList)
    }, [route?.params?.studentList, route?.params?.course, route?.params?.classDetail, route?.params?.goback])


    const handleConfirm = () => {
        navigation.navigate("PaymentScreen", { course: course, classDetail: classDetail, goback: goback, studentList: studentList })
    }

    const hanldeGoback = () => {
        navigation.navigate("ClassRegisterScreen", { course: course, classDetail: classDetail, goback: goback })
    }

    const getPrice = () => {
        return (studentList.length * classDetail.price)
    }

    const InforCard = ({ item, index }) => {
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>
                        Học Viên:
                    </Text>
                </View>
                <View style={styles.cardContent}>
                    <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                        <Text>Tên: </Text>
                        <Text style={styles.boldText}>{item?.name}</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                        <Text>Tuổi: </Text>
                        <Text style={styles.boldText}>{item?.age} Tuổi</Text>
                    </View>
                </View>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>
                        Khóa Học:
                    </Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => {
                            setStudentList((prevAgeOption) => {
                                const updatedList = [...prevAgeOption];
                                updatedList[index].check = !updatedList[index].check;
                                return updatedList;
                            });
                        }}
                    >
                        {
                            item?.check ?
                                <Icon name={"keyboard-arrow-down"} color={"#794BFF"} size={22} />
                                :
                                <Icon name={"keyboard-arrow-up"} color={"#794BFF"} size={22} />
                        }
                    </TouchableOpacity>
                </View>
                {
                    !item?.check &&
                    <View style={styles.cardContent}>
                        <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                            <Text>Tên Lớp Học: </Text>
                            <Text style={{ ...styles.boldText, color: "#3A0CA3", width: "60%" }}>{classDetail?.title}</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                            <Text>Giáo Viên : </Text>
                            <Text style={{ ...styles.boldText, color: "#3A0CA3", width: "60%" }}>Cô Hà My</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                            <Text>Số Buổi: </Text>
                            <Text style={{ ...styles.boldText, color: "#3A0CA3", width: "60%" }}>4 buổi</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                            <Text>Ngày Học:</Text>
                            <Text style={{ ...styles.boldText, color: "#3A0CA3", width: "60%" }}>8,9,10,11 / 11</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                            <Text>Thời Gian: </Text>
                            <Text style={{ ...styles.boldText, color: "#3A0CA3", width: "60%" }}>18:00 - 20:00</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                            <Text>Hình Thức: </Text>
                            <Text style={{ ...styles.boldText, color: "#3A0CA3", width: "60%" }}>Online</Text>
                        </View>
                    </View>
                }
                <View style={styles.dashLine} />
                <View style={{ ...styles.flexColumnBetween, width: "80%", marginVertical: 10 }}>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>Giá: </Text>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>{formatPrice(classDetail.price)} đ</Text>
                </View>
            </View>
        )
    }

    return (
        <>
            <Header navigation={navigation} background={"#F5F5F5"} goback={hanldeGoback} />
            <Text style={styles.title}>XÁC NHẬN THÔNG TIN</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {
                    studentList?.map((item, index) => {
                        return <InforCard item={item} index={index} key={index} />
                    })
                }
                <View style={{ ...styles.flexColumnBetween, paddingBottom: 40, marginTop: 10 }}>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>Tổng Tiền: </Text>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>{formatPrice(getPrice())} đ</Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{ ...styles.button, backgroundColor: "#C71212" }} onPress={handleConfirm}>
                    <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginBottom: 79,
    },
    title: {
        width: WIDTH * 0.8,
        marginHorizontal: WIDTH * 0.1,
        marginVertical: 20,
        fontSize: 25,
        fontWeight: "600"
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

    dashLine: {
        width: "90%",
        height: 1,
        marginVertical: 10,
        marginTop: 20,
        backgroundColor: "#000000"
    },

    card: {
        borderWidth: 1,
        borderRadius: 10,
        borderTopWidth: 0,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    cardHeader: {
        position: "relative",
        width: "100%",
        padding: 20,
        borderWidth: 1,
        // borderBottomWidth: 0,
        borderRadius: 10,
        backgroundColor: "rgba(200, 169, 241, 0.65)",
        justifyContent: "center"
    },
    dropdown: {
        position: "absolute",
        right: 20,
        borderWidth: 2,
        borderColor: "#363853",
        borderRadius: 50,
        backgroundColor: "rgba(54, 56, 83, 0.15)",
    },
    cardHeaderText: {
        color: "#3A0CA3"
    },
    cardContent: {
        width: "90%",
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