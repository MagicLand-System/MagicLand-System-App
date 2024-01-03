import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from 'react'

import { formatPrice } from '../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function CourseCard({ cardDetail, onClick, choose }) {

    const [favorite, setFavorite] = useState(cardDetail.favorite)

    const handleStarClick = () => {
        setFavorite(!favorite)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cardFavorite} onPress={handleStarClick}>
                {
                    favorite ?
                        <Icon name={"star"} color={"#FFC90C"} size={28} />
                        :
                        <Icon name={"star"} color={"white"} size={28} />
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => { onClick(cardDetail) }}>
                <Image source={{ uri: cardDetail.image }} style={styles.image} resizeMode='cover' />
                <View style={{ ...styles.flexBetweenColumn, marginBottom: 10 }}>
                    <Text style={{ textTransform: "capitalize" }}>{cardDetail.vietType}</Text>
                    <View style={styles.priceView}>
                        <Text style={styles.priceText}>{formatPrice(cardDetail.price)} đ</Text>
                    </View>
                </View>
                <Text style={styles.cardName}>{cardDetail.name}</Text>
                <View style={{ width: WIDTH * 0.45 }}>
                    <View style={{ ...styles.flexColumn, width: WIDTH * 0.37 }}>
                        <Icon name={"account"} color={"#888888"} size={22} />
                        <Text style={styles.cardText}>{cardDetail.rateCount ? cardDetail.rateCount : 0} người đăng ký</Text>
                    </View>
                    {
                        cardDetail.rateCount && cardDetail.rateCount !== 0  ?
                            <View style={{ ...styles.flexColumn, width: WIDTH * 0.37 }}>
                                <Icon name={"star"} color={"#FFC90C"} size={22} />
                                <Text style={styles.cardText}><Text style={{ ...styles.cardText, fontSize: 12 }}>{cardDetail.rateValue}</Text> ({cardDetail.registerAmount} lượt đánh giá)</Text>
                            </View>
                            :
                            <View style={{ ...styles.flexColumn, width: WIDTH * 0.37 }}>
                                <Icon name={"star"} color={"#C4C4C4"} size={22} />
                                <Text style={styles.cardText}> Chưa có đánh giá</Text>
                            </View>
                    }
                </View>
            </TouchableOpacity >
            {
                choose &&
                <View style={styles.choosed}>
                    <Icon name={"check"} color={"#ffffff"} size={22} />
                </View>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH * 0.42,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 15,

        marginHorizontal: WIDTH * 0.04,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // justifyContent: "center",
        backgroundColor: "white",
    },
    card: {
        position: "relative",
        width: "100%",
        padding: 5
    },
    cardFavorite: {
        position: "absolute",
        top: 15,
        right: 15,
        zIndex: 10
    },
    image: {
        width: "100%",
        minHeight: HEIGHT * 0.2,
        borderRadius: 5,
        marginBottom: 10,
    },
    priceView: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 50,
        backgroundColor: "#4582E6"
    },
    priceText: {
        fontWeight: "600",
        fontSize: 11,
        color: "white"
    },
    cardName: {
        fontWeight: "600",
        fontSize: 16,
        color: "#4582E6",
        marginBottom: 10
    },
    flexBetweenColumn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardText: {
        width: "80%",
        fontSize: 12,
    },
    choosed: {
        position: "absolute",
        padding: 5,
        borderRadius: 50,
        bottom: "-5%",
        right: "-5%",
        backgroundColor: "#FF8D9D",
    },
});