import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from '../../components/header/Header';
import CustomToast from "../../components/CustomToast";
import { checkDoExamTimeValid } from '../../util/util';
import { getQuizHistory } from '../../api/quiz';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function QuizDetailScreen({ route, navigation }) {

    const quizData = route?.params?.quizData
    const classInfor = route?.params?.classInfor
    const [quizHistory, setQuizHistory] = useState([])
    const showToast = CustomToast();

    useEffect(() => {
        if (quizData?.score !== null) {
            loadQuizHistory()
        }
    }, [])

    const loadQuizHistory = async () => {
        const response = await getQuizHistory(quizData?.examId)
        if (response?.status === 200) {
            setQuizHistory(response?.data)
        }
    }

    const handleDoExam = (exam) => {
        // if (!checkDoExamTimeValid(exam?.examStartTime, exam?.examEndTime)) {
        //     showToast("Thông báo", `Bài tập đang đóng`, "warning");
        // } else 
        if (exam?.attemptLeft === 0) {
            showToast("Thông báo", `Bạn đã hết lượt làm bài`, "warning");
        } else {
            if (exam?.quizType === "multiple-choice") {
                navigation.push("MutilpleChoiceScreen", { homework: exam, title: exam?.quizName, classDetail: classInfor })
            } else if (exam?.quizType === "flashcard") {
                navigation.push("ChoosePairScreen", { homework: exam, title: exam?.quizName, classDetail: classInfor })
            }
        }
    }

    const handleViewExam = () => {
        navigation.push("ExamHistoryScreen", { quizData: quizData, classDetail: classInfor, quizHistory: quizHistory })
    }

    const getQuizType = (type) => {
        switch (type) {
            case "flashcard":
                return "Lật thẻ"

            case "multiple-choice":
                return "Trắc nghiệm"

            case "options":
                return "Khác"

            default:
                return "Khác"
        }
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={quizData?.quizName} />
            <ScrollView style={styles.container}>
                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>1. Số lần làm bài:</Text>
                    <Text style={styles.boldText}>{quizData?.attemptAlloweds} lần</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>2. Thời gian:</Text>
                    <Text style={styles.boldText}>{quizData?.duration / 60} phút</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>3. Hình thức:</Text>
                    <Text style={styles.boldText}>{getQuizType(quizData?.quizType)}</Text>
                </View>
                {
                    quizData?.score !== null &&
                    < View style={{ width: "80%", marginHorizontal: "10%", marginVertical: 10, padding: 5, backgroundColor: "#C2D9FF" }}>
                        <View style={{ ...styles.flexColumnBetween, paddingHorizontal: 10, marginVertical: 10 }}>
                            <Text style={styles.boldText}>Số câu đúng:</Text>
                            <Text style={styles.boldText}>{quizData?.score / quizData?.totalScore * quizData?.totalMark} / {quizData?.totalMark}</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, paddingHorizontal: 10, marginVertical: 10 }}>
                            <Text style={styles.boldText}>Tổng điểm:</Text>
                            <Text style={styles.boldText}>{quizData?.totalScore}  điểm</Text>
                        </View>
                        <View style={{ ...styles.flexColumnBetween, paddingHorizontal: 10, marginVertical: 10 }}>
                            <Text style={styles.boldText}>Số lần làm:</Text>
                            <Text style={styles.boldText}>{quizData?.attemptAlloweds - quizData?.attemptLeft} lần</Text>
                        </View>
                    </View>
                }
                <View style={{ ...styles.flexColumnAround, width: WIDTH }}>
                    {
                        quizData?.attemptLeft !== 0 &&
                        <TouchableOpacity style={{ ...styles.button }}
                            onPress={() => handleDoExam(quizData)}
                        >
                            <Text style={{ ...styles.boldText, color: "#241468" }}>Làm bài</Text>
                        </TouchableOpacity>
                    }
                    {
                        quizData?.score !== null &&
                        <TouchableOpacity style={{ ...styles.button }}
                            onPress={() => handleViewExam(quizData)}
                        >
                            <Text style={{ ...styles.boldText, color: "#241468" }}>Xem Bài</Text>
                        </TouchableOpacity>
                    }
                </View>
            </ScrollView >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 15,
        backgroundColor: "#C2D9FF",
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
    flexColumnAround: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
    },
});