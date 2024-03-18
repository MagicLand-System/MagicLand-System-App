import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import NotificationModal from '../../components/modal/NotificationModal';
import { formatDate, getSessionInfoByDate } from '../../util/util';

// import ThuyTienAvt from "../assets/images/ThuyTienAvt.png"
import ProcessBar from '../../components/ProcessBar';
import CircularProgressBar from '../../components/CircularProgressBar';
import { getSyllabus } from '../../api/course';
import { getLearningProgress } from '../../api/student';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ClassStudyDetailScreen({ route, navigation }) {

    let classDetail = route?.params?.classDetail
    let student = route?.params?.student
    const [programEducation, setProgramEducation] = useState([])
    const [currentLesson, setCurrentLesson] = useState({})
    const [courseProgress, setCourseProgress] = useState([{ progressName: "Learning", percentageProgress: 0 }]);
    const [loading, setLoading] = useState({ currentLesson: true, percentageProgress: 0 });
    let count = 0

    useEffect(() => {
        classDetail = route?.params?.classDetail
        loadSyllabusData()
        loadProgressData()
    }, [route?.params?.classDetail])

    const loadSyllabusData = async () => {
        const response = await getSyllabus(classDetail?.courseId, classDetail?.classId)
        if (response?.status === 200) {
            setProgramEducation(response?.data)
            loadCurrentLesson(response?.data?.syllabusInformations)
        } else {
            console.log("getSyllabus fail : ", response.response?.data);
        }
    }

    const loadProgressData = async () => {
        const response = await getLearningProgress(classDetail?.classId, student?.id)
        if (response.status === 200) {
            setCourseProgress(response?.data)
        } else {
            console.log("loadProgressData fail : ", response.response?.data);
        }
    }

    const loadCurrentLesson = (syllabusInformations) => {
        setLoading({ ...loading, currentLesson: true })
        setCurrentLesson(getSessionInfoByDate(syllabusInformations))
        setLoading({ ...loading, currentLesson: false })
    }

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
                            {formatDate(classDetail?.date)}
                            {/* Thứ 5 , 02/12/2023 */}
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Thời gian:
                        </Text>
                        <Text style={styles.classValue}>
                            {classDetail?.startTime} - {classDetail?.endTime}
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Hình Thức:
                        </Text>
                        <Text style={styles.classValue}>
                            {classDetail?.method}
                            {
                                String(classDetail?.method)?.toLocaleLowerCase() === "online" &&
                                <TouchableOpacity style={{ transform: [{ translateY: 2.5 }] }}>
                                    <Text style={{ ...styles.classValue, color: "#000" }}> {" meet > "}</Text>
                                </TouchableOpacity>
                            }
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Phòng học:
                        </Text>
                        <Text style={styles.classValue}>
                            {classDetail?.roomName}
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Tình trạng:
                        </Text>
                        <Text style={styles.classValue}>
                            {classDetail?.attendanceStatus}
                        </Text>
                    </View>

                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Nội dung buổi học:</Text>
                </View>
                {
                    !loading?.currentLesson &&
                    <View style={styles.programcontent}>
                        <Text style={styles.boldText} numberOfLines={1}>Chủ đề {currentLesson?.orderTopic} - {currentLesson?.topicName} </Text>
                        <Text style={styles.boldText}>Buổi 7: {currentLesson?.sessions[0] && formatDate(currentLesson?.sessions[0].date)}</Text>
                        {
                            currentLesson?.sessions[0] &&
                            currentLesson?.sessions[0].contents?.map((item, key) => {
                                return (
                                    <Text style={{ marginLeft: 10 }} key={key}>Bài {key + 1} : {item?.content}</Text>
                                )
                            })
                        }

                        {/* <Text style={{ marginLeft: 10 }}>Bài 11:  Que tính kỳ diệu</Text> */}
                        <TouchableOpacity style={styles.startProgram} onPress={handleViewDetail}>
                            <Text style={{ ...styles.boldText, color: "#4582E6" }}>Xem Chi Tiết</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View style={styles.titleView}>
                    <Text style={styles.title}>Mức độ hoàn thành khóa học:</Text>
                </View>

                <View style={styles.processBar}>
                    <CircularProgressBar
                        value={courseProgress.find(obj => obj?.progressName === "Learning")?.percentageProgress}
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

                <ScrollView nestedScrollEnabled={true} style={styles.program}>
                    {
                        programEducation?.syllabusInformations?.topics?.map((item, index) => {
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
                                            setProgramEducation(prevProgramEducation => {
                                                const updatedTopics = [...prevProgramEducation.syllabusInformations?.topics];
                                                updatedTopics[index] = { ...updatedTopics[index], expand: !updatedTopics[index].expand };
                                                return {
                                                    ...prevProgramEducation,
                                                    syllabusInformations: { ...prevProgramEducation.syllabusInformations, topics: updatedTopics }
                                                };
                                            });
                                        }}
                                    >
                                        <Text style={styles.mainText}>
                                            <Text numberOfLines={1}>{"Chủ đề " + (index + 1) + " - " + item.topicName}  </Text>

                                        </Text>

                                        {
                                            !item.expand ?
                                                <Icon name={"plus"} color={"#241468"} size={25} />
                                                :
                                                <Icon name={"minus"} color={"#241468"} size={25} />
                                        }
                                    </TouchableOpacity>
                                    {
                                        (
                                            !item.sessions[0] ?
                                                item.expand === true &&
                                                <Text style={styles.childText}>Không có buổi học</Text>
                                                :
                                                item.sessions.map((element, key) => {
                                                    return (
                                                        <React.Fragment key={key}>
                                                            {
                                                                item.expand === true &&
                                                                <Text style={{ ...styles.childText, fontWeight: "700" }} key={key}>Buổi {element?.orderSession} ({formatDate(element?.date)})</Text>
                                                            }
                                                            {
                                                                (
                                                                    !element.contents[0] ?
                                                                        item.expand === true &&
                                                                        <Text style={styles.childText}>Không có chủ đề</Text>
                                                                        :
                                                                        element?.contents?.map((content, key) => {
                                                                            count += 1
                                                                            return (
                                                                                <React.Fragment key={key}>
                                                                                    {
                                                                                        item.expand === true &&
                                                                                        <Text style={{ ...styles.childText, marginLeft: 7, fontWeight: "400" }} key={key}>{count}. {content.content}</Text>
                                                                                    }
                                                                                    {
                                                                                        item.expand === true &&
                                                                                        content?.details?.map((detail, index) => {
                                                                                            return (
                                                                                                <Text style={{ ...styles.childText, marginLeft: 15, fontWeight: "300" }} key={index}>{count}.{index + 1} {detail}</Text>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </React.Fragment>
                                                                            )
                                                                        })
                                                                )
                                                            }
                                                        </React.Fragment>
                                                    )
                                                })
                                        )
                                    }
                                    {/* {
                                        (
                                            !item.contents[0] ?
                                                item.expand === true &&
                                                <Text style={styles.childText}>Không có chủ đề</Text>
                                                :
                                                item.contents.map((element, key) => {
                                                    count += 1
                                                    return (
                                                        item.expand === true &&
                                                        <Text style={styles.childText} key={key}>{count}. {element.content}</Text>
                                                    )
                                                })
                                        )
                                    } */}
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
        color: "#888888",
        textTransform: "capitalize",
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
        maxHeight: HEIGHT * 0.4,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        overflow: "hidden"
    },
    processScrollView: {
        flexDirection: "row",
    },
    courseList: {
        marginVertical: 10
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