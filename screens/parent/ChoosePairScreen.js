import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import CorrentAnswerModal from '../../components/modal/CorrentAnswerModal';
import IncorrentAnswerModal from '../../components/modal/IncorrentAnswerModal';
import { getQuizById } from '../../api/quiz';
import SpinnerLoading from "../../components/SpinnerLoading"

import background1 from "../../assets/quiz/quizBackground1.jpg"
import background2 from "../../assets/quiz/quizBackground2.jpg"
import { checkIsLink } from '../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChoosePairScreen({ route, navigation }) {

    const quizData = route?.params?.homework
    const [totalMark, setTotalMark] = useState(0)
    const [homeworkData, setHomeworkData] = useState([])
    const [homeworkListIndex, setHomeworkListIndex] = useState(0)
    const [wrongAmount, setWrongAmount] = useState(3)
    const [choosedCardIdList, setChoosedCardIdList] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState({ correct: false, incorrect: false, chooseValue: "", score: 0, complete: false })

    useEffect(() => {
        loadQuizData()
    }, [route?.params?.homework])

    useEffect(() => {
        if (choosedCardIdList?.length === 2) {
            checkMatch()
        }
    }, [choosedCardIdList])


    const loadQuizData = async () => {
        setLoading(true)
        const response = await getQuizById(quizData?.examId, quizData?.examPart)

        if (response.status === 200) {
            setHomeworkData(response?.data)
            setLoading(false)
        } else {
            console.log("getQuiz fail : ", response.response?.data);
        }
    }

    const handleChooseCard = (card) => {
        setChoosedCardIdList((prevChoosedCardIdList) => {
            const index = prevChoosedCardIdList.indexOf(card?.cardId);
            if (index !== -1) {
                return prevChoosedCardIdList.filter((card) => card?.cardId !== card?.cardId);
            } else {
                return [...prevChoosedCardIdList, card];
            }
        });
    };

    const checkMatch = () => {
        if (choosedCardIdList[0]?.numberCoupleIdentify === choosedCardIdList[1]?.numberCoupleIdentify) {
            const index1 = homeworkData[homeworkListIndex].anwserFlashCarsInfor?.findIndex(obj => obj?.cardId === choosedCardIdList[0]?.cardId);
            const index2 = homeworkData[homeworkListIndex].anwserFlashCarsInfor?.findIndex(obj => obj?.cardId === choosedCardIdList[1]?.cardId);
            if (index1 !== -1 && index2 !== -1) {
                homeworkData[homeworkListIndex].anwserFlashCarsInfor[index1].choosed = true
                homeworkData[homeworkListIndex].anwserFlashCarsInfor[index2].choosed = true
            }
            
            if (checkCompletePhase()) {
                if (homeworkData[homeworkListIndex + 1]) {
                    setHomeworkListIndex(homeworkListIndex + 1)
                } else {
                    console.log(homeworkData[homeworkListIndex + 1]);
                    console.log(homeworkListIndex);
                    console.log("complete quiz");
                }
            }
        } else {
            console.log("wrong");
        }
        setChoosedCardIdList([])
    }

    const checkCompletePhase = () => {
        return homeworkData[homeworkListIndex].anwserFlashCarsInfor.every(card => card.choosed === true);
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
                        source={background1}
                    >
                        <Text style={styles.questionMark}>{totalMark} Điểm</Text>
                        <Text style={styles.correctAnswer}>{homeworkData[homeworkListIndex].questionDescription}</Text>
                        <View style={styles.cardList}>
                            {
                                homeworkData[homeworkListIndex].anwserFlashCarsInfor?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={[styles.card, choosedCardIdList.includes(item) && styles.choosedCard, item?.choosed && styles.correctedCard]}
                                            onPress={() => handleChooseCard(item)}
                                            key={index}
                                        >
                                            {
                                                checkIsLink(item?.cardImage) ?
                                                    <Image style={styles.cardImage} source={{ uri: item?.cardImage }} resizeMode="cover" />
                                                    :
                                                    <Text>{item?.cardDescription}</Text>
                                            }
                                        </TouchableOpacity>
                                    )
                                })
                            }
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
        width: WIDTH,
        fontSize: 25,
        fontWeight: "600",
        padding: 20,
        textAlign: "center"
    },
    cardList: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: WIDTH,
        padding: 10,
        justifyContent: "space-around",
        alignItems: "center"
    },
    card: {
        backgroundColor: "white",
        width: WIDTH * 0.3,
        height: HEIGHT * 0.185,
        borderWidth: 1,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    cardImage: {
        width: WIDTH * 0.295,
        height: HEIGHT * 0.18,
        borderWidth: 1,
        overflow: "hidden"
    },
    choosedCard: {
        borderWidth: 2,
        borderColor: "blue"
    },
    correctedCard: {
        opacity: 0
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