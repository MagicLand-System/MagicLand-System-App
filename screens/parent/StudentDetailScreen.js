import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FavoriteHeader from '../../components/header/FavoriteHeader';
import { formatDate } from '../../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function StudentDetailScreen({ route, navigation }) {
    const [studentDetail, setStudentDetail] = useState({})
    const [loading, setLoading] = useState(true)
    const [screenStatus, setScreenStatus] = useState({ edit: false })

    useEffect(() => {
        setStudentDetail(route?.params?.studentDetail)
    }, [route?.params?.studentDetail])

    const hanldeChangeStatus = () => {
        if (screenStatus.edit) {
            setScreenStatus({ edit: false })
        } else {
            setScreenStatus({ edit: true })
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <FavoriteHeader
                navigation={navigation}
                title={`Thông tin của bé`}
                type={screenStatus.edit}
                setType={hanldeChangeStatus}
                defaultType={"Chỉnh sửa"}
                editType={"Chỉnh sửa"}
            />
            <View style={styles.flexColumnAround}>
                <Image
                    source={{ uri: studentDetail?.avatarImage }}
                    style={styles.avatar}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>Thông tin bé</Text>
            </View>
            <View style={styles.flexColumnBetween}>
                <Text style={styles.boldText}>Tên</Text>
                <Text style={{ ...styles.boldText, color: "#757575" }}>{studentDetail?.fullName}</Text>
            </View>
            <View style={styles.flexColumnBetween}>
                <Text style={styles.boldText}>Ngày sinh</Text>
                <Text style={{ ...styles.boldText, color: "#757575" }}>{formatDate(studentDetail?.dateOfBirth)}</Text>
            </View>
            <View style={styles.flexColumnBetween}>
                <Text style={styles.boldText}>Giới tính</Text>
                <Text style={{ ...styles.boldText, color: "#757575" }}>{studentDetail?.gender}</Text>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>Khóa học đã đăng ký</Text>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleView: {
        flexDirection: "row",
        marginHorizontal: 20,
        // borderLeftWidth: 5,
        // borderLeftColor: "#4582E6",
        marginVertical: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#4582E6",
        fontWeight: "600",
        fontSize: 18,
    },
    avatar: {
        width: WIDTH * 0.2,
        height: WIDTH * 0.2,
        borderRadius: 150,
        overflow: "hidden",
        margin: 10,
    },

    flexColumnAround: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // borderWidth: 1,
    },
    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
        marginHorizontal: WIDTH * 0.05
    },
    boldText: {
        fontWeight: "700"
    },
});