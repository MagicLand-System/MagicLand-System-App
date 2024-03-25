import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StudentView from '../../../components/StudentView';
import { CalendarProvider, Calendar, WeekCalendar, Agenda, LocaleConfig } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { studentSelector, userSelector } from '../../../store/selector';
import Header from '../../../components/header/Header';
import { formatDefaultSelectedDate } from '../../../util/util';
import { getStudents, getschedule } from '../../../api/student';

import SpinnerLoading from "../../../components/SpinnerLoading"
import ClassCartCard from '../../../components/ClassCartCard';
import { useFocusEffect } from '@react-navigation/native';
import DateItem from '../../../components/DateItem';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ScheduleScreen({ navigation }) {

  const [studentList, setStudentList] = useState([])
  const [scheduleList, setScheduleList] = useState([])
  const [loading, setLoading] = useState(true)
  const [calendarLoading, setCalendarLoading] = useState(false)
  const [dateSelected, setDateSelected] = useState(formatDefaultSelectedDate(new Date));
  const [calendarType, setCalendarType] = useState("month")

  const user = useSelector(userSelector);
  const student = useSelector(studentSelector);

  LocaleConfig.locales['fr'] = {
    // 'Tháng 1','Tháng 2','Tháng 3','Tháng 5','Tháng 7','Tháng 9','Tháng 11','Tháng 12'
    monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 5', 'Tháng 7', 'Tháng 9', 'Tháng 11', 'Tháng 12'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';

  useEffect(() => {
    loadStudentData()
  }, [user])

  useFocusEffect(
    React.useCallback(() => {
      loadStudentData()
    }, [])
  );

  const loadStudentData = async () => {
    setLoading(true)
    const studentList = (await getStudents()).map((item, i) => ({ ...item, check: i === 0 ? true : false }));
    if (studentList.length !== 0) {
      const scheduleData = await loadScheduleData(studentList[0].id)
      setScheduleList(scheduleData)
    }
    setStudentList(studentList?.filter(item => item?.isActive)?.reverse())
    setLoading(false)
  }

  const loadScheduleData = async (id) => {
    let updateStudentList = [...studentList]
    const index = studentList.findIndex(obj => obj.id === id);
    if (!updateStudentList[index]?.schedule) {
      const response = await getschedule(id);
      if (response.status === 200) {
        return response.data
      } else {
        console.log("Tải thông tin lớp học thất bại");
        return []
      }
    }
    return undefined
  }

  const handleClassNavigate = (classDetail) => {
    const student = studentList?.find(student => student.check === true)
    navigation.push("ClassStudyDetailScreen", { classDetail: classDetail, student: student })
  }

  const hanldeAddStudent = () => {
    navigation.push("AddStudent")
  }

  const selectStudent = async (id) => {
    setStudentList((prevStudentList) => {
      const index = prevStudentList.findIndex(obj => obj.id === id);
      return prevStudentList.map((item, i) => ({
        ...item,
        check: i === index ? true : false,
      }));
    });
    setCalendarLoading(true)
    const scheduleData = await loadScheduleData(id)
    setCalendarLoading(false)
    setScheduleList(scheduleData)
  };

  const getCurrentDate = (date) => {
    const currentDate = scheduleList?.filter(item => item.date.substring(0, 10) === date?.dateString)
    return currentDate
  }

  const selectedDate = (date) => {
    setDateSelected(date?.split("T")[0])
    setCalendarType("day")
  }

  function formatScheduleDate(inputDate) {
    const daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const months = [
      'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
      'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'
    ];

    const date = new Date(inputDate);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ngày ${dayOfMonth} ${month} năm ${year}`;
  }

  const formatDataAgenda = () => {
    const formattedAgendaData = {};

    scheduleList.forEach(item => {
      const agendaDate = item.date.split("T")[0];
      if (!formattedAgendaData[agendaDate]) {
        formattedAgendaData[agendaDate] = [];
      }
      formattedAgendaData[agendaDate].push(item);
    });
    return formattedAgendaData
  }

  const renderAttendanceStatus = (attendanceStatus) => {
    // switch (attendanceStatus) {
    //   case value:

    //     break;

    //   default:
    //     break;
    // }
    return (
      <Text style={{
        textTransform: "capitalize",
        color: "#888",
      }}>   {attendanceStatus}</Text>
    );
  };

  return (
    <>
      <Header navigation={navigation} title={"Lịch Học"} goback={navigation.goBack} />
      <SafeAreaView style={styles.container}>
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
            <TouchableOpacity style={styles.studentImage} onPress={hanldeAddStudent}>
              <Icon name={"account-plus"} color={"#5A5A5A"} size={30} />
            </TouchableOpacity>
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

        <View style={styles.calendarView}>
          <View style={{ ...styles.flexColumnBetween, marginVertical: 5 }}>
            <Text style={{ ...styles.boldText, fontSize: 10 }}>{formatScheduleDate(dateSelected)}</Text>
            <View style={{ ...styles.flexColumn, borderWidth: 1, borderRadius: 10, overflow: "hidden" }}>
              <TouchableOpacity style={{ ...styles.changeTypeButton, backgroundColor: calendarType === "month" ? "#241468" : "white" }} onPress={() => { setCalendarType("month") }}>
                <Text style={{ ...styles.boldText, fontSize: 10, color: calendarType === "month" ? "white" : "#888888" }}>Tháng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.changeTypeButton, borderRightWidth: 0, backgroundColor: calendarType === "day" ? "#241468" : "white" }} onPress={() => { setCalendarType("day") }}>
                <Text style={{ ...styles.boldText, fontSize: 10, color: calendarType === "day" ? "white" : "#888888" }}>Ngày</Text>
              </TouchableOpacity>
            </View>
          </View>


          {
            !calendarLoading &&
            <>
              {
                calendarType === "month" &&
                <>
                  <Agenda
                    onDayPress={(date) => { selectedDate(date?.dateString) }}
                    selected={dateSelected}
                    items={
                      formatDataAgenda()
                    }
                    renderItem={(item) => (
                      <TouchableOpacity style={styles.item} onPress={() => { selectedDate(item?.date); }}>
                        <Text style={{ ...styles.boldText }}>{item?.startTime} - {item?.endTime}</Text>
                        <Text style={{ ...styles.boldText }}>{item?.className} - <Text style={{ textTransform: "capitalize" }}> {item?.method} </Text> {renderAttendanceStatus(item?.attendanceStatus)} </Text>
                        <Text style={{ ...styles.itemText }}>Phòng {item?.roomName}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <View style={styles.noteView}>
                    <View style={{ ...styles.noteHaft, backgroundColor: "#F6F2E5" }}>
                      <Text style={styles.noteTitle}>Ngày nghỉ</Text>
                      <View style={styles.flexColumn}>
                        <Text style={{ ...styles.boldText, color: "#EAB756", marginRight: 10 }}>1/1</Text>
                        <Text >Tết Tây</Text>
                      </View>
                    </View>
                    <View style={{ ...styles.noteHaft, backgroundColor: "#F4F4F4" }}>
                      <Text style={styles.noteTitle}>Chú thích</Text>
                      <View style={styles.flexColumn}>
                        <View style={{ ...styles.exampleView, backgroundColor: "#52ACFF80" }} />
                        <Text >Sáng</Text>
                      </View>
                      <View style={styles.flexColumn}>
                        <View style={{ ...styles.exampleView, backgroundColor: "#FF95CE80" }} />
                        <Text >Chiều</Text>
                      </View>
                      <View style={styles.flexColumn}>
                        <View style={{ ...styles.exampleView, backgroundColor: "#92C88D80" }} />
                        <Text >Tối</Text>
                      </View>
                    </View>
                  </View>
                </>
              }
              {
                calendarType === "day" &&
                <ScrollView showsVerticalScrollIndicator={false}>
                  {
                    getCurrentDate({ dateString: dateSelected }).map((item, index) => {
                      return (
                        <ClassCartCard cardDetail={item} timeType={"onDate"} priceHidden={true} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"#C8A9F1"} key={index} />
                      )
                    })
                  }
                </ScrollView>
              }
            </>
          }
        </View>

      </SafeAreaView>

    </>
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
    borderLeftColor: "#4582E6",
    marginVertical: HEIGHT * 0.01,
    alignItems: "center"
  },
  title: {
    marginLeft: 5,
    color: "#4582E6",
    fontWeight: "600",
    fontSize: 18,
  },
  studentList: {
    // maxHeight: HEIGHT * 0.2,
    // padding: 20,
    paddingLeft: 20,
  },
  studentView: {
    // width: WIDTH * 0.7,
    // maxHeight: HEIGHT * 0.15,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  studentImage: {
    position: "relative",
    width: WIDTH * 0.15,
    height: WIDTH * 0.15,
    borderWidth: 3,
    borderRadius: 150,
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
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    marginRight: 2,
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
  },
  boldText: {
    fontWeight: "600"
  },

  calendarView: {
    width: WIDTH * 0.95,
    height: HEIGHT * 0.6,
    padding: 5,
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 15,
    marginHorizontal: WIDTH * 0.025
  },
  changeTypeButton: {
    padding: 10,
    borderRightWidth: 1
  },
  classWeekCard: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFCAE7",
    marginVertical: 5,
  },
  noteView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  noteHaft: {
    width: "49%",
    height: "100%",
    padding: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
  },
  exampleView: {
    width: 7,
    height: 7,
    borderRadius: 15,
    marginRight: 10
  },

  item: {
    backgroundColor: 'rgb(197,217,254)',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  }
});
