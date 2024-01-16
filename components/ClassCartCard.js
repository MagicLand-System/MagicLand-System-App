import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate, formatPrice } from '../util/util';
import defaultImage from "../assets/classCard/classicMath.png"
import { courseSelector } from '../store/selector';
import { useSelector } from 'react-redux';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const colorList = [
    "#FCA7D2",
    "#9DD6A3",
    "#5CBDF4",
    "#DE9E71"
]

export default function ClassCartCard({ cardDetail, check, index, onClick, background }) {

    const course = useSelector(courseSelector)

    const getCourseType = (courseName) => {
        const courseFound = course.find(course => course?.name?.toUpperCase() === courseName?.toUpperCase());
        return courseFound ? courseFound?.vietName : "khoá học";
    }

    const getSchedule = (item) => {
        if (item?.schedules) {
            switch (item?.schedules[0]?.dayOfWeeks) {
                case "Monday":
                    return "Thứ 2 - 4 - 6 (7h30 - 9h)"
                case "Tuesday":
                    return "Thứ 3 - 5 - 7 (7h30 - 9h)"
                case "Saturday":
                    return "Thứ 7 - Cn (7h30 - 9h)"

                default:
                    return "Thứ 2 - 4 - 6 (7h30 - 9h)"
            }
        } else {
            return "Thứ 2 - 4 - 6 (7h30 - 9h)"
        }

    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => { onClick(cardDetail?.id) }}>
            <View
                style={{
                    ...styles.card,
                    backgroundColor: index % 2 === 1 ?
                        "white"
                        :
                        background ?
                            background
                            :
                            "#C2D9FF",
                    borderColor: background ?
                        background
                        :
                        "#C2D9FF",
                    borderWidth: index % 2 === 1 ? 1 : 0
                }}>
                {
                    check &&
                    <>
                        {/* <View style={styles.checkBoxLine} /> */}
                        {
                            cardDetail?.choose &&
                            <View style={styles.checkBox}>
                                <Icon name={"check"} color={"#C2D9FF"} size={20} />
                            </View>
                        }

                    </>
                }

                <View style={styles.cardImage}>
                    <Image
                        source={defaultImage}
                        resizeMode="cover"
                        style={styles.cardImageValue}
                    />
                    <View style={styles.classType}>
                        <Text style={{ textTransform: "capitalize", color: "#4C6ED7", fontWeight: "600" }}>{getCourseType(cardDetail?.classSubject)}</Text>
                    </View>
                </View>
                <View style={styles.cardDetail}>
                    <View style={{ ...styles.flexColumnBetween, marginTop: 5, paddingRight: 10 }}>
                        <Text style={styles.cardName}>{
                            cardDetail?.name ?
                                cardDetail?.name
                                :
                                cardDetail?.className ?
                                    cardDetail?.className
                                    :
                                    "Toán cấp 1"}</Text>
                        <Text style={{ ...styles.cardName, color: "#241468" }}>{cardDetail?.coursePrice ? formatPrice(cardDetail?.coursePrice) : formatPrice(0)}đ</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: "#4F4F4F", marginVertical: 5 }}>Lớp: {cardDetail?.classCode} - <Text style={{ fontSize: 12, color: "#4F4F4F", textTransform: "capitalize" }}>{cardDetail?.method}</Text></Text>
                    <View style={styles.flexColumn}>
                        <Icon name={"calendar-check"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>{formatDate(cardDetail?.startDate ? cardDetail?.startDate : cardDetail?.Time)}</Text>
                    </View>
                    <View style={{ ...styles.flexColumn, marginVertical: 5 }}>
                        <Icon name={"clock-time-three-outline"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>{getSchedule(cardDetail)}</Text>
                    </View>
                    <View style={styles.flexColumn}>
                        <Icon name={"map-marker-radius"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>{cardDetail.address}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH * 0.8,
        maxHeight: HEIGHT * 0.2,
        position: "relative",
        flexDirection: "row",
        marginBottom: 10,
        marginHorizontal: WIDTH * 0.05,
        transform: [{ translateX: -10 }]
    },
    checkBox: {
        position: "absolute",
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: "#241468",
        borderRadius: 15,
        backgroundColor: "#241468",
        left: "101%",
        bottom: "105%"
    },
    classType: {
        position: "absolute",
        padding: 5,
        borderRadius: 10,
        left: "3%",
        top: "3%",
        backgroundColor: "white"
    },
    card: {
        position: "relative",
        width: "100%",
        height: "90%",
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "rgba(36, 20, 104, 1)",
        marginLeft: 10,
        marginBottom: 20,
        flexDirection: "row"
    },
    cardImage: {
        position: "relative",
        width: "40%",
        height: "100%",
        borderRadius: 15,
        overflow: "hidden"
    },
    cardImageValue: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
    },
    cardDetail: {
        width: "60%",
        paddingLeft: "5%"
    },
    cardName: {
        // color: "#241468",
        fontWeight: "700",
        fontSize: 13,
    },
    cardDetailText: {
        color: "#4F4F4F",
        fontSize: 12,
        marginLeft: 3
    },

    flexColumn: {
        flexDirection: "row",
        // alignItems: "center",
    },
    flexColumnBetween: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});