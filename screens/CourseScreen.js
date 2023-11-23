import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'

import Header from '../components/header/Header';
import SearchBar from '../components/SearchBar';
import CourseSlide from '../components/CourseSlide';
import CourseList from '../components/CourseList';
import FilterCustomModal from '../components/modal/FilterCustomModal';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ageOptionDefault = [
    {
        name: "Từ 3 tuổi",
        choose: false
    },
    {
        name: "Từ 11 tuổi",
        choose: false
    },
    {
        name: "Từ 15 tuổi",
        choose: false
    },
]

export default function CourseScreen({ navigation }) {

    const [searchValue, setSearchValue] = useState("")
    const [ageOption, setAgeOption] = useState([...ageOptionDefault])
    const [filterVisible, setFilterVisible] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            setAgeOption(ageOptionDefault)
        }, [])
    );

    const handleSearch = (value) => {
        setSearchValue(value)
    }

    const hanldeSubmit = () => {
        console.log(ageOption);
        hanldeClear()
        setFilterVisible(false)
    }

    const hanldeCancle = () => {
        hanldeClear()
        setFilterVisible(false)
    }

    const hanldeClear = () => {
        const updateList = [...ageOptionDefault]
        console.log(updateList);
        updateList.forEach((item)=>item.choose = false)
        setAgeOption(updateList)
    }

    const filterModal = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Độ Tuổi</Text>
                <View style={styles.modalOption}>
                    {
                        ageOption.map((item, key) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.choose && styles.choosed]}
                                    onPress={() => {
                                        setAgeOption((prevAgeOption) => {
                                            const updatedList = [...prevAgeOption];
                                            updatedList[key].choose = !updatedList[key].choose;
                                            return updatedList;
                                        });
                                    }}
                                    key={key}
                                >
                                    <Text style={styles.optionText}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} background={"#fff"} />
            <Text style={styles.title}>
                Khóa Học
            </Text>
            <View style={styles.searchBar}>
                <SearchBar placeHolder={"Tìm Khóa Học"} input={searchValue} setInput={handleSearch} setFilterModal={setFilterVisible} />
            </View>
            <View style={styles.courseSlide}>
                <CourseSlide />
            </View>
            <View style={styles.courseList}>
                <Text style={{ ...styles.title, fontWeight: "500", fontSize: 18, marginBottom: 5, }}>
                    Các Khoá Học
                </Text>
                <CourseList navigation={navigation}/>
            </View>
            <FilterCustomModal content={filterModal()} visible={filterVisible} onSubmit={hanldeSubmit} onCancle={hanldeCancle} onClear={hanldeClear}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        fontSize: 30,
        fontWeight: "700"
    },
    searchBar: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginTop: 20,
    },
    courseList: {
        height: HEIGHT * 0.6,
        marginTop: 20,
    },
    modalContent: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginBottom: 50,
    },
    modalTitle: {
        fontWeight: "600",
        fontSize: 18,
    },
    modalOption: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    optionButton: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: "#858597"
    },
    optionText: {
        color: "white"
    },
    choosed: {
        backgroundColor: "#3D5CFF"
    }

});