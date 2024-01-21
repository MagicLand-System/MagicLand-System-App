import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const contentDataDefault = [
    {
        title: "Bài 10: Số nào ở đâu?",
        homework: [
            {
                name: "Làm quen với chữ số",
                descrip: "Bài tập flasd card hỗ trợ bé là quen với các số thứ tự",
                homeworkList: [
                    {
                        answer: 2,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    },
                    {
                        answer: 3,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    },
                    {
                        answer: 4,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    },
                    {
                        answer: 1,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    },
                ]
            },
            {
                name: "Các số từ 0 đến 20",
                descrip: "Bài tập flasd card hỗ trợ bé là quen với các số thứ tự",
                homeworkList: [
                    {
                        answer: 1,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    },
                    {
                        answer: 3,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    },
                    {
                        answer: 2,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    },
                    {
                        answer: 4,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    }
                ]
            },
            {
                name: "Số nào ở đâu?",
                descrip: "Bài tập flasd card hỗ trợ bé là quen với các số thứ tự",
                homeworkList: [
                    {
                        answer: 1,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    },
                    {
                        answer: 2,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    },
                    {
                        answer: 3,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    },
                    {
                        answer: 4,
                        mark: 1,
                        answerList: [
                            1,
                            2,
                            3,
                            4,
                        ]
                    }
                ]
            },
        ]
    }
]

export default function ClassContentScreen({ route, navigation }) {

    let classDetail = route?.params?.classDetail
    const [contentData, setContentData] = useState(contentDataDefault)
    const [focusHomework, setFocusHomework] = useState(contentDataDefault[0].homework[0])
    const [mode, setMode] = useState("list")
    const [title, setTitle] = useState("")

    useEffect(() => {
        classDetail = route?.params?.classDetail
    }, [route?.params?.classDetail])

    const handleChangeMode = (mode, title, homework) => {
        setMode(mode)
        setTitle(title)
        setFocusHomework(homework)
    }

    const handleDoHomeWork = () => {
        // console.log(focusHomework);
        navigation.push("MutilpleChoiceScreen", { homework: focusHomework, title: "Chủ đề 3 - Bài 10 + 11" })
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.pop} title={"Chủ đề 3 - Bài 10 + 11"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <Text style={{ ...styles.boldText, marginHorizontal: WIDTH * 0.05, color: "#241468", textAlign: "center", marginVertical: 30, fontSize: 20 }}>Chủ đề 3: Làm quen các số từ 0 đến 10, tập đếm đến 20 </Text>
                {
                    mode === "list" ?
                        contentData.map((item, key) => {
                            return (
                                <React.Fragment key={key}>
                                    <Text style={{ ...styles.title, ...styles.boldText }}>Bài 10: Số nào ở đâu?</Text>
                                    {
                                        item.homework.map((homework, index) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => handleChangeMode("view", `Bài 10 - ${index + 1} ${homework.name}`, homework)}
                                                    key={index}
                                                >
                                                    <Text style={styles.content}>{index + 1}. {homework.name}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </React.Fragment>
                            )
                        })
                        :
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ ...styles.title, ...styles.boldText, width: WIDTH * 0.9 }}>{title}</Text>
                            <View style={styles.doccumentView}>
                                <Text>Tài liệu</Text>
                            </View>
                            <View style={{ ...styles.flexColumn, marginVertical: 20, width: WIDTH * 0.9, alignItems: "flex-start" }}>
                                <Text style={{ ...styles.boldText, color: "#3D5CFF" }}>Bài tập:  </Text>
                                <Text style={{ width: WIDTH * 0.8 }}>{focusHomework.descrip}</Text>
                            </View>
                            <TouchableOpacity style={styles.startButton} onPress={handleDoHomeWork}>
                                <Text style={{ ...styles.boldText, color: "white" }}>Bắt Đầu</Text>
                            </TouchableOpacity>
                        </View>
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
    },
    title: {
        color: "#224BF4",
        marginHorizontal: WIDTH * 0.05
    },
    content: {
        marginHorizontal: WIDTH * 0.08,
        marginVertical: 10,
    },
    doccumentView: {
        width: WIDTH * 0.9,
        minHeight: HEIGHT * 0.3,
        marginHorizontal: WIDTH * 0.05,
        backgroundColor: "#D9D9D9"
    },
    startButton: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: "#4582E6"
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