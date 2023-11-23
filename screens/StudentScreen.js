import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from '@rneui/themed';
import MainButton from '../components/MainButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { getStudents } from '../api/student';

export default function StudentScreen() {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold,
        Baloo2_700Bold,
    })
    useFocusEffect(
        React.useCallback(() => {
            getCurrentStudents()
        }, [])
    );
    const getCurrentStudents = async () => {
        try {
            setLoading(true)
            const students = await getStudents();
            setStudents(students);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };
    if (!fontsLoaded) {
        return null
    }
    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Danh sách học viên</Text>
            {students.length > 0 ? students.map((student) => (
                <TouchableOpacity key={student.id} style={styles.student} onPress={() => { navigation.navigate('StudentMenu', { student }) }}>
                    <Avatar size={80} rounded source={{ uri: student.avatarImage }} />
                    <View style={{ marginLeft: 16 }}>
                        <Text style={styles.studentName}>{student.fullName}</Text>
                        <Text style={styles.studentDetail}>Tuổi: {new Date().getFullYear() - new Date(student.dateOfBirth).getFullYear()}</Text>
                        <Text style={styles.studentDetail}>Giới tính: {student.gender}</Text>
                    </View>
                </TouchableOpacity>
            )) : (
                <Text style={styles.studentName}>Danh sách học viên trống</Text>
            )}
            <View style={{ marginTop: 20 }}>
                <MainButton onPress={() => { navigation.navigate('AddStudent') }} title='Thêm học viên' />
            </View>
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: 'white',
    },
    title: {
        color: '#3A0CA3',
        fontSize: 28,
        textAlign: 'center',
        fontFamily: "Baloo2_700Bold",
        marginBottom: 20,
        marginTop: 60,
    },
    student: {
        flexDirection: 'row',
        borderColor: '#3A0CA3',
        borderWidth: 0.5,
        borderStyle: 'solid',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 10,
        backgroundColor: 'rgba(218,218,247,0.5)',
        alignItems: 'center',
    },
    studentName: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
    },
    studentDetail: {
        marginLeft: 8,
        fontFamily: 'Inter_400Regular',
        marginTop: 8,
    }
})