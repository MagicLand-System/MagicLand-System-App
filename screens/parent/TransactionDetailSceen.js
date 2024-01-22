import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import SearchBar from '../../components/SearchBar';

import WalletIcon from "../../assets/images/Wallet.png"
import { formatPrice, getIndexById } from '../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;



export default function TransactionDetailSceen({ route, navigation }) {

    const paymentDetail = route.params.paymentDetail

    return (
        <>
            <Header navigation={navigation} title={"Chi tiết giao dịch"} goback={navigation.pop} />
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.boldText}>{paymentDetail.type === "rechange" ? "+" : "-"} {formatPrice(paymentDetail.amount)}đ</Text>
                    <View style={styles.flexColumn}>
                        <Icon name={"check-circle"} color={"#2C8535"} size={30} />
                        <Text style={{ ...styles.boldText, color: "#2C8535", marginVertical: 20 }}> Thành công</Text>
                    </View>
                    <Text style={{ ...styles.boldText }}> Thời gian hoàn thành:<Text style={{ fontWeight: "500" }}> 09 : 15ph - 03/01/2024</Text></Text>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.boldText}>Thông tin đơn hàng</Text>
                    <View style={styles.flexColumn}>
                        <Text style={{ color: "#888888", marginVertical: 15, transform: [{ translateX: -3 }] }}> Nội dung:
                            <Text style={{ ...styles.boldText, marginVertical: 15, color: "black" }}> {paymentDetail.content}</Text>
                        </Text>

                    </View>
                    <View style={styles.flexColumn}>
                        <Text style={{ color: "#888888", marginVertical: 15, transform: [{ translateX: -3 }]  }}> Hình thức thanh toán:
                            <Text style={{ ...styles.boldText, marginVertical: 15, color: "black" }}> {paymentDetail.from}</Text>
                        </Text>

                    </View>
                </View>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    top: {
        width: WIDTH * 0.9,
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        marginHorizontal: WIDTH * 0.05,
        marginVertical: 40,
        marginBottom: 0,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",

    },
    bottom: {
        width: WIDTH * 0.9,
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        marginHorizontal: WIDTH * 0.05,
        marginVertical: 40,
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
})