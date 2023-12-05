import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Calendar, CalendarDayComponent } from 'react-native-calendars';

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
  },
  {
    id: 1,
    name: "Trần Hữu Nghĩa",
    age: "11",
    dob: "2-2-2003",
    check: false,
  },
]

const dateList = [
  {
    date: "2023-12-13",
    classList: [
      {
        title: "Khóa Học Vẽ Cho Trẻ Mới Bắt Đầu",
        time: "10:00-13:00",
        room: "110",
      },
    ]
  },
  {
    date: "2023-12-14",
    classList: [
      {
        title: "Khóa Học Vẽ Cho Trẻ Mới Bắt Đầu",
        time: "10:00-13:00",
        room: "110",
      },
      {
        title: "Hát cùng cô giáo nhỏ",
        time: "10:00-13:00",
        room: "110",
      },
      {
        title: "Toán Tư Duy",
        time: "10:00-13:00",
        room: "110",
      },
    ]
  },

]

export default function ScheduleScreen({ navigation }) {

  const [studentList, setStudentList] = useState(studentListDefault)
  const [selected, setSelected] = useState('');

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
    const updateArray = dateList.filter(item => item.date === selected)
    return updateArray[0]?.classList
  }


  const getMarkedDates = () => {
    let markedDates = {};

    dateList.forEach((dateItem) => {
      const dots = dateItem.classList.map((classItem) => ({
        key: classItem.title,
        color: 'green', // You can customize the dot color here
      }));
      markedDates[dateItem.date] = {
        dots,
        // selected: selected === dateItem.date,
        // disableTouchEvent: true,
        // selectedDotColor: 'orange',
        // selectedTextColor: 'white',
        // selectedColor: "#3AA6B9",
      };
    });

    // Set styling for the selected date
    if (selected && markedDates[selected]) {
      markedDates[selected] = {
        ...markedDates[selected],
        selected: true,
        disableTouchEvent: true,
        selectedDotColor: 'orange',
        selectedTextColor: 'white',
        selectedColor: "#3AA6B9",
      };
    }

    return markedDates;
  };

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
        <Text style={styles.title}>Lịch học:</Text>
      </View>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
            selectedTextColor: 'white',
            selectedColor: "#3AA6B9",
          },
          ...getMarkedDates()
        }}
        markingType="multi-dot"
      />
      {
        getClassList()?.map((item, index) => {
          return (
            <View style={{ ...styles.classColumn, backgroundColor: index % 2 === 0 ? "#FFE4E7" : "white"}} key={index}>
              <View style={styles.flexColumnBetween}>
                <View style={styles.flexColumn}>
                  <View style={styles.circle} />
                  <Text style={styles.classRoom}>{item.time}</Text>
                </View>
                <Icon name={"dots-horizontal"} color={"#FF8D9D"} size={28} />
              </View>
              <Text style={styles.classTitle}>{item.title}</Text>
              <Text style={{ ...styles.classRoom, marginTop: 5 }}>Phòng {item.room}</Text>
            </View>
          )
        })
      }
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
  classColumn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  classTitle: {
    color: "#DA5742",
    fontWeight: "700",
    fontSize: 16,
  },
  classRoom: {
    color: "#8F9BB3"
  },
  circle: {
    padding: 3,
    borderWidth: 4,
    borderColor: "#0095FF",
    borderRadius: 50,
    marginRight: 10,
  },

  flexColumnBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  flexColumn: {
    flexDirection: "row",
    alignItems: "center"
  }
});