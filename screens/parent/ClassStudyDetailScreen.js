import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import NotificationModal from '../../components/modal/NotificationModal';
import { formatDate } from '../../util/util';

// import ThuyTienAvt from "../assets/images/ThuyTienAvt.png"
import ProcessBar from '../../components/ProcessBar';
import CircularProgressBar from '../../components/CircularProgressBar';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const programEducationDefault = [
    {
        name: "Giới thiệu khái quát Toán Tư Duy.",
        expand: false,
        complete: true,
        date: "2023-12-31T00:00:00",
        list: [
            {
                name: "Giới thiệu khóa học"
            },
            {
                name: "Làm quen với Toán Tư Duy"
            },
            {
                name: "Những con số xếp hàng"
            },
        ]
    },
    {
        name: "Rèn kỹ năng so sánh, thống kê, cân thăng bằng. ",
        expand: false,
        complete: true,
        date: "2024-01-09T00:00:00",
        list: [
            {
                name: "Cân thăng bằng"
            },
            {
                name: "Làm quen với cái cân"
            },
            {
                name: "Bé tập thống kê"
            },
            {
                name: "Các số xếp hàng"
            },
            {
                name: "Trò chơi đếm cách"
            },
            {
                name: "Kiểm tra 1"
            },
        ]
    },
    {
        name: "Làm quen các số từ 0 đến 10, tập đếm đến 20, ... ",
        expand: false,
        complete: false,
        date: "2024-01-10T00:00:00",
        list: [
            {
                name: "Số nào ở đâu?"
            },
            {
                name: "Que tính kì diệu"
            },
            {
                name: "Cộng thêm với 10"
            },
            {
                name: "Cộng trừ đến 20"
            },
            {
                name: "Trong “3” có “1” và “2”"
            },
            {
                name: "Làm thế nào để tính nhanh"
            },
            {
                name: "Sudoku"
            },
            {
                name: "Bài kiểm tra 2"
            },
        ]
    },
    {
        name: "Sáng tạo với hình học, xếp vòng.",
        expand: false,
        complete: false,
        date: "2024-01-11T00:00:00",
        list: [
            {
                name: "Khối trụ"
            },
            {
                name: "khối cầu"
            },
            {
                name: "Khối lập phương"
            },
            {
                name: "Thử tài đoán vật"
            },
            {
                name: "Tập làm kiến trúc sư"
            },
        ]
    },
    {
        name: "Các bài toán vận dụng thực tiễn.",
        expand: false,
        complete: false,
        date: "2024-01-11T00:00:00",
        list: [
            {
                name: "Câu đố hoa quả"
            },
            {
                name: "Chiếc hộp có chứa được quả không?"
            },
            {
                name: "Bảy ngày trong tuần"
            },
            {
                name: "Mười hai tháng trong năm"
            },
            {
                name: "Bông hoa đồng hồ"
            },
            {
                name: "Bài đánh giá năng lực"
            },
        ]
    },
]

export default function ClassStudyDetailScreen({ route, navigation }) {
    let classDetail = route?.params?.classDetail
    const [programEducation, setProgramEducation] = useState(programEducationDefault)
    let count = 0

    useEffect(() => {
        classDetail = route?.params?.classDetail
    }, [route?.params?.classDetail])

    const handleViewDetail = () => {
        navigation.push("ClassContentScreen", { classDetail: classDetail })
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={classDetail.title} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>


                <View style={{ ...styles.flexColumnCenter, marginVertical: 15 }}>
                    <Text style={{ ...styles.title, textAlign: "center" }}>Lớp Toán Tư Duy 2 - TTD2</Text>
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Chi tiết:</Text>
                </View>
                <View style={styles.classDetail}>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Ngày học:
                        </Text>
                        <Text style={styles.classValue}>
                            Thứ 5 , 02/12/2023
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Thời gian:
                        </Text>
                        <Text style={styles.classValue}>
                            17h30 - 19h
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Hình Thức:
                        </Text>
                        <Text style={styles.classValue}>
                            Offline
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Phòng học:
                        </Text>
                        <Text style={styles.classValue}>
                            P001
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Tình trạng:
                        </Text>
                        <Text style={styles.classValue}>
                            Đã điểm danh
                        </Text>
                    </View>

                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Nội dung buổi học:</Text>
                </View>
                <View style={styles.programcontent}>
                    <Text style={styles.boldText}>Buổi 7: {formatDate("2024-01-11T00:00:00")}</Text>
                    <Text style={styles.boldText} numberOfLines={1}>Chủ đề 3 - Làm quen các số từ 0 đến 10, tập đếm đến 20, ... </Text>
                    <Text style={{ marginLeft: 10 }} >Bài 10: Số nào ở đâu?</Text>
                    <Text style={{ marginLeft: 10 }}>Bài 11:  Que tính kỳ diệu</Text>
                    <TouchableOpacity style={styles.startProgram} onPress={handleViewDetail}>
                        <Text style={{ ...styles.boldText, color: "#4582E6" }}>Xem Chi Tiết</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Mức độ hoàn thành khóa học:</Text>
                </View>

                <View style={styles.processBar}>
                    <CircularProgressBar
                        value={100}
                        inActiveStrokeColor={"#7388A95A"}
                        activeStrokeColor={"#5BBF4A"}
                    />
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Đánh giá của giáo viên:</Text>
                </View>
                <View style={{ ...styles.flexColumn, marginHorizontal: WIDTH * 0.08, alignItems: "baseline" }}>
                    <Icon name={"circle"} color={"#000000"} size={12} />
                    <Text> Đánh giá của giáo viên:</Text>
                    <Text style={{ ...styles.boldText, color: "#2C8535" }}> Tốt</Text>
                </View>


                <View style={styles.titleView}>
                    <Text style={styles.title}>Nội dung buổi học:</Text>
                </View>

                <ScrollView style={styles.program}>
                    {
                        programEducation?.map((item, index) => {
                            return (
                                <View
                                    style={{
                                        ...styles.mainTab,
                                        // borderBottomWidth: item.expand ? 1 : 0,
                                        backgroundColor: index % 2 === 1 ?
                                            item.complete ?
                                                "#8EE69F"
                                                :
                                                "#C2D9FF"
                                            :
                                            "white",
                                    }}
                                    key={index}
                                >
                                    <TouchableOpacity
                                        style={{
                                            ...styles.flexColumnBetween,
                                            // alignItems: "baseline",
                                            paddingVertical: 8,
                                            paddingRight: 10,
                                            borderRadius: 10,
                                            // borderWidth: 1,
                                        }}
                                        onPress={() => {
                                            const updatedProgramEducation = [...programEducation];
                                            updatedProgramEducation[index].expand = !updatedProgramEducation[index].expand;
                                            setProgramEducation(updatedProgramEducation);
                                        }}
                                    >
                                        <Text style={styles.mainText} numberOfLines={1}>{"Buổi " + (index + 1) + " - " + formatDate(item.date)}</Text>
                                        {
                                            item.complete ?
                                                <Icon name={"check-circle"} color={"#2C8535"} size={25} />
                                                :
                                                !item.expand ?
                                                    <Icon name={"plus"} color={"#241468"} size={25} />
                                                    :
                                                    <Icon name={"minus"} color={"#241468"} size={25} />
                                        }
                                    </TouchableOpacity>

                                    {
                                        item.expand &&
                                        <>
                                            <View style={{ ...styles.flexColumn, paddingVertical: 8 }} >
                                                <Text
                                                    style={styles.mainText}
                                                    numberOfLines={1}
                                                >
                                                    {"Chủ đề " + (index + 1) + " - " + item.name}
                                                </Text>
                                            </View>
                                            {
                                                item.list.map((element, key) => {
                                                    count += 1
                                                    return (
                                                        <Text style={styles.childText} key={key}>{count}. {element.name}</Text>
                                                    )
                                                })
                                            }
                                        </>

                                    }
                                </View>
                            )
                        })
                    }
                </ScrollView>
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
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
        marginBottom: 5,
    },

    titleView: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderLeftWidth: 5,
        borderLeftColor: "#4582E6",
        marginVertical: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#4582E6",
        fontWeight: "600",
        fontSize: 18,
    },
    classDetail: {
        width: WIDTH * 0.9,
        padding: 20,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        backgroundColor: "rgba(69, 130, 230, 0.28)"
    },
    classValue: {
        color: "#888888"
    },
    programcontent: {
        position: 'relative',
        width: WIDTH * 0.9,
        paddingBottom: 30,
        marginHorizontal: WIDTH * 0.05,
    },
    startProgram: {
        position: "absolute",
        bottom: 0,
        right: 0
    },
    processBar: {
        width: WIDTH,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    program: {
        width: WIDTH * 0.9,
        // maxHeight: HEIGHT * 0.4,
        // paddingBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        marginBottom: 50,
        overflow: "hidden",
        backgroundColor: "white"
    },
    mainTab: {
        // paddingVertical: 10,
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.2)",
        // marginBottom: 10,
        backgroundColor: "white",
    },
    mainText: {
        width: "90%",
        fontWeight: "600",
        color: "#241468",
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    childText: {
        paddingLeft: 30,
        marginBottom: 5,
    },
    teacherInfor: {
        flexDirection: "row",
        width: WIDTH * 0.9,
        paddingBottom: 50,
        marginHorizontal: WIDTH * 0.05,
        alignItems: "center",
    },
    teachAvt: {
        width: 150,
        height: 160,
        borderRadius: 150,
    },
    infor: {
        marginLeft: 10,
    },
    viewButton: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#4582E6",
    },

    detail: {
        marginLeft: 10,
    }
});