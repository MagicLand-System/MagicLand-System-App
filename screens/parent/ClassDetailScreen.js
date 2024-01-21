import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import NotificationModal from '../../components/modal/NotificationModal';
import CircularProgressBar from '../../components/CircularProgressBar';

import { formatDate } from '../../util/util';

// import ThuyTienAvt from "../assets/images/ThuyTienAvt.png"
// import ProcessBar from '../components/ProcessBar';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const programEducationDefault = [
    {
        name: "Giới thiệu khái quát Toán Tư Duy.",
        expand: false,
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

const scoreDetailDefault = [
    {
        name: "Quiz 1",
        mark: 8,
        total: 10,
    },
    {
        name: "Quiz 2",
        mark: 10,
        total: 10,
    },
    {
        name: "Thực hành 1",
        mark: 4,
        total: 10,
    },
    {
        name: "Thực hành 2",
        mark: undefined,
        total: 10,
    },
    {
        name: "Bài đánh giá năng lực",
        mark: undefined,
        total: 10,
    },
]

const progressData = [
    { label: "Tiến độ học tập", value: 85, inActiveStrokeColor: "#7388A95A", activeStrokeColor: "#5BBF4A" },
    { label: "Tình trạng điểm danh", value: 85, inActiveStrokeColor: "#7388A95A", activeStrokeColor: "#F2334E" },
    { label: "Tiến độ hoàn thành các bài kiểm tra", value: 80, inActiveStrokeColor: "#7388A95A", activeStrokeColor: "#EF892A" },
];

export default function ClassDetailScreen({ route, navigation }) {
    let classDetail = route?.params?.classDetail
    const [programEducation, setProgramEducation] = useState(programEducationDefault)
    const [currentPage, setCurrentPage] = useState(0);
    let count = 0
    

    useEffect(() => {
        classDetail = route?.params?.classDetail
    }, [route?.params?.classDetail])

    const handleScroll = (event) => {
        const page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        setCurrentPage(page);
    };

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={"Thông Tin Chi Tiết Của Lớp Học"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Khóa học:</Text>
                </View>
                <View style={styles.classDetail}>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                        <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                            Khóa học:
                        </Text>
                        <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                            {classDetail?.name}
                        </Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                        <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                            Lớp học:
                        </Text>
                        <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                            TTD2
                        </Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                        <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                            Ngày khai giảng:
                        </Text>
                        <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                            05/01/2024
                        </Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                        <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                            Lịch học
                        </Text>
                        <Text style={{ ...styles.classValue, width: "58%", textAlign: "left", color: "#3AA6B9" }}>Thứ 3 - 5 - 7 (17h - 18h:30)</Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                        <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                            Hình Thức:
                        </Text>
                        <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                            Offline
                        </Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                        <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                            Giáo viên:
                        </Text>
                        <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                            Thủy Tiên
                        </Text>
                    </View>
                    <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                        <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                            Trạng thái:
                        </Text>
                        <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                            Đang học
                        </Text>
                    </View>

                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Tiến độ:</Text>
                </View>

                <ScrollView
                    style={styles.processScrollView}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    onScroll={handleScroll}
                >
                    {progressData.map((item, index) => (
                        <View key={index} style={styles.processBar}>
                            <Text style={{ ...styles.boldText, fontSize: 20, marginBottom: 10 }}>{item.label}</Text>
                            <CircularProgressBar
                                value={item.value}
                                inActiveStrokeColor={item.inActiveStrokeColor}
                                activeStrokeColor={item.activeStrokeColor}
                            />
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.paginationContainer}>
                    {progressData.map((item, index) => (
                        <Icon
                            key={index}
                            name={"circle"}
                            color={currentPage === index ? item.activeStrokeColor : "#7388A95A"}
                            size={18}
                            style={styles.paginationIcon}
                        />
                    ))}
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Chương trình giảng dạy:</Text>
                </View>

                <View style={styles.program}>
                    {
                        programEducation?.map((item, index) => {
                            return (
                                <View
                                    style={{
                                        ...styles.mainTab,
                                        backgroundColor: index % 2 === 1 ? "#C2D9FF" : "white"
                                    }}
                                    key={index}
                                >
                                    <TouchableOpacity
                                        style={{ ...styles.flexColumnBetween, paddingVertical: 8 }}
                                        onPress={() => {
                                            const updatedProgramEducation = [...programEducation];
                                            updatedProgramEducation[index].expand = !updatedProgramEducation[index].expand;
                                            setProgramEducation(updatedProgramEducation);
                                        }}
                                    >
                                        <Text style={styles.mainText}>
                                            <Text numberOfLines={1}>{"Chủ đề " + (index + 1) + " - " + item.name}</Text>
                                            {/* {formatDate()} */}
                                            {"(05/01/2024)"}
                                        </Text>
                                        {
                                            !item.expand ?
                                                <Icon name={"plus"} color={"#241468"} size={25} />
                                                :
                                                <Icon name={"minus"} color={"#241468"} size={25} />
                                        }
                                    </TouchableOpacity>
                                    {
                                        item.expand &&
                                        item.list.map((element, key) => {
                                            count += 1
                                            return (
                                                <Text style={styles.childText} key={key}>{count}. {element.name}</Text>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>

                {/* markScoreDetail */}

                <View style={styles.titleView}>
                    <Text style={styles.title}>Bảng điểm:</Text>
                </View>

                <View style={styles.scoreTable}>
                    <View style={{ ...styles.flexColumn, width: "100%", paddingHorizontal: 20, backgroundColor: "#C2D9FF", borderRadius: 10 }}>
                        <View style={{ ...styles.flexColumn, width: "70%", paddingVertical: 20, borderRightWidth: 1 }}>
                            <View style={styles.tabletIcon}></View>
                            {/* <Icon name={"checkbox-marked-circle"} color={"#4582E6"} size={15} /> */}
                            <Text>
                                Bài kiểm tra
                            </Text>
                        </View>
                        <View style={styles.scoreValue}>
                            <Text style={styles.boldText}>Điểm</Text>
                        </View>
                    </View>
                    {
                        scoreDetailDefault.map((item, key) => (
                            <View style={{ ...styles.flexColumn, width: "100%", paddingHorizontal: 20 }} key={key}>
                                <View style={{ ...styles.flexColumn, width: "70%", paddingVertical: 20, borderRightWidth: 1 }}>
                                    <View style={styles.tabletIcon}>
                                        {
                                            item.mark ?
                                                item.mark > 5 ?
                                                    <Icon name={"checkbox-marked-circle"} color={"#2C8535"} size={28} />
                                                    :
                                                    <Icon name={"close-circle"} color={"#F4A120"} size={28} />
                                                :
                                                <Icon name={"circle"} color={"#888888"} size={28} />
                                        }
                                    </View>
                                    {/* <Icon name={"checkbox-marked-circle"} color={"#4582E6"} size={15} /> */}
                                    <Text style={styles.boldText}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.scoreValue}>
                                    {
                                        item.mark ?
                                            <Text style={styles.boldText}>{item.mark}/{item.total}</Text>
                                            :
                                            ""
                                    }
                                </View>
                            </View>
                        ))
                    }
                </View>

                {/* <View style={styles.titleView}>
                    <Text style={styles.title}>Yêu cầu:</Text>
                </View>

                <View style={{ ...styles.flexColumn, alignItems: "baseline", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"circle"} color={"#4582E6"} size={15} />
                    <Text style={{ ...styles.boldText, marginLeft: 10 }}>Thực hiện đầy đủ các bài tập</Text>
                </View>
                <View style={{ ...styles.flexColumn, alignItems: "baseline", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"circle"} color={"#4582E6"} size={15} />
                    <Text style={{ ...styles.boldText, marginLeft: 10 }}>Tham gia tích cực</Text>
                </View> */}

                {/* <View style={styles.titleView}>
                    <Text style={styles.title}>Giáo Viên:</Text>
                </View>

                <View style={styles.teacherInfor}>
                    <View style={styles.flexColumn}>
                        <Image
                            source={ThuyTienAvt}
                            style={styles.teachAvt}
                        />
                    </View>
                    <View style={styles.infor}>
                        <Text style={{ ...styles.boldText, textAlign: "center" }}>Cô Thủy Tiên</Text>
                        <View style={{ ...styles.flexColumn, width: "85%" }}>
                            <Icon name={"arrow-right-bold-outline"} color={"#3AAC45"} size={22} />
                            <Text style={{ ...styles.boldText }}>Giáo viên trung tâm anh ngữ</Text>
                        </View>
                        <View style={{ ...styles.flexColumn, width: "85%" }}>
                            <Icon name={"arrow-right-bold-outline"} color={"#3AAC45"} size={22} />
                            <Text style={styles.boldText}>Kinh nghiệm 5 năm giảng dạy</Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton}>
                            <View style={styles.button}>
                                <Text style={{ ...styles.boldText, color: "white" }}>Xem Hồ Sơ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> */}

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
        paddingHorizontal: 15,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        backgroundColor: "rgba(69, 130, 230, 0.28)"
    },
    classValue: {
        color: "#000000",
        fontWeight: "600"
    },
    program: {
        width: WIDTH * 0.9,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        overflow: "hidden"
    },
    processScrollView: {
        flexDirection: "row"
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    paginationIcon: {
        marginHorizontal: 5,
    },
    processBar: {
        width: WIDTH,
        alignItems: "center",
        justifyContent: "center",
    },
    mainTab: {
        padding: 10,
        borderRadius: 10,
    },
    mainText: {
        width: "90%",
        fontWeight: "600",
        color: "#241468",
        marginBottom: 10,
    },
    childText: {
        paddingLeft: 10,
        marginBottom: 5,
    },
    scoreTable: {
        width: WIDTH * 0.9,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        marginBottom: 20
    },
    tabletIcon: {
        width: WIDTH * 0.1,
        justifyContent: "center",
        alignItems: "center",
    },
    scoreValue: {
        width: "32%",
        alignItems: "center",
        justifyContent: "center"
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