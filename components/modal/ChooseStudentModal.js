import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react'

import Header from '../header/Header';
import { studentSelector } from '../../store/selector';
import { useSelector } from 'react-redux';
import StudentCard from '../StudentCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChooseStudentModal({ visible, focusCourse, selectStudent, onCancle, navigation }) {

    const student = useSelector(studentSelector)

    const chooseStudent = (student) => {
        selectStudent(focusCourse, student)
    }

    const checkIdExist = (id) => {
        return focusCourse?.student?.some(item => item.student === id);
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.safeArea} />
                <Header navigation={navigation} goback={onCancle} title={"Học sinh đăng ký lớp"} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.cardList}>
                    <View style={styles.srollHeader}></View>
                    {
                        student.map((item, index) => {
                            return (
                                <StudentCard student={item} check={checkIdExist(item.id)} index={index} onClick={chooseStudent} key={index} />
                            )
                        })
                    }
                </ScrollView>
            </View >
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    safeArea: {
        width: WIDTH,
        height: 50,
        backgroundColor: "#241468"
    },
    cardList: {
        marginTop: 20,
        paddingHorizontal: WIDTH * 0.05,
    },

    srollHeader: {
        marginBottom: 20,
    },
});