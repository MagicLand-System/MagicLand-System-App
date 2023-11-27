import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../components/header/Header';
import ClassCard from '../components/ClassCard';
import { truncateString } from '../util/util';

import courseDetailBackground from "../assets/images/courseDetailBackground.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const classCardDetail = [
    {
        img: undefined,
        avt: undefined,
        status: true,
        title: "Lớp học Toán Tư Duy cho trẻ mới bắt đầu (Cơ Bản)",
        age: 8,
        place: "Cơ sở 1",
        timeFrom: "18:30",
        timeTo: "20:00",
        rate: 4.6,
        registerAmount: 8,
        price: 200000,
    },
    {
        img: undefined,
        avt: undefined,
        status: true,
        title: "Lớp học Toán Tư Duy cho trẻ mới bắt đầu (Cơ Bản)",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 8,
        price: 200000,
    }
]

export default function CourseDetailScreen({ route, navigation }) {

    const [viewDetail, setViewDetail] = useState({ detail: false, course: false })
    let course = route?.params?.course

    useEffect(() => {
        setViewDetail({ detail: false, course: false })
        course = route?.params?.course
    }, [route?.params?.course])

    return (
        <>
            <Header navigation={navigation} background={"#fff"} goback={() => { navigation.navigate("CourseScreen") }} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.banner}>
                    <Image source={courseDetailBackground} style={styles.bannerBackground} />
                    <Text style={styles.bannerName}>{course?.name}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Khóa học Toán Tư Duy
                    </Text>
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
                                        <View style={styles.detailColumn} key={key}>
                                            <View style={styles.detailColumnIcon}>
                                                <Icon name={"arrow-right-alt"} color={"#1BAE3B"} size={32} />
                                            </View>
                                            <Text style={{ ...styles.descrip, fontWeight: "600" }}>
                                                {item?.name + ": "}
                                            </Text>
                                        </View>

                                    )
                                })}
                            </View>
                            <View>
                                {course?.courseDetail?.map((item, key) => {
                                    return (
                                        <View style={styles.detailColumn} key={key}>
                                            <Text style={{ ...styles.descrip, width: WIDTH * 0.5 }}>
                                                {item?.detail}
                                            </Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    }
                    <Text style={{ ...styles.title, marginTop: 20 }}>
                        {`Các Lớp Thuộc Khóa Học:   `}
                        <TouchableOpacity onPress={() => { navigation.navigate("ClassScreen", { course: course }) }}>
                            <Text style={styles.viewDetail}>
                                Xem cất cả
                            </Text>
                        </TouchableOpacity>
                    </Text>
                    <View style={styles.cardList}>
                        {classCardDetail?.map((item, key) => {
                            return <ClassCard card={item} course={course} goback={() => { navigation.navigate("CourseDetailScreen", { course: course }) }} navigation={navigation} key={key} />
                        })}
                    </View>
                </View>
            </ScrollView>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    banner: {
        position: "relative",
        width: WIDTH,
    },
    bannerBackground: {
        width: WIDTH,
    },
    bannerName: {
        position: "absolute",
        top: "10%",
        left: "10%",
        fontSize: 20,
        fontWeight: "700"
    },
    content: {
        width: WIDTH,
        padding: 20,
        // paddingBottom: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "white",
        // transform: [{ translateY: -(HEIGHT * 0.05) }]
    },
    title: {
        fontSize: 18,
        fontWeight: "700"
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
        width: WIDTH * 0.45,
        flexDirection: 'row',
        alignItems: "center"
    },
    detailColumnIcon: {
        transform: [{ translateY: 5 }]
    },
    cardList: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 15,
    }
});