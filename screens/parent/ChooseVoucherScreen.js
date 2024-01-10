import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../../components/header/Header';
import ChooseVourcherModal from '../../components/modal/ChooseVourcherModal';
import InputOtpModal from '../../components/modal/InputOtpModal';
import PaymentSuccessModal from '../../components/modal/PaymentSuccessModal';

import { formatPrice } from '../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChooseVoucherScreen({ route, navigation }) {

    let course = route?.params?.course
    let classDetail = route?.params?.classDetail
    let goback = route?.params?.goback
    const [studentList, setStudentList] = useState(route?.params?.studentList)
    const [vourcherList, setVourcherList] = useState(route?.params?.vourcherList)

    useEffect(() => {
        course = route?.params?.course
        classDetail = route?.params?.classDetail
        goback = route?.params?.goback
        setStudentList(route?.params?.studentList)
        setVourcherList(route?.params?.vourcherList)
    }, [route?.params?.course, route?.params?.classDetail, route?.params?.goback, route?.params?.studentList, route?.params?.vourcherList])

    const hanldeGoback = () => {
        navigation.navigate("PaymentScreen", { course: course, classDetail: classDetail, goback: goback, studentList: studentList, vourcherList: vourcherList })
    }

    const handleChooseVourcher = (index) => {
        const updateList = [...vourcherList]
        const defaultChoose = updateList[index].choose
        updateList.forEach(item => item.choose = false)
        updateList[index].choose = !defaultChoose
        setVourcherList(updateList)
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
        const discount = vourcherValue()?.value
        const discountValue = totalPrice() / discount * 100
        if (discountValue > vourcherValue()?.max) {
            return vourcherValue()?.max
        } else {
            return discountValue
        }
    }

    const VourcherCard = ({ item, index }) => {
        return (
            <View style={{ ...styles.flexColumnBetween, paddingVertical: 10 }}>
                <View style={styles.vourcherLeft}>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3", fontSize: 18 }}>
                        {item.name}
                    </Text>
                    <Text style={styles.lightText}>
                        Đơn tối thiểu {formatPrice(item.minUse)}
                    </Text>
                    <Text style={styles.lightText}>
                        Hết Hạn: {item.expire}
                    </Text>
                </View>
                <TouchableOpacity style={styles.vourcherRight} onPress={() => handleChooseVourcher(index)}>
                    <View
                        style={{ ...styles.selectBox}}
                    >
                        {item.choose && <Icon name={"check"} color={"#3A0CA3"} size={25} />}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const formatPrice = (number) => {
        if (number >= 1000000) {
            const millionPart = Math.floor(number / 1000000);
            const remainder = number % 1000000;

            if (remainder >= 1000) {
                const remainderStr = (remainder / 1000).toFixed(0) + 'k';
                return millionPart + 'tr' + remainderStr;
            } else if (remainder > 0) {
                return millionPart + 'tr' + remainder + 'k';
            } else {
                return millionPart + 'tr';
            }
        } else if (number >= 1000) {
            return (number / 1000).toFixed(0) + 'k';
        } else {
            return number.toString();
        }
    }

    return (
        <>
            <Header navigation={navigation} background={"#F5F5F5"} goback={hanldeGoback} />
            <Text style={styles.title}>Chọn Vourcher</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {
                    vourcherList?.map((item, index) => {
                        return <VourcherCard item={item} index={index} key={index} />
                    })
                }
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Text style={{ ...styles.boldText, padding: 15 }}>1 Voucher đã được chọn. <Text style={{ color: "#3A0CA3" }}>Bạn được giảm giá {vourcherDiscount() ? formatPrice(vourcherDiscount()) : "0k"}</Text></Text>
                <TouchableOpacity style={{ ...styles.button, backgroundColor: "#C71212" }} onPress={hanldeGoback}>
                    <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginBottom: 126,
    },
    title: {
        width: WIDTH * 0.8,
        marginHorizontal: WIDTH * 0.1,
        marginVertical: 20,
        fontSize: 25,
        fontWeight: "600"
    },
    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    boldText: {
        fontWeight: "600",
    },
    lightText: {
        color: "#888888",
        marginTop: 10
    },

    vourcherLeft: {
        width: WIDTH * 0.75,
    },
    vourcherRight: {
        width: WIDTH * 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    selectBox: {
        width: 29,
        height: 29,
        borderWidth: 2,
        borderColor: "#3A0CA3",
        borderRadius: 5,
        marginRight: 10,
    },

    buttonContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
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