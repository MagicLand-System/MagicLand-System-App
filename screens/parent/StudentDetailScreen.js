import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FavoriteHeader from '../../components/header/FavoriteHeader';
import { formatDate } from '../../util/util';
import { getStudentByid } from '../../api/student';
import { useFocusEffect } from '@react-navigation/native';
import { getCourseByStudentId } from '../../api/course';
import CourseCard from '../../components/CourseCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function StudentDetailScreen({ route, navigation }) {
    const [studentDetail, setStudentDetail] = useState({})
    const [courseList, setCourseList] = useState([])
    const [loading, setLoading] = useState(true)
    const [screenStatus, setScreenStatus] = useState({ edit: false })

    useFocusEffect(
        React.useCallback(() => {
            loadStudentData()
        }, [])
    );

    useEffect(() => {
        loadCourseData()
    }, [])

    const loadStudentData = async () => {
        // console.log("get in");
        const response = await getStudentByid(route?.params?.studentDetail?.id)
        if (response?.status === 200) {
            setStudentDetail(response?.data)
        } else {
            console.log(response?.response?.data);
        }
    }

    const loadCourseData = async () => {
        const response = await getCourseByStudentId(route?.params?.studentDetail?.id)
        if (response?.status === 200) {
            setCourseList(response?.data)
        } else {
            console.log(response?.response?.data);
        }
    }

    const hanldeChangeStatus = () => {
        navigation.push("EditStudentScreen", { studentDetail: studentDetail })
    }

    const hanldeCoursePress = (course) => {
        navigation.navigate("CourseDetailScreen", { course: course })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <FavoriteHeader
                navigation={navigation}
                title={`Thông tin của bé`}
                type={screenStatus.edit}
                setType={hanldeChangeStatus}
                defaultType={"Chỉnh sửa"}
                editType={"Chỉnh sửa"}
            />
            <View style={styles.flexColumnAround}>
                <Image
                    source={{ uri: studentDetail?.avatarImage }}
                    style={styles.avatar}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>Thông tin bé</Text>
            </View>
            <View style={styles.flexColumnBetween}>
                <Text style={styles.boldText}>Tên</Text>
                <Text style={{ ...styles.boldText, color: "#757575" }}>{studentDetail?.fullName}</Text>
            </View>
            <View style={styles.flexColumnBetween}>
                <Text style={styles.boldText}>Ngày sinh</Text>
                <Text style={{ ...styles.boldText, color: "#757575" }}>{formatDate(studentDetail?.dateOfBirth)}</Text>
            </View>
            <View style={styles.flexColumnBetween}>
                <Text style={styles.boldText}>Giới tính</Text>
                <Text style={{ ...styles.boldText, color: "#757575" }}>{studentDetail?.gender}</Text>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>Khóa học đã đăng ký</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    courseList.map((item, index) => {
                        return (
                            <CourseCard cardDetail={item} onClick={hanldeCoursePress} navigation={navigation} key={index} />
                        )
                    })
                }
            </ScrollView>
        </ScrollView >
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
        // borderLeftWidth: 5,
        // borderLeftColor: "#4582E6",
        marginVertical: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#4582E6",
        fontWeight: "600",
        fontSize: 18,
    },
    avatar: {
        width: WIDTH * 0.2,
        height: WIDTH * 0.2,
        borderRadius: 150,
        overflow: "hidden",
        margin: 10,
    },

    flexColumnAround: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // borderWidth: 1,
    },
    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
        marginHorizontal: WIDTH * 0.05
    },
    boldText: {
        fontWeight: "700"
    },
});