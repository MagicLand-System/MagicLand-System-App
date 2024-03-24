import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'

import Header from '../../components/header/Header';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function QuizDetailScreen({ route, navigation }) {

    const quizData = route?.params?.quizData
    const classInfor = route?.params?.classInfor

    const handleDoExam = (exam) => {
        // console.log(exam);
        if (exam?.quizType === "multiple-choice") {
            navigation.push("MutilpleChoiceScreen", { homework: exam, title: exam?.quizName, classDetail: classInfor })
        } else if (exam?.quizType === "flashcard") {
            navigation.push("ChoosePairScreen", { homework: exam, title: exam?.quizName, classDetail: classInfor })
        }
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={quizData?.quizName} />
            <ScrollView style={styles.container}>
                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>1. Số lần làm bài:</Text>
                    <Text style={styles.boldText}>{quizData?.attemptAlloweds}</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>2. Thời gian:</Text>
                    <Text style={styles.boldText}>15 phút</Text>
                </View>
                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.8, marginHorizontal: WIDTH * 0.1, marginVertical: 10 }}>
                    <Text style={styles.boldText}>3. Hình thức:</Text>
                    <Text style={styles.boldText}>{quizData?.quizType}</Text>
                </View>
                <View style={styles.flexColumnCenter}>
                    <TouchableOpacity style={{ ...styles.button }}
                        onPress={() => handleDoExam(quizData)}
                    >
                        <Text style={{ ...styles.boldText, color: "#241468" }}>Làm bài</Text>
                    </TouchableOpacity>
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
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
    },
});