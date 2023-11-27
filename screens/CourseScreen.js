import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'

import Header from '../components/header/Header';
import SearchBar from '../components/SearchBar';
import CourseSlide from '../components/CourseSlide';
import CourseList from '../components/CourseList';
import FilterCustomModal from '../components/modal/FilterCustomModal';
import InputRange from '../components/InputRange';
import StarChoose from '../components/StarChoose';

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

const typeOptionDefault = [
    {
        name: "Best Seller",
        choose: false
    },
    {
        name: "Sale",
        choose: false
    },
]

const priceDefault = {
    min: 0,
    max: 2000
}

export default function CourseScreen({ navigation }) {

    const [searchValue, setSearchValue] = useState("")
    const [ageOption, setAgeOption] = useState([...ageOptionDefault])
    const [typeOption, setTypeOption] = useState([...typeOptionDefault])
    const [filterVisible, setFilterVisible] = useState(false)
    const [courseListSize, setCourseListSize] = useState({ sell: 3, new: 3, sale: 3 })
    const [rate, setRate] = useState(0)
    const [priceRange, setPriceRange] = useState(priceDefault)

    useFocusEffect(
        React.useCallback(() => {
            setAgeOption(ageOptionDefault)
        }, [])
    );

    const handleChangePrice = (value) => {
        setPriceRange({ min: value?.min, max: value?.max })
        console.log(value);
    }

    const handleSearch = (value) => {
        setSearchValue(value)
    }

    const hanldeTypeChoose = (index) => {
        const updateList = [...typeOption]
        // const defaultoption = updateList[index].choose
        updateList.forEach((item) => item.choose = false)
        updateList[index].choose = true
        // updateList[index].choose = !defaultoption
        setTypeOption(updateList)
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
        const typeList = [...typeOption]
        updateList.forEach((item) => item.choose = false)
        typeList.forEach((item) => item.choose = false)
        setAgeOption(updateList)
        setTypeOption(typeList)
        setRate(0)
        setPriceRange(priceDefault)
    }

    const filterModal = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Độ Tuổi</Text>
                <View style={styles.modalOption}>
                    {
                        ageOption.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.choose && styles.choosed]}
                                    onPress={() => {
                                        setAgeOption((prevAgeOption) => {
                                            const updatedList = [...prevAgeOption];
                                            updatedList[index].choose = !updatedList[index].choose;
                                            return updatedList;
                                        });
                                    }}
                                    key={index}
                                >
                                    <Text style={styles.optionText}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <InputRange title={"Học Phí"} min={0} max={2000} minValue={priceRange.min} maxValue={priceRange.max} steps={10} onValueChange={handleChangePrice} />
                <Text style={styles.modalTitle}>Hình Thức</Text>
                <View style={styles.modalOption}>
                    {
                        typeOption.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.choose && styles.choosed]}
                                    onPress={() => { hanldeTypeChoose(index) }}
                                    key={index}
                                >
                                    <Text style={styles.optionText}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <Text style={styles.modalTitle}>Đánh Giá:</Text>
                <StarChoose size={rate} setSize={setRate} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} background={"#fff"} />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>
                    Khóa Học
                </Text>
                <View style={styles.searchBar}>
                    <SearchBar placeHolder={"Tìm Khóa Học"} input={searchValue} setInput={handleSearch} setFilterModal={setFilterVisible} />
                </View>
                <View style={styles.courseSlide}>
                    <CourseSlide />
                </View>
                <View style={{ ...styles.courseList, marginTop: 30 }}>
                    <View style={styles.courseListHead}>
                        <Text style={{ ...styles.title, fontWeight: "500", fontSize: 18, marginBottom: 5, }}>
                            Best Seller
                        </Text>
                        {
                            courseListSize.sell ?
                                <TouchableOpacity onPress={() => setCourseListSize({ ...courseListSize, sell: undefined })}>
                                    <Text style={{ ...styles.title, fontWeight: "500", fontSize: 15, color: "#3A0CA3" }}>
                                        xem tất cả
                                    </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => setCourseListSize({ ...courseListSize, sell: 3 })}>
                                    <Text style={{ ...styles.title, fontWeight: "500", fontSize: 15, color: "#3A0CA3" }}>
                                        Ẩn bớt
                                    </Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <CourseList navigation={navigation} type={"sell"} size={courseListSize.sell} />
                </View>
                <View style={styles.courseList}>
                    <View style={styles.courseListHead}>
                        <Text style={{ ...styles.title, fontWeight: "500", fontSize: 18, marginBottom: 5, }}>
                            Khóa Học Mới
                        </Text>
                        {
                            courseListSize.new ?
                                <TouchableOpacity onPress={() => setCourseListSize({ ...courseListSize, new: undefined })}>
                                    <Text style={{ ...styles.title, fontWeight: "500", fontSize: 15, color: "#3A0CA3" }}>
                                        xem tất cả
                                    </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => setCourseListSize({ ...courseListSize, new: 3 })}>
                                    <Text style={{ ...styles.title, fontWeight: "500", fontSize: 15, color: "#3A0CA3" }}>
                                        Ẩn bớt
                                    </Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <CourseList navigation={navigation} type={"new"} size={courseListSize.new} />
                </View>
                <View style={styles.courseList}>
                    <View style={styles.courseListHead}>
                        <Text style={{ ...styles.title, fontWeight: "500", fontSize: 18, marginBottom: 5, }}>
                            Khóa Học Giảm Giá:
                        </Text>
                        {
                            courseListSize.sale ?
                                <TouchableOpacity onPress={() => setCourseListSize({ ...courseListSize, sale: undefined })}>
                                    <Text style={{ ...styles.title, fontWeight: "500", fontSize: 15, color: "#3A0CA3" }}>
                                        xem tất cả
                                    </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => setCourseListSize({ ...courseListSize, sale: 3 })}>
                                    <Text style={{ ...styles.title, fontWeight: "500", fontSize: 15, color: "#3A0CA3" }}>
                                        Ẩn bớt
                                    </Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <CourseList navigation={navigation} type={"sale"} size={courseListSize.sale} />
                </View>
            </ScrollView>
            <FilterCustomModal content={filterModal()} visible={filterVisible} onSubmit={hanldeSubmit} onCancle={hanldeCancle} onClear={hanldeClear} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        // // paddingBottom: 80,
        // marginBottom: 15,
    },
    title: {
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
        flex: 1
    },
    courseListHead: {
        flexDirection: "row",
        justifyContent: "space-between"
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
        marginBottom: 10,
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