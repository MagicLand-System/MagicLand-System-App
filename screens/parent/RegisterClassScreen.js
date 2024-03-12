import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { formatPrice } from '../../util/util';
import DropdownComponent from '../../components/DropdownComponent';
import FavoriteHeader from '../../components/header/FavoriteHeader';
import { useSelector } from 'react-redux';
import { studentSelector, userSelector } from '../../store/selector';
import { getStudents } from '../../api/student';
import { useFocusEffect } from '@react-navigation/native';
import ChooseStudentModal from '../../components/modal/ChooseStudentModal';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function RegisterClassScreen({ route, navigation }) {


    const [focusCourse, setFocusCourse] = useState({})
    const [courseList, setCourseList] = useState(route?.params?.courseList)
    const [visible, setVisible] = useState({ submit: true, chooseStudent: false })
    const student = useSelector(studentSelector)

    const handleNavigate = () => {
        if (totalComplete() === courseList.length) {
            navigation.push("MultiplePaymentScreen", { courseList: courseList })
        }
    }

    const handleChooseStudent = (item, student) => {
        const index = courseList.findIndex(obj => obj?.itemId === item?.itemId);
        const updateArray = [...courseList];
        if (updateArray[index].student) {
            const studentIndex = updateArray[index].student.findIndex(student => student?.student === student?.id);
            if (studentIndex !== -1) {
                updateArray[index].student.splice(studentIndex, 1);
            } else {
                updateArray[index].student.push({ student: student?.id });
            }
        } else {
            updateArray[index].student = []
            updateArray[index].student.push({ student: student?.id });
        }
        setCourseList(updateArray);
    }

    // const handleChooseClass = (item, classId) => {
    //     const index = courseList.findIndex(obj => obj?.itemId === item?.itemId);
    //     const updateArray = [...courseList]
    //     updateArray[index].classId = classId;
    //     if (updateArray[index].student && updateArray[index].student[0]) {
    //         updateArray[index].student = classId;
    //     }
    //     setCourseList(updateArray)
    // }

    const handleChooseClass = (item, classId) => {
        const index = courseList.findIndex(obj => obj?.itemId === item?.itemId);
        const updateArray = [...courseList];
        updateArray[index].classId = classId;
    
        if (updateArray[index].student && updateArray[index].student.length > 0) {
            updateArray[index].student.forEach(student => {
                student.class = classId;
            });
        }
    
        setCourseList(updateArray);
    }

    const totalPrice = () => {
        let total = 0
        courseList.forEach(element => {
            total += element?.price
        });
        return total
    }

    const checkAllFeild = (item) => {
        if (item?.student) {
            if (item?.itemType === "COURSE") {
                return item?.classId ? true : false
            } else {
                return true
            }
        }
        return false
    }

    const checkAnyComplete = () => {
        let flag = false
        courseList.forEach(item => {
            if (item?.student) {
                if (item?.itemType === "COURSE") {
                    flag = item?.classId ? true : false
                } else {
                    flag = true
                }
            }
            // if (item?.student && item?.date) {
            //     flag = true
            // }
        });

        return flag
    }

    const totalComplete = () => {
        let amount = 0
        courseList.forEach(item => {
            if (item?.student) {
                if (item?.itemType === "COURSE") {
                    flag = item?.classId && (amount += 1)
                } else {
                    amount += 1
                }
            }
        });

        return amount
    }

    const findClassDetail = (array, classId) => {
        const index = array.findIndex(obj => obj?.classId === classId.classId);
        if (index !== -1) {
            return array[classId._index].schedule + array[index].slot
        } else {
            return ""
        }
    }

    const findStudentById = (id) => {
        return student.find(item => item.id === id);
    }

    return (
        <>
            <FavoriteHeader
                navigation={navigation}
                title={"Đăng Ký Khóa Học"}
                type={visible?.submit}
                setType={() => setVisible({ ...visible, submit: !visible.submit })}
                defaultType={"Sửa"}
                editType={"Xong"}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Thông Tin Đăng Ký</Text>
                </View>
                <View style={{ ...styles.table, marginLeft: checkAnyComplete() ? 30 : WIDTH * 0.05 }}>
                    <View style={{ ...styles.tableColumn, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: "hidden" }}>
                        <View style={[styles.courseName, styles.tabRightBorder, styles.tableHeader]}>
                            <Text style={[styles.tableText, styles.tableHeaderText]}>Tên khóa học</Text>
                        </View>
                        <View style={[styles.studentInfor, styles.tabRightBorder, styles.tableHeader]}>
                            <Text style={[styles.tableText, styles.tableHeaderText]}>Thông tin của cháu</Text>
                        </View>
                        <View style={[styles.calendar, styles.tabRightBorder, styles.tableHeader]}>
                            <Text style={[styles.tableText, styles.tableHeaderText]}>Lịch học</Text>
                        </View>
                        <View style={[styles.classPrice, styles.tableHeader]}>
                            <Text style={[styles.tableText, styles.tableHeaderText]}>Học Phí</Text>
                        </View>
                    </View>
                    {
                        courseList?.filter(item => item?.choose === true)?.map((item, index) => {
                            if (item?.student && item?.student[0]) {
                                return (
                                    item?.student?.map((element, key) => {
                                        const studentFouned = findStudentById(element?.student)
                                        return (
                                            <View style={{ ...styles.tableColumn, borderBottomWidth: 1, borderColor: "#F9ACC0" }} key={key}>
                                                {
                                                    checkAllFeild(item) &&
                                                    <View style={styles.completeCheck}>
                                                        <Icon name={"check"} color={"white"} size={22} />
                                                    </View>
                                                }
                                                <View style={[styles.courseName, styles.tabRightBorder]}>
                                                    <Text style={{ ...styles.tableText, color: "#3AA6B9", fontWeight: "600" }} numberOfLines={1}>{item?.name}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={[styles.studentInfor, styles.tabRightBorder]}
                                                    onPress={() => {
                                                        setVisible({ ...visible, chooseStudent: true })
                                                        setFocusCourse(item)
                                                    }}
                                                >
                                                    <Text>
                                                        {studentFouned?.fullName}
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={[styles.calendar, styles.tabRightBorder]}>
                                                    <DropdownComponent
                                                        dropdownStyle={styles.dropdownStyle}
                                                        studentList={item?.schedules}
                                                        labelField={"schedule"}
                                                        valueField={"classId"}
                                                        dropdownItem={(item) => item.schedule + " " + item.slot}
                                                        rightIcon={() => (
                                                            item?.itemType === "COURSE" &&
                                                            <View >
                                                                <Icon name={"chevron-down"} color={"#241468"} size={12} />
                                                            </View>
                                                        )}
                                                        onChoose={(classId) => handleChooseClass(item, classId)}
                                                        placeHolder={
                                                            item?.itemType === "CLASS" ?
                                                                <Text>{item?.schedules[0].schedule} {item?.schedules[0]?.slot}</Text>
                                                                :
                                                                item?.classId ?
                                                                    <Text>{findClassDetail(item?.schedules, item?.classId)}</Text>
                                                                    :
                                                                    <Text numberOfLines={1}>Chọn lớp</Text>
                                                        }
                                                        disable={item?.itemType === "CLASS"}
                                                    />
                                                </View>
                                                <View style={[styles.classPrice]}>
                                                    <Text style={[styles.tableText]}>{formatPrice(item?.price ? item?.price : 0)}đ</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                )
                            } else {
                                return (
                                    <View style={{ ...styles.tableColumn, borderBottomWidth: 1, borderColor: "#F9ACC0" }} key={index}>
                                        {
                                            checkAllFeild(item) &&
                                            <View style={styles.completeCheck}>
                                                <Icon name={"check"} color={"white"} size={22} />
                                            </View>
                                        }
                                        <View style={[styles.courseName, styles.tabRightBorder]}>
                                            <Text style={{ ...styles.tableText, color: "#3AA6B9", fontWeight: "600" }} numberOfLines={1}>{item?.name}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={[styles.studentInfor, styles.tabRightBorder]}
                                            onPress={() => {
                                                setVisible({ ...visible, chooseStudent: true })
                                                setFocusCourse(item)
                                            }}
                                        >
                                            <Text>
                                                Thêm Học sinh
                                                {/* <View style={{ backgroundColor: "rgba(126, 134, 158, 0.25)", borderRadius: 50 }}> */}
                                                <Icon name={"plus"} color={"#241468"} size={22} />
                                                {/* </View> */}
                                            </Text>
                                            {/* {
                                                    <DropdownComponent
                                                        dropdownStyle={styles.dropdownStyle}
                                                        studentList={studentList}
                                                        labelField={"fullName"}
                                                        valueField={"id"}
                                                        dropdownItem={(item) => item.fullName}
                                                        rightIcon={() => (
                                                            !item.student &&
                                                            <View style={{ backgroundColor: "rgba(126, 134, 158, 0.25)", borderRadius: 50 }}>
                                                                <Icon name={"plus"} color={"#241468"} size={22} />
                                                            </View>
                                                        )}
                                                        onChoose={(student) => handleChooseStudent(item, student)}
                                                        placeHolder={
                                                            item?.student ?
                                                                item?.student?.fullName
                                                                :
                                                                "Thêm thông tin cháu"
                                                        }
                                                    />
                                                } */}
                                        </TouchableOpacity>
                                        <View style={[styles.calendar, styles.tabRightBorder]}>
                                            <DropdownComponent
                                                dropdownStyle={styles.dropdownStyle}
                                                studentList={item?.schedules}
                                                labelField={"schedule"}
                                                valueField={"classId"}
                                                dropdownItem={(item) => item.schedule + " " + item.slot}
                                                rightIcon={() => (
                                                    item?.itemType === "COURSE" &&
                                                    <View >
                                                        <Icon name={"chevron-down"} color={"#241468"} size={12} />
                                                    </View>
                                                )}
                                                onChoose={(classId) => handleChooseClass(item, classId)}
                                                placeHolder={
                                                    item?.itemType === "CLASS" ?
                                                        <Text>{item?.schedules[0].schedule} {item?.schedules[0]?.slot}</Text>
                                                        :
                                                        item?.classId ?
                                                            <Text>{findClassDetail(item?.schedules, item?.classId)}</Text>
                                                            :
                                                            <Text numberOfLines={1}>Chọn lớp</Text>
                                                }
                                                disable={item?.itemType === "CLASS"}
                                            />
                                        </View>
                                        <View style={[styles.classPrice]}>
                                            <Text style={[styles.tableText]}>{formatPrice(item?.price ? item?.price : 0)}đ</Text>
                                        </View>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
                <View style={{ ...styles.flexColumnBetween, paddingHorizontal: 20, marginVertical: 20 }}>
                    <Text style={styles.boldText}>Tổng thanh toán</Text>
                    <Text style={styles.price}>{formatPrice(totalPrice() ? totalPrice() : 0)}đ</Text>
                </View>
            </ScrollView >
            <View style={styles.bottomButton}>
                <View style={{ ...styles.flexColumnBetween, width: "100%" }}>
                    <View style={styles.flexColumn}>
                        {
                            totalComplete() === courseList.length ?
                                <View style={{ backgroundColor: "white", borderRadius: 50 }}>
                                    <Icon name={"check"} color={"#241468"} size={22} />
                                </View>
                                :
                                <View style={{ borderWidth: 3, borderColor: "#888888", borderRadius: 50, width: 15, height: 15 }}>
                                    <Icon name={"check"} color={"#241468"} size={22} />
                                </View>
                        }
                        <Text style={{ color: "#888888", fontWeight: "600", marginLeft: 10 }}>Tất cả</Text>
                    </View>
                    <View style={styles.flexColumn}>
                        {
                            visible.submit &&
                            <Text style={{ color: "white", fontWeight: "600", marginRight: 10 }}>{formatPrice(totalPrice() ? totalPrice() : 0)}đ</Text>
                        }

                        <TouchableOpacity style={{ ...styles.button, backgroundColor: totalComplete() === courseList.length ? "white" : "#C4C4C4" }} onPress={handleNavigate}>
                            <Text style={{ color: "#241468", fontWeight: "600" }}>
                                Đăng Ký ({totalComplete()})
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                    <Text style={{ color: "white" }}>
                        Đăng Ký Ngay
                    </Text>
                </TouchableOpacity> */}
            </View>
            <ChooseStudentModal
                focusCourse={focusCourse}
                selectStudent={handleChooseStudent}
                visible={visible.chooseStudent}
                onCancle={() => { setVisible({ ...visible, chooseStudent: false }) }}
                navigation={navigation}
            />
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
        borderLeftColor: "#241468",
        marginVertical: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#241468",
        fontWeight: "600",
        fontSize: 18,
    },
    table: {
        width: WIDTH * 0.9,
        borderRadius: 15,
        marginHorizontal: WIDTH * 0.05,
        // overflow: "hidden",
        backgroundColor: "rgba(249, 172, 192, 0.2)",
        zIndex: 10,
    },
    tableColumn: {
        position: "relative",
        flexDirection: "row",
        // alignItems: "center"
    },
    tableText: {
        fontSize: 10,
        padding: 8,
        paddingVertical: 15,
        color: "#888888"
    },
    tableHeaderText: {
        color: "#241468",
        fontWeight: "600",
    },
    tableHeader: {
        backgroundColor: "rgba(36, 20, 104, 0.4)",
    },
    tabRightBorder: {
        height: 50,
        borderRightWidth: 1,
        borderColor: "#241468",
        justifyContent: "center"
    },
    courseName: {
        width: '28%'
    },
    studentInfor: {
        width: '30%',
        alignItems: "center",
        justifyContent: "center"
    },
    calendar: {
        width: '22%'
    },
    classPrice: {
        width: '20%',
        justifyContent: "center",
    },
    price: {
        color: "#FF8D9D"
    },
    completeCheck: {
        // height: "100%",
        position: "absolute",
        left: -25,
        top: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#241468",
        borderRadius: 50
    },

    boldText: {
        fontWeight: "700"
    },

    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center"
    },

    dropdownElement: {
        padding: 5,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#FF8F8F"
    },

    bottomButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 8,
        paddingBottom: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#241468"
    },
    button: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: "white",
    },

    dropdownStyle: {
        // width: 100,
        maxWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        fontSize: 10
    }
});