import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import NotificationModal from '../../components/modal/NotificationModal';
import CircularProgressBar from '../../components/CircularProgressBar';
import CourseCard from '../../components/CourseCard';

import { convertSchedulesToString, formatDate, shortedTime } from '../../util/util';
import { getSyllabus } from '../../api/course';
import { getStatus } from '../../constants/class';
import { getQuizByClassid } from '../../api/quiz';
import { getLearningProgress } from '../../api/student';

// import ThuyTienAvt from "../assets/images/ThuyTienAvt.png"
// import ProcessBar from '../components/ProcessBar';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const courseData = {
    "openingSchedules": [
        {
            "classId": "df31d5f6-63f2-4d7d-8141-114ad6dc4ec8",
            "schedule": "3-5-7",
            "slot": "7:00 AM - 9:00 AM",
            "openingDay": "2024-03-22T00:00:00",
            "method": "offline"
        },
        {
            "classId": "c8e69b6b-bdb6-4343-8173-1beeb9cd0c41",
            "schedule": "3-5-7",
            "slot": "12:00 AM - 14:00 PM",
            "openingDay": "2024-03-24T00:00:00",
            "method": "offline"
        },
        {
            "classId": "1ee3c1a3-0b76-4e22-825b-23ede1d891c0",
            "schedule": "3-5-7",
            "slot": "12:00 AM - 14:00 PM",
            "openingDay": "2024-03-15T00:00:00",
            "method": "offline"
        },
        {
            "classId": "acd3b8b8-c20b-4870-b77e-2a30a71c09fa",
            "schedule": "4-6-Sunday",
            "slot": "12:00 AM - 14:00 PM",
            "openingDay": "2024-03-25T00:00:00",
            "method": "offline"
        },
        {
            "classId": "26db0478-e6bf-46f8-86a5-43ac38031259",
            "schedule": "3-5-7",
            "slot": "7:00 AM - 9:00 AM",
            "openingDay": "2024-03-26T00:00:00",
            "method": "offline"
        },
        {
            "classId": "b653930e-ab4f-4eab-bd74-48e31f6ee6ef",
            "schedule": "3-5-7",
            "slot": "7:00 AM - 9:00 AM",
            "openingDay": "2024-03-24T00:00:00",
            "method": "offline"
        },
        {
            "classId": "7c46ab75-cd35-4aa5-bc46-4d7e8c8062e9",
            "schedule": "3-5-7",
            "slot": "7:00 AM - 9:00 AM",
            "openingDay": "2024-03-24T00:00:00",
            "method": "offline"
        },
        {
            "classId": "f7acbe6c-fa86-4710-9fce-6d26b692e1df",
            "schedule": "3-5-7",
            "slot": "12:00 AM - 14:00 PM",
            "openingDay": "2024-03-26T00:00:00",
            "method": "offline"
        },
        {
            "classId": "14ca7599-abd1-46d9-a903-711cf86f89f4",
            "schedule": "4-6-Sunday",
            "slot": "7:00 AM - 9:00 AM",
            "openingDay": "2024-03-25T00:00:00",
            "method": "offline"
        },
        {
            "classId": "cd1829a1-0150-43e5-82f1-885d2f839aef",
            "schedule": "3-5-7",
            "slot": "7:00 AM - 9:00 AM",
            "openingDay": "2024-03-26T00:00:00",
            "method": "offline"
        },
        {
            "classId": "78ebe4df-b213-4e10-9fb9-a340374f1212",
            "schedule": "2-3-4-5-6-7-Sunday",
            "slot": "12:00 AM - 14:00 PM",
            "openingDay": "2024-02-01T00:00:00",
            "method": "OFFLINE"
        },
        {
            "classId": "ea9c3d70-7f25-4485-9704-a6b38e076743",
            "schedule": "3-5-7",
            "slot": "12:00 AM - 14:00 PM",
            "openingDay": "2024-03-22T00:00:00",
            "method": "offline"
        },
        {
            "classId": "4af76424-9485-42bf-ab57-ae9cf7a44feb",
            "schedule": "4-6-Sunday",
            "slot": "7:00 AM - 9:00 AM",
            "openingDay": "2024-03-25T00:00:00",
            "method": "offline"
        },
        {
            "classId": "bdfa8fb8-0f13-40ee-93c3-b7b46d79d336",
            "schedule": "2-3-4-5-6-7-Sunday",
            "slot": "14:15 PM - 16:15 PM",
            "openingDay": "2024-02-12T00:00:00",
            "method": "OFFLINE"
        },
        {
            "classId": "19bd506a-fd2e-4d59-bae6-bc8cbfe038db",
            "schedule": "4-6-Sunday",
            "slot": "12:00 AM - 14:00 PM",
            "openingDay": "2024-03-25T00:00:00",
            "method": "offline"
        },
        {
            "classId": "099b02e8-ef68-402d-94b8-cd93ac096dfb",
            "schedule": "4-6-Sunday",
            "slot": "7:00 AM - 9:00 AM",
            "openingDay": "2024-03-25T00:00:00",
            "method": "offline"
        },
        {
            "classId": "114e0d61-29e5-40f5-ad2d-de21f33bf985",
            "schedule": "3-5-7",
            "slot": "7:00 AM - 9:00 AM",
            "openingDay": "2024-03-22T00:00:00",
            "method": "offline"
        },
        {
            "classId": "3e6bb081-d063-4604-946c-f35913557122",
            "schedule": "4-6-Sunday",
            "slot": "7:00 AM - 9:00 AM",
            "openingDay": "2024-03-25T00:00:00",
            "method": "offline"
        }
    ],
    "relatedCourses": [],
    "numberClassOnGoing": 0,
    "updateDate": "2024-02-16T00:00:00",
    "courseId": "871606a7-baa0-4c79-b685-1443502d02b3",
    "isInCart": false,
    "cartItemId": null,
    "image": "https://i0.wp.com/apeejay.news/wp-content/uploads/2022/12/schoolgirl-pointing-up-blackboard.jpg",
    "price": 300000,
    "mainDescription": "Khóa học \"Vẽ thế giới quanh em\" không chỉ là hành trình nghệ thuật, mà là một cuộc phiêu lưu sáng tạo dành cho các tâm hồn trẻ thơ. Tại đây, chúng tôi kết hợp nghệ thuật và giáo dục để mang lại cho trẻ không chỉ kỹ năng vẽ tuyệt vời mà còn sự hiểu biết sâu rộng về thế giới.",
    "subDescriptionTitle": [
        {
            "title": "Hãy Cùng Nhau Khám Phá Thế Giới",
            "contents": [
                {
                    "content": "Kỳ Thú Hành Trình Văn Hóa",
                    "description": "Bé sẽ đi du lịch qua những góc kỳ thú của thế giới thông qua bức tranh của mình. Khám phá văn hóa, kiến trúc và đặc điểm độc đáo của mỗi quốc gia qua ngôn ngữ hình vẽ."
                },
                {
                    "content": "Kỹ Năng Tư Duy và Giao Tiếp",
                    "description": "Vẽ không chỉ là về nét bút và màu sắc, mà còn là về cách diễn đạt ý tưởng. Khóa học giúp trẻ phát triển kỹ năng tư duy và giao tiếp thông qua ngôn ngữ nghệ thuật của bé."
                },
                {
                    "content": "Sáng Tạo Trong Môi Trường Vui Nhộn",
                    "description": "Với không khí học vui nhộn và năng động, trẻ không chỉ học về nghệ thuật mà còn trải nghiệm sự vui nhộn và niềm hứng thú trong quá trình sáng tạo."
                },
                {
                    "content": "Bí Mật Của Nghệ Thuật Sáng Tạo",
                    "description": "Học cách tạo ra những tác phẩm nghệ thuật sáng tạo và độc đáo của riêng bạn. Chia sẻ bí mật của sự sáng tạo và tìm ra nguồn cảm hứng không ngừng từ thế giới xung quanh."
                }
            ]
        }
    ],
    "courseDetail": {
        "courseName": "Vẽ Thế Giới Quanh Em",
        "minAgeStudent": "4",
        "maxAgeStudent": "10",
        "subject": "Hội Họa",
        "method": "offline / OFFLINE",
        "numberOfSession": 20,
        "addedDate": null,
        "coursePrerequisites": []
    }
}

const progressData = [
    { label: "Tiến độ học tập", value: 85, inActiveStrokeColor: "#7388A95A", activeStrokeColor: "#5BBF4A" },
    { label: "Tình trạng điểm danh", value: 85, inActiveStrokeColor: "#7388A95A", activeStrokeColor: "#F2334E" },
    { label: "Tiến độ hoàn thành các bài kiểm tra", value: 80, inActiveStrokeColor: "#7388A95A", activeStrokeColor: "#EF892A" },
];

export default function ClassDetailScreen({ route, navigation }) {
    let classDetail = route?.params?.classDetail
    let student = route?.params?.student
    const [programEducation, setProgramEducation] = useState([])
    const [quizList, setQuizList] = useState([])
    const [courseProgress, setCourseProgress] = useState([
        {
            progressName: "Attendance",
            percentageProgress: 0
        },
        {
            progressName: "Learning",
            percentageProgress: 0
        },
        {
            progressName: "Exam",
            percentageProgress: 0
        }
    ]);
    const [currentPage, setCurrentPage] = useState(0);
    const [tabType, setTabType] = useState("detail")
    let count = 0

    useEffect(() => {
        classDetail = route?.params?.classDetail
        loadSyllabusData()
        loadQuizData()
        loadProgressData()
    }, [route?.params?.classDetail])

    const loadSyllabusData = async () => {
        const response = await getSyllabus(classDetail?.courseId, classDetail?.classId)
        console.log(classDetail?.courseId, classDetail?.classId);
        if (response.status === 200) {
            setProgramEducation(response?.data)
        } else {
            console.log("getSyllabus fail : ", response.response?.data);
        }
    }

    const loadQuizData = async () => {
        const response = await getQuizByClassid(classDetail?.classId)
        if (response.status === 200) {
            setQuizList(response?.data)
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

    const handleScroll = (event) => {
        const page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        setCurrentPage(page);
    };

    const getProgessData = (type) => {
        switch (type) {
            case "Learning":
                return progressData[0]
            case "Attendance":
                return progressData[1]
            case "Exam":
                return progressData[2]
            default:
                return progressData[0]
        }
    }

    const navigateDoHomework = (homework) => {
        // if (homework?.quizType === "multiple-choice") {
        //     navigation.push("MutilpleChoiceScreen", { homework: homework, title: homework?.quizName })
        // } else if (homework?.quizType === "flashcard") {
        //     navigation.push("ChoosePairScreen", { homework: homework, title: homework?.quizName })
        // }
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={"Thông Tin Chi Tiết Của Lớp Học"} />
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={{ ...styles.tabItem, borderRightWidth: 2 }}
                    onPress={() => setTabType("detail")}
                >
                    <Text style={styles.tabTitle}>Thông tin chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.tabItem, borderRightWidth: 2 }}
                    onPress={() => setTabType("progress")}
                >
                    <Text style={styles.tabTitle}>Tiến độ học tập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => setTabType("mark")}
                >
                    <Text style={styles.tabTitle}>Điểm số</Text>
                </TouchableOpacity>
            </View>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={styles.container}>
                {
                    tabType === "detail" &&
                    <>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>Khóa học:</Text>
                        </View>
                        <View style={styles.classDetail}>
                            <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                                <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                                    Khóa học:
                                </Text>
                                <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                                    {classDetail?.courseName ? classDetail?.courseName : "Lớp học"}
                                </Text>
                            </View>
                            <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                                <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                                    Lớp học:
                                </Text>
                                <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                                    {classDetail?.classCode ? classDetail?.classCode : "A000"}
                                </Text>
                            </View>
                            <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                                <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                                    Ngày khai giảng:
                                </Text>
                                <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                                    {classDetail?.startDate ? formatDate(classDetail?.startDate) : "Chưa xác định"}
                                </Text>
                            </View>
                            <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                                <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                                    Lịch học
                                </Text>
                                <View style={{ ...styles.classValue, width: "58%" }}>
                                    {
                                        convertSchedulesToString(classDetail?.schedules)?.map((item, key) => {
                                            return (
                                                <Text style={{ ...styles.classValue, width: "100%", textAlign: "left", color: "#3AA6B9" }} key={key}>Thứ {item}</Text>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                                <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                                    Hình Thức:
                                </Text>
                                <Text style={{ ...styles.classValue, width: "58%", textAlign: "left", textTransform: "capitalize" }}>
                                    {classDetail?.method}
                                </Text>
                            </View>
                            <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                                <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                                    Giáo viên:
                                </Text>
                                <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                                    {classDetail?.lecture?.fullName}
                                </Text>
                            </View>
                            <View style={{ ...styles.flexColumnBetween, marginBottom: 5 }}>
                                <Text style={{ ...styles.boldText, width: "38%", textAlign: "right", color: "#707070" }}>
                                    Trạng thái:
                                </Text>
                                <Text style={{ ...styles.classValue, width: "58%", textAlign: "left" }}>
                                    {getStatus(classDetail?.status)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>Chương trình giảng dạy:</Text>
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
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>Các khoá học liên quan:</Text>
                        </View>
                        {/* courseData */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.courseList}>
                            <CourseCard cardDetail={courseData} onClick={() => console.log("click")} navigation={navigation} />
                            <CourseCard cardDetail={courseData} onClick={() => console.log("click")} navigation={navigation} />
                            <CourseCard cardDetail={courseData} onClick={() => console.log("click")} navigation={navigation} />
                        </ScrollView>
                    </>
                }
                {
                    tabType === "progress" &&
                    <>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>Tiến độ:</Text>
                        </View>
                        <View
                            style={styles.processScrollView}
                        // showsHorizontalScrollIndicator={false}
                        // pagingEnabled
                        // horizontal
                        // onScroll={handleScroll}
                        >
                            {
                                courseProgress.map((item, index) => {
                                    const processData = getProgessData(item.progressName)
                                    return (
                                        <View key={index} style={styles.processBar}>
                                            <Text style={{ ...styles.boldText, fontSize: 20, marginBottom: 15, width: "50%", textAlign: "center" }}>{processData.label}</Text>
                                            <CircularProgressBar
                                                value={item.percentageProgress}
                                                inActiveStrokeColor={processData.inActiveStrokeColor}
                                                activeStrokeColor={processData.activeStrokeColor}
                                            />
                                        </View>
                                    )
                                })
                            }
                        </View>

                        {/* <View style={styles.paginationContainer}>
                            {progressData.map((item, index) => (
                                <Icon
                                    key={index}
                                    name={"circle"}
                                    color={currentPage === index ? item.activeStrokeColor : "#7388A95A"}
                                    size={18}
                                    style={styles.paginationIcon}
                                />
                            ))}
                        </View> */}
                    </>
                }
                {
                    tabType === "mark" &&
                    <>

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
                                quizList.map((item, key) => (
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
                                            <TouchableOpacity onPress={() => navigateDoHomework(item)}>
                                                <Text style={styles.boldText}>
                                                    {item.examName}
                                                    {/* ( {item.quizType} ) */}
                                                </Text>
                                            </TouchableOpacity>
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
                    </>
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        width: WIDTH * 0.9,
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        marginVertical: 10,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 100,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    tabItem: {
        justifyContent: "center",
        alignItems: "center",
        width: "33%",
        paddingVertical: 10,
        borderColor: "#4582E6",
    },
    tabTitle: {
        color: "#4582E6",
        fontWeight: "700"
    },

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
        maxHeight: HEIGHT * 0.4,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        overflow: "hidden"
    },
    processScrollView: {
        // flexDirection: "row",
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
        marginVertical: 15,
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
    courseList: {
        marginVertical: 10
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