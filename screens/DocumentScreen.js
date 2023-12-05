import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import StudentView from '../components/StudentView';
import PersonalClassCard from '../components/PersonalClassCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const studentListDefault = [
  {
    id: 0,
    name: "Lê Bảo Ngọc",
    age: "10",
    dob: "2-2-2002",
    check: true,
    classList: [
      {
        id: 0,
        status: true,
        type: "Sắp bắt đầu",
        title: "Lớp Toán Tư Duy 1",
        age: 8,
        place: "Cơ sở 1",
        timeFrom: "18:30",
        timeTo: "20:00",
        rate: 4.6,
        registerAmount: 1,
        price: 200000,
        leasonAmount: 20,
        choose: false,
      },
      {
        id: 1,
        status: false,
        type: "Đang học",
        title: "Lớp Toán Tư Duy 2",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 1,
        price: 200000,
        leasonAmount: 20,
        choose: false,
      },
      {
        id: 2,
        status: false,
        type: "Đã kết thúc",
        title: "Lớp Toán Tư Duy 3",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 1,
        price: 200000,
        leasonAmount: 20,
        choose: false,
      },
    ]
  },
  {
    id: 1,
    name: "Trần Hữu Nghĩa",
    age: "11",
    dob: "2-2-2003",
    check: false,
    classList: [
      {
        id: 0,
        status: true,
        type: "Sắp bắt đầu",
        title: "Lớp Toán Tư Duy 1",
        age: 8,
        place: "Cơ sở 1",
        timeFrom: "18:30",
        timeTo: "20:00",
        rate: 4.6,
        registerAmount: 1,
        price: 200000,
        leasonAmount: 20,
        choose: false,
      },
      {
        id: 1,
        status: false,
        type: "Đã kết thúc",
        title: "Lớp Toán Tư Duy 3",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 1,
        price: 200000,
        leasonAmount: 20,
        choose: false,
      },
      {
        id: 2,
        status: false,
        type: "Đang học",
        title: "Lớp Toán Tư Duy 2",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 1,
        price: 200000,
        leasonAmount: 20,
        choose: false,
      },

    ]
  },
]

export default function DocumentScreen({ navigation }) {

  const [studentList, setStudentList] = useState(studentListDefault)

  const selectStudent = (id) => {
    const index = studentList.findIndex(obj => obj.id === id);
    const updateArray = [...studentListDefault]
    const defaultStatus = updateArray[index].check
    updateArray.forEach(item => item.check = false)
    updateArray[index].check = !defaultStatus;
    // console.log(updateArray);
    setStudentList(updateArray)
  }

  const handleClassNavigate = (classDetail) => {
    navigation.push("ClassDetailScreen", { classDetail: classDetail })
  }

  const getClassList = () => {
    const updateArray = studentList.filter(item => item.check === true)
    return updateArray[0].classList
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Danh sách các cháu:</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.studentList}>
        {
          studentList?.map((item, index) => {
            return (
              <StudentView student={item} index={index} key={index} onClick={selectStudent} />
            )
          })
        }
        <View style={styles.studentView}>
          <View style={styles.studentImage}>
            <Icon name={"account-plus"} color={"#5A5A5A"} size={50} />
          </View>
          <View style={styles.studentNameView}>
            <Text style={styles.studentName}>
              Thêm Bé
            </Text>
          </View>
        </View >
      </ScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>Các khóa học đã đăng ký:</Text>
      </View>
      <View style={styles.classList}>
        {
          getClassList().map((item, index) => {
            return (
              <PersonalClassCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} key={index} />
            )
          })
        }
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>Các sự kiện đã tham gia:</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleView: {
    flexDirection: "row",
    marginHorizontal: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#FF8F8F",
    marginVertical: 15,
    alignItems: "center"
  },
  title: {
    marginLeft: 5,
    color: "#FF8F8F",
    fontWeight: "600",
    fontSize: 18,
  },
  studentList: {
    padding: 20,
    paddingLeft: 20
  },
  studentView: {
    // width: WIDTH * 0.7,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  studentImage: {
    position: "relative",
    width: WIDTH * 0.2,
    height: WIDTH * 0.2,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "#888888",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
  studentCheck: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 2,
    borderRadius: 50,
    backgroundColor: "",
  },
  studentNameView: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: "#C4C4C4"
  },
  studentName: {
    fontWeight: "600",
    fontSize: 12,
    color: "#888888"
  },
  classList: {
    paddingHorizontal: WIDTH * 0.07,
  }
});