import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import CorrentAnswerModal from '../../components/modal/CorrentAnswerModal';
import IncorrentAnswerModal from '../../components/modal/IncorrentAnswerModal';
import { getQuizById } from '../../api/quiz';
import SpinnerLoading from "../../components/SpinnerLoading"

import background1 from "../../assets/quiz/quizBackground1.jpg"
import background2 from "../../assets/quiz/quizBackground2.jpg"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function MutilpleChoiceScreen({ route, navigation }) {

    const quizData = route?.params?.homework
    const [totalMark, setTotalMark] = useState(0)
    const [homeworkData, setHomeworkData] = useState([])
    const [homeworkListIndex, setHomeworkListIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState({ correct: false, incorrect: false, chooseValue: "", score: 0, complete: false })

    useEffect(() => {
        loadQuizData()
    }, [route?.params?.homework])

    const loadQuizData = async () => {
        setLoading(true)
        const response = await getQuizById(quizData?.examId)
        if (response.status === 200) {
            setHomeworkData(response?.data)
            setLoading(false)
        } else {
            console.log("getQuiz fail : ", response.response?.data);
        }
    }

    const handleChooseAnswer = (item) => {
        console.log(item);
        if (item?.score !== 0) {
            setTotalMark(totalMark + item?.score)
            setModalVisible({ ...modalVisible, correct: true, chooseValue: item?.answerDescription, score: item?.score })
        } else {
            setModalVisible({ ...modalVisible, incorrect: true, chooseValue: item?.answerDescription })
        }

        setTimeout(() => {
            if (homeworkListIndex !== homeworkData.length - 1) {
                setHomeworkListIndex(homeworkListIndex + 1)
            } else {
                setModalVisible({ ...modalVisible, complete: true });
            }
            setModalVisible({ ...modalVisible, correct: false, incorrect: false, chooseValue: "" });
        }, 2000);
    }
    
    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={"Chủ đề 3 - Bài 10 + 11"} />
            {
                loading ?
                    <SpinnerLoading />
                    :
                    <ImageBackground
                        showsVerticalScrollIndicator={false}
                        style={styles.container}
                        source={background1}
                    >
                        <View>
                            {/* <Text style={styles.questionMark}>{homeworkData.homeworkList[homeworkListIndex].mark} Điểm</Text> */}
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
                            <View style={styles.flexColumnCenter}>
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
    },
    questionMark: {
        width: WIDTH,
        padding: 20,
        textAlign: "right",
        fontWeight: "600",
        color: "#DF8A3C"
    },
    correctAnswer: {
        width: WIDTH,
        fontSize: 25,
        fontWeight: "600",
        padding: 20,
        textAlign: "center"
    },
    answerButton: {
        padding: 20,
        borderWidth: 1
    },
    questionImage: {
        width: WIDTH * 0.7,
        height: WIDTH * 0.7,
        alignContent: "center",
        justifyContent: "center",
        marginHorizontal: WIDTH * 0.15,
        marginVertical: WIDTH * 0.05
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