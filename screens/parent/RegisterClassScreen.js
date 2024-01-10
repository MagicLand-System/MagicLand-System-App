import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { formatPrice } from '../../util/util';
import DropdownComponent from '../../components/DropdownComponent';
import FavoriteHeader from '../../components/header/FavoriteHeader';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const dateDefault = [
    {
        id: 0,
        name: "Thứ 2 - 4 - 6 (7h30 - 9h)",
    },
    {
        id: 1,
        name: "Thứ 3 - 5 - 7 (7h30 - 9h)",
    },
    {
        id: 2,
        name: "Thứ 7 - Cn (7h30 - 9h)",
    },
]

export default function RegisterClassScreen({ route, navigation }) {

    const [courseList, setCourseList] = useState(route?.params?.courseList)
    const [visible, setVisible] = useState({ submit: true })
    const user = useSelector(userSelector);

    useEffect(() => {
        loadSchedule()
    }, [route?.params?.courseList])

    const loadSchedule = async () => {
        courseList.map(item => {
            checkExistedSchedule(item) &&
                setSchedule(item)
        })
    }

    const handleNavigate = () => {
        // console.log(courseList[1].class);
        if (totalComplete() === courseList.length) {
            navigation.push("MultiplePaymentScreen", { courseList: courseList })
        }
    }

    const handleChooseStudent = (item, student) => {
        const index = courseList.findIndex(obj => obj?.class?.id === item?.id);
        const updateArray = [...courseList]
        updateArray[index].class.student = student;
        setCourseList(updateArray)
    }

    const handleChooseDate = (item, date) => {
        const index = courseList.findIndex(obj => obj.class.id === item.id);
        const updateArray = [...courseList]
        updateArray[index].class.date = date;
        setCourseList(updateArray)
    }

    const totalPrice = () => {
        let total = 0
        courseList.forEach(element => {
            total += element.class.coursePrice
        });
        return total
    }

    const checkAllFeild = (item) => {
        if (item?.student && item?.date) {
            return true
        }
        return false
    }

    const checkAnyComplete = () => {
        let flag = false
        courseList.forEach(item => {
            if (item?.student && item?.date) {
                flag = true
            }
        });

        return flag
    }

    const totalComplete = () => {
        let amount = 0
        courseList.forEach(item => {
            if (item?.class?.student && item?.class?.date) {
                amount += 1
            }
        });

        return amount
    }

    const checkExistedSchedule = (item) => {
        const index = courseList.findIndex(obj => obj.class.id === item?.class.id);
        return courseList[index]?.class?.schedules[0] ?
            true
            :
            false
    }

    const setSchedule = (item) => {
        const index = courseList.findIndex(obj => obj.class.id === item?.class.id);
        switch (courseList[index]?.class?.schedules[0].dayOfWeeks) {
            case "Monday":
                handleChooseDate(item?.class, dateDefault[0])
                break;
            case "Tuesday":
                handleChooseDate(item?.class, dateDefault[1])
                break;
            case "Saturday":
                handleChooseDate(item?.class, dateDefault[2])
                break;

            default:
                break;
        }
    }

    return (
        <>
            <FavoriteHeader
                navigation={navigation}
                background={"#241468"}
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
                        courseList?.filter(item => item.class.choose === true)?.map((item, index) => {
                            return (
                                <View style={{ ...styles.tableColumn, borderBottomWidth: 1, borderColor: "#F9ACC0" }} key={index}>
                                    {
                                        checkAllFeild(item.class) &&
                                        <View style={styles.completeCheck}>
                                            <Icon name={"check"} color={"white"} size={22} />
                                        </View>
                                    }
                                    <View style={[styles.courseName, styles.tabRightBorder]}>
                                        <Text style={{ ...styles.tableText, color: "#3AA6B9", fontWeight: "600" }} numberOfLines={1}>{item?.class.name}</Text>
                                    </View>
                                    <View style={[styles.studentInfor, styles.tabRightBorder]}>
                                        {
                                            <DropdownComponent
                                                dropdownStyle={styles.dropdownStyle}
                                                studentList={user.students}
                                                labelField={"fullName"}
                                                valueField={"id"}
                                                dropdownItem={(item) => item.fullName}
                                                rightIcon={() => (
                                                    !item.class.student &&
                                                    <View style={{ backgroundColor: "rgba(126, 134, 158, 0.25)", borderRadius: 50 }}>
                                                        <Icon name={"plus"} color={"#241468"} size={22} />
                                                    </View>
                                                )}
                                                onChoose={(student) => handleChooseStudent(item.class, student)}
                                                placeHolder={
                                                    item?.class?.student ?
                                                        item?.class?.student?.fullName
                                                        :
                                                        "Thêm thông tin cháu"
                                                }
                                            />
                                        }
                                    </View>
                                    <View style={[styles.calendar, styles.tabRightBorder]}>
                                        <DropdownComponent
                                            dropdownStyle={styles.dropdownStyle}
                                            studentList={dateDefault}
                                            labelField={"name"}
                                            valueField={"id"}
                                            dropdownItem={(item) => item.name}
                                            rightIcon={() => (
                                                !item?.class.date &&
                                                <View >
                                                    <Icon name={"chevron-down"} color={"#241468"} size={12} />
                                                </View>
                                            )}
                                            onChoose={(date) => handleChooseDate(item?.class, date)}
                                            placeHolder={
                                                checkExistedSchedule(item) ?
                                                    item?.class?.date?.name
                                                    :
                                                    item?.class?.date ?
                                                        item?.class?.date?.name
                                                        :
                                                        <Text numberOfLines={1}>Chọn lớp</Text>
                                            }
                                            disable={checkExistedSchedule(item)}
                                        />
                                        {/* <Text style={[styles.tableText]} >Lịch học</Text> */}
                                    </View>
                                    <View style={[styles.classPrice]}>
                                        <Text style={[styles.tableText]}>{formatPrice(item?.class?.coursePrice ? item?.class?.coursePrice : 0)}đ</Text>
                                    </View>
                                </View>
                            )
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
        width: '30%'
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