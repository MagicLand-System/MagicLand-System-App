import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../components/header/Header';
import NotificationModal from '../components/modal/NotificationModal';

import defaultImage from "../assets/classCard/defaultImage.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ClassDetailScreen({ route, navigation }) {
    let course = route?.params?.course
    let classDetail = route?.params?.classDetail
    let goback = route?.params?.goback

    useEffect(() => {
        course = route?.params?.course
        classDetail = route?.params?.classDetail
        goback = route?.params?.goback
    }, [route?.params?.course, route?.params?.classDetail, route?.params?.goback])

    const [notificateModalVisible, setNotificateModalVisible] = useState(false)

    const handleRegister = () => {
        navigation.navigate("ClassRegisterScreen", { course: course, classDetail: classDetail, goback: goback })
    }

    const handleNotification = () => {
        setNotificateModalVisible(true);
        setTimeout(() => {
            setNotificateModalVisible(false);
        }, 1000);
    }

    return (
        <>
            <Header navigation={navigation} background={"#F5F5F5"} goback={goback} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <Text style={styles.title}>{classDetail?.title}</Text>
                <View style={styles.contentContainer}>
                    <Image source={classDetail?.img ? classDetail?.img : defaultImage} style={styles.banner} resizeMode="cover" />
                    <Text style={styles.title}>{classDetail?.title}</Text>
                    <View style={{ ...styles.flexColumnAround, width: WIDTH * 0.6, marginHorizontal: WIDTH * 0.2, marginBottom: 20 }}>
                        <View style={styles.flexColumn}>
                            <Icon name={"person"} color={"#C8A9F1"} size={22} />
                            <Text style={{ ...styles.boldText, color: "#C8A9F1", }}>{classDetail?.registerAmount} người đăng ký</Text>
                        </View>
                        <View style={styles.flexColumn}>
                            <Text style={{ ...styles.boldText, color: "#F4A120", }}>{classDetail?.rate}</Text>
                            <Icon name={"star"} color={"#F4A120"} size={22} />
                        </View>
                    </View>
                    <View style={{ ...styles.flexColumnCenter, marginBottom: 20 }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.boldText}>Độ Tuổi</Text>
                            <Text style={styles.boldText}>{classDetail?.age} Tuổi</Text>
                        </View>
                        <View style={styles.centerLine} />
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.boldText}>Thời Gian</Text>
                            <Text style={styles.boldText}>{classDetail?.timeFrom} - {classDetail?.timeTo}</Text>
                        </View>
                        <View style={styles.centerLine} />
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.boldText}>Địa Chỉ</Text>
                            <Text style={styles.boldText}>Home</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.flexColumnCenter, marginBottom: 20 }}>
                        <View style={styles.priceView}>
                            <Text style={{ ...styles.boldText, color: "#C71212", padding: 10, }}>{classDetail?.price} / Học Viên</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>Thông Tin Chi Tiết</Text>
                    <View style={{ ...styles.detailCard, marginBottom: 20 }}>
                        <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                            <Text style={styles.boldText}>Lớp học:</Text>
                            <Text style={styles.cardText}>Toán Tư Duy cho trẻ mới bắt đầu (Cơ Bản)</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                            <Text style={styles.boldText}>Số Buổi Học:</Text>
                            <Text style={styles.cardText}>4 buổi / tuần</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                            <Text style={styles.boldText}>Ngày Bắt Đầu:</Text>
                            <Text style={styles.cardText}>11/11/2023</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                            <Text style={styles.boldText}>Ngày Kết Thúc:</Text>
                            <Text style={styles.cardText}>14/11/2023</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                            <Text style={styles.boldText}>Thời gian:</Text>
                            <Text style={styles.cardText}>18:00 - 20:00</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                            <Text style={styles.boldText}>Hình Thức:</Text>
                            <Text style={styles.cardText}>Online</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                            <Text style={styles.boldText}>Phòng Học:</Text>
                            <Text style={styles.cardText}>001</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
                            <Text style={styles.boldText}>Cơ Sở:</Text>
                            <Text style={styles.cardText}>Cơ Sở 1, 123 ABC QUẬN 1</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.flexColumnCenter, width: WIDTH * 0.9, marginHorizontal: WIDTH * 0.05, marginBottom: 20 }}>
                        <View style={{ width: "45%" }}>
                            <Image style={styles.teacherAvt} source={defaultImage} resizeMode="cover" />
                            <Text style={{ fontSize: 16 }} >
                                “Hãy cùng cô tìm hiểu thêm về Toán Tư Duy nhé”
                            </Text>
                        </View>
                        <View style={{ width: "50%", marginLeft: "5%" }}>
                            <Text style={{ ...styles.boldText, fontSize: 16, textAlign: "center", marginBottom: 10, color: "#C8A9F1" }}> Giáo Viên Giảng Dạy:</Text>
                            <Text style={{ ...styles.boldText, fontSize: 16, textAlign: "center", marginBottom: 10, color: "#3A0CA3" }}> Cô Hà My</Text>
                            <View style={{ ...styles.flexColumn, alignItems: "flex-start" }}>
                                <Icon name={"check-circle"} color={"#3AAC45"} size={22} />
                                <Text style={{ ...styles.boldText, width: WIDTH * 0.35, marginBottom: 10, marginLeft: 10 }}>Tốt nghiệp loại giỏi Đại Học ABC</Text>
                            </View>
                            <View style={{ ...styles.flexColumn, alignItems: "flex-start" }}>
                                <Icon name={"check-circle"} color={"#3AAC45"} size={22} />
                                <Text style={{ ...styles.boldText, width: WIDTH * 0.35, marginBottom: 10, marginLeft: 10 }}>Kinh nghiệm 5 năm giảng dạy bộ môn Toán Tư Duy - Giao viên Trường Quốc tế AAA</Text>
                            </View>
                            <View style={{ ...styles.flexColumn, alignItems: "flex-start" }}>
                                <Icon name={"check-circle"} color={"#3AAC45"} size={22} />
                                <Text style={{ ...styles.boldText, width: WIDTH * 0.35, marginBottom: 10, marginLeft: 10 }}>Tận tâm với nghề và được nhiều phụ huynh học sinh yêu thích</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleNotification}>
                    <Text style={{ ...styles.boldText, padding: 15, color: "#C71212" }}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.button, backgroundColor: "#C71212" }} onPress={handleRegister}>
                    <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>Đăng Ký Ngay</Text>
                </TouchableOpacity>
            </View>
            <NotificationModal visible={notificateModalVisible} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
    },
    title: {
        width: WIDTH * 0.8,
        marginHorizontal: WIDTH * 0.1,
        marginVertical: 20,
        fontSize: 25,
        fontWeight: "600"
    },
    contentContainer: {
        paddingBottom: 80,
        backgroundColor: 'white',
    },
    banner: {
        width: WIDTH,
        height: WIDTH * 0.5,
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
    centerLine: {
        width: 3,
        height: "100%",
        backgroundColor: "#3A0CA3",
        marginHorizontal: 15,
    },
    priceView: {
        borderWidth: 1,
        borderColor: "#C71212",
        borderRadius: 10,
    },
    detailCard: {
        width: WIDTH * 0.9,
        padding: 20,
        borderRadius: 15,
        marginHorizontal: WIDTH * 0.05,
        backgroundColor: "#F9D2DD"
    }, 
    cardText: {
        width: WIDTH * 0.5,
        textAlign: "right"
    },
    teacherAvt: {
        width: WIDTH * 0.4,
        height: WIDTH * 0.4,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: "rgba(0,0,0,0.1)"
    },

    buttonContainer: {
        position: "absolute",
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    }
});