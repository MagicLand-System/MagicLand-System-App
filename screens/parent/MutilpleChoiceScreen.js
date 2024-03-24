import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import CorrentAnswerModal from '../../components/modal/CorrentAnswerModal';
import IncorrentAnswerModal from '../../components/modal/IncorrentAnswerModal';
import { getQuizById, saveMultipleChoiceScore } from '../../api/quiz';
import SpinnerLoading from "../../components/SpinnerLoading"

import background1 from "../../assets/quiz/quizBackground1.jpg"
import background2 from "../../assets/quiz/quizBackground2.jpg"
import ProcessBar from '../../components/ProcessBar';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function MutilpleChoiceScreen({ route, navigation }) {

    const quizData = route?.params?.homework
    const classDetail = route?.params?.classDetail
    const [totalMark, setTotalMark] = useState(0)
    const [homeworkData, setHomeworkData] = useState([])
    const [homeworkListIndex, setHomeworkListIndex] = useState(0)
    const [answerList, setAnswerList] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState({ correct: false, incorrect: false, chooseValue: "", score: 0, complete: false })

    useEffect(() => {
        loadQuizData()
    }, [route?.params?.homework])

    useEffect(() => {
        if (!loading && answerList.length === homeworkData.length) {
            handleSaveScore()
        }
    }, [answerList])

    const loadQuizData = async () => {
        setLoading(true)
        const response = await getQuizById(quizData?.examId, quizData?.examPart)
        console.log(quizData?.examId);
        if (response.status === 200) {
            setHomeworkData(response?.data)
            setLoading(false)
        } else {
            console.log("getQuiz fail : ", response.response?.data);
        }
    }

    const handleChooseAnswer = (item) => {
        if (item?.score !== 0) {
            setTotalMark(totalMark + item?.score)
            setModalVisible({ ...modalVisible, correct: true, chooseValue: item?.answerDescription, score: item?.score })
            saveAnswer(item)
        } else {
            setModalVisible({ ...modalVisible, incorrect: true, chooseValue: item?.answerDescription })
        }

        setTimeout(() => {
            if (homeworkListIndex !== homeworkData.length - 1) {
                setHomeworkListIndex(homeworkListIndex + 1)
            }
            setModalVisible({ ...modalVisible, correct: false, incorrect: false, chooseValue: "" });
        }, 2000);
    }

    const saveAnswer = (item) => {
        setAnswerList([
            ...answerList,
            {
                questionId: homeworkData[homeworkListIndex].questionId,
                answerId: item?.answerId
            }
        ])
    }

    const handleSaveScore = async () => {
        const response = await saveMultipleChoiceScore(classDetail?.classId, quizData?.examId, answerList)
        console.log(classDetail?.classId, quizData?.examId, answerList);
        if (response?.status === 200) {
            setModalVisible({ ...modalVisible, complete: true });
            navigation.pop()
        } else {
            console.log("lưu bài làm thất bại");
        }
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={route?.params?.title} />
            {
                loading ?
                    <SpinnerLoading />
                    :
                    <ImageBackground
                        showsVerticalScrollIndicator={false}
                        style={styles.container}
                        source={background2}
                    >
                        <View>
                            <Text style={styles.questionMark}>{totalMark} Điểm</Text>
                            <Text style={styles.correctAnswer}>{homeworkData[homeworkListIndex].questionDescription}</Text>
                            {
                                homeworkData[homeworkListIndex].questionImage &&
                                <View style={styles.questionImage}>
                                    <Image
                                        style={{
                                            height: WIDTH * 0.7,
                                            width: WIDTH * 0.7
                                        }}
                                        source={{ uri: homeworkData[homeworkListIndex].questionImage }}
                                        resizeMode="cover"
                                    />
                                </View>
                            }
                            <View style={{ ...styles.flexColumnCenter, marginTop: 10 }}>
                                {
                                    homeworkData[homeworkListIndex].answersMutipleChoicesInfor?.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                style={{
                                                    ...styles.answerButton,
                                                    backgroundColor:
                                                        modalVisible.chooseValue === item.answerDescription ?
                                                            modalVisible.correct ?
                                                                "#3AAC45"
                                                                :
                                                                "#F8935B"
                                                            :
                                                            "white"
                                                }}
                                                onPress={() => { !modalVisible.complete && handleChooseAnswer(item) }}
                                                key={index}
                                            >
                                                <Text
                                                    style={{
                                                        ...styles.boldText,
                                                        fontSize: 25,
                                                        color: modalVisible.chooseValue === item.answerDescription && (modalVisible.correct || modalVisible.incorrect) ? "white" : "black"
                                                    }}>
                                                    {item?.answerDescription}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={styles.processBar}>
                            <ProcessBar
                                leftLable={homeworkListIndex}
                                leftWidth={WIDTH * (homeworkListIndex / homeworkData?.length)}
                                rightLabel={homeworkData?.length - homeworkListIndex}
                                rightWidth={WIDTH * ((homeworkData?.length - homeworkListIndex + 1) / homeworkData?.length)}
                                mainLabel={homeworkData?.length}
                            />
                        </View>
                    </ImageBackground>
            }
            <CorrentAnswerModal visible={modalVisible.correct} score={modalVisible?.score} />
            <IncorrentAnswerModal visible={modalVisible.incorrect} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        flex: 1
    },
    questionMark: {
        width: WIDTH,
        padding: 20,
        textAlign: "right",
        fontWeight: "600",
        color: "#DF8A3C",
        // color: "white"
    },
    correctAnswer: {
        width: WIDTH * 0.9,
        fontSize: 25,
        fontWeight: "600",
        padding: 20,
        textAlign: "center",
        backgroundColor: "white",
        marginHorizontal: WIDTH * 0.05,
        borderWidth: 1,
        borderRadius: 15
    },
    answerButton: {
        padding: 20,
        borderWidth: 1,
        marginHorizontal: 5
    },
    questionImage: {
        width: WIDTH * 0.7,
        height: WIDTH * 0.7,
        alignContent: "center",
        justifyContent: "center",
        marginHorizontal: WIDTH * 0.15,
        marginVertical: WIDTH * 0.05
    },
    processBar: {
        position: "absolute",
        paddingBottom: WIDTH * 0.15,
        paddingTop: 20,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
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
})