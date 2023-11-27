import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

import { formatPrice } from '../util/util';

import defaultImage from "../assets/classCard/defaultImage.png"
import defaultAvt from "../assets/classCard/defaultAvt.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ClassCard({ course, card, goback, navigation }) {

    const handleNavigate = () => {
        navigation.navigate("ClassDetailScreen", { classDetail: card, course: course, goback: goback })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigate}>
            <View style={styles.imageContainer}>
                <Image source={card?.img ? card?.img : defaultImage} style={styles.mainImage} resizeMode="cover" />
                <Image source={card?.avt ? card?.avt : defaultAvt} style={styles.avtImage} resizeMode="cover" />
                <TouchableOpacity style={styles.shoppingCart}>
                    <Icon name={"shopping-cart"} color={"white"} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.statusContainer}>
                <View style={styles.featureBox}>
                    <Text style={{...styles.feature, fontWeight: "600"}}>Best Seller</Text>
                </View>

                <View style={styles.status}>
                    <View style={styles.dot} />
                    <Text style={styles.statusText}>
                        Online
                    </Text>
                </View>
            </View>
            <Text style={styles.title}>
                {card?.title}
            </Text>
            <View style={{ ...styles.flexColumn, width: WIDTH * 0.32, marginHorizontal: WIDTH * 0.015 }}>
                <View style={styles.flexColumn}>
                    <Icon name={"person"} color={"#794BFF"} size={18} />
                    <Text style={styles.boldText}>{card?.age} Tuổi</Text>
                </View>
                <View style={styles.flexColumn}>
                    <Icon name={"home"} color={"#794BFF"} size={18} />
                    <Text style={styles.boldText}>{card?.place}</Text>
                </View>
            </View>
            <View style={{ ...styles.flexColumn, width: WIDTH * 0.32, marginHorizontal: WIDTH * 0.015 }}>
                <View style={{ ...styles.flexColumn }}>
                    <Icon name={"access-time"} color={"#794BFF"} size={18} />
                    <Text style={styles.boldText}>{card?.timeFrom} {card?.timeTo}</Text>
                </View>
                <View style={{ ...styles.flexColumn, justifyContent: "flex-start" }}>
                    <Icon name={"star"} color={"#F4A120"} size={18} />
                    <Text style={{ ...styles.boldText, marginLeft: 4, color: "#F4A120" }}>{card?.rate}</Text>
                </View>
            </View>
            <View style={{ ...styles.flexColumn, position: "absolute", bottom: 0, width: WIDTH * 0.4, backgroundColor: "#FFC90C", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 50 }}>
                <View style={{ ...styles.flexColumn }}>
                    <Icon name={"person"} color={"white"} size={18} />
                    <Text style={{ ...styles.boldText, marginLeft: 4, color: "white" }}>{card?.registerAmount} người đăng ký</Text>
                </View>
                <View style={styles.centerLine} />
                <View style={{ ...styles.flexColumn, justifyContent: "flex-start" }}>
                    <Text style={{ ...styles.boldText, marginLeft: 4, color: "#E95B70" }}>{formatPrice(card?.price)} đ</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        paddingBottom: 50,
        padding: 10,
        borderRadius: 25,
        marginTop: 20,
        marginHorizontal: WIDTH * 0.02,
        backgroundColor: '#DADAF7',
    },
    imageContainer: {
        position: "relative"
    },
    mainImage: {
        width: WIDTH * 0.35,
        borderRadius: 15,
    },
    avtImage: {
        position: "absolute",
        width: WIDTH * 0.08,
        height: WIDTH * 0.08,
        borderRadius: 50,
        bottom: 0,
        left: 0,
    },
    shoppingCart: {
        position: "absolute",
        padding: 5,
        borderRadius: 50,
        backgroundColor: "#794BFF",
        top: "-2.5%",
        right: "-2.5%",
    },
    statusContainer: {
        flexDirection: "row",
        width: WIDTH * 0.32,
        marginTop: 10,
        marginHorizontal: WIDTH * 0.015,
        justifyContent: "space-between",
    },
    featureBox: {
        borderRadius: 15,
        overflow: "hidden"
    },
    feature: {
        padding: 1,
        paddingHorizontal: 3,
        backgroundColor: "#F2C955",
        color: "#C71212",
        fontSize: 12,
    },
    status: {
        flexDirection: "row",
        padding: 1,
        paddingHorizontal: 3,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3AAC45",
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 15,
        marginRight: 2,
        backgroundColor: "white"
    },
    statusText: {
        color: "white",
        fontSize: 12,
    },
    title: {
        width: WIDTH * 0.32,
        marginVertical: 10,
        marginHorizontal: WIDTH * 0.015,
        fontSize: 12,
        textAlign: "center",
        fontWeight: "600",
        color: "#3A0CA3"
    },
    flexColumn: {
        width: WIDTH * 0.15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    boldText: {
        fontSize: 10,
        fontWeight: "600"
    },
    centerLine: {
        height: "100%",
        width: 1,
        backgroundColor: "white"
    }
});