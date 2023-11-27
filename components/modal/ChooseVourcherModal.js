import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChooseVourcherModal({ visible, vourcherList, onCancle, onChoose }) {

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <TouchableOpacity style={styles.layout} onPress={onCancle} />
            <View style={styles.container}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>Chọn Vourcher:</Text>
                </View>
                <View style={styles.modalContent}>
                    {
                        vourcherList.map((item, index) => {
                            return (
                                <View style={{ ...styles.flexColumn, borderTopWidth: index != 0 ? 1 : 0, }} key={index}>
                                    <View style={styles.modalLeft}>
                                        <Text>{item?.name}</Text>
                                        <Text>{item?.content}</Text>
                                    </View>
                                    <View style={styles.modalRight}>
                                        <TouchableOpacity
                                            style={{ ...styles.check, backgroundColor: item.choose ? "#C8A9F1" : "white" }}
                                            onPress={()=>onChoose(index)}
                                        >
                                            {
                                                item.choose &&
                                                <Icon name={"check"} color={"#794BFF"} size={22} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: HEIGHT * 0.35,
        left: WIDTH * 0.1,
        right: WIDTH * 0.1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    layout: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    modalHeader: {
        width: "100%",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C8A9F1"
    },
    modalHeaderText: {
        fontWeight: "600",
        color: "#3A0CA3"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    modalLeft: {
        width: "70%"
    },
    modalRight: {
        position: "relative",
        width: "20%",
        justifyContent: "center"
    },
    check: {
        width: 26,
        height: 26,
        position: "absolute",
        right: 0,
        borderWidth: 2,
        borderColor: "#794BFF",
        borderRadius: 5,
    }
});