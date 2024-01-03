import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import CorrentAnswerModal from '../../components/modal/CorrentAnswerModal';
import IncorrentAnswerModal from '../../components/modal/IncorrentAnswerModal';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function MutilpleChoiceScreen({ route, navigation }) {

    const [totalMark, setTotalMark] = useState(0)
    const [homeworkData, setHomeworkData] = useState(route?.params?.homework)
    const [homeworkListIndex, setHomeworkListIndex] = useState(0)
    const [modalVisible, setModalVisible] = useState({ correct: false, incorrect: false, chooseValue: "" })

    useEffect(() => {
        setHomeworkData(route?.params?.homework)
    }, [route?.params?.homework])

    const handleChooseAnswer = (answer) => {
        if (answer === homeworkData.homeworkList[homeworkListIndex].answer) {
            setTotalMark(totalMark + homeworkData.homeworkList[homeworkListIndex].mark)
            setModalVisible({ ...modalVisible, correct: true, chooseValue: answer })
        } else {
            setModalVisible({ ...modalVisible, incorrect: true, chooseValue: answer })
        }

        setTimeout(() => {
            if (homeworkListIndex !== homeworkData.homeworkList.length - 1) {
                setHomeworkListIndex(homeworkListIndex + 1)
            }
            setModalVisible({ correct: false, incorrect: false, chooseValue: "" });
        }, 2000);
    }

    return (
        <>
            <Header navigation={navigation} background={"#241468"} goback={navigation.pop} title={"Chủ đề 3 - Bài 10 + 11"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View>
                    {/* <Text style={styles.questionMark}>{homeworkData.homeworkList[homeworkListIndex].mark} Điểm</Text> */}
                    <Text style={styles.questionMark}>{totalMark} Điểm</Text>
                    <Text style={styles.correctAnswer}>{homeworkData.homeworkList[homeworkListIndex].answer}</Text>
                    <View style={styles.flexColumnCenter}>
                        {
                            homeworkData.homeworkList[homeworkListIndex].answerList.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        style={{
                                            ...styles.answerButton,
                                            backgroundColor:
                                                modalVisible.chooseValue === item ?
                                                    modalVisible.correct ?
                                                        "#3AAC45"
                                                        :
                                                        "#F8935B"
                                                    :
                                                    "white"
                                        }}
                                        onPress={() => handleChooseAnswer(item)} key={index}
                                    >
                                        <Text
                                            style={{
                                                ...styles.boldText,
                                                fontSize: 25,
                                                color: modalVisible.chooseValue === item && (modalVisible.correct || modalVisible.incorrect) ? "white" : "black"
                                            }}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
            <CorrentAnswerModal visible={modalVisible.correct} />
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
        fontSize: 50,
        fontWeight: "600",
        padding: 20,
        textAlign: "center"
    },
    answerButton: {
        padding: 20,
        borderWidth: 1
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