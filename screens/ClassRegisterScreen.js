import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import Header from '../components/header/Header';
import StudentView from '../components/StudentView';

import { formatPrice } from '../util/util';
import ClassCard from '../components/ClassCard';
import ChooseClassModal from '../components/modal/ChooseClassModal';

const studentListDefault = [
    {
        id: 0,
        name: "Lê Bảo Ngọc",
        age: "10",
        dob: "2-2-2002",
        check: true,
    },
    {
        id: 1,
        name: "Trần Hữu Nghĩa",
        age: "11",
        dob: "2-2-2003",
        check: false,
    },
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ClassRegisterScreen({ route, navigation }) {

    const [studentList, setStudentList] = useState([...studentListDefault])
    const [classList, setClassList] = useState(route?.params?.classList)
    const [classChoosed, setClassChoosed] = useState(classList?.filter(obj => obj.choose === true)[0])
    const [modalVisible, setModalVisible] = useState({ classChoose: false })

    useEffect(() => {
        setClassList(route?.params?.classList)
        setStudentList(studentListDefault)
        setClassChoosed(classList?.filter(obj => obj.choose === true)[0])
    }, [route?.params?.classList, route?.params?.goback])

    const hanldeConfirm = () => {
        const registerList = studentList?.filter(student => student.check === true);
        navigation.push("PaymentScreen", { classDetail: classChoosed, studentList: registerList })
    }

    const selectStudent = (id) => {
        const index = studentList.findIndex(obj => obj.id === id);
        const updateArray = [...studentListDefault]
        const defaultStatus = updateArray[index].check
        // updateArray.forEach(item => item.check = false)
        updateArray[index].check = !defaultStatus;
        // console.log(updateArray);
        setStudentList(updateArray)
    }

    const onCancleClassChoose = () => {
        setModalVisible({ ...modalVisible, classChoose: false })
    }

    const onChooseClass = (id) => {
        setModalVisible({ ...modalVisible, classChoose: true })
    }

    return (
        <>
            <Header navigation={navigation} background={"#FF8F8F"} goback={navigation.popToTop} title={"Đăng Ký Khóa Học"} />
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
                        <View style={styles.studentImage}>
                            <Icon name={"person-add-alt"} color={"#5A5A5A"} size={50} />
                        </View>
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
                                        <Icon name={"edit"} color={"#FF8D9D"} size={32} />
                                        <View style={styles.detailView}>
                                            <Text style={styles.detailViewTitle}>Họ và Tên:</Text>
                                            <TextInput
                                                style={styles.studentInput}
                                                value={item.name}
                                                editable={false}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.flexColumn}>
                                        <Icon name={"card-giftcard"} color={"#FF8D9D"} size={32} />
                                        <View style={styles.detailView}>
                                            <Text style={styles.detailViewTitle}>Họ và Tên:</Text>
                                            <TextInput
                                                style={styles.studentInput}
                                                value={item.dob}
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
                    {
                        classChoosed &&
                        <>
                            <Text style={styles.boldText}>Thông tin khóa học:</Text>
                            <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                <Text style={styles.detailViewTitle}>Tên Khóa Học:</Text>
                                <Text style={styles.boldText}>{classChoosed?.title} </Text>
                            </View>
                            <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                <Text style={styles.detailViewTitle}>Số Lượng Đăng Ký:</Text>
                                <Text style={styles.boldText}>{classChoosed?.registerAmount}</Text>
                            </View>
                            <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                <Text style={styles.detailViewTitle}>Học Phí:</Text>
                                <Text style={styles.boldText}>{formatPrice(classChoosed?.price)}đ</Text>
                            </View>
                        </>
                    }
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Lịch Học:</Text>
                    {
                        !classChoosed &&
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
                        classChoosed &&
                        <>
                            <ClassCard cardDetail={classChoosed} index={classChoosed?.id} check={false} onClick={onChooseClass} />
                            <TouchableOpacity style={{ ...styles.flexColumn, marginLeft: 20 }} onPress={onChooseClass}>
                                <Icon name={"edit"} color={"#CFC9CA"} size={22} />
                                <Text style={styles.chooseClassText}>Chọn lịch học khác</Text>
                            </TouchableOpacity>
                        </>
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: "#FF8D9D" }} onPress={() => { hanldeConfirm() }}>
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
        borderLeftColor: "#FF8F8F",
        marginTop: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#FF8F8F",
        fontWeight: "600",
        fontSize: 18,
    },
    studentDetail: {
        paddingHorizontal: WIDTH * 0.12
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
        borderRadius: 50,
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