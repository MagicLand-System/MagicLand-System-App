import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from '../../components/header/Header'
import CorrentAnswerModal from '../../components/modal/CorrentAnswerModal';
import IncorrentAnswerModal from '../../components/modal/IncorrentAnswerModal';
import { getQuizById } from '../../api/quiz';
import SpinnerLoading from "../../components/SpinnerLoading"
import CustomToast from "../../components/CustomToast";

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
    const showToast = CustomToast();

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
        if (wrongAmount === 0) {
            showToast("Thông báo", `Bạn đã hết lượt làm bài`, "warning");
        } else {
            setChoosedCardIdList((prevChoosedCardIdList) => {
                const index = prevChoosedCardIdList.indexOf(card?.cardId);
                if (index !== -1) {
                    return prevChoosedCardIdList.filter((card) => card?.cardId !== card?.cardId);
                } else {
                    return [...prevChoosedCardIdList, card];
                }
            });
        }
    };

    const checkMatch = () => {
        if (choosedCardIdList[0]?.numberCoupleIdentify === choosedCardIdList[1]?.numberCoupleIdentify) {
            const index1 = homeworkData[homeworkListIndex].anwserFlashCarsInfor?.findIndex(obj => obj?.cardId === choosedCardIdList[0]?.cardId);
            const index2 = homeworkData[homeworkListIndex].anwserFlashCarsInfor?.findIndex(obj => obj?.cardId === choosedCardIdList[1]?.cardId);
            if (index1 !== -1 && index2 !== -1) {
                homeworkData[homeworkListIndex].anwserFlashCarsInfor[index1].choosed = true
                homeworkData[homeworkListIndex].anwserFlashCarsInfor[index2].choosed = true
                setTotalMark(totalMark + homeworkData[homeworkListIndex].anwserFlashCarsInfor[index2].score + homeworkData[homeworkListIndex].anwserFlashCarsInfor[index1].score)
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
            setWrongAmount(wrongAmount - 1)
        }
        setChoosedCardIdList([])
    }

    const checkCompletePhase = () => {
        return homeworkData[homeworkListIndex].anwserFlashCarsInfor.every(card => card.choosed === true);
    }

    const getHeartLeft = (amount) => {
        const hearts = [];
        for (let i = 0; i < 3; i++) {
            hearts.push((i + 1) <= amount ?
                <View style={{ marginRight: 10 }}>
                    <Icon key={i} name={"cards-heart"} color={"red"} size={28} />
                </View>
                :
                <View style={{ marginRight: 10 }}>
                    <Icon key={i} name={"heart-outline"} color={"black"} size={28} />
                </View>
            );
        }
        return hearts.reverse();
    };

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
                        <View style={{ ...styles.flexColumnAround, marginHorizontal: WIDTH * 0.22, width: WIDTH * 0.7 }}>
                            {getHeartLeft(wrongAmount)}
                            <Text style={styles.questionMark}>{totalMark} Điểm</Text>
                        </View>
                        <Text style={styles.correctAnswer}>{homeworkData[homeworkListIndex].questionDescription}</Text>
                        <View style={styles.cardList}>
                            {
                                homeworkData[homeworkListIndex].anwserFlashCarsInfor?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={[styles.card, choosedCardIdList.includes(item) && styles.choosedCard, item?.choosed && styles.correctedCard]}
                                            onPress={() => { !item?.choosed && handleChooseCard(item) }}
                                            activeOpacity={item?.choosed ? 0 : 0.5}
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
        width: WIDTH * 0.28,
        height: HEIGHT * 0.14,
        borderWidth: 1,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        overflow: "hidden"
    },
    cardImage: {
        width: WIDTH * 0.275,
        height: HEIGHT * 0.135,
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