import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../components/header/Header';
import ChooseVourcherModal from '../components/modal/ChooseVourcherModal';
import InputOtpModal from '../components/modal/InputOtpModal';
import PaymentSuccessModal from '../components/modal/PaymentSuccessModal';

import { formatPrice } from '../util/util';


const vourcherListDefault = [
    {
        name: "GIAMGIA15%",
        content: "Voucher giảm giá 15% tối đa 30k cho đơn trên 150",
        value: 15,
        max: 40000,
        minUse: 150000,
        choose: false
    },
    {
        name: "GIAMGIA40%",
        content: "Voucher giảm giá 15% tối đa 30k cho đơn trên 150",
        value: 40,
        max: 30000,
        minUse: 150000,
        choose: false
    },
    {
        name: "GIAMGIA50%",
        content: "Voucher giảm giá 15% tối đa 30k cho đơn trên 150",
        value: 50,
        max: 50000,
        minUse: 150000,
        choose: false
    },
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function PaymentScreen({ route, navigation }) {

    let course = route?.params?.course
    let classDetail = route?.params?.classDetail
    let goback = route?.params?.goback
    const [studentList, setStudentList] = useState(route?.params?.studentList)
    const [vourcherList, setVourcherList] = useState(vourcherListDefault)
    const [modalVisible, setModalVisible] = useState({ vourcher: false, otp: false, notifi: false })

    useEffect(() => {
        course = route?.params?.course
        classDetail = route?.params?.classDetail
        goback = route?.params?.goback
        setStudentList(route?.params?.studentList)
        setVourcherList(vourcherListDefault)
    }, [route?.params?.course, route?.params?.classDetail, route?.params?.goback, route?.params?.studentList])

    const hanldeGoback = () => {
        navigation.navigate("RegisterConfirmScreen", { course: course, classDetail: classDetail, goback: goback, studentList: studentList })
    }

    const hanldeChooseVourcher = (index) => {
        const updateList = [...vourcherList]
        const choosed = updateList[index].choose
        updateList.forEach((item) => item.choose = false)
        updateList[index].choose = !choosed
        setVourcherList(updateList)
    }

    const hanldeCloseVourcherModal = () => {
        setModalVisible({ ...modalVisible, vourcher: false })
    }

    const hanldeCloseOtpModal = () => {
        setModalVisible({ ...modalVisible, otp: false })
    }

    const handlePayment = () => {
        setModalVisible({ ...modalVisible, otp: true })
    }

    const handleSubmitOtp = (otp) => {
        console.log(otp);
        setModalVisible({ ...modalVisible, notifi: true, otp: false })
    }

    const handleSubmitNotificate = () => {
        setModalVisible({ ...modalVisible, notifi: false })
    }

    const getPrice = () => {
        return (studentList.length * classDetail.price)
    }

    const vourcherValue = () => {
        const vourcher = vourcherList?.filter(vourcher => vourcher.choose === true);
        if (vourcher.length === 0) {
            return undefined
        } else {
            return vourcher[0]
        }
    }

    const totalPrice = () => {
        return (studentList.length * classDetail.price)
    }

    const vourcherDiscount = () => {
        const discount = vourcherValue().value
        const discountValue = totalPrice() / discount * 100
        if (discountValue > vourcherValue().max) {
            return vourcherValue().max
        } else {
            return discountValue
        }
    }

    const totalPayment = () => {
        const discountValue = vourcherValue() ? vourcherDiscount() : 0
        const totalPayment = totalPrice() - discountValue
        return totalPayment
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
            <Text style={styles.title}>THANH TOÁN</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ ...styles.flexColumn, paddingVertical: 20 }}>
                    <Text style={{ ...styles.boldText, color: "#C8A9F1" }}>Phụ Huynh:</Text>
                </View>
                <View style={{ ...styles.flexColumn, width: "80%", marginHorizontal: "20%", marginBottom: 5, }}>
                    <Text style={{ ...styles.boldText, width: "30%" }}>Tên: </Text>
                    <Text >Ngô Gia Thưởng</Text>
                </View>
                <View style={{ ...styles.flexColumn, width: "80%", marginHorizontal: "20%", marginBottom: 5, }}>
                    <Text style={{ ...styles.boldText, width: "30%" }}>Email: </Text>
                    <Text >thuongng@gmail.com</Text>
                </View>
                <View style={{ ...styles.flexColumn, width: "80%", marginHorizontal: "20%", marginBottom: 5, }}>
                    <Text style={{ ...styles.boldText, width: "30%" }}>SĐT: </Text>
                    <Text >0934*******</Text>
                </View>
                <View style={{ ...styles.flexColumn, width: "80%", marginHorizontal: "20%", marginBottom: 15, }}>
                    <Text style={{ ...styles.boldText, width: "30%" }}>Địa Chỉ: </Text>
                    <Text >123 ABC Q1</Text>
                </View>
                <View style={{ ...styles.flexColumn, paddingVertical: 20 }}>
                    <Text style={{ ...styles.boldText, color: "#C8A9F1" }}>Thông Tin Mua Hàng:</Text>
                </View>
                {
                    studentList?.map((item, index) => {
                        return <InforCard item={item} index={index} key={index} />
                    })
                }
                <View style={styles.vourcherView}>
                    <View style={{ ...styles.flexColumnBetween, width: "100%", borderBottomWidth: 1, paddingBottom: 10 }}>
                        <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>Tổng Lớp Học Đăng Ký:</Text>
                        <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>{studentList.length}</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, width: "100%", paddingTop: 10 }}>
                        <Text style={{ ...styles.boldText, color: "#3AAC45" }}>Vourcher Giảm Giá:</Text>
                        <TouchableOpacity onPress={() => setModalVisible({ ...modalVisible, vourcher: true })}>
                            <Text style={{ ...styles.boldText, color: "#3AAC45" }}>
                                {vourcherValue() ? vourcherValue()?.name : "Không Chọn"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.vourcherView}>
                    <View style={{ ...styles.flexColumnBetween, width: "100%", paddingBottom: 10 }}>
                        <Text style={{ ...styles.boldText, color: "#C8A9F1" }}>TPhương Thức Thanh Toán</Text>
                        <Text style={{ ...styles.boldText, color: "#888888" }}> Ví Điện Tử</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, width: "100%", paddingTop: 10 }}>
                        <Text style={{ ...styles.boldText, color: "#888888" }}>Số Dư Của Bạn:</Text>
                        <Text style={{ ...styles.boldText, color: "#888888" }}>{formatPrice(1000000)} đ</Text>
                    </View>
                </View>

                <View style={styles.vourcherView}>
                    <Text style={{ ...styles.boldText, color: "#C8A9F1" }}>Chi Tiết Thanh Toán:</Text>
                    <View style={{ ...styles.flexColumnBetween, width: "100%", paddingTop: 10 }}>
                        <Text style={{ ...styles.boldText, color: "#888888" }}>Tổng Tiền:</Text>
                        <Text style={{ ...styles.boldText, color: "#888888" }}>{formatPrice(totalPrice())} đ</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, width: "100%", paddingTop: 10 }}>
                        <Text style={{ ...styles.boldText, color: "#888888" }}>Vourcher Giảm Giá:</Text>
                        <Text style={{ ...styles.boldText, color: "#888888" }}>{vourcherValue() ? formatPrice(vourcherDiscount()) : 0} đ</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, width: "100%", paddingTop: 10 }}>
                        <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>Tổng Thanh Toán:</Text>
                        <Text style={{ ...styles.boldText, color: "#C71212" }}>{formatPrice(totalPayment())} đ</Text>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{ ...styles.button, backgroundColor: "#C71212" }} onPress={handlePayment}>
                    <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>Thanh Toán</Text>
                </TouchableOpacity>
            </View>
            <ChooseVourcherModal visible={modalVisible.vourcher} vourcherList={vourcherList} onCancle={hanldeCloseVourcherModal} onChoose={hanldeChooseVourcher} />
            <InputOtpModal visible={modalVisible.otp} phone={"12345689"} onCancle={hanldeCloseOtpModal} onSubmit={handleSubmitOtp} />
            <PaymentSuccessModal visible={modalVisible.notifi} onSubmit={handleSubmitNotificate} />
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
    vourcherView: {
        width: WIDTH * 0.9,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 20,
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