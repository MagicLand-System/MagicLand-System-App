import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default function StudentHomeScreen({ navigation }) {


    return (
        <View style={styles.container}>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1
        // paddingBottom: 80,
        // marginBottom: 15,
    },

    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    flexBetweenColumn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    boldText: {
        fontWeight: "600",
    },
});