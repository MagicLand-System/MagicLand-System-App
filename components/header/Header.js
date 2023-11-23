import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

import defaultAvt from "../../assets/header/defaultAvt.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Header({ goback, navigation, background }) {

    const cartNavigate = () => {
        navigation.navigate("CartScreen")
    }

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    goback ? goback() : navigation?.goBack();
                }}
            >
                <Icon name={"arrow-back-ios"} color={"#000000"} size={28} />
            </TouchableOpacity>
            <View style={styles.right}>
                <TouchableOpacity style={styles.cartButton} onPress={cartNavigate}>
                    <Icon name={"shopping-cart"} color={"#C8A9F1"} size={28} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.avtButton}>
                    <Image source={defaultAvt} style={styles.avtImg} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
    },
    backButton: {
        width: 70,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    right: {
        marginRight: 10,
        flexDirection: "row"
    },
    cartButton: {
        width: 50,
        height: 50,
        marginRight: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    avtButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#EAEAFF",
        alignItems: "center",
        justifyContent: "center",
    },
    avtImg: {
        width: 38,
        height: 38,
    }
});