import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../components/header/Header';

import { formatPrice } from '../util/util';

const studentListDefault = [
    {
        name: "Lê Bảo Ngọc",
        age: "10",
        check: true,
        choose: false,
    },
    {
        name: "Trần Hữu Nghĩa",
        age: "11",
        check: true,
        choose: false,
    },
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function CartScreen({ navigation }) {

    const [studentList, setStudentList] = useState(studentListDefault)

    useFocusEffect(
        React.useCallback(() => {
            setStudentList(studentListDefault)
        }, [])
    );

    const allSelected = () => {
        const selectedList = studentList.filter(vourcher => vourcher.choose === true);
        if (selectedList.length === studentList.length) {
            return true
        } else {
            return false
        }
    }

    const handleSelectAll = () => {
        const updatedList = [...studentList];
        if (allSelected()) {
            updatedList.forEach((item) => { item.choose = false })
        } else {
            updatedList.forEach((item) => { item.choose = true })
        }
        setStudentList(updatedList)
    }

    const removeCard = (index) => {
        const updatedList = [...studentList];
        updatedList.splice(index, 1);
        setStudentList(updatedList)
    }

    const deleteAll = () => {
        const updatedList = [];
        setStudentList(updatedList)
    }

    const InforCard = ({ item, index }) => {
        return (
            <View style={{ ...styles.flexColumn, position: "relative" }}>
                <TouchableOpacity
                    style={{
                        ...styles.check,
                        position: "absolute",
                        top: 0,
                        backgroundColor: item.choose ? "#3AAC45" : "white",
                        borderColor: item.choose ? "#3AAC45" : "#000000"
                    }}
                    onPress={() => {
                        setStudentList((prevAgeOption) => {
                            const updatedList = [...prevAgeOption];
                            updatedList[index].choose = !updatedList[index].choose;
                            return updatedList;
                        });
                    }}
                >
                    {item.choose && <Icon name={"check"} color={"white"} size={22} />}
                </TouchableOpacity>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>
                            Học Viên:
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => (removeCard(index))}>
                            <Icon name={"close"} color={"#C71212"} size={18} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardContent}>
                        <View style={{ ...styles.flexColumn, marginVertical: 10 }}>
                            <Text style={{ color: "#B8B8D2" }}>Thêm thông tin học viên </Text>
                            <Text style={{ ...styles.boldText, marginLeft: 5, fontSize: 25, color: "#9B51E0" }}>+</Text>
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
                                <Text style={{ ...styles.boldText, color: "#3A0CA3", width: "60%" }}>Lớp học Toán Tư Duy cho trẻ mới bắt đầu (Cơ Bản) </Text>
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
                        <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>{formatPrice(200000)} đ</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            <Header navigation={navigation} background={"#F5F5F5"} />
            <Text style={styles.title}>Giỏ Hàng</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {
                    studentList.length !== 0 &&
                    <>
                        <View style={{ ...styles.flexColumn, marginBottom: 20, position: "relative" }}>
                            <TouchableOpacity style={styles.flexColumn} onPress={handleSelectAll}>
                                <View style={{ ...styles.check, marginRight: 10, backgroundColor: allSelected() ? "#3AAC45" : "white", borderColor: allSelected() ? "#3AAC45" : "#000000" }}>
                                    {allSelected() && <Icon name={"check"} color={"white"} size={22} />}
                                </View>
                                <Text>
                                    Chọn Tất Cả
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bin} onPress={deleteAll}>
                                <Icon name={"delete"} color={"rgba(136,136,136,0.65)"} size={28} />
                            </TouchableOpacity>
                        </View>
                        {
                            studentList?.map((item, index) => {
                                return <InforCard item={item} index={index} key={index} />
                            })
                        }
                        <View style={{ ...styles.flexColumnBetween, paddingBottom: 40, marginTop: 10 }}>
                            <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>Tổng Tiền: </Text>
                            <Text style={{ ...styles.boldText, color: "#3A0CA3" }}>{formatPrice(400000)} đ</Text>
                        </View>
                    </>
                }
            </ScrollView>

            <View style={styles.buttonContainer}>
                {
                    studentList.length !== 0 &&
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: "#C71212" }}>
                        <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>Đăng Ký</Text>
                    </TouchableOpacity>
                }
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
        width: WIDTH * 0.8,
        borderWidth: 1,
        borderRadius: 10,
        borderTopWidth: 0,
        marginBottom: 20,
        marginHorizontal: WIDTH * 0.1,
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

    check: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
    },

    closeButton: {
        position: "absolute",
        right: 15,
        borderWidth: 2,
        borderColor: "#C71212",
        borderRadius: 15,
    },

    buttonContainer: {
        position: "absolute",
        height: 79,
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
    },
    bin:{
        position: "absolute",
        right: 10,
    }
});