import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../../components/header/Header';
import StudentView from '../../components/StudentView';

import { formatDate, formatPrice } from '../../util/util';
import ClassCartCard from '../../components/ClassCartCard';
import ChooseClassModal from '../../components/modal/ChooseClassModal';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
import { getStudents } from '../../api/student';
import { useFocusEffect } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ClassRegisterScreen({ route, navigation }) {

    const [studentList, setStudentList] = useState([])
    const [classList, setClassList] = useState(route?.params?.classList)
    const [classChoosed, setClassChoosed] = useState(classList?.filter(obj => obj.choose === true))
    const [modalVisible, setModalVisible] = useState({ classChoose: false })
    const user = useSelector(userSelector);

    useFocusEffect(
        React.useCallback(() => {
            loadStudentData()
        }, [])
    );

    useEffect(() => {
        setClassList(route?.params?.classList)
        setClassChoosed(classList?.filter(obj => obj.choose === true))
        loadStudentData()
    }, [route?.params?.classList, route?.params?.goback, user])

    const loadStudentData = async () => {
        const studentList = await getStudents()
        setStudentList(studentList.reverse())
    }

    const hanldeConfirm = () => {
        const registerList = studentList?.filter(student => student.check === true);
        if (registerList[0]) {
            navigation.push("PaymentScreen", { classDetail: classChoosed, studentList: registerList })
        } else {
            console.log("Chưa chọn học sinh");
        }

    }

    const hanldeAddStudent = () => {
        navigation.push("AddStudent")
    }

    const selectStudent = (id) => {
        setStudentList((prevStudentList) => {
            const index = prevStudentList.findIndex(obj => obj.id === id);
            return prevStudentList.map((item, i) => ({
                ...item,
                check: i === index ? !item.check : item.check,
            }));
        });
    };

    const onCancleClassChoose = () => {
        setModalVisible({ ...modalVisible, classChoose: false })
    }

    const onChooseClass = (id) => {
        setModalVisible({ ...modalVisible, classChoose: true })
    }

    return (
        <>
            <Header navigation={navigation} goback={navigation.popToTop} title={"Đăng Ký Khóa Học"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Chọn Cháu:</Text>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.studentList}>
                    {
                        studentList?.map((item, index) => {
                            return (
                                <StudentView student={item} index={index} key={index} onClick={selectStudent} />
                            )
                        })
                    }
                    <View style={styles.studentView}>
                        <TouchableOpacity style={styles.studentImage} onPress={hanldeAddStudent}>
                            <Icon name={"person-add-alt"} color={"#5A5A5A"} size={50} />
                        </TouchableOpacity>
                        <View style={styles.studentNameView}>
                            <Text style={styles.studentName}>
                                Thêm Bé
                            </Text>
                        </View>
                    </View >
                </ScrollView>
                <View style={styles.studentDetail}>
                    {
                        studentList?.filter(obj => obj.check === true)[0] &&
                        <Text style={styles.boldText}>Thông tin của cháu:</Text>
                    }
                    {
                        studentList.filter(obj => obj.check === true).map((item, index) => {
                            return (
                                <View key={index}>
                                    {
                                        index !== 0 &&
                                        <View style={styles.dashline} />
                                    }
                                    <View style={styles.flexColumn}>
                                        <Icon name={"edit"} color={"#4582E6"} size={32} />
                                        <View style={styles.detailView}>
                                            <Text style={styles.detailViewTitle}>Họ và Tên:</Text>
                                            <TextInput
                                                style={styles.studentInput}
                                                value={item.fullName}
                                                editable={false}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.flexColumn}>
                                        <Icon name={"card-giftcard"} color={"#4582E6"} size={32} />
                                        <View style={styles.detailView}>
                                            <Text style={styles.detailViewTitle}>Ngày sinh:</Text>
                                            <TextInput
                                                style={styles.studentInput}
                                                value={formatDate(item.dateOfBirth)}
                                                editable={false}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Thông Tin Khóa Học:</Text>
                </View>
                <View style={{ ...styles.studentDetail, marginTop: 20 }}>

                    <Text style={styles.boldText}>Thông tin khóa học:</Text>
                    {
                        classChoosed.map((item, index) => {
                            // borderTopWidth:  1 : 0,
                            return (
                                <View style={[index !== 0 ? styles.classDetail : ""]} key={index}>
                                    <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                        <Text style={styles.detailViewTitle}>Tên Khóa Học:</Text>
                                        <Text style={styles.boldText}>{item?.name} </Text>
                                    </View>
                                    <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                        <Text style={styles.detailViewTitle}>Số Lượng Đăng Ký:</Text>
                                        <Text style={styles.boldText}>{item?.limitNumberStudent ? item?.limitNumberStudent : 0} học sinh</Text>
                                    </View>
                                    <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                        <Text style={styles.detailViewTitle}>Học Phí:</Text>
                                        <Text style={styles.boldText}>{formatPrice(item?.coursePrice ? item?.coursePrice : 0)}đ</Text>
                                    </View>
                                </View>
                            )
                        })

                    }
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Lịch Học:</Text>
                    {
                        !classChoosed[0] &&
                        <TouchableOpacity style={{ ...styles.addClass, ...styles.flexColumn }} onPress={onChooseClass}>
                            <Text style={styles.addClassText}>Vui lòng chọn lịch học</Text>
                            <View style={styles.addClassIcon}>
                                <Icon name={"add"} color={"#222222"} size={15} />
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.classCard}>
                    {
                        classChoosed.map((item, index) => (
                            <React.Fragment key={index}>
                                <ClassCartCard cardDetail={item} index={item?.id} check={false} onClick={onChooseClass} />

                            </React.Fragment>
                        ))
                    }
                    <TouchableOpacity style={{ ...styles.flexColumn, marginLeft: 20 }} onPress={onChooseClass}>
                        <Icon name={"edit"} color={"#CFC9CA"} size={22} />
                        <Text style={styles.chooseClassText}>Chọn lịch học khác</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: "#4582E6" }} onPress={() => { hanldeConfirm() }}>
                        <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>Đăng Ký Ngay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ChooseClassModal visible={modalVisible.classChoose} classList={classList} setClassList={setClassList} setClassChoosed={setClassChoosed} onCancle={onCancleClassChoose} navigation={navigation} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // marginBottom: 80,
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
    },

    studentList: {
        width: "100%",
        paddingHorizontal: 20,
        marginVertical: 15,
        // borderWidth: 1,
        flexDirection: "row"
    },
    titleView: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderLeftWidth: 5,
        borderLeftColor: "#4582E6",
        marginTop: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#4582E6",
        fontWeight: "600",
        fontSize: 18,
    },
    studentDetail: {
        paddingHorizontal: WIDTH * 0.12
    },
    classDetail: {
        paddingTop: 10,
        borderTopWidth: 1,
        marginTop: 10,
    },
    detailView: {
        marginVertical: 10,
        marginLeft: 10,
    },
    detailViewTitle: {
        color: "#C4C4C4",
        fontSize: 15,
        fontWeight: "600"
    },
    studentInput: {
        width: WIDTH * 0.65,
        padding: 5,
        fontWeight: "600",
        borderBottomWidth: 1,
        borderBottomColor: "#C4C4C4"
    },
    dashline: {
        width: "100%",
        height: 2,
        backgroundColor: "#C4C4C4",
        marginVertical: 5
    },
    classCard: {
        marginVertical: 20,
        marginHorizontal: WIDTH * 0.08
    },
    chooseClassText: {
        color: "#CFC9CA",
        textDecorationLine: "underline",
    },
    addClass: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#888888",
        marginHorizontal: 10,
        backgroundColor: "white"
    },
    addClassText: {
        color: "#888888"
    },
    addClassIcon: {
        padding: 3,
        borderRadius: 50,
        backgroundColor: "rgba(126, 134, 158, 0.25)",
        marginLeft: 10
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 15,
        backgroundColor: "white"
    },
    button: {
        width: WIDTH * 0.7,
        borderColor: "#C71212",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },

    studentView: {
        // width: WIDTH * 0.7,
        marginRight: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    studentImage: {
        position: "relative",
        width: WIDTH * 0.2,
        height: WIDTH * 0.2,
        borderWidth: 3,
        borderRadius: 150,
        borderColor: "#888888",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
    },
    studentCheck: {
        position: "absolute",
        right: 0,
        top: 0,
        padding: 2,
        borderRadius: 50,
        backgroundColor: "",
    },
    studentNameView: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 50,
        marginTop: 10,
        backgroundColor: "#C4C4C4"
    },
    studentName: {
        fontWeight: "600",
        fontSize: 12,
        color: "#888888"
    },
});