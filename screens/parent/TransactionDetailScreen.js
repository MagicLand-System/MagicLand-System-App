import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../../components/header/Header';
import PaymentSuccessModal from '../../components/modal/PaymentSuccessModal';
import { convertSchedulesToString, formatDate, formatPrice, formatTime } from '../../util/util';

import monneyIcon from "../../assets/images/money-send.png"
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function TransactionDetailScreen({ route, navigation }) {

    let total = route?.params?.total ? route?.params?.total : 0
    let lable = route?.params?.lable ? route?.params?.lable : "-"
    let transactionData = route?.params?.transactionData
    let classDetail = route?.params?.classDetail
    let handleClose = route?.params?.classDetail ? () => navigation.pop(route?.params?.handleClose) : () => navigation.navigate("Document")
    const user = useSelector(userSelector);

    return (
        <>
            <Header navigation={navigation} goback={() => navigation.pop()} title={"Chi tiết giao dịch"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {/* <Text style={{ ...styles.boldText, textAlign: "center", fontSize: 30 }}>Thanh Toán</Text> */}
                <View style={{ ...styles.flexColumnCenter, marginVertical: 20 }}>
                    <View style={styles.headerImage}>
                        <Image style={styles.monneyImage} source={monneyIcon} />
                    </View>
                    <Text style={{ ...styles.boldText, fontSize: 20, color: "#C71212", fontWeight: "700" }}>
                        {lable} {formatPrice(total)}đ
                    </Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, alignItems: "center", marginVertical: 10 }}>
                    <Text style={{ ...styles.boldText }}>Trạng Thái :</Text>
                    <View style={styles.transactionStatus}>
                        <Text style={{ ...styles.boldText, fontSize: 13, color: "#2AAC37", paddingHorizontal: 10, paddingVertical: 3 }}>Thành Công</Text>
                    </View>
                </View>
                <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                    <Text style={{ ...styles.boldText }}>Thời Gian:</Text>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>{formatTime(transactionData?.date)} - {formatDate(transactionData?.date)}</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                    <Text style={{ ...styles.boldText }}>Hình Thức Thanh Toán:</Text>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>
                        {
                            transactionData?.method === "SystemWallet" ?
                                "Ví điện tử"
                                :
                                transactionData?.method
                        }
                    </Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                    <Text style={{ ...styles.boldText }}>Tên Người Thanh Toán:</Text>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>{transactionData?.payer}</Text>
                </View>
                {
                    classDetail?.map((classItem, key) => {
                        return (
                            <React.Fragment key={key}>
                                <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                                    <Text style={{ ...styles.boldText }}>Lớp học: </Text>
                                    <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>{classItem?.className}</Text>
                                </View>
                                <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                                    <Text style={{ ...styles.boldText }}>Lịch học: </Text>
                                    {
                                        convertSchedulesToString(classDetail[0]?.schedules)?.map((item, key) => {
                                            return (
                                                <React.Fragment key={key}>
                                                    <Text style={{ ...styles.boldText, color: "#2ECFFB" }}>Thứ {item?.dates} ({item?.time})</Text>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </View>

                            </React.Fragment>
                        )
                    })
                }
                <View style={{ ...styles.flexColumnBetween, marginVertical: 10 }}>
                    <Text style={{ ...styles.boldText }}>Nội dung: </Text>
                    <Text style={{ ...styles.boldText, color: "#3A0CA3", width: "60%" }}>{transactionData?.message}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: "#4582E6" }} onPress={() => { navigation.navigate("Document") }}>
                        <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,

        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        // marginBottom: 79,
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

    headerImage: {
        marginRight: 10
    },
    monneyImage: {
        width: 50,
        height: 50
    },
    transactionStatus: {
        borderRadius: 50,
        backgroundColor: "rgba(108, 221, 120, 0.62)",
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 15,
        backgroundColor: "white"
    },
    button: {
        width: WIDTH * 0.45,
        borderColor: "#C71212",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    }
});