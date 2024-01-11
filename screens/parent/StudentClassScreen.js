import { View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getClasses } from '../../api/student';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { Card } from '@rneui/themed';

const windowWidth = Dimensions.get('window').width;
const numCol = 2;
const columnWidth = windowWidth / numCol;

export default function StudentClassScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const student = route?.params.student;
    const status = route?.params.status;
    const [loading, setLoading] = useState(false)
    const [classes, setClasses] = useState([])
    const [fontsLoaded] = useFonts({
        Inter_700Bold,
        Inter_400Regular,
        Baloo2_700Bold,
    })
    const getClassesByStatus = async (status, id) => {
        setLoading(true)
        try {
            const data = await getClasses({ status, id });
            setClasses(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        if (status === 'completed') {
            navigation.setOptions({
                headerTitle: 'Lớp học đã hoàn thành',
            });
        } else if (status === 'on-going') {
            navigation.setOptions({
                headerTitle: 'Lớp học đang diễn ra',
            });
        } else if (status === 'upcoming') {
            navigation.setOptions({
                headerTitle: 'Lớp học sắp tới',
            });
        }
        getClassesByStatus(status, student.id)
    }, [status, student])
    if (!fontsLoaded) {
        return null
    }
    return (
        <View style={styles.container}>
        {loading && (<LoadingModal />)}
            {classes.length > 0 ? (
                <FlatList
                    style={styles.list}
                    data={classes}
                    keyExtractor={(item, index) => index}
                    numColumns={numCol}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Card.Image
                                style={{ padding: 0 }}
                                source={{
                                    uri:
                                        'https://watermark.lovepik.com/photo/20211125/large/lovepik-cram-school-teaching-picture_500998070.jpg',
                                }}
                            />
                            <Card.Divider />
                            <Card.Title style={styles.title}>{item.courseName}</Card.Title>
                            <Text style={styles.detailTitle}>Tên lớp: <Text style={styles.detail}>{item.className}</Text></Text>
                            <Text style={styles.detailTitle}>Tên giáo viên: <Text style={styles.detail}>{item.lecturerName}</Text></Text>
                        </View>
                    )}
                />
            ) : (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Inter_400Regular' }}>Danh sách lớp học trống</Text>
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    list: {
        flex: 1,
    },
    card: {
        width: columnWidth - 10,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        borderColor: '#999999',
        borderRadius: 5,
        borderWidth: 0.5,
        marginHorizontal: 5,
        marginVertical: 10,
    },
    title: {
        color: '#3A0CA3',
        fontFamily: 'Baloo2_700Bold',
        fontSize: 18,
    },
    detailTitle: {
        color: '#3A0CA3',
        marginLeft: 8,
        fontFamily: 'Inter_700Bold',
        marginTop: 8,
    },
    detail: {
        color: 'black',
        fontFamily: 'Inter_400Regular',
    }
})