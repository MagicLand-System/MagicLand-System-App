import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function SearchBar({ input, setInput, setFilterModal, placeHolder }) {
    return (
        <View style={styles.container}>
            <Icon name={"search"} color={"#B8B8D2"} size={28} />
            <TextInput value={input} onChangeText={setInput} style={styles.searchField} placeholder={placeHolder}/>
            <TouchableOpacity onPress={() => { setFilterModal(true) }}>
                <Icon name={"filter-alt"} color={"#B8B8D2"} size={28} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingRight: 25,
        backgroundColor: '#F4F3FD',
        flexDirection: "row",
        alignItems: "center",
    },
    searchField: {
        width: "85%",
        paddingLeft: 10,
        marginVertical: 15,
    }
});