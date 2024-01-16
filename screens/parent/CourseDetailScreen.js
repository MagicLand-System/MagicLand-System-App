import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { getClassByCourseId } from '../../api/class';

import ClassCard from '../../components/ClassCard';
import FilterCustomModal from '../../components/modal/FilterCustomModal';
import SpinnerLoading from '../../components/SpinnerLoading';
import { truncateString, formatPrice } from '../../util/util';
import { modifyCart } from '../../api/cart';
import ScheduleList from '../../components/ScheduleList';
import CustomToast from "../../components/CustomToast";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const filterDetailDefault = {
    amountRegister: [
        {
            name: "Dưới 10 học viên",
            check: false,
        },
        {
            name: "Từ 10 - 20 học viên",
            check: false,
        },
        {
            name: "Trên 20 học viên",
            check: false,
        },
        {
            name: "Tất cả",
            check: true,
        },
    ],
    amountLesson: [
        {
            name: "Dưới 10 buổi",
            check: false,
        },
        {
            name: "Từ 10 - 20 buổi",
            check: false,
        },
        {
            name: "Trên 20 buổi",
            check: false,
        },
        {
            name: "Tất cả",
            check: true,
        },
    ],
    type: [
        {
            name: "Online",
            check: false,
        },
        {
            name: "Offline",
            check: false,
        },
        {
            name: "Tất cả",
            check: true,
        },
    ],
    time: [
        {
            name: "Thứ 2 - Thứ 4 - Thứ 6",
            check: false,
        },
        {
            name: "Thứ 3 - Thứ 5 - Thứ 7",
            check: false,
        },
        {
            name: "Thứ 7 - Chủ Nhật",
            check: false,
        },
    ]
}

const defaultData = {
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
}

const introduceDefault = "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai"

export default function CourseDetailScreen({ route, navigation }) {

    const [viewDetail, setViewDetail] = useState({ detail: false, course: false })
    const [classCardDetail, setClassCardDetail] = useState([])
    const [filterVisible, setFilterVisible] = useState(false)
    const [filterValue, setFilterValue] = useState(filterDetailDefault)
    const [dataLoading, setDataLoading] = useState(true)
    let course = route?.params?.course
    const showToast = CustomToast();

    useEffect(() => {
        setViewDetail({ detail: false, course: false })
        loadClassData()
        course = route?.params?.course
    }, [route?.params?.course])

    const loadClassData = async () => {
        setDataLoading(true)
        const response = await getClassByCourseId(course?.courseId)
        if (response?.status === 200) {
            setClassCardDetail(response?.data)
        }
        setDataLoading(false)
    }

    const goback = () => {
        if (route?.params?.goback) {
            route?.params?.goback()
        } else {
            navigation.goBack()
        }
    }

    const selectCourse = (id) => {
        const index = classCardDetail.findIndex(obj => obj.id === id);
        const updateArray = [...classCardDetail]
        const defaultStatus = updateArray[index].choose ? updateArray[index].choose : false
        updateArray.forEach(item => item.choose = false)
        updateArray[index].choose = !defaultStatus;
        setClassCardDetail(updateArray)
    }

    const handleRegister = () => {
        navigation.push("ClassRegisterScreen", { course: course, classList: classCardDetail })
    }

    const handleCare = async () => {
        const classChoosed = classCardDetail.filter(obj => obj.choose === true);
        if (classChoosed[0]) {
            classChoosed.map(async (item) => {
                const response = await modifyCart([], item.id)
                if (response?.status === 200) {
                    showToast("Thành công", `Đã thêm ${item?.name} vào giỏ hàng`, "success");
                    console.log(`Đã thêm ${item?.name} vào giỏ hàng`);
                } else {
                    showToast("Thất bại", `Thêm ${item?.name} vào giỏ hàng thất bại`, "error");
                }
            })
        } else {
            showToast("Thông Báo", `Chưa Chọn lớp`, "warning");
        }
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
        const clearedFilterValue = { ...filterValue };

        clearedFilterValue.amountRegister.forEach(item => (item.check = false));
        clearedFilterValue.amountLesson.forEach(item => (item.check = false));
        clearedFilterValue.type.forEach(item => (item.check = false));
        clearedFilterValue.time.forEach(item => (item.check = false));

        setFilterValue(clearedFilterValue);
    };

    const getChoosedClass = () => {
        const classChoosed = classCardDetail.find(obj => obj.choose === true);
        return classChoosed
    }

    const filterModal = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Số lượng đăng ký:</Text>
                {
                    filterValue.amountRegister.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.flexColumn}
                                onPress={() => {
                                    const updatedFilterValue = { ...filterValue };
                                    const defaultValue = updatedFilterValue.amountRegister[index].check
                                    updatedFilterValue.amountRegister.forEach(item => item.check = false)
                                    updatedFilterValue.amountRegister[index].check = !defaultValue;
                                    setFilterValue(updatedFilterValue);
                                }}
                                key={index}
                            >
                                <View style={[styles.checkboxButton, item.check && styles.checkboxChoosed]}>
                                    <Icon name={"check"} color={"white"} size={20} />
                                </View>
                                <Text style={[styles.checkboxText]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
                <Text style={styles.modalTitle}>Số buổi học</Text>
                {
                    filterValue.amountLesson.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.flexColumn}
                                onPress={() => {
                                    const updatedFilterValue = { ...filterValue };
                                    const defaultValue = updatedFilterValue.amountLesson[index].check
                                    updatedFilterValue.amountLesson.forEach(item => item.check = false)
                                    updatedFilterValue.amountLesson[index].check = !defaultValue;
                                    setFilterValue(updatedFilterValue);
                                }}
                                key={index}
                            >
                                <View style={[styles.checkboxButton, item.check && styles.checkboxChoosed]}>
                                    <Icon name={"check"} color={"white"} size={20} />
                                </View>
                                <Text style={[styles.checkboxText]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
                <Text style={styles.modalTitle}>Hình thức</Text>
                {
                    filterValue.type.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.flexColumn}
                                onPress={() => {
                                    const updatedFilterValue = { ...filterValue };
                                    const defaultValue = updatedFilterValue.type[index].check
                                    updatedFilterValue.type.forEach(item => item.check = false)
                                    updatedFilterValue.type[index].check = !defaultValue;
                                    setFilterValue(updatedFilterValue);
                                }}
                                key={index}
                            >
                                <View style={[styles.checkboxButton, item.check && styles.checkboxChoosed]}>
                                    <Icon name={"check"} color={"white"} size={20} />
                                </View>
                                <Text style={[styles.checkboxText]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
                <Text style={styles.modalTitle}>Thời gian</Text>
                <View style={styles.modalOption}>
                    {
                        filterValue.time.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.check && styles.choosed]}
                                    onPress={() => {
                                        const updatedFilterValue = { ...filterValue };
                                        const defaultValue = updatedFilterValue.time[index].check
                                        updatedFilterValue.time.forEach(item => item.check = false)
                                        updatedFilterValue.time[index].check = !defaultValue;
                                        setFilterValue(updatedFilterValue);
                                    }}
                                    key={index}
                                >
                                    <Text style={[styles.optionText, item.check && styles.choosedText]}>
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
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.banner}>
                <Image source={{ uri: course?.image }} style={styles.bannerBackground} resizeMode="cover" />
                <View style={styles.bannerHeader}>
                    <TouchableOpacity onPress={goback}>
                        <Icon name={"chevron-left"} color={"#FFFFFF"} size={32} />
                    </TouchableOpacity>
                    <View style={styles.flexColumn}>
                        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.push("CartScreen")}>
                            <Icon name={"book"} color={"#FFFFFF"} size={28} />
                        </TouchableOpacity>
                        <View style={styles.headerIcon}><Icon name={"bell"} color={"#FFFFFF"} size={28} /></View>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.flexColumn}>
                    <Text style={{ ...styles.title, width: WIDTH * 0.55 }}>
                        Khóa Học: {course?.name}
                    </Text>
                    <View style={styles.priceView}>
                        <Text style={{ ...styles.priceText }}>
                            {formatPrice(course?.price ? course?.price : 0)} đ
                        </Text>
                    </View>
                </View>
                <View style={{
                    ...styles.flexBetweenColumn, width: WIDTH * 0.75, marginHorizontal: WIDTH * 0.025,
                    marginVertical: 20
                }}>
                    {/* <View style={styles.flexColumn}>
                        <Icon name={"account"} color={"#3AAC45"} size={32} />
                        <Text style={styles.cardText}>{course?.rateCount ? course?.rateCount : 0} người đăng ký</Text>
                    </View> */}
                    {
                        course?.rateCount && course?.rateCount !== 0 ?
                            <View style={styles.flexColumn}>
                                <Icon name={"star"} color={"#FFC90C"} size={28} />
                                <Text style={styles.cardText}><Text style={{ ...styles.cardText, fontSize: 15 }}>{course.rateValue}</Text> ({course.registerAmount} lượt đánh giá)</Text>
                            </View>
                            :
                            <View style={styles.flexColumn}>
                                <Icon name={"star"} color={"#C4C4C4"} size={28} />
                                <Text style={styles.cardText}> Chưa có đánh giá</Text>
                            </View>
                    }
                </View>
                {
                    !viewDetail.detail ?
                        <Text style={styles.descrip} numberOfLines={2}>
                            {course.mainDescription}
                        </Text>
                        :
                        <Text style={styles.descrip}>
                            {course.mainDescription}
                        </Text>
                }

                <Text style={{ ...styles.descrip }}>
                    {
                        !viewDetail.detail ?
                            ""
                            :
                            `Dành cho bé từ ${course?.minAgeStudent} đến ${course?.maxAgeStudent} tuổi`
                    }
                </Text>
                <Text style={styles.title}>
                    {course.subDescriptionTitle[0].title}
                </Text>
                {
                    !viewDetail.detail ?
                        <View style={styles.courseFeature}>
                            <View style={styles.featureIcon}>
                                <Icon name={"check-circle-outline"} color={"#1BAE3B"} size={28} />
                            </View>
                            <View style={styles.featureText}>
                                <Text style={{ ...styles.descrip, fontWeight: "700", color: "#9393A3" }}>
                                    {defaultData?.courseFeture[0]?.name}:
                                    <Text style={{ ...styles.descrip, fontWeight: "500", color: "#9393A3" }}>
                                        {truncateString(" " + course.subDescriptionTitle[0].contents[0]?.description, 60)}
                                        <TouchableOpacity onPress={() => { setViewDetail({ ...viewDetail, detail: true, course: false }) }}>
                                            <Text style={styles.viewDetail}>
                                                Xem Chi Tiết
                                            </Text>
                                        </TouchableOpacity>
                                    </Text>
                                </Text>

                            </View>
                        </View>
                        :
                        course.subDescriptionTitle[0].contents?.map((item, key) => {
                            const isLastItem = key === defaultData.courseFeture.length;

                            return (
                                <View style={styles.courseFeature} key={key}>
                                    <View style={styles.featureIcon}>
                                        <Icon name={"check-circle-outline"} color={"#1BAE3B"} size={28} />
                                    </View>
                                    <View style={styles.featureText}>
                                        <Text style={{ ...styles.descrip, fontWeight: "700", color: "#9393A3" }}>
                                            {item?.content}:
                                            <Text style={{ ...styles.descrip, fontWeight: "500" }}>
                                                {" " + item?.description}
                                                {
                                                    isLastItem &&
                                                    <TouchableOpacity onPress={() => { setViewDetail({ ...viewDetail, detail: false, course: false }) }}>
                                                        <Text style={styles.viewDetail}>
                                                            Thu hồi
                                                        </Text>
                                                    </TouchableOpacity>
                                                }
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            )
                        })
                }
                <Text style={{ ...styles.title, marginTop: 20 }}>
                    {`Chi Tiết Khóa Học   `}
                    {
                        viewDetail.course ?
                            <TouchableOpacity onPress={() => { setViewDetail({ ...viewDetail, course: false, detail: false }) }}>
                                <Text style={styles.viewDetail}>
                                    Thu hồi
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { setViewDetail({ ...viewDetail, course: true, detail: false }) }}>
                                <Text style={styles.viewDetail}>
                                    Xem Chi Tiết
                                </Text>
                            </TouchableOpacity>
                    }
                </Text>
                {
                    viewDetail?.course &&
                    <View style={styles.courseDetail}>
                        <View>
                            {defaultData?.courseDetail?.map((item, key) => {
                                return (
                                    <View style={styles.flexColumn} key={key}>
                                        <View style={styles.detailColumn} >
                                            <View style={styles.detailColumnIcon}>
                                                <Icon name={"arrow-right-bold-outline"} color={"#1BAE3B"} size={22} />
                                            </View>
                                            <Text style={{ ...styles.descrip, fontWeight: "600", fontSize: 13 }}>
                                                {item?.name + ": "}
                                            </Text>
                                        </View>
                                        <View style={styles.detailColumn}>
                                            <Text style={{ ...styles.descrip, width: WIDTH * 0.5 }}>
                                                {item?.detail}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                }
                <View style={{ ...styles.flexBetweenColumn, alignItems: "baseline", marginBottom: 15 }}>
                    <Text style={{ ...styles.title, marginTop: 20 }}>
                        {`Lịch Học Các Lớp Học: `}
                    </Text>
                    <TouchableOpacity
                        style={{ transform: [{ translateY: 5 }] }}
                        onPress={() => {
                            setFilterVisible(true)
                        }}
                    >
                        <Icon name={"filter-variant"} color={"#33363F"} size={28} />
                    </TouchableOpacity>
                </View>
                {
                    dataLoading ?
                        <SpinnerLoading />
                        :
                        <>
                            <View style={styles.cardList}>
                                <ScheduleList cardList={classCardDetail} onClick={selectCourse} />
                                {/* {classCardDetail?.map((item, key) => {
                                    return <ClassCard cardDetail={item} check={true} index={key} onClick={selectCourse} key={key} />
                                })} */}
                            </View>
                            <View style={{ ...styles.flexBetweenColumn, marginVertical: 15 }}>
                                <TouchableOpacity style={styles.button} onPress={handleCare}>
                                    <Text style={styles.buttonText}>Quan Tâm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ ...styles.button, backgroundColor: "#4582E6" }} onPress={handleRegister}>
                                    <Text style={{ ...styles.buttonText, color: "white" }}>Đăng Ký Ngay</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                }
            </View>
            <FilterCustomModal content={filterModal()} visible={filterVisible} onSubmit={hanldeSubmit} onCancle={hanldeCancle} onClear={hanldeClear} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    banner: {
        position: "relative",
        width: WIDTH,
        height: 150,
        marginBottom: 20,
    },
    bannerBackground: {
        width: WIDTH,
        height: 300,
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
    },
    bannerHeader: {
        width: "90%",
        position: "absolute",
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        top: "10%",
        left: "5%",
        backgroundColor: "rgba(136, 136, 136, 0.5)",
        zIndex: 10,
    },
    headerIcon: {
        marginLeft: 10,
    },
    content: {
        width: WIDTH * 0.95,
        padding: 20,
        // paddingBottom: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "white",
        marginHorizontal: WIDTH * 0.025
        // transform: [{ translateY: -(HEIGHT * 0.05) }]
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#42AEF4"
    },
    priceView: {
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 50,
        backgroundColor: "#42AEF4",
    },
    priceText: {
        color: "white",
        fontWeight: "600"
    },
    cardText: {
        fontSize: 12,
        color: "#3AAC45"
    },
    descrip: {
        marginTop: 10,
        opacity: 0.7,
        lineHeight: 18,
    },
    courseFeature: {
        flexDirection: "row",
    },
    featureIcon: {
        paddingHorizontal: 15,
        transform: [{ translateY: 10 }],
    },
    featureText: {
        width: WIDTH * 0.7,
        flexDirection: "row",
    },
    viewDetail: {
        color: "#3A0CA3",
        transform: [{ translateY: 3 }],
    },
    courseDetail: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    detailColumn: {
        minHeight: 30,
        width: WIDTH * 0.43,
        flexDirection: 'row',
        alignItems: "center",
    },
    detailColumnIcon: {
        transform: [{ translateY: 5 }],
        marginRight: 10,
    },
    cardList: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 15,
    },

    flexBetweenColumn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#4582E6",
        marginHorizontal: 15,
    },
    buttonText: {
        color: "#4582E6",
        fontWeight: "600"
    },

    modalContent: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginBottom: 20,
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
    },
    optionButton: {
        padding: 10,
        paddingHorizontal: 15,
        borderColor: "#3D5CFF",
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
        // backgroundColor: "#D9D9D9",
    },
    optionText: {
        color: "#4582E6",
        fontWeight: "600"
    },
    choosed: {
        backgroundColor: "#4582E6",
    },
    choosedText: {
        color: "white"
    },
    checkboxButton: {
        width: 25,
        height: 25,
        borderWidth: 3,
        borderColor: "#888888",
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 8,
    },
    checkboxChoosed: {
        borderColor: "#4582E6",
        backgroundColor: "#4582E6",
    }
});