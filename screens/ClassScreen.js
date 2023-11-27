import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';

import Header from '../components/header/Header';
import SearchBar from '../components/SearchBar';
import ClassCard from '../components/ClassCard';
import FilterCustomModal from '../components/modal/FilterCustomModal';
import InputRange from '../components/InputRange';
import StarChoose from '../components/StarChoose';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const classCardDetail = [
    {
        img: undefined,
        avt: undefined,
        status: true,
        title: "Lớp học Toán Tư Duy cho trẻ mới bắt đầu (Cơ Bản)",
        age: 8,
        place: "Cơ sở 1",
        timeFrom: "18:30",
        timeTo: "20:00",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 8,
        price: 200000,
    },
    {
        img: undefined,
        avt: undefined,
        status: true,
        title: "Lớp học Toán Tư Duy cho trẻ mới bắt đầu (Cơ Bản)",
        age: 8,
        place: "Cơ sở 1",
        timeFrom: "18:30",
        timeTo: "20:00",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 8,
        price: 200000,
    },
    {
        img: undefined,
        avt: undefined,
        status: true,
        title: "Lớp học Toán Tư Duy cho trẻ mới bắt đầu (Cơ Bản)",
        age: 8,
        place: "Cơ sở 1",
        timeFrom: "18:30",
        timeTo: "20:00",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 8,
        price: 200000,
    },
    {
        img: undefined,
        avt: undefined,
        status: true,
        title: "Lớp học Toán Tư Duy cho trẻ mới bắt đầu (Cơ Bản)",
        age: 8,
        place: "Cơ sở 1",
        timeFrom: "18:30",
        timeTo: "20:00",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 8,
        price: 200000,
    },
]

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
        name: "Offline",
        choose: false
    },
    {
        name: "Online",
        choose: false
    },
]

const placeOptionDefault = [
    {
        name: "Cơ sở 1",
        choose: false
    },
    {
        name: "Cơ sở 2",
        choose: false
    },
    {
        name: "Cơ sở 3",
        choose: false
    },
]

const priceDefault = {
    min: 0,
    max: 2000
}

export default function ClassScreen({ route, navigation }) {

    const [searchValue, setSearchValue] = useState("")
    const [filterModalVisible, setFilterModalVisible] = useState("")
    const [ageOption, setAgeOption] = useState(ageOptionDefault)
    const [typeOption, setTypeOption] = useState(typeOptionDefault)
    const [placeOption, setPlaceOption] = useState(placeOptionDefault)
    const [rate, setRate] = useState(0)
    const [price, setPrice] = useState(priceDefault)
    let course = route?.params?.course

    useEffect(() => {
        setAgeOption(ageOptionDefault)
        setTypeOption(typeOptionDefault)
        setPlaceOption(placeOptionDefault)
        setPrice(priceDefault)
        course = route?.params?.course
    }, [route?.params?.course])

    const handleSearch = (value) => {
        setSearchValue(value)
    }

    const hanldeSubmit = () => {
        console.log(ageOption);
        setFilterModalVisible(false)
    }

    const hanldeCancle = () => {
        setFilterModalVisible(false)
    }

    const hanldeClear = () => {
        setAgeOption(ageOptionDefault.map(option => ({ ...option, choose: false })));
        setTypeOption(typeOptionDefault.map(option => ({ ...option, choose: false })));
        setPlaceOption(placeOptionDefault.map(option => ({ ...option, choose: false })));
        setPrice({ ...priceDefault });
        setRate(0)
    };

    const handleChangePrice = (value) => {
        setPrice({ min: value?.min, max: value?.max })
        console.log(value);
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
                <Text style={styles.modalTitle}>Hình thức</Text>
                <View style={styles.modalOption}>
                    {
                        typeOption.map((item, key) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.choose && styles.choosed]}
                                    onPress={() => {
                                        setTypeOption((prevAgeOption) => {
                                            const updatedList = [...prevAgeOption];
                                            updatedList.forEach(element => {
                                                element.choose = false;
                                            });
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
                <Text style={styles.modalTitle}>Cơ sở</Text>
                <View style={styles.modalOption}>
                    {
                        placeOption.map((item, key) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.choose && styles.choosed]}
                                    onPress={() => {
                                        setPlaceOption((prevAgeOption) => {
                                            const updatedList = [...prevAgeOption];
                                            updatedList.forEach(element => {
                                                element.choose = false;
                                            });
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
                <InputRange title={"Học Phí"} min={0} max={2000} minValue={price.min} maxValue={price.max} steps={10} onValueChange={handleChangePrice} />
                <Text style={styles.modalTitle}>Đánh Giá:</Text>
                <StarChoose size={rate} setSize={setRate} />
            </View>
        )
    }

    const goback = () => {
        navigation.navigate("ClassScreen", { course: course })
    }

    return (
        <>
            <Header navigation={navigation} background={"#fff"} goback={() => { navigation.navigate("CourseDetailScreen", { course: course }) }} />
            <ScrollView style={styles.container}>
                <View style={styles.searchBar}>
                    <SearchBar input={searchValue} setInput={handleSearch} setFilterModal={setFilterModalVisible} placeHolder={"Tìm Lớp Học"} />
                </View>
                <View style={styles.cardList}>
                    {classCardDetail?.map((item, key) => {
                        return <ClassCard card={item} course={course} navigation={navigation} key={key} goback={goback} />
                    })}
                </View>
            </ScrollView>
            <FilterCustomModal content={filterModal()} visible={filterModalVisible} onSubmit={hanldeSubmit} onCancle={hanldeCancle} onClear={hanldeClear} />
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    searchBar: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginTop: 10,
    },
    cardList: {
        width: WIDTH * 0.9,
        paddingBottom: 20,
        marginTop: 15,
        marginHorizontal: WIDTH * 0.05,
        flexDirection: "row",
        flexWrap: "wrap",
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
        marginVertical: 10,
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