import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../components/header/Header';
import NotificationModal from '../components/modal/NotificationModal';

import defaultImage from "../assets/classCard/defaultImage.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ClassDetailScreen({ route, navigation }) {
    let classDetail = route?.params?.classDetail

    useEffect(() => {
        classDetail = route?.params?.classDetail
    }, [route?.params?.classDetail])

    return (
        <>
            <Header navigation={navigation} background={"#FF8F8F"} goback={navigation.pop} title={"Thông Tin Chi Tiết Của Lớp Học"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ ...styles.flexColumn, padding: 8, paddingLeft: 35, borderBottomWidth: 1, borderColor: "#F9ACC0", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"book"} color={"#FF8D9D"} size={50} />
                    <View style={styles.detail}>
                        <Text style={styles.boldText}>Khóa học:</Text>
                        <Text>{classDetail.title}</Text>
                    </View>
                </View>
                <View style={{ ...styles.flexColumn, padding: 10, paddingLeft: 35, borderBottomWidth: 1, borderColor: "#F9ACC0", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"calendar-check"} color={"#FF8D9D"} size={50} />
                    <View style={styles.detail}>
                        <Text style={styles.boldText}>Thời gian:</Text>
                        <Text>Thứ 2 - 4- 6 (7h30 - 9h)</Text>
                    </View>
                </View>
                <View style={{ ...styles.flexColumn, padding: 10, paddingLeft: 35, borderBottomWidth: 1, borderColor: "#F9ACC0", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"notebook-multiple"} color={"#FF8D9D"} size={50} />
                    <View style={styles.detail}>
                        <Text style={styles.boldText}>Số Buổi Đã Tham Gia:</Text>
                        <Text>0 / 20 Buổi</Text>
                    </View>
                </View>
                <View style={{ ...styles.flexColumn, padding: 10, paddingLeft: 35, borderBottomWidth: 1, borderColor: "#F9ACC0", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"circle"} color={"#5A5A5A"} size={50} />
                    <View style={styles.detail}>
                        <Text style={styles.boldText}>Hình Thức:</Text>
                        <Text>Cô Mai</Text>
                    </View>
                </View>
                <View style={{ ...styles.flexColumn, padding: 10, paddingLeft: 35, borderBottomWidth: 1, borderColor: "#F9ACC0", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"account-circle"} color={"#FF8D9D"} size={50} />
                    <View style={styles.detail}>
                        <Text style={styles.boldText}>Giáo Viên</Text>
                        <Text>Cô Mai</Text>
                    </View>
                </View>
                <View style={{ ...styles.flexColumn, padding: 10, paddingLeft: 35, borderBottomWidth: 1, borderColor: "#F9ACC0", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"flag"} color={"#FFC90C"} size={50} />
                    <View style={styles.detail}>
                        <Text style={styles.boldText}>Trạng Thái:</Text>
                        <Text>{classDetail.type}</Text>
                    </View>
                </View>
                <View style={{ ...styles.flexColumn, padding: 10, paddingLeft: 35, borderBottomWidth: 1, borderColor: "#F9ACC0", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"book"} color={"#FF8D9D"} size={50} />
                    <View style={styles.detail}>
                        <Text style={styles.boldText}>Ngày Đăng Ký</Text>
                        <Text>Toán Tư Duy - Lớp Toán Tư Duy 2</Text>
                    </View>
                </View>

            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
    },
    contentContainer: {
        paddingBottom: 80,
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
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
        marginBottom: 5,
    },

    detail: {
        marginLeft: 10,
    }
});