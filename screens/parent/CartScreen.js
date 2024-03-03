import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { getCartOfParent, removeClassInCart } from "../../api/cart"

import FavoriteHeader from '../../components/header/FavoriteHeader';

import { formatPrice, getIndexById } from '../../util/util';
import CourseCard from '../../components/CourseCard';
import ClassCard from '../../components/ClassCard';
import SpinnerLoading from "../../components/SpinnerLoading"
import FilterCustomModal from '../../components/modal/FilterCustomModal';
import ClassCartCard from '../../components/ClassCartCard';
import CartCard from '../../components/CartCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const filterDetailDefault = {
    amountRegister: [
        {
            name: "Dưới 10 học viên",
            maxValue: 10,
            check: false,
        },
        {
            name: "Từ 10 - 20 học viên",
            minValue: 10,
            maxValue: 20,
            check: false,
        },
        {
            name: "Trên 20 học viên",
            minValue: 20,
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
            maxValue: 10,
            check: false,
        },
        {
            name: "Từ 10 - 20 buổi",
            minValue: 10,
            maxValue: 20,
            check: false,
        },
        {
            name: "Trên 20 buổi",
            minValue: 20,
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

export default function CartScreen({ navigation }) {

    const [classCardDetail, setClassCardDetail] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    const [filterVisible, setFilterVisible] = useState(false)
    const [filterValue, setFilterValue] = useState({ ...filterDetailDefault })
    const [filterTmpValue, setFilterTmpValue] = useState(JSON.parse(JSON.stringify(filterDetailDefault)))
    const [bottomModalVisible, setBottomModalVisible] = useState({ total: false, confirm: false })

    useEffect(() => {
        loadClassData()
    }, [])

    const loadClassData = async () => {
        setDataLoading(true)
        const response = await getCartOfParent()
        if (response?.status === 200) {
            // console.log(response?.data.cartItems);
            setClassCardDetail(response?.data?.items)
        }
        setDataLoading(false)
    }

    const hanldeChangeStatus = () => {
        if (bottomModalVisible.total) {
            hanldeClearChoosed()
            setBottomModalVisible({ total: false, confirm: false })
        } else {
            setBottomModalVisible({ total: true, confirm: false })
        }
    }

    const hanldeRegis = () => {
        const choosesListCount = classCardDetail?.filter(item => item.choose)
        if (choosesListCount?.length !== 0) {
            setBottomModalVisible({ total: true, confirm: true })
        }
    }

    const hanldeClearChoosed = () => {
        const updateList = [...classCardDetail]
        updateList.forEach(item => item.choose = false)
        setClassCardDetail(updateList)
    }

    const handleRemoveCart = async () => {
        setDataLoading(true)
        const choosedList = classCardDetail?.filter(item => item.choose)
        const response = await removeClassInCart(choosedList.map((item) => (item.itemId)))
        if (response.status === 200) {
            await loadClassData()
        } else {
            console.log(response?.response?.data);
        }
        setDataLoading(false)
    }

    const handleCancel = () => {
        hanldeClearChoosed()
        setBottomModalVisible({ total: false, confirm: false })
    }

    const handleSubmit = () => {
        const courseList = classCardDetail?.filter(item => item?.choose)
        navigation.push("RegisterClassScreen", { courseList: courseList })
        // hanldeChangeStatus()
    }

    const getCountChoosed = () => {
        const choosesListCount = classCardDetail?.filter(item => item?.choose)
        return choosesListCount?.length
    }

    const selectCourse = (id) => {
        if (bottomModalVisible.total) {
            const index = getIndexById(classCardDetail, id);
            if (index !== -1) {
                const updateArray = [...classCardDetail];
                const classItem = updateArray[index];

                const defaultStatus = classItem && classItem?.choose ? classItem?.choose : false;

                if (classItem) {
                    classItem.choose = !defaultStatus;
                }

                setClassCardDetail(updateArray);
            }
        }
    };

    const getIndexById = (array, id) => {
        return array.findIndex(item => item && item.cartItemId === id);
    };

    const hanldeSubmit = () => {
        setFilterValue({ ...filterTmpValue })
        setFilterVisible(false)
    }

    const hanldeCancle = () => {
        setFilterTmpValue({ ...filterValue })
        setFilterVisible(false)
    }

    const hanldeClear = () => {
        const clearedFilterValue = { ...filterTmpValue };

        clearedFilterValue.amountRegister.forEach(item => (item.check = false));
        clearedFilterValue.amountRegister[3].check = true;
        clearedFilterValue.amountLesson.forEach(item => (item.check = false));
        clearedFilterValue.amountLesson[3].check = true;
        clearedFilterValue.type.forEach(item => (item.check = false));
        clearedFilterValue.type[2].check = true;
        clearedFilterValue.time.forEach(item => (item.check = false));

        // setFilterValue(clearedFilterValue);
        setFilterTmpValue(clearedFilterValue)
    };

    const filterModal = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Số lượng đăng ký:</Text>
                {
                    filterTmpValue.amountRegister.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.flexColumn}
                                onPress={() => {
                                    const updatedFilterValue = JSON.parse(JSON.stringify(filterTmpValue));
                                    // const defaultValue = updatedFilterValue.amountRegister[index].check
                                    updatedFilterValue.amountRegister.forEach(item => item.check = false)
                                    updatedFilterValue.amountRegister[index].check = true;
                                    setFilterTmpValue(updatedFilterValue);
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
                    filterTmpValue.amountLesson.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.flexColumn}
                                onPress={() => {
                                    const updatedFilterValue = JSON.parse(JSON.stringify(filterTmpValue));
                                    // const defaultValue = updatedFilterValue.amountLesson[index].check
                                    updatedFilterValue.amountLesson.forEach(item => item.check = false)
                                    updatedFilterValue.amountLesson[index].check = true;
                                    setFilterTmpValue(updatedFilterValue);
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
                    filterTmpValue.type.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.flexColumn}
                                onPress={() => {
                                    const updatedFilterValue = JSON.parse(JSON.stringify(filterTmpValue));
                                    // const defaultValue = updatedFilterValue.type[index].check
                                    updatedFilterValue.type.forEach(item => item.check = false)
                                    updatedFilterValue.type[index].check = true;
                                    setFilterTmpValue(updatedFilterValue);
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
                        filterTmpValue.time.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.check && styles.choosed]}
                                    onPress={() => {
                                        const updatedFilterValue = JSON.parse(JSON.stringify(filterTmpValue));
                                        const defaultValue = updatedFilterValue.time[index].check
                                        updatedFilterValue.time.forEach(item => item.check = false)
                                        updatedFilterValue.time[index].check = !defaultValue;
                                        setFilterTmpValue(updatedFilterValue);
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

    const filferClassList = (array) => {
        let updateArray = [...array]
        // rate > 0 && updateArray.filter(item => item)
        const amountLesson = filterValue.amountLesson.find(item => item.check === true)
        if (amountLesson.minValue && amountLesson.maxValue) {
            updateArray = updateArray.filter(item => item.class.schedules?.length >= amountLesson.minValue && item.class.schedules?.length <= amountLesson.maxValue)
        } else if (amountLesson.minValue) {
            updateArray = updateArray.filter(item => item.class.schedules?.length >= amountLesson.minValue)
        } else if (amountLesson.maxValue) {
            updateArray = updateArray.filter(item => item.class.schedules?.length <= amountLesson.maxValue)
        }
        const amountRegister = filterValue.amountRegister.find(item => item.check === true)
        if (amountRegister.minValue && amountRegister.maxValue) {
            updateArray = updateArray.filter(item => item.class.limitNumberStudent >= amountRegister.minValue && item.class.limitNumberStudent <= amountRegister.maxValue)
        } else if (amountRegister.minValue) {
            updateArray = updateArray.filter(item => item.class.limitNumberStudent >= amountRegister.minValue)
        } else if (amountRegister.maxValue) {
            updateArray = updateArray.filter(item => item.class.limitNumberStudent <= amountRegister.maxValue)
        }
        const type = filterValue.type.find(item => item.check === true)
        switch (type.name) {
            case "Offline":
                updateArray = updateArray.filter(item => item.class.method === "OFFLINE")
                break;

            case "Online":
                updateArray = updateArray.filter(item => item.class.method === "ONLINE")
                break;

            default:
                break;
        }
        return updateArray
    }

    return (
        <>
            <FavoriteHeader navigation={navigation} title={`Khóa Học Bạn Quan Tâm (${classCardDetail?.length})`} type={bottomModalVisible.total} setType={hanldeChangeStatus} />
            <TouchableOpacity
                onPress={() => setFilterVisible(true)}
                style={{ ...styles.filterButton, bottom: bottomModalVisible.total ? bottomModalVisible.confirm ? 195 : 135 : 80 }}
            >
                <Icon name={"filter"} color={"white"} size={28} />
            </TouchableOpacity>
            {
                dataLoading ?
                    <SpinnerLoading />
                    :
                    <ScrollView showsVerticalScrollIndicator={false} style={{ ...styles.container }}>
                        <View style={{ marginBottom: 15 }} />
                        {filferClassList(classCardDetail)?.map((item, index) => {
                            return <CartCard cardDetail={item} type={item?.itemType} check={bottomModalVisible.total} index={index} onClick={selectCourse} key={index} />
                        })}
                        <View style={{ height: bottomModalVisible.total ? bottomModalVisible.confirm ? 195 : 135 : 30 }} />
                    </ScrollView>
            }
            {
                bottomModalVisible.total &&
                <View style={styles.screenBottom}>
                    {
                        bottomModalVisible.confirm ?
                            <View style={styles.confirmModal}>
                                <Text style={{ ...styles.modalText, marginBottom: 7 }}>Bạn Đã chọn {getCountChoosed()} khóa học</Text>
                                <Text style={{ ...styles.modalText, marginBottom: 15 }}>Bạn có muốn đăng ký khóa học không?</Text>
                                <View style={styles.modalButtonView}>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                                        <Text style={styles.modalButtonText}>Bỏ qua</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                                        <Text style={{ ...styles.modalButtonText, color: "#C71212" }}>Đăng ký</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={styles.choosingModal}>
                                <TouchableOpacity style={styles.modalIconView} onPress={hanldeRegis}>
                                    <Icon name={"book-plus"} color={"#FFFFFF"} size={28} />
                                    <Text style={styles.modalIconText}>Đăng Ký</Text>
                                </TouchableOpacity>
                                <Text style={styles.modalText}>{`Đã chọn ${getCountChoosed()} khóa học`}</Text>
                                <TouchableOpacity style={styles.modalIconView} onPress={handleRemoveCart}>
                                    <Icon name={"trash-can-outline"} color={"#FFFFFF"} size={28} />
                                    <Text style={styles.modalIconText}>Thùng rác</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            }
            <FilterCustomModal content={filterModal()} visible={filterVisible} onSubmit={hanldeSubmit} onCancle={hanldeCancle} onClear={hanldeClear} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        backgroundColor: 'white',
        paddingHorizontal: WIDTH * 0.03,
        paddingTop: 20,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingBottom: 80
    },
    flexColumnAround: {
        width: WIDTH,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    flexColumnCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
    },

    filterButton: {
        padding: 10,
        borderRadius: 50,
        position: "absolute",
        bottom: 1000,
        bottom: 80,
        right: 20,
        backgroundColor: "#4980D8",
        zIndex: 999
    },
    cardList: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    screenBottom: {
        position: "absolute",
        paddingBottom: 30,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#241468",
        justifyContent: "flex-start",
    },
    choosingModal: {
        flexDirection: "row",
        padding: 20,
        paddingHorizontal: 30,
        paddingBottom: 0,
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalIconView: {
        justifyContent: 'center',
        alignItems: "center",
    },
    modalIconText: {
        color: "white",
        fontSize: 12,
        marginTop: 5,
    },
    modalText: {
        fontWeight: "700",
        color: "#ffffff"
    },
    confirmModal: {
        padding: 20,
        paddingHorizontal: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    modalButtonView: {
        width: WIDTH * 0.6,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    modalButton: {
        padding: 15,
        paddingVertical: 5,
        borderRadius: 50,
        backgroundColor: "white",
    },
    modalButtonText: {
        fontWeight: "700",
        color: "#3D5CFF"
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