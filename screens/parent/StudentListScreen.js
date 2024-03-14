import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useFocusEffect } from '@react-navigation/native';
import { studentSelector } from '../../store/selector';
import { useDispatch, useSelector } from 'react-redux';

import { deleteStudent, getStudents } from '../../api/student';
import FavoriteHeader from '../../components/header/FavoriteHeader';
import SpinnerLoading from '../../components/SpinnerLoading';
import { formatDate } from '../../util/util';
import { fetchStudentList } from '../../store/features/studentSlice';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function StudentListScreen({ navigation }) {

    const student = useSelector(studentSelector)
    const [studentList, setStudentList] = useState(student)
    const [loading, setLoading] = useState(true)
    const [screenStatus, setScreenStatus] = useState({ edit: false })
    const dispatch = useDispatch()

    useEffect(() => {
        loadStudentData()
    }, [student])

    const loadStudentData = async () => {
        setLoading(true)
        if (student[0]) {
            setStudentList(student?.filter(item => item.isActive))
        } else {
            console.log("can not get student ");
        }
        setLoading(false)
    }
    
    const handleOnpress = async (item, id) => {
        if (screenStatus.edit) {
            setStudentList((prevStudentList) => {
                const index = prevStudentList.findIndex(obj => obj.id === id);
                return prevStudentList.map((item, i) => ({
                    ...item,
                    check: i === index ? !item.check : false,
                }));
            });
        } else {
            navigation.push("StudentDetailScreen", { studentDetail: item })
        }
    };

    const hanldeChangeStatus = async () => {
        if (screenStatus.edit) {
            if (countingCheckStudent() !== 0) {
                let flag = false
                studentList.map(async (item) => {
                    if (item?.check) {
                        const response = await deleteStudent(item?.id)
                            .then(dispatch(fetchStudentList()))
                        if (response.status === 200) {

                            flag = true
                        } else {
                            console.log(response.response.data);
                        }
                    }
                })
                if (flag) {
                    console.log("delete complete");
                }
                await loadStudentData()
            }
            setScreenStatus({ edit: false })
        } else {
            setScreenStatus({ edit: true })
        }
    }

    const countingCheckStudent = () => {
        return studentList.filter(item => item?.check)?.length
    }

    return (
        <View style={styles.container}>
            <FavoriteHeader
                navigation={navigation}
                title={`Danh Sách Các Bé`}
                type={screenStatus.edit}
                setType={hanldeChangeStatus}
                defaultType={countingCheckStudent() === 0 ? "Huỷ" : "Xóa"}
                editType={"Sửa"}
            />
            {
                loading ?
                    <SpinnerLoading />
                    :
                    <>
                        <View>
                            {
                                studentList.map((item, key) => {
                                    return (
                                        <TouchableOpacity
                                            style={[styles.flexColumnBetween, styles.studentTab]}
                                            onPress={() => handleOnpress(item, item.id)}
                                            key={key}
                                        >
                                            <View style={styles.flexColumn}>
                                                <View style={styles.checkBox}>
                                                    {
                                                        screenStatus.edit &&
                                                        (
                                                            !item.check ?
                                                                <Icon name={"circle-outline"} color={"#888888"} size={30} />
                                                                :
                                                                < Icon name={"check-circle-outline"} color={"#1BAE3B"} size={30} />
                                                        )
                                                    }

                                                </View>
                                                <Image
                                                    source={{ uri: item.avatarImage }}
                                                    style={styles.studentAvatar}
                                                    resizeMode='cover'
                                                />
                                                <View style={{ marginHorizontal: 15 }}>
                                                    <Text style={{ ...styles.boldText, marginBottom: 15, color: "#241468" }}>Bé: {item?.fullName}</Text>
                                                    <Text>Ngày sinh: {formatDate(item?.dateOfBirth)}</Text>
                                                </View>
                                            </View>
                                            <Icon name={"chevron-right"} color={"black"} size={30} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        {
                            !screenStatus.edit &&
                            <View style={{ ...styles.flexColumnBetween, padding: 15, justifyContent: "flex-end" }}>
                                <TouchableOpacity style={styles.addButton} onPress={() => navigation.push("AddStudent")}>
                                    <Icon name={"plus"} color={"white"} size={25} />
                                </TouchableOpacity>
                            </View>
                        }
                    </>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    studentTab: {
        // padding: 10,
        paddingVertical: 10,
        marginHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: "#E5E5E5"
    },
    checkBox: {
        width: 30,
        height: 30,
        marginHorizontal: 10
    },
    studentAvatar: {
        width: 80,
        height: 80,
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: 50,
    },
    addButton: {
        padding: 8,
        borderRadius: 50,
        backgroundColor: "#4582E6",
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
        fontWeight: "700",
    },
})