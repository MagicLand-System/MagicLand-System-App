import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../components/header/Header';
import SearchBar from '../components/SearchBar';
import CourseSlide from '../components/CourseSlide';
import CourseCard from '../components/CourseCard';
import FilterCustomModal from '../components/modal/FilterCustomModal';
import InputRange from '../components/InputRange';
import StarChoose from '../components/StarChoose';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const courseOptionDefault = [
    {
        name: "Toán",
        choose: false
    },
    {
        name: "Vật Lý",
        choose: false
    },
    {
        name: "Ngoại Ngữ",
        choose: false
    },
    {
        name: "Vẽ",
        choose: false
    },
    {
        name: "Nấu Ăn",
        choose: false
    },
    {
        name: "Ba Lê",
        choose: false
    },
    {
        name: "Lập Trình",
        choose: false
    },
]

const priceDefault = {
    min: 0,
    max: 2000
}

const homeContentDetail = {
    carousel: [
        {
            img: require("../assets/home/carousel/carouselImg1.png")
        },
        {
            img: require("../assets/home/carousel/carouselImg2.png")
        },
        {
            img: require("../assets/home/carousel/carouselImg3.png")
        },
    ],
    courseIcon: [
        {
            id: 0,
            type: "math",
            name: "Toán",
            img: require("../assets/home/courseImage/courseMath.png")
        },
        {
            id: 1,
            type: "physics",
            name: "Vật Lý",
            img: require("../assets/home/courseImage/coursePhysics.png")
        },
        {
            id: 2,
            type: "translation",
            name: "Ngoại Ngữ",
            img: require("../assets/home/courseImage/courseTranslation.png")
        },
        {
            id: 3,
            type: "art",
            name: "Vẽ",
            img: require("../assets/home/courseImage/courseArt.png")
        },
        {
            id: 4,
            type: "cooking",
            name: "Nấu Ăn",
            img: require("../assets/home/courseImage/courseCooking.png")
        },
        {
            id: 5,
            type: "ballet",
            name: "Ba Lê",
            img: require("../assets/home/courseImage/courseBallet.png")
        },
        {
            id: 6,
            type: "coding",
            name: "Lập Trình",
            img: require("../assets/home/courseImage/courseCoding.png")
        },
    ],
    courseDetail: [
        {
            id: 0,
            name: "Toán Tư Duy Cho Bé (Cơ Bản)",
            regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
            introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
            vietType: "toán",
            type: "math",
            img: require("../assets/home/cardImage/homeCardMathImg.png"),
            registerAmount: 1,
            rateValue: 4.5,
            rateCount: 8,
            coursePrice: 200000,
            favorite: false,
            courseFeture: [
                {
                    name: "Phát trển tư duy và kỹ năng",
                    detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
                },
                {
                    name: "Phát trển tư duy và kỹ năng",
                    detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
                },
                {
                    name: "Phát trển tư duy và kỹ năng",
                    detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
                },
            ],
            courseDetail: [
                {
                    name: "Tên KH",
                    detail: "Toán Tư Duy Cho Bé"
                },
                {
                    name: "Điều kiện tham gia",
                    detail: "Đã hoàn thành khóa học Math001"
                },
                {
                    name: "Độ tuổi",
                    detail: "Từ 7 tuổi"
                },
                {
                    name: "Loại Hình",
                    detail: "Tiếng Anh"
                },
                {
                    name: "Hình Thức",
                    detail: "Lớp học"
                },
                {
                    name: "Số buổi",
                    detail: "4 buổi / khóa"
                },
            ],
        },
        {
            id: 1,
            name: "Vẽ Cùng Bé",
            regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
            introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
            vietType: "toán",
            type: "art",
            img: require("../assets/home/cardImage/homeCardDrawImg.png"),
            registerAmount: 1,
            rateValue: 4.5,
            rateCount: 8,
            coursePrice: 200000,
            favorite: true,
            courseFeture: [
                {
                    name: "Phát trển tư duy và kỹ năng",
                    detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
                },
                {
                    name: "Phát trển tư duy và kỹ năng",
                    detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
                },
                {
                    name: "Phát trển tư duy và kỹ năng",
                    detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
                },
            ],
            courseDetail: [
                {
                    name: "Tên KH",
                    detail: "Toán Tư Duy Cho Bé"
                },
                {
                    name: "Điều kiện tham gia",
                    detail: "Đã hoàn thành khóa học Math001"
                },
                {
                    name: "Độ tuổi",
                    detail: "Từ 7 tuổi"
                },
                {
                    name: "Loại Hình",
                    detail: "Tiếng Anh"
                },
                {
                    name: "Hình Thức",
                    detail: "Lớp học"
                },
                {
                    name: "Số buổi",
                    detail: "4 buổi / khóa"
                },
            ],
        },
        {
            id: 2,
            name: "Vẽ Cùng Bé 2",
            regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
            introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
            vietType: "toán",
            type: "art",
            img: require("../assets/home/cardImage/homeCardDrawImg.png"),
            registerAmount: 1,
            rateValue: 0,
            rateCount: 0,
            coursePrice: 200000,
            favorite: true,
            courseFeture: [
                {
                    name: "Phát trển tư duy và kỹ năng",
                    detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
                },
                {
                    name: "Phát trển tư duy và kỹ năng",
                    detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
                },
                {
                    name: "Phát trển tư duy và kỹ năng",
                    detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
                },
            ],
            courseDetail: [
                {
                    name: "Tên KH",
                    detail: "Toán Tư Duy Cho Bé"
                },
                {
                    name: "Điều kiện tham gia",
                    detail: "Đã hoàn thành khóa học Math001"
                },
                {
                    name: "Độ tuổi",
                    detail: "Từ 7 tuổi"
                },
                {
                    name: "Loại Hình",
                    detail: "Tiếng Anh"
                },
                {
                    name: "Hình Thức",
                    detail: "Lớp học"
                },
                {
                    name: "Số buổi",
                    detail: "4 buổi / khóa"
                },
            ],
        },
    ]
}

export default function CourseScreen({ navigation }) {

    const [searchValue, setSearchValue] = useState("")
    const [courseOption, setCourseOption] = useState([...courseOptionDefault])
    const [filterVisible, setFilterVisible] = useState(false)
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [rate, setRate] = useState(0)
    const [priceRange, setPriceRange] = useState(priceDefault)
    const scrollViewRef = useRef(null);

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
    }, [carouselIndex]);

    const handleChangePrice = (value) => {
        setPriceRange({ min: value?.min, max: value?.max })
        console.log(value);
    }

    const handleSearch = (value) => {
        setSearchValue(value)
    }

    const hanldeSubmit = () => {
        hanldeClear()
        setFilterVisible(false)
    }

    const hanldeCancle = () => {
        hanldeClear()
        setFilterVisible(false)
    }

    const hanldeClear = () => {
        setRate(0)
        setPriceRange(priceDefault)
    }

    const hanldeCoursePress = (course) => {
        navigation.navigate("CourseDetailScreen", { course: course })
    }

    const filterModal = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Học Phí</Text>
                <InputRange title={"Học Phí"} min={0} max={2000} minValue={priceRange.min} maxValue={priceRange.max} steps={10} onValueChange={handleChangePrice} />
                <Text style={styles.modalTitle}>Môn Học:</Text>
                <View style={styles.modalOption}>
                    {
                        courseOption.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.choose && styles.choosed]}
                                    onPress={() => {
                                        setCourseOption((prevAgeOption) => {
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
                <Text style={styles.modalTitle}>Đánh Giá:</Text>
                <StarChoose size={rate} setSize={setRate} />
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
                            <Text style={{ fontWeight: "700", fontSize: 18, color: "white" }}>PH: Ngô Gia Thưởng</Text>
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
                                    <View style={{ ...styles.carouselDot, backgroundColor: carouselIndex === index ? "#FF597B" : "#FFFFFF" }} key={index} />

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
                                <TouchableOpacity style={styles.courseView} key={index}>
                                    <View style={styles.courseImageView}>
                                        <Image source={item.img} style={styles.courseImage} resizeMode="cover" />
                                    </View>
                                    <Text style={styles.courseName}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <Text style={styles.title}>Best Sellers:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        homeContentDetail.courseDetail.map((item, index) => {
                            return (
                                <CourseCard cardDetail={item} onClick={hanldeCoursePress} navigation={navigation} key={index} />
                            )
                        })
                    }
                </ScrollView>
                <Text style={styles.title}>Khóa Học Mới:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        homeContentDetail.courseDetail.map((item, index) => {
                            return (
                                <CourseCard cardDetail={item} onClick={hanldeCoursePress} navigation={navigation} key={index} />
                            )
                        })
                    }
                </ScrollView>
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
        // // paddingBottom: 80,
        // marginBottom: 15,
    },
    title: {
        marginVertical: 10,
        marginHorizontal: WIDTH * 0.05,
        color: "#3AA6B9",
        fontSize: 20,
        fontWeight: "700",
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
        color: "#FF8D9D",
        fontWeight: "600"
    },
    choosed: {
        backgroundColor: "#3D5CFF"
    },

    header: {
        backgroundColor: "#FF8F8F",
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
        color: "#3AA6B9",
        fontWeight: "700",
    },
});