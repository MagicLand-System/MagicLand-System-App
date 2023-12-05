import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../components/header/Header';
import ClassCard from '../components/ClassCard';
import { truncateString, formatPrice } from '../util/util';

import courseDetailBackground from "../assets/images/courseDetailBackground.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const classCardDetailDefault = [
    {
        id: 0,
        status: true,
        title: "Lớp Toán Tư Duy 1",
        age: 8,
        place: "Cơ sở 1",
        timeFrom: "18:30",
        timeTo: "20:00",
        rate: 4.6,
        registerAmount: 1,
        price: 200000,
        leasonAmount: 20,
        choose: false,
    },
    {
        id: 1,
        status: false,
        title: "Lớp Toán Tư Duy 2",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 1,
        price: 200000,
        leasonAmount: 20,
        choose: false,
    },
    {
        id: 2,
        status: false,
        title: "Lớp Toán Tư Duy 3",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 1,
        price: 200000,
        leasonAmount: 20,
        choose: false,
    },
    {
        id: 3,
        status: true,
        title: "Lớp Toán Tư Duy 4",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 1,
        price: 200000,
        leasonAmount: 20,
        choose: false,
    },
]

export default function CourseDetailScreen({ route, navigation }) {

    const [viewDetail, setViewDetail] = useState({ detail: false, course: false })
    const [classCardDetail, setClassCardDetail] = useState(classCardDetailDefault)
    let course = route?.params?.course

    useEffect(() => {
        setViewDetail({ detail: false, course: false })
        setClassCardDetail(classCardDetailDefault)
        course = route?.params?.course
    }, [])

    const goback = () => {
        if (route?.params?.goback) {
            route?.params?.goback()
        } else {
            navigation.navigate("CourseScreen")
        }
    }

    const selectCourse = (id) => {
        const index = classCardDetail.findIndex(obj => obj.id === id);
        const updateArray = [...classCardDetailDefault]
        const defaultStatus = updateArray[index].choose
        updateArray.forEach(item => item.choose = false)
        updateArray[index].choose = !defaultStatus;
        setClassCardDetail(updateArray)
    }

    const handleRegister = () => {
        navigation.push("ClassRegisterScreen", { course: course, classList: classCardDetail })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.banner}>
                <Image source={course?.img} style={styles.bannerBackground} resizeMode="cover" />
                <View style={styles.bannerHeader}>
                    <TouchableOpacity onPress={goback}>
                        <Icon name={"chevron-left"} color={"#FF8D9D"} size={32} />
                    </TouchableOpacity>
                    <View style={styles.flexColumn}>
                        <View style={styles.headerIcon}><Icon name={"book"} color={"#FF8D9D"} size={28} /></View>
                        <View style={styles.headerIcon}><Icon name={"bell"} color={"#FF8D9D"} size={28} /></View>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.flexColumn}>
                    <Text style={{ ...styles.title, width: WIDTH * 0.55 }}>
                        Khóa Học: {course?.name}
                    </Text>
                    <View style={styles.priceView}>
                        <Text style={{ ...styles.priceText }}>
                            {formatPrice(course?.coursePrice)} đ
                        </Text>
                    </View>
                </View>
                <View style={{
                    ...styles.flexBetweenColumn, width: WIDTH * 0.75, marginHorizontal: WIDTH * 0.025,
                    marginVertical: 20
                }}>
                    <View style={styles.flexColumn}>
                        <Icon name={"account"} color={"#3AAC45"} size={32} />
                        <Text style={styles.cardText}>{course.rateCount} người đăng ký</Text>
                    </View>
                    {
                        course.rateCount !== 0 ?
                            <View style={styles.flexColumn}>
                                <Icon name={"star"} color={"#FFC90C"} size={28} />
                                <Text style={styles.cardText}><Text style={{ ...styles.cardText, fontSize: 15 }}>{course.rateValue}</Text> ({course.registerAmount} lượt đánh giá)</Text>
                            </View>
                            :
                            <View style={styles.flexColumn}>
                                <Icon name={"star"} color={"#C4C4C4"} size={28} />
                                <Text style={styles.cardText}> Chưa có đánh giá</Text>
                            </View>
                    }
                </View>
                <Text style={styles.descrip}>
                    {
                        !viewDetail.detail ?
                            truncateString(course?.introduce, 109)
                            :
                            course?.introduce
                    }
                </Text>
                <Text style={{ ...styles.descrip }}>
                    {
                        !viewDetail.detail ?
                            ""
                            :
                            `(${course?.regexDescrip})`
                    }
                </Text>
                <Text style={styles.title}>
                    Vì Sao Nên Cho Bé Học Toán Tư Duy Từ Sớm?
                </Text>
                {
                    !viewDetail.detail ?
                        <View style={styles.courseFeature}>
                            <View style={styles.featureIcon}>
                                <Icon name={"check-circle-outline"} color={"#1BAE3B"} size={28} />
                            </View>
                            <View style={styles.featureText}>
                                <Text style={{ ...styles.descrip, fontWeight: "600" }}>
                                    {course?.courseFeture[0]?.name}:
                                    <Text style={styles.descrip}>
                                        {truncateString(" " + course?.courseFeture[0]?.detail, 60)}
                                        <TouchableOpacity onPress={() => { setViewDetail({ ...viewDetail, detail: true, course: false }) }}>
                                            <Text style={styles.viewDetail}>
                                                Xem Chi Tiết
                                            </Text>
                                        </TouchableOpacity>
                                    </Text>
                                </Text>

                            </View>
                        </View>
                        :
                        course?.courseFeture?.map((item, key) => {
                            return (
                                <View style={styles.courseFeature} key={key}>
                                    <View style={styles.featureIcon}>
                                        <Icon name={"check-circle-outline"} color={"#1BAE3B"} size={28} />
                                    </View>
                                    <View style={styles.featureText}>
                                        <Text style={{ ...styles.descrip, fontWeight: "600" }}>
                                            {item?.name}:
                                            <Text style={styles.descrip}>
                                                {" " + item?.detail}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            )
                        })
                }
                <Text style={{ ...styles.title, marginTop: 20 }}>
                    {`Chi Tiết Khóa Học   `}
                    <TouchableOpacity onPress={() => { setViewDetail({ ...viewDetail, course: true, detail: false }) }}>
                        <Text style={styles.viewDetail}>
                            Xem Chi Tiết
                        </Text>
                    </TouchableOpacity>
                </Text>
                {
                    viewDetail?.course &&
                    <View style={styles.courseDetail}>
                        <View>
                            {course?.courseDetail?.map((item, key) => {
                                return (
                                    <View style={styles.flexColumn} key={key}>
                                        <View style={styles.detailColumn} >
                                            <View style={styles.detailColumnIcon}>
                                                <Icon name={"arrow-right-bold-outline"} color={"#1BAE3B"} size={22} />
                                            </View>
                                            <Text style={{ ...styles.descrip, fontWeight: "600", fontSize: 13 }}>
                                                {item?.name + ": "}
                                            </Text>
                                        </View>
                                        <View style={styles.detailColumn}>
                                            <Text style={{ ...styles.descrip, width: WIDTH * 0.5 }}>
                                                {item?.detail}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                }
                <Text style={{ ...styles.title, marginTop: 20 }}>
                    {`Lịch Học Các Lớp Học: `}
                </Text>
                <View style={styles.cardList}>
                    {classCardDetail?.map((item, key) => {
                        return <ClassCard cardDetail={item} check={true} index={key} onClick={selectCourse} key={key} />
                    })}
                </View>
                <View style={{ ...styles.flexBetweenColumn, marginVertical: 15 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Quan Tâm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: "#FF8D9D" }} onPress={handleRegister}>
                        <Text style={{ ...styles.buttonText, color: "white" }}>Đăng Ký Ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    banner: {
        position: "relative",
        width: WIDTH,
        height: 150,
        marginBottom: 20,
    },
    bannerBackground: {
        width: WIDTH,
        height: 300,
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
    },
    bannerHeader: {
        width: "90%",
        position: "absolute",
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        top: "10%",
        left: "5%",
        backgroundColor: "rgba(136, 136, 136, 0.5)",
        zIndex: 10,
    },
    headerIcon: {
        marginLeft: 10,
    },
    content: {
        width: WIDTH * 0.95,
        padding: 20,
        // paddingBottom: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "white",
        marginHorizontal: WIDTH * 0.025
        // transform: [{ translateY: -(HEIGHT * 0.05) }]
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#42AEF4"
    },
    priceView: {
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 50,
        backgroundColor: "#42AEF4",
    },
    priceText: {
        color: "white",
        fontWeight: "600"
    },
    cardText: {
        fontSize: 12,
        color: "#3AAC45"
    },
    descrip: {
        marginTop: 10,
        opacity: 0.7,
        lineHeight: 18,
    },
    courseFeature: {
        flexDirection: "row",
    },
    featureIcon: {
        paddingHorizontal: 15,
        transform: [{ translateY: 10 }],
    },
    featureText: {
        width: WIDTH * 0.7,
        flexDirection: "row",
    },
    viewDetail: {
        color: "#3A0CA3",
        transform: [{ translateY: 3 }],
    },
    courseDetail: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    detailColumn: {
        minHeight: 30,
        width: WIDTH * 0.43,
        flexDirection: 'row',
        alignItems: "center",
    },
    detailColumnIcon: {
        transform: [{ translateY: 5 }],
        marginRight: 10,
    },
    cardList: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 15,
    },

    flexBetweenColumn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#FF8D9D",
        marginHorizontal: 15,
    },
    buttonText: {
        color: "#FF8D9D",
        fontWeight: "600"
    }
});