import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import DropdownCustom from '../components/DropdownCustom';

import Header from '../components/header/Header';
import { formatPrice } from '../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const studentListDefault = [
    {
        id: 0,
        name: "Lê Bảo Ngọc",
        age: "10",
        dob: "2-2-2002",
        check: true,
    },
    {
        id: 1,
        name: "Trần Hữu Nghĩa",
        age: "11",
        dob: "2-2-2003",
        check: false,
    },
]

export default function RegisterClassScreen({ route, navigation }) {

    const [courseList, setCourseList] = useState(route?.params?.courseList)
    // const [dropdownVisible, setDropdownVisible] = useState({ infor: false })

    const handleNavigate = () => {
        const choosedList = courseList.filter(item => item.choose === true)
        navigation.push("MultipleRegisScreen", { courseList: choosedList })
    }

    return (
        <>
            <Header navigation={navigation} background={"#FF8F8F"} title={"Đăng Ký Khóa Học"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Thông Tin Đăng Ký</Text>
                </View>
                <View style={styles.table}>
                    <View style={{ ...styles.tableColumn, borderRadius: 15 }}>
                        <View style={[styles.courseName, styles.tabRightBorder, styles.tableHeader]}>
                            <Text style={[styles.tableText, styles.tableHeaderText]}>Tên khóa học</Text>
                        </View>
                        <View style={[styles.studentInfor, styles.tabRightBorder, styles.tableHeader]}>
                            <Text style={[styles.tableText, styles.tableHeaderText]}>Thông tin của cháu</Text>
                        </View>
                        <View style={[styles.calendar, styles.tabRightBorder, styles.tableHeader]}>
                            <Text style={[styles.tableText, styles.tableHeaderText]}>Lịch học</Text>
                        </View>
                        <View style={[styles.classPrice, styles.tableHeader]}>
                            <Text style={[styles.tableText, styles.tableHeaderText]}>Học Phí</Text>
                        </View>
                    </View>
                    {
                        courseList?.filter(item => item.choose === true)?.map((item, index) => {
                            return (
                                <View style={{ ...styles.tableColumn, borderBottomWidth: 1, borderColor: "#F9ACC0" }} key={index}>
                                    <View style={[styles.courseName, styles.tabRightBorder]}>
                                        <Text style={{ ...styles.tableText, color: "#3AA6B9", fontWeight: "600" }} numberOfLines={1}>{item.name}</Text>
                                    </View>
                                    <View style={[styles.studentInfor, styles.tabRightBorder]}>
                                        <DropdownCustom
                                            // onClick={() => setDropdownVisible({ ...dropdownVisible, infor: !dropdownVisible.infor })}
                                            dropdownList={studentListDefault}
                                            // Element={
                                            //     <TouchableOpacity onPress={() => chooseStudent(item)}>
                                            //         <Text style={styles.dropdownElement}>
                                            //             {item.name}
                                            //         </Text>
                                            //     </TouchableOpacity>
                                            // }
                                            maxHeight={100}
                                            maxWidth={150}
                                            label={"Thêm thông tin cháu"}
                                            labelStyle={styles.labelStyle}
                                        />
                                        {/* <Text style={[styles.tableText]} numberOfLines={1}>Thông tin của cháu</Text> */}
                                    </View>
                                    <View style={[styles.calendar, styles.tabRightBorder]}>
                                        <Text style={[styles.tableText]} >Lịch học</Text>
                                    </View>
                                    <View style={[styles.classPrice]}>
                                        <Text style={[styles.tableText]} numberOfLines={1}>Học Phí</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={{ ...styles.flexColumnBetween, paddingHorizontal: 20, marginVertical: 20 }}>
                    <Text style={styles.boldText}>Tổng thanh toán</Text>
                    <Text style={styles.price}>{formatPrice(0)}đ</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomButton}>
                <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                    <Text style={{ color: "white" }}>
                        Đăng Ký Ngay
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleView: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderLeftWidth: 5,
        borderLeftColor: "#FF8F8F",
        marginVertical: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#FF8F8F",
        fontWeight: "600",
        fontSize: 18,
    },
    table: {
        width: WIDTH * 0.9,
        borderRadius: 15,
        marginHorizontal: WIDTH * 0.05,
        // overflow: "hidden",
        backgroundColor: "rgba(249, 172, 192, 0.2)",
        zIndex: 10,
    },
    tableColumn: {
        flexDirection: "row",
    },
    tableText: {
        fontSize: 10,
        padding: 8,
        paddingVertical: 15,
        color: "#888888"
    },
    tableHeaderText: {
        color: "#FF8D9D",
        fontWeight: "600",
    },
    tableHeader: {
        backgroundColor: "rgba(255, 141, 157, 0.4)",
    },
    tabRightBorder: {
        borderRightWidth: 1,
        borderColor: "#FF8F8F"
    },
    courseName: {
        width: '28%'
    },
    studentInfor: {
        width: '38%'
    },
    calendar: {
        width: '18%'
    },
    classPrice: {
        width: '16%'
    },
    price: {
        color: "#FF8D9D"
    },
    boldText: {
        fontWeight: "700"
    },

    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center"
    },

    dropdownElement: {
        padding: 5,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#FF8F8F"
    },

    bottomButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 8,
        paddingBottom: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        padding: 15,
        paddingHorizontal: 40,
        borderRadius: 15,
        backgroundColor: "#FF8D9D",
    }
});