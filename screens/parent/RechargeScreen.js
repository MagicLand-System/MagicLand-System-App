import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from 'react'

import Header from '../../components/header/Header';
import { formatPrice } from '../../util/util';

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

export default function RechargeScreen({ route, navigation }) {

    const paymentMethod = route.params.paymentMethod
    const [price, setPrice] = useState(0)

    const handleInputChange = (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
        const sanitizedInput = sanitizeInput(numericInput);
        setPrice(sanitizedInput);
    };

    const sanitizeInput = (input) => {
        if (input.length > 0) {
            if (input[0] === '0' || input[0] === '-') {
                return input.substring(1); // Remove leading 0 or "-"
            } else {
                return input;
            }
        }
        return '';
    };

    const handleNavigate = () => {
        if (price && price !== 0) {
            navigation.push("TransactionWalletScreen", { paymentMethod: paymentMethod, price: price })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.safeArea} />
            <Header navigation={navigation} background={"#241468"} goback={navigation.pop} title={"Nạp Tiền"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.paymentMethodList}>
                <View style={styles.priceInput}>
                    <Text style={{ ...styles.boldText, color: "#241468" }}>Số tiền nạp:</Text>
                    <TextInput style={styles.priceInputField} value={price} onChangeText={(text) => handleInputChange(text)} placeholder='đ' keyboardType="numeric"></TextInput>
                    {/* <Text>đ</Text> */}
                    <View style={styles.flexDirectionBetween}>
                        <TouchableOpacity style={styles.priceButton} onPress={() => setPrice("100000")}>
                            <Text style={{ ...styles.boldText, color: "#4582E6" }}>100.000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.priceButton} onPress={() => setPrice("200000")}>
                            <Text style={{ ...styles.boldText, color: "#4582E6" }}>200.000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.priceButton} onPress={() => setPrice("500000")}>
                            <Text style={{ ...styles.boldText, color: "#4582E6" }}>500.000</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.priceInput}>
                    <Text style={{ ...styles.boldText, color: "#241468" }}>Thanh toán</Text>
                    <View
                        style={{
                            ...styles.paymentMethod,
                        }}

                    >
                        <View style={{ ...styles.flexDirectionBetween, width: "50%", marginTop: 10 }}>
                            <View style={{ padding: 5, borderWidth: 1, borderRadius: 15, borderColor: "#241468", backgroundColor: "white" }}>
                                <Image
                                    source={paymentTypeDefault[1].img}
                                    resizeMode='contain'
                                    style={styles.paymentIcon}
                                />
                            </View>
                            <Text style={{ ...styles.boldText, color: "#241468", width: "40%" }}>{paymentTypeDefault[1].name}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomButonContainer}>
                <TouchableOpacity style={styles.bottomButton} onPress={handleNavigate}>
                    <Text style={{ ...styles.boldText, color: "white" }}>Nạp tiền</Text>
                </TouchableOpacity>
            </View>
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
        alignItems: "center"
    },
    boldText: {
        fontWeight: "600"
    },
});