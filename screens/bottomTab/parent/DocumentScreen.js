import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import StudentView from '../../../components/StudentView';
import { getClassesByStudentId, getStudents, getschedule } from '../../../api/student';
import ClassCartCard from '../../../components/ClassCartCard';
import { useFocusEffect } from '@react-navigation/native';
import { studentSelector, userSelector } from '../../../store/selector';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerLoading from '../../../components/SpinnerLoading';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function DocumentScreen({ navigation }) {

  const student = useSelector(studentSelector)
  const [studentList, setStudentList] = useState([])
  const [classList, setClassList] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingClassList, setLoadingClassList] = useState(true)
  const [type, setType] = useState("PROGRESSING")
  const [animation] = useState(new Animated.Value(0));

  useFocusEffect(
    React.useCallback(() => {
      loadStudentData()
      console.log(student.length);
    }, [])
  );

  useEffect(() => {
    switch (type) {
      case "UPCOMING":
        animateBorder(0); // Set the width to 0 when "UPCOMING"
        break;
      case "PROGRESSING":
        animateBorder(1); // Set the width to 1 when "PROGRESSING"
        break;
      case "COMPLETED":
        animateBorder(2); // Set the width to 2 when "COMPLETED"
        break;
      default:
        break;
    }
  }, [type]);

  const animateBorder = (toValue) => {
    Animated.spring(animation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
      overshootClamping: true
    }).start();
  };

  const interpolatedValue = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-WIDTH * 0.041, WIDTH * 0.27, WIDTH * 0.586],
  });

  const animatedStyle = {
    transform: [{ translateX: interpolatedValue }],
  };

  const loadStudentData = async () => {
    setLoading(true);
    // const studentListTmp = student.map((item, i) => ({ ...item, check: i === 0 ? true : false }));
    const studentListTmp = (await getStudents()).map((item, i) => ({ ...item, check: i === 0 ? true : false }));
    if (studentListTmp?.length !== 0) {
      const scheduleData = await loadClassData(studentListTmp[0].id);
      setClassList(scheduleData);
    }

    setStudentList(studentListTmp?.filter(item => item?.isActive));
    setLoading(false);
  };

  const loadClassData = async (id) => {
    setLoadingClassList(true)
    let updateStudentList = [...studentList]
    const index = studentList.findIndex(obj => obj.id === id);
    if (!updateStudentList[index]?.schedule) {
      const response = await getClassesByStudentId(id);
      if (response.status === 200) {
        setLoadingClassList(false)
        return response.data
      } else {
        console.log("Tải thông tin lớp học thất bại : ", response.response.data);
        setLoadingClassList(false)
        return []
      }
    }
    setLoadingClassList(false)
    return undefined
  }

  const selectStudent = async (id) => {
    setStudentList((prevStudentList) => {
      const index = prevStudentList.findIndex(obj => obj.id === id);
      return prevStudentList.map((item, i) => ({
        ...item,
        check: i === index ? true : false,
      }));
    });
    const scheduleData = await loadClassData(id)
    setClassList(scheduleData)
  };


  const handleClassNavigate = (classDetail) => {
    const student = studentList?.find(student => student.check === true)
    navigation.push("ClassDetailScreen", { classDetail: classDetail, student: student })
  }

  const hanldeAddStudent = () => {
    navigation.push("AddStudent")
  }

  const getClassList = () => {
    const updateArray = studentList?.filter(item => item.check === true)
    if (!updateArray[0]) {
      selectStudent(studentList[0].id)
      return studentList[0].schedule
    }
    return updateArray[0] ? updateArray[0].schedule ? updateArray[0].schedule : [] : []
  }

  const filterClassList = (array) => {
    const updateArray = array?.filter(item => item.status === type)
    return updateArray ? updateArray : []
  }

  const renderClassCard = (type, item, index) => {
    switch (type) {
      case "UPCOMING":
        return (
          <ClassCartCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"#C8A9F1"} key={index} />
        )
      case "PROGRESSING":
        return (
          <ClassCartCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"#FACE9B"} key={index} />
        )

      case "COMPLETED":
        return (
          <ClassCartCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"#BFE3C6"} key={index} />
        )

      default:
        return (
          <ClassCartCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"white"} key={index} />
        )
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Danh sách các cháu:</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.studentList}>
        {
          // !loading &&
          studentList?.map((item, index) => {
            return (
              <StudentView student={item} index={index} key={index} onClick={selectStudent} />
            )
          })
        }
        <View style={styles.studentView}>
          <TouchableOpacity style={styles.studentImage} onPress={hanldeAddStudent}>
            <Icon name={"account-plus"} color={"#5A5A5A"} size={50} />
          </TouchableOpacity>
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
        <View style={{ ...styles.flexColumnAround, position: "relative", transform: [{ translateY: 4.5 }], zIndex: 100 }}>
          <Animated.View style={[
            styles.buttonBorderContainer,
            animatedStyle,
          ]} >
            <View style={[styles.buttonBorder,
            {
              borderColor: type === "UPCOMING" ?
                "#C8A9F1"
                :
                type === "PROGRESSING" ?
                  "#FACE9B"
                  :
                  "#BFE3C6",
              borderBottomWidth: 0
            }]} />
          </Animated.View>
          <TouchableOpacity
            onPress={() => setType("UPCOMING")}
            style={{ ...styles.typeButton, backgroundColor: "#C8A9F1" }}
          >
            <Text style={{ ...styles.typeText, color: "#250056" }}>
              Sắp bắt đầu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType("PROGRESSING")}
            style={{ ...styles.typeButton, backgroundColor: "#FACE9B" }}
          >
            <Text style={{ ...styles.typeText, color: "#9A5E03" }}>
              Đang Học
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType("COMPLETED")}
            style={{ ...styles.typeButton, backgroundColor: "#BFE3C6" }}
          >
            <Text style={{ ...styles.typeText, color: "#286A2F" }}>
              Hoàn Thành
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            ...styles.classItemList,
            borderColor: type === "UPCOMING" ?
              "#C8A9F1"
              :
              type === "PROGRESSING" ?
                "#FACE9B"
                :
                "#BFE3C6",
            borderTopLeftRadius: type !== "UPCOMING" ? 10 : 0,
            borderTopRightRadius: type !== "COMPLETED" ? 10 : 0,
          }}
        >
          {/* getClassList() */}
          {
            !loading && !loadingClassList ?
              filterClassList(classList)[0] ?
                filterClassList(classList)?.map((item, index) => {
                  return (
                    renderClassCard(type, item, index)
                  )
                })
                :
                <Text style={{ fontWeight: 600, textAlign: "center" }}>Bé chưa đăng ký khóa học</Text>
              :
              <SpinnerLoading />
          }
        </ScrollView>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>Các sự kiện đã tham gia:</Text>
      </View>
    </ScrollView >
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
    marginVertical: 15,
    alignItems: "center"
  },
  title: {
    marginLeft: 5,
    color: "#4582E6",
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
  classList: {
    paddingHorizontal: WIDTH * 0.03,
  },
  typeButton: {
    width: "30%",
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
    zIndex: 101
  },
  buttonBorderContainer: {
    position: "absolute",
    width: WIDTH * 0.95,
    height: "150%",

    marginHorizontal: WIDTH * 0.025,
    justifyContent: "center",
    borderBottomColor: "white",
    // backgroundColor: "blue",
    zIndex: 100,
  },
  buttonBorder: {
    width: "33%",
    height: "100%",
    borderWidth: 1.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomColor: "white",
    backgroundColor: "white",
    // transform: [{ translateX: -5 }],
  },
  typeText: {
    textAlign: "center",
  },
  classItemList: {
    maxHeight: HEIGHT * 0.42,
    padding: 10,
    // paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    // justifyContent: "center",
    // alignItems: "center",
    zIndex: 99,
    // borderTopWidth: 0,
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
    // borderWidth: 1,
  }
});