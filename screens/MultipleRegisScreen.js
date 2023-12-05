import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import DropdownCustom from '../components/DropdownCustom';

import FavoriteHeader from '../components/header/FavoriteHeader';
import { formatPrice } from '../util/util';

import defaultCardImage from "../assets/home/cardImage/homeCardDrawImg.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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

export default function MultipleRegisScreen({ route, navigation }) {

    const [courseList, setCourseList] = useState(route?.params?.courseList)
    const [choosedList, setChoosedList] = useState([])
    const [mode, setMode] = useState("edit")

    const handleChoose = (item) => {
        const index = choosedList.findIndex(obj => obj.id === item.id)
        if (index !== -1) {
            const updateList = choosedList.filter(obj => obj.id !== item.id)
            setChoosedList(updateList)
        } else {
            const updateList = [...choosedList]
            updateList.push(item)
            setChoosedList(updateList)
        }
    }

    const checkChoosed = (id) => {
        const index = choosedList.findIndex(item => item.id === id)
        return index
    }

    const handleAddAll = () => {
        if (choosedList.length !== courseList.length) {
            const updateList = [...courseList]
            setChoosedList(updateList)
        } else {
            const updateList = []
            setChoosedList(updateList)
        }
    }

    const handleChangeMode = () => {
        if (mode === "edit") {
            setMode("compete")
        } else {
            setMode("edit")
        }
    }

    const handleRegis = () => {
        const studentList = [...choosedList]
        navigation.push("PaymentScreen", { classDetail: choosedList, studentList: studentList })
    }

    const handleDelete = () => {
        const updatedCourseList = courseList.filter(course => !choosedList.includes(course));
        setCourseList(updatedCourseList);
        setChoosedList([])
    }

    const ClassCard = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.card, styles.flexColumn]} onPress={() => handleChoose(item)}>
                <View style={styles.iconView}>
                    {
                        checkChoosed(item.id) !== - 1 ?
                            <Icon name={"check-circle"} color={"#FF8D9D"} size={18} />
                            :
                            <Icon name={"circle-outline"} color={"#FF8D9D"} size={18} />
                    }
                </View>
                <Image source={defaultCardImage} style={styles.cardImage} resizeMode='cover' />
                <View style={styles.cardDetail}>
                    <Text style={{ ...styles.boldText, marginBottom: 5 }}>Khóa học Vẽ - Lớp học vẽ cho bé</Text>
                    <View style={styles.flexColumn}>
                        <View style={{ width: WIDTH * 0.1, justifyContent: "center", alignItems: "center" }}>
                            <Icon name={"account-circle"} color={"#3AA6B9"} size={25} />
                        </View>
                        <Text style={styles.boldText}>Bảo Ngọc</Text>
                    </View>
                    <View style={styles.flexColumn}>
                        <View style={{ width: WIDTH * 0.1, justifyContent: "center", alignItems: "center" }}>
                            <Icon name={"account-circle"} color={"#3AA6B9"} size={25} />
                        </View>
                        <Text style={styles.boldText}>Thứ 2 - 4- 6 (7h30 - 9h)</Text>
                    </View>
                    <Text style={{ ...styles.boldText, marginLeft: WIDTH * 0.1, marginTop: 5, color: "#3AA6B9" }}>200.000đ</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <>
            <FavoriteHeader navigation={navigation} background={"#FF8F8F"} title={"Đăng Ký Khóa Học"} defaultType={"Sửa"} editType={"Xong"} type={mode === "edit"} setType={handleChangeMode} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {
                    courseList.map((item, key) => {
                        return <ClassCard item={item} key={key} />
                    })
                }
            </ScrollView>
            <View style={styles.bottomButton}>
                {
                    mode !== "edit" &&
                    <View style={styles.totalPrice}>
                        <Text style={{ ...styles.boldText, color: "#3AA6B9" }}>Tổng tiền:</Text>
                        <Text style={{ ...styles.boldText, color: "#C71212" }}>{formatPrice(choosedList.length * 200000)}đ</Text>
                    </View>
                }
                <View style={styles.editmode}>
                    <TouchableOpacity style={styles.flexColumn} onPress={handleAddAll}>
                        {
                            choosedList.length !== courseList.length ?
                                <>
                                    <Icon name={"circle-outline"} color={"#888888"} size={22} />
                                    <Text style={{ ...styles.boldText, color: "#888888", marginLeft: 5 }}>Tất cả</Text>
                                </>
                                :
                                <>
                                    <Icon name={"check-circle"} color={"#ffffff"} size={22} />
                                    <Text style={{ ...styles.boldText, color: "#ffffff", marginLeft: 5 }}>Tất cả</Text>
                                </>
                        }
                    </TouchableOpacity>
                    <View style={styles.flexColumn}>
                        {
                            mode === "edit" &&
                            <Text style={{ ...styles.boldText, color: "white", marginRight: 10 }}>{formatPrice(200000 * choosedList.length)}đ</Text>
                        }

                        <View style={styles.button}>
                            {
                                mode === "edit" ?
                                    <TouchableOpacity onPress={handleRegis}>
                                        <Text style={{ ...styles.boldText, color: "#FF8D9D" }}>Đăng Ký ({choosedList.length})</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={handleDelete}>
                                        <Text style={{ ...styles.boldText, color: "#FF8D9D" }}>XÓA ({choosedList.length})</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.bottom} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        paddingVertical: 5,
        marginVertical: 10,
        backgroundColor: "rgba(255,141,157,0.25)"
    },
    iconView: {
        paddingHorizontal: 5,
        justifyContent: "center",
    },
    cardImage: {
        width: "30%"
    },
    cardDetail: {
        marginLeft: 5,
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
        alignItems: "center",
    },

    bottomButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#FF8D9D"
    },
    bottom: {
        width: "100%",
        height: 20,
        backgroundColor: "#FF8D9D"
    },
    editmode: {
        flexDirection: 'row',
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FF8D9D",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "white"
    },
    totalPrice: {
        width: WIDTH,
        flexDirection: "row",
        padding: 15,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 141, 157, 0.4)",
    }
});