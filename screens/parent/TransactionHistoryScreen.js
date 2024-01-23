import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';

import Header from '../../components/header/Header';
import SearchBar from '../../components/SearchBar';
import CustomToast from "../../components/CustomToast";
import SpinnerLoading from '../../components/SpinnerLoading';
import { formatDate, formatPrice, formatTime } from '../../util/util';

import WalletIcon from "../../assets/images/Wallet.png"
import { getWalletTransactions } from '../../api/transaction';

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

    const [transactionList, setTransactionList] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [filterVisible, setFilterVisible] = useState(false)
    const [historyType, setHistoryType] = useState("all")
    const [loading, setLoading] = useState(true)
    const user = useSelector(userSelector);
    const showToast = CustomToast();

    useEffect(() => {
        loadTransactionData()
    }, [])

    const loadTransactionData = async () => {
        setLoading(true)
        // user?.phone
        const response = await getWalletTransactions("%2B84907625914")
        if (response?.status === 200) {
            setTransactionList(response?.data)
        } else {
            showToast("Lỗi", response?.response?.data, "error");
        }
        setLoading(false)
    }

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
            type: "TopUp",
        },
        {
            name: "Thanh toán",
            type: "Payment",
        },
    ]

    const filterFunction = () => {
        // console.log(transactionList);
        if (historyType === "all") {
            return transactionList
        } else {
            return transactionList.filter(item => item.type === historyType)
        }
    }

    const getTransactionType = (type) => {
        switch (type) {
            case "TopUp":
                return "Nạp tiền"

            case "Payment":
                return "Thanh toán"

            default:
                return "Giao dịch"
        }
    }

    const getTransactionFrom = (method) => {
        switch (method) {
            case "SystemWallet":
                return "Ví"

            default:
                return method
        }
    }

    const hanldeViewDetail = (item) => {
        navigation.push("TransactionDetailSceen", { paymentDetail: item })
    }

    return (
        <>
            <Header navigation={navigation} title={"Lịch sử giao dịch"} goback={() => navigation.navigate("Profile")} />
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <SearchBar
                        input={searchValue}
                        setInput={handleSearch}
                        setFilterModal={setFilterVisible}
                        placeHolder={"Tìm kiếm khóa học..."}
                    />
                </View>
                {
                    loading ?
                        <SpinnerLoading />
                        :
                        <>
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
                                                {/* <View
                                                    style={styles.tracsactionImage}
                                                >
                                                    <Image
                                                        source={WalletIcon}
                                                    />
                                                </View> */}
                                                <View>
                                                    <Text style={{ ...styles.boldText, fontSize: 18 }}>{getTransactionType(item.type)}</Text>
                                                    <Text style={{ marginVertical: 5 }}>Từ : {getTransactionFrom(item.method)} </Text>
                                                    <Text>{formatTime(item?.createdTime) + " - " + formatDate(item?.createdTime)}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text>{item.type === "TopUp" ? "+" : "-"} {formatPrice(item.money)}đ</Text>
                                            </View>
                                            <View style={styles.tracsactionIcon}>
                                                <Icon name={"chevron-right"} color={"#000000"} size={30} />
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </>
                }
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
        padding: 10,
        borderColor: "#D9D9D9",
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        marginVertical: 5,
        backgroundColor: "rgba(222, 229, 239, 1)",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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