import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, ScrollView, FlatList, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SearchBar from '../../../components/SearchBar';
import CourseSlide from '../../../components/CourseSlide';
import CourseCard from '../../../components/CourseCard';
import FilterCustomModal from '../../../components/modal/FilterCustomModal';
import InputRange from '../../../components/InputRange';
import StarChoose from '../../../components/StarChoose';
import { getAllCourse } from '../../../api/course';
import SpinnerLoading from '../../../components/SpinnerLoading';
import { userSelector, courseSelector } from '../../../store/selector';
import { useSelector } from 'react-redux';
import { getMinMaxPrice } from '../../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const priceDefault = {
    min: 0,
    max: 2000
}



export default function CourseScreen({ navigation }) {

    const [courseList, setCourseList] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [filterValue, setFilterValue] = useState({ type: "ALL" })
    const [filterVisible, setFilterVisible] = useState(false)
    const [dataLoading, setDataLoading] = useState(true)
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [rate, setRate] = useState(0)
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 })
    const [filterTmpValue, setFilterTmpValue] = useState({
        type: "ALL",
        rate: 0,
        priceRange: { min: 0, max: 2000 }
    })
    const scrollViewRef = useRef(null);
    const user = useSelector(userSelector);
    const course = useSelector(courseSelector)
    const { minPrice, maxPrice } = getMinMaxPrice(courseList);

    const homeContentDetail = {
        carousel: [
            {
                img: require("../../../assets/home/carousel/carouselImg1.png")
            },
            {
                img: require("../../../assets/home/carousel/carouselImg2.png")
            },
            {
                img: require("../../../assets/home/carousel/carouselImg3.png")
            },
        ],
        courseIcon: [
            {
                id: 999,
                name: "ALL",
                vietName: "Tất cả",
                img: require("../../../assets/home/courseImage/courseMath.png")
            },
            ...course
        ]
    }

    useEffect(() => {
        loadAllCourseData()
        loadFilterData()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((prevIndex) => (prevIndex + 1) % homeContentDetail.carousel.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollViewRef.current?.scrollTo({
            x: WIDTH * carouselIndex,
            animated: true,
        });
    }, [filterValue]);

    const loadAllCourseData = async () => {
        setDataLoading(true)
        const response = await getAllCourse()
        if (response?.status === 200) {
            setCourseList(response?.data)
            const { minPrice, maxPrice } = getMinMaxPrice(response?.data);
            setPriceRange({ min: minPrice, max: maxPrice })
        } else {
            console.log("load courseList fail");
        }
        setDataLoading(false)
    }

    const loadFilterData = () => {
        setFilterTmpValue(
            {
                type: filterValue.type,
                rate: rate,
                priceRange: priceRange
            }
        )
    }

    const handleChangePrice = (value) => {
        setFilterTmpValue({ ...filterTmpValue, priceRange: { min: value?.min, max: value?.max } })
        // setPriceRange({ min: value?.min, max: value?.max })
    }

    const handleSearch = (value) => {
        setSearchValue(value)
    }

    const hanldeSubmit = () => {
        setFilterValue({ ...filterValue, type: filterTmpValue.type })
        setRate(filterTmpValue.rate)
        setPriceRange(filterTmpValue.priceRange)
        setFilterVisible(false)
    }

    const hanldeCancle = () => {
        setFilterVisible(false)
        loadFilterData()
    }

    const hanldeClear = () => {
        setRate(0)
        setFilterValue({ ...filterValue, type: "ALL" })
        setPriceRange({ min: minPrice, max: maxPrice })
        setFilterTmpValue(
            {
                type: "ALL",
                rate: 0,
                priceRange: { min: minPrice, max: maxPrice }
            }
        )
        setFilterVisible(false)
    }

    const hanldeCoursePress = (course) => {
        navigation.navigate("CourseDetailScreen", { course: course })
    }

    const hanldeFilter = (array) => {
        let updateArray = [...array]
        // rate > 0 && updateArray.filter(item => item)
        filterValue.type !== "ALL" && (updateArray = updateArray.filter(item => item.subject === filterValue.type))
        updateArray = updateArray.filter(item => item.price >= priceRange.min && item.price <= priceRange.max)
        return updateArray
    }

    const filterModal = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Học Phí</Text>
                <InputRange title={"Học Phí"} min={minPrice} max={maxPrice} minValue={filterTmpValue.priceRange.min} maxValue={filterTmpValue.priceRange.max} steps={1000} onValueChange={handleChangePrice} />
                <Text style={styles.modalTitle}>Môn Học:</Text>
                <View style={styles.modalOption}>
                    {
                        homeContentDetail.courseIcon.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.name === filterTmpValue.type && styles.choosed]}
                                    onPress={() => {
                                        if (item.name === filterValue.type) {
                                            setFilterTmpValue({ ...filterTmpValue, type: "ALL" })
                                        } else {
                                            setFilterTmpValue({ ...filterTmpValue, type: item.name })
                                        }
                                    }}
                                    key={index}
                                >
                                    <Text style={[styles.optionText, item.name === filterTmpValue.type && styles.choosedText]}>
                                        {item.vietName}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <Text style={styles.modalTitle}>Đánh Giá:</Text>
                <StarChoose size={filterTmpValue.rate} setSize={(rate) => { setFilterTmpValue({ ...filterTmpValue, rate: rate }) }} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={{ ...styles.flexBetweenColumn, paddingHorizontal: 20 }}>
                        <View style={styles.headerInforLeft}>
                            <Text style={{ color: "white" }}>Xin chào!</Text>
                            <Text style={{ fontWeight: "700", fontSize: 18, color: "white" }}>PH: {user.fullName}</Text>
                        </View>
                        <View style={styles.headerInforRight}>
                            <View style={styles.flexBetweenColumn}>
                                <TouchableOpacity style={styles.iconNavigate} onPress={() => navigation.push("CartScreen")}>
                                    <Icon name={"book"} color={"#ffffff"} size={28} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconNavigate}>
                                    <Icon name={"bell"} color={"#ffffff"} size={28} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.searchBar}>
                        <SearchBar input={searchValue} setInput={handleSearch} setFilterModal={setFilterVisible} placeHolder={"Tìm kiếm khóa học..."} />
                    </View>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        onMomentumScrollEnd={(event) => {
                            const newIndex = Math.floor(event.nativeEvent.contentOffset.x / WIDTH);
                            setCarouselIndex(newIndex);
                        }}
                    >
                        {
                            homeContentDetail.carousel.map((item, index) => {
                                return (
                                    <View style={styles.carouselView} key={index}>
                                        <Image source={item.img} style={styles.carouselImage} resizeMode="cover" />
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    <View style={styles.carouselDotView}>
                        {
                            homeContentDetail.carousel.map((item, index) => {
                                return (
                                    <View style={{ ...styles.carouselDot, backgroundColor: carouselIndex === index ? "#888888" : "#FFFFFF" }} key={index} />
                                )
                            })
                        }
                    </View>
                </View>
                <Text style={styles.title}>Khoá học:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        homeContentDetail.courseIcon.map((item, index) => {
                            return (
                                item.name !== "ALL" &&
                                <TouchableOpacity
                                    style={styles.courseView}
                                    key={index}
                                    onPress={() => {
                                        if (item.name === filterValue.type) {
                                            setFilterValue({ ...filterValue, type: "ALL" })
                                            setFilterTmpValue({ ...filterTmpValue, type: "ALL" })
                                        } else {
                                            setFilterValue({ ...filterValue, type: item.name })
                                            setFilterTmpValue({ ...filterTmpValue, type: item.name })
                                        }
                                    }}
                                    activeOpacity={0.5}
                                >
                                    <View
                                        style={{
                                            ...styles.courseImageView,
                                            backgroundColor: item.name === filterValue.type ?
                                                "rgba(69, 130, 230, 0.7)"
                                                :
                                                "rgba(58, 166, 185, 0.25)"
                                        }}
                                    >
                                        <Image source={item.img} style={styles.courseImage} resizeMode="cover" />
                                    </View>
                                    <Text style={styles.courseName}>{item.vietName}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <View style={styles.filterOption}>
                    <TouchableOpacity style={[styles.filterOptionView, styles.newOption]}>
                        <Text style={styles.filterOptionText} numberOfLines={1}>Mới nhất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterOptionView, styles.saleOption]}>
                        <Text style={styles.filterOptionText} numberOfLines={1}>Giảm giá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterOptionView, styles.registerOption]}>
                        <Text style={styles.filterOptionText} numberOfLines={1}>Lượt đăng ký cao</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterOptionView, styles.priceOption]}>
                        <Text style={styles.filterOptionText} numberOfLines={1}>Giá</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        ...styles.courseListScroll,
                        marginBottom: !dataLoading ? 100 : "35%"
                    }}
                >
                    {
                        dataLoading ?
                            <SpinnerLoading />
                            :
                            hanldeFilter(courseList).map((item, index) => {
                                return (
                                    <CourseCard cardDetail={item} onClick={hanldeCoursePress} navigation={navigation} key={index} />
                                )
                            })
                    }
                </View>
            </ScrollView>
            <FilterCustomModal content={filterModal()} visible={filterVisible} onSubmit={hanldeSubmit} onCancle={hanldeCancle} onClear={hanldeClear} />
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
    title: {
        marginVertical: 10,
        marginHorizontal: WIDTH * 0.05,
        color: "#4582E6",
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center"
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

    modalContent: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginBottom: 50,
    },
    modalTitle: {
        fontWeight: "600",
        fontSize: 18,
        color: "#888888"
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
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: "#D9D9D9",
    },
    optionText: {
        color: "#4582E6",
        fontWeight: "600"
    },
    choosed: {
        backgroundColor: "rgba(36, 20,  104, 0.6)",
    },
    choosedText: {
        color: "white"
    },

    header: {
        backgroundColor: "#241468",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    headerInforLeft: {
        marginTop: 10,
    },
    iconNavigate: {
        marginHorizontal: 10
    },
    carouselView: {
        width: WIDTH,
        paddingHorizontal: WIDTH * 0.05,
        marginTop: 25,
    },
    carouselImage: {
        width: WIDTH * 0.9,
        height: WIDTH * 0.55,
        borderRadius: 15,
    },
    carouselDotView: {
        width: WIDTH,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    carouselDot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        marginHorizontal: 4,
        marginVertical: 20,
    },
    courseView: {
        marginHorizontal: 11,
        justifyContent: "center",
        alignItems: "center",
    },
    courseImageView: {
        padding: 10,
        borderRadius: 50,
        overflow: "hidden",
        backgroundColor: "rgba(58, 166, 185, 0.25)",
    },
    courseImage: {
        width: 55,
        height: 55,
    },
    courseName: {
        marginVertical: 10,
        color: "#4582E6",
        fontWeight: "700",
    },

    filterOption: {
        flexDirection: "row"
    },
    filterOptionView: {
        flexDirection: "row",
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#4582E6",
        borderLeftWidth: 0,
        justifyContent: "center"
    },
    filterOptionText: {
        fontSize: 12,
        textAlign: "center"
    },
    newOption: {
        width: "25%"
    },
    saleOption: {
        width: "25%"
    },
    registerOption: {
        width: "35%"
    },
    priceOption: {
        width: "15%"
    },
    courseListScroll: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});