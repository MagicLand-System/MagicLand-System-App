import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ExamHistoryScreen({ route, navigation }) {

    const quizData = route?.params?.quizData
    const classDetail = route?.params?.classDetail
    const quizHistory = route?.params?.quizHistory

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

    const getColumnColor = (item) => {
        return item?.multipleChoiceAnswerResult?.studentAnswerId === item?.multipleChoiceAnswerResult?.correctAnswerId
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={quizData?.quizName} />
            <ScrollView style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{quizData?.quizName}</Text>
                </View>
                {
                    quizData?.quizType === "multiple-choice" &&
                    <View style={styles.questionTable}>
                        <View style={styles.columnTable}>
                            <View style={styles.numberTable}>
                                <Text style={styles.boldText}>STT</Text>
                            </View>
                            <View style={styles.contentTable}>
                                <Text style={styles.boldText}>Nội dung</Text>
                            </View>
                            <View style={styles.scoreTable}>
                                <Text style={styles.boldText}>Điểm</Text>
                            </View>
                        </View>
                        {
                            quizHistory?.map((item, key) => {
                                return (
                                    <View style={styles.columnTable} key={key}>
                                        <View style={styles.numberTable}>
                                            <Text style={styles.boldText}>1</Text>
                                        </View>
                                        <View style={[styles.contentTable, styles.flexColumnBetween]}>
                                            <View width style={{ width: "80%" }}>
                                                <Text style={{ ...styles.boldText, color: getColumnColor(item) ? "#2C8535" : "#EA6D6D" }}>{item?.questionDescription}</Text>
                                                {
                                                    item?.questionImage &&
                                                    <Image
                                                        source={{ uri: item?.questionImage }}
                                                        resizeMode="cover"
                                                        style={{ width: WIDTH * 0.4, height: WIDTH * 0.4 }}
                                                    />
                                                }
                                            </View>

                                            {/* close-box-outline checkbox-marked-outline*/}
                                            {
                                                getColumnColor(item) ?
                                                    <Icon name={"checkbox-marked-outline"} color={"#2C8535"} size={25} />
                                                    :
                                                    <Icon name={"close-box-outline"} color={"#EA6D6D"} size={25} />
                                            }
                                        </View>
                                        <View style={styles.scoreTable}>
                                            <Text style={{ ...styles.boldText, color: getColumnColor(item) ? "#2C8535" : "#EA6D6D" }}>{item?.multipleChoiceAnswerResult?.score}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                }

                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>Số câu đúng:</Text>
                    <Text style={styles.boldText}>{quizData?.score / quizData?.totalScore * quizData?.totalMark} / {quizData?.totalMark}</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>Tổng điểm:</Text>
                    <Text style={styles.boldText}>{quizData?.totalScore}  điểm</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>Số lần làm:</Text>
                    <Text style={styles.boldText}>{quizData?.attemptAlloweds - quizData?.attemptLeft} lần</Text>
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Đánh giá của giáo viên:</Text>
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
    questionTable: {
        width: WIDTH * 0.95,
        borderWidth: 1,
        marginHorizontal: WIDTH * 0.025
    },
    columnTable: {
        width: "100%",
        minHeight: 50,
        flexDirection: "row",
        borderWidth: 1,
    },
    numberTable: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        borderRightWidth: 1,
    },
    contentTable: {
        width: "70%",
        justifyContent: "center",
        padding: 5,
        borderRightWidth: 1,
    },
    scoreTable: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
    },

    flexColumnCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center"
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