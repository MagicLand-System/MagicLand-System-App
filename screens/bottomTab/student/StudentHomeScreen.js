import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { userSelector } from '../../../store/selector';
import { useSelector } from 'react-redux';
import { constants } from '../../../constants/constants';

import { getCourseRegisted, getCurrentQuiz } from "../../../api/student"

import SearchBar from '../../../components/SearchBar';
import CourseDetailClassViewCard from '../../../components/CourseDetailClassViewCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default function StudentHomeScreen({ navigation }) {

    const [searchValue, setSearchValue] = useState("")
    const [filterVisible, setFilterVisible] = useState(false)
    const [resgistedCourse, setResgistedCourse] = useState([])
    const [quizList, setQuizList] = useState([])
    const user = useSelector(userSelector);

    useEffect(() => {
        loadResgistedCourseData()
        loadQuizListData()
    }, [])

    const loadResgistedCourseData = async () => {
        const response = await getCourseRegisted()
        if (response?.status === 200) {
            setResgistedCourse(response?.data)
        } else {
            console.log("loadResgistedCourseData fail");
        }
    }

    const loadQuizListData = async () => {
        const response = await getCurrentQuiz()
        if (response?.status === 200) {
            setQuizList(response?.data)
        } else {
            console.log("loadQuizListData fail");
        }
    }

    const handleSearch = (value) => {
        setSearchValue(value)
    }
    const handlePressCourse = (item) => {
        navigation.push("CourseSyllabus", { courseDetail: item })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={{ ...styles.flexBetweenColumn, paddingHorizontal: 20 }}>
                    <View style={styles.headerInforLeft}>
                        <Text style={{ color: "white" }}>Xin chào!</Text>
                        <Text style={{ fontWeight: "700", fontSize: 18, color: "white" }}>Học Viên: {user.fullName}</Text>
                    </View>
                    <View style={styles.headerInforRight}>
                        <View style={styles.flexBetweenColumn}>
                            <TouchableOpacity style={styles.iconNavigate}>
                                <Icon name={"bell"} color={"#ffffff"} size={28} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.searchBar}>
                    <SearchBar input={searchValue} setInput={handleSearch} setFilterModal={setFilterVisible} placeHolder={"Tìm kiếm khóa học..."} />
                </View>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>Các khóa học của bạn:</Text>
            </View>
            <ScrollView style={styles.courseList}>
                {
                    resgistedCourse?.map((item, index) => {
                        return <CourseDetailClassViewCard cardDetail={item} type={"COURSE"} check={false} index={index} onClick={() => handlePressCourse(item)} key={index} />
                    })
                }
            </ScrollView>
            <View style={styles.titleView}>
                <Text style={styles.title}>Bài tập sắp đến hạn:</Text>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1
        // paddingBottom: 80,
        // marginBottom: 15,
    },
    header: {
        backgroundColor: constants.background,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingBottom: 15
    },
    headerInforLeft: {
        marginTop: 10,
    },
    iconNavigate: {
        marginHorizontal: 10
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
    searchBar: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginTop: 20,
    },
    courseList: {
        maxHeight: HEIGHT * 0.5
    },

    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    flexBetweenColumn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    boldText: {
        fontWeight: "600",
    },
});