import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import SearchBar from '../../components/SearchBar';

import WalletIcon from "../../assets/images/Wallet.png"
import { formatPrice, getIndexById } from '../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const transactionDataDefault = [
    {
        type: "payment",
        from: "Ví điện từ",
        amount: 300000,
        content: "Đăng ký khóa học Toán Tư Duy"
    },
    {
        type: "rechange",
        from: "VN Pay",
        amount: 300000,
        content: "Nạp tiền vào Ví điện tử"
    },
]

export default function TransactionHistoryScreen({ navigation }) {

    const [searchValue, setSearchValue] = useState("")
    const [filterVisible, setFilterVisible] = useState(false)
    const [historyType, setHistoryType] = useState("all")

    const handleSearch = (value) => {
        setSearchValue(value)
    }

    const historyTypeList = [
        {
            name: "Tất cả",
            type: "all",
        },
        {
            name: "Nạp tiền",
            type: "rechange",
        },
        {
            name: "Thanh toán",
            type: "payment",
        },
    ]

    const filterFunction = () => {
        if (historyType === "all") {
            return transactionDataDefault
        } else {
            return transactionDataDefault.filter(item => item.type === historyType)
        }
    }

    const getTransactionType = (type) => {
        switch (type) {
            case "rechange":
                return "Nạp tiền"

            case "payment":
                return "Thanh toán"

            default:
                return "Giao dịch"
        }
    }

    const hanldeViewDetail = (item) => {
        navigation.push("TransactionDetailSceen", { paymentDetail: item })
    }

    return (
        <>
            <Header navigation={navigation} background={"#241468"} title={"Lịch sử giao dịch"} goback={navigation.pop} />
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <SearchBar
                        input={searchValue}
                        setInput={handleSearch}
                        setFilterModal={setFilterVisible}
                        placeHolder={"Tìm kiếm khóa học..."}
                    />
                </View>
                <View style={[styles.flexColumnAround, styles.filterOptionContainer]}>
                    {
                        historyTypeList.map((item, index) => (
                            <TouchableOpacity
                                style={{
                                    ...styles.filterOption,
                                    borderBottomWidth: historyType === item.type ? 2.5 : 0
                                }}
                                onPress={() => setHistoryType(item.type)}
                                key={index}>
                                <Text
                                    style={{
                                        ...styles.boldText,
                                        color: historyType === item.type ? "#241468" : "black"
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <View>
                    {
                        filterFunction().map((item, key) => (
                            <TouchableOpacity
                                onPress={() => hanldeViewDetail(item)}
                                style={[styles.flexColumnBetween, styles.tracsactionTab, { borderTopWidth: key !== 0 ? 1 : 0 }]}
                                key={key}>
                                <View style={styles.flexColumn}>
                                    <View
                                        style={styles.tracsactionImage}
                                    >
                                        <Image
                                            source={WalletIcon}
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.boldText}>{getTransactionType(item.type)}</Text>
                                        <Text style={{ marginVertical: 5 }}>Từ : {item.from} </Text>
                                        <Text>09 : 15ph - 03/01/2024</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text>{item.type === "rechange" ? "+" : "-"} {formatPrice(item.amount)}đ</Text>
                                </View>
                                <View style={styles.tracsactionIcon}>
                                    <Icon name={"chevron-right"} color={"#000000"} size={30} />
                                </View>
                            </TouchableOpacity>
                        ))
                    }
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
    userDetail: {
        width: WIDTH * 0.95,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#241468",
        marginHorizontal: WIDTH * 0.025,
        marginVertical: 20,
    },
    userName: {
        fontWeight: "900",
        color: "#241468",
        fontSize: 18
    },
    userOption: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        // marginVertical: 20,
    },
    searchBar: {
        width: WIDTH,
        paddingHorizontal: WIDTH * 0.1,
        paddingVertical: 20,
        backgroundColor: "#241468"
    },
    filterOptionContainer: {
        paddingVertical: 20,
    },
    filterOption: {
        paddingBottom: 5,
        borderColor: "#241468",
        borderRadius: 2,
    },
    tracsactionTab: {
        position: "relative",
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginVertical: 5,
        paddingVertical: 10,
        borderColor: "#D9D9D9",
    },
    tracsactionImage: {
        padding: 15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#4582E6",
        marginRight: 15
    },
    tracsactionIcon: {
        position: "absolute",
        left: "95%",
        top: "55%"
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