import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import FavoriteHeader from '../../components/header/FavoriteHeader';
import { formatPrice } from '../../util/util';

// import defaultCardImage from "../assets/home/cardImage/homeCardDrawImg.png"
import ChooseVourcherModal from '../../components/modal/ChooseVourcherModal';
import InputOtpModal from '../../components/modal/InputOtpModal';
import PaymentSuccessModal from '../../components/modal/PaymentSuccessModal';
import Header from '../../components/header/Header';
import ChoosePaymentMethod from '../../components/modal/ChoosePaymentMethod';
import { registerClass } from '../../api/class';
import CustomToast from "../../components/CustomToast";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const paymentTypeDefault = [
    {
        id: 0,
        name: "Ví điện tử",
        img: require("../../assets/images/welletLogo.png"),
        dropdown: true,
    },
    {
        id: 1,
        name: "VN Pay",
        img: require("../../assets/images/vnpayLogo.png"),
        dropdown: false,
    },
]

const vourcherListDefault = [
    {
        name: "GIAMGIA15%",
        content: "Siêu ưu đãi mừng khai giảng khóa mới bắt đầu từ ngày 10/9 - 20/9",
        value: 15,
        max: 40000,
        minUse: 100000,
        expire: "20.12.2023",
        choose: false
    },
    {
        name: "GIAMGIA40%",
        content: "Siêu ưu đãi mừng khai giảng khóa mới bắt đầu từ ngày 10/9 - 20/9",
        value: 40,
        max: 50000,
        minUse: 150000,
        expire: "20.12.2023",
        choose: false
    },
    {
        name: "GIAMGIA50%",
        content: "Siêu ưu đãi mừng khai giảng khóa mới bắt đầu từ ngày 10/9 - 20/9",
        value: 50,
        max: 50000,
        minUse: 150000,
        expire: "20.12.2023",
        choose: false
    },
    {
        name: "GIAMGIA70%",
        content: "Siêu ưu đãi mừng khai giảng khóa mới bắt đầu từ ngày 10/9 - 20/9",
        value: 70,
        max: 75000,
        minUse: 150000,
        expire: "20.12.2023",
        choose: false
    },
]

export default function MultiplePaymentScreen({ route, navigation }) {

    let courseList = route?.params?.courseList
    const [vourcherList, setVourcherList] = useState(vourcherListDefault)
    const [otpLoading, setOtpLoading] = useState(false)
    const [paymentMethodList, setPaymentMethodList] = useState(paymentTypeDefault)
    const [modalVisible, setModalVisible] = useState({ vourcher: false, otp: false, notifi: false, paymentMethod: false })
    const showToast = CustomToast();

    useEffect(() => {
        courseList = route?.params?.courseList
        setVourcherList(vourcherListDefault)
    }, [route?.params?.courseList])

    const hanldeCloseOtpModal = () => {
        setModalVisible({ ...modalVisible, otp: false })
    }

    const handlePayment = () => {
        const hasCheckedItem = paymentMethodList.some(item => item.check === true);
        if (hasCheckedItem) {
            setModalVisible({ ...modalVisible, otp: true });
        } else {
            showToast("Thông báo", `Hãy chọn phương thức thanh toán trước`, "warning");
        }
    }

    const handleSubmitOtp = async (otp) => {
        // courseList?.map(async (classItem) => { console.log(classItem.class.id); })
        setOtpLoading(true);

        try {
            await Promise.all(courseList?.map(async (classItem) => {
                await classItem?.student?.map(async (student) => {
                    if (classItem?.itemType === "CLASS") {
                        // console.log(classItem);
                        const response = await registerClass([student?.student], classItem?.schedules[0]?.classId);
                        if (response?.status === 200) {
                            showToast("Thành công", `Đã đăng ký ${classItem?.student?.fullName} vào lớp ${classItem?.name}`, "success");
                            setModalVisible({ ...modalVisible, otp: false });
                            handleCloseNotifiModal(response?.data)
                        } else {
                            showToast("Thất bại", `${response?.response?.data?.Error}`, "error");
                            // console.log(response.response.data);
                        }
                    } else {
                        const response = await registerClass([student?.student], student?.class?.classId);
                        if (response?.status === 200) {
                            showToast("Thành công", `Đã đăng ký ${classItem?.student?.fullName} vào lớp ${classItem?.name}`, "success");
                            setModalVisible({ ...modalVisible, otp: false });
                            handleCloseNotifiModal(response?.data)
                        } else {
                            showToast("Thất bại", `${response?.response?.data?.Error}`, "error");
                            // console.log(response.response.data);
                        }
                    }
                })
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setOtpLoading(false);
        }
    }

    const handleChooseVourcherModal = () => {
        setModalVisible({ ...modalVisible, vourcher: true })
    }

    const handleOpenPaymentMethodModal = () => {
        setModalVisible({ ...modalVisible, paymentMethod: true })
    }

    const handleCancleVourcherModal = () => {
        setModalVisible({ ...modalVisible, vourcher: false })
    }

    const handleCloseNotifiModal = async (transactionData) => {
        setModalVisible({ ...modalVisible, notifi: false })
        navigation.push("TransactionDetailScreen", {
            total: totalPayment(),
            transactionData: transactionData,
        })
    }

    const handleClosePaymentModal = () => {
        setModalVisible({ ...modalVisible, paymentMethod: false })
    }

    const handleChooseVourcher = (index) => {
        const updateList = [...vourcherList]
        const defaultChoose = updateList[index].choose
        updateList.forEach(item => item.choose = false)
        updateList[index].choose = !defaultChoose
        setVourcherList(updateList)
        handleCancleVourcherModal()
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
        let total = 0
        courseList.forEach(item => {
            item?.student?.forEach(element => {
                total += item?.price
            })
        });
        return total ? total : 0
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
        return totalPayment ? totalPayment : 0
    }

    const paymentMethod = () => {
        return paymentMethodList.find(item => item.check)
    }

    const findClassDetail = (array, classId) => {
        const index = array.findIndex(obj => obj?.classId === classId?.classId);
        console.logclassId
        if (index !== -1) {
            return array[index].schedule + "  (" + array[index].slot + ")"
        } else {
            return ""
        }
    }

    return (
        <>
            <Header navigation={navigation} title={"Thông tin thanh toán"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.checkPayment}>
                    <Icon name={"alert-circle"} color={"#241468"} size={28} />
                    <Text style={{ color: "#241468" }}>Vui lòng kiểm tra lại thông tin thanh toán:</Text>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Thông Tin Đăng Ký</Text>
                </View>

                <View style={styles.courseInfor}>
                    <View style={styles.flexColumnBetween}>
                        <Text>
                            Khóa Học:
                        </Text>
                        <Text style={{ width: "53%" }}>
                            Lịch Học:
                        </Text>
                    </View>
                    {
                        courseList.map((item, index) => (
                            <View style={{ ...styles.flexColumnBetween }} key={index}>
                                <Text style={{ ...styles.boldText, marginTop: 5, width: "47%" }}>{item?.name}</Text>
                                <View style={{ width: "53%" }}>
                                    {
                                        item?.itemType === "CLASS" ? (
                                            <Text style={{ ...styles.boldText, marginTop: 5 }}>{item?.schedules[0]?.schedule + "  (" + item?.schedules[0]?.slot})</Text>
                                        ) : (
                                            item?.student?.map((classItem, index) => (

                                                <Text key={index} style={{ ...styles.boldText, marginTop: 5 }}>{classItem?.class?.schedule + " " + classItem?.class?.slot}</Text>

                                            ))
                                        )
                                    }
                                </View>
                            </View>
                        ))
                    }
                </View>

                <TouchableOpacity style={{
                    ...styles.titleView,
                    justifyContent: "space-between",
                    marginRight: WIDTH * 0.15
                }}
                    onPress={handleOpenPaymentMethodModal}
                >
                    <Text style={styles.title}>Chọn phương thức thanh toán</Text>
                    {!paymentMethod() && <Icon name={"chevron-right"} color={"#4582E6"} size={30} />}
                </TouchableOpacity>

                <View style={styles.studentDetail} >
                    <TouchableOpacity style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5, borderBottomWidth: 1, paddingBottom: 10, borderColor: "#F9ACC0" }}
                        onPress={handleOpenPaymentMethodModal}
                    >
                        {paymentMethod() &&
                            <>
                                <View
                                    style={styles.paymentMethod}
                                >
                                    <Text style={{ ...styles.boldText, color: "#4582E6" }}>
                                        {
                                            paymentMethod().name
                                        }
                                    </Text>

                                </View>
                                <Icon name={"chevron-right"} color={"#4582E6"} size={30} />
                            </>
                        }
                    </TouchableOpacity>
                    <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5, borderBottomWidth: 1, paddingBottom: 10, borderColor: "#F9ACC0" }}>
                        <Text style={styles.detailViewTitle}>Học Phí:</Text>
                        <Text style={styles.boldText}>{formatPrice(totalPrice())}đ</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                        <Text style={styles.detailViewTitle}>Tổng tiền:</Text>
                        <Text style={{ ...styles.boldText }}>{formatPrice(totalPayment())}đ</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: "#4582E6" }} onPress={handlePayment}>
                        <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>Thanh Toán</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ChooseVourcherModal visible={modalVisible.vourcher} vourcherList={vourcherList} navigation={navigation} onChoose={handleChooseVourcher} onCancle={handleCancleVourcherModal} discount={vourcherValue() ? vourcherDiscount() : 0} />
            <InputOtpModal
                visible={modalVisible.otp}
                phone={"12345689"}
                onCancle={hanldeCloseOtpModal}
                onSubmit={handleSubmitOtp}
                loading={otpLoading}
            />
            <PaymentSuccessModal visible={modalVisible.notifi} onSubmit={handleCloseNotifiModal} />
            <ChoosePaymentMethod
                visible={modalVisible.paymentMethod}
                paymentMethodList={paymentMethodList}
                setPaymentMethodList={setPaymentMethodList}
                navigation={navigation}
                onCancle={handleClosePaymentModal}
                price={totalPayment()}
            />
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
        // alignItems: "center"
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
        backgroundColor: "rgba(36, 20, 104, 0.25)",
        alignItems: "center",
        justifyContent: "center",
    },
    titleView: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderLeftWidth: 5,
        borderLeftColor: "#4582E6",
        marginVertical: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#4582E6",
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
    courseInfor: {
        width: WIDTH * 0.8,
        marginHorizontal: WIDTH * 0.1,
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