import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Modal } from 'react-native'
import React, { useState } from 'react'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function DropdownCustom({ dropdownList, Element, maxHeight, maxWidth, label, labelIcon }) {

    const [visible, setVisible] = useState(false)

    return (
        <View style={{ position: "relative" }}>
            {
                visible &&
                <>
                    <TouchableOpacity style={styles.layout} onPress={() => { setVisible(!visible) }} ></TouchableOpacity>
                    <View showsVerticalScrollIndicator={false} style={{ ...styles.container, height: maxHeight, width: maxWidth }}>
                        {
                            dropdownList.map((item, key) => {
                                return (
                                    <TouchableOpacity style={styles.dropdownView} key={key}>
                                        <Text style={styles.dropdownElement}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </>
            }
            <TouchableOpacity style={styles.flexColumn} onPress={() => { setVisible(!visible) }}>
                <Text style={styles.labelStyle}>{label}</Text>
                {labelIcon ? labelIcon : ""}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: 100,
        width: "100%",
        top: "105%",
        right: 0,
        borderWidth: 1,
        backgroundColor: 'white',
        zIndex: 999
    },
    layout: {
        position: "absolute",
        width: WIDTH,
        height: HEIGHT,
    },
    flexColumn: {
        flexDirection: "row",
    },
    dropdownView: {
        borderBottomWidth: 1,
        backgroundColor: "white"
    },
    dropdownElement: {
        width: "100%",
        padding: 10,
        paddingHorizontal: 10,
        borderColor: "#FF8F8F",
        textAlign: "center"
    },
    labelStyle: {
        fontSize: 10,
        padding: 8,
        paddingVertical: 15,
        color: "#888888",
    }
});