import { View, Text, Image, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../components/header/Header';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import unhappyIcon from "../../../assets/rateIcon/unhapppyIcon.png"
import happyIcon from "../../../assets/rateIcon/happyIcon.png"
import ContentedIcon from "../../../assets/rateIcon/ContentedIcon.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const studentListDefault = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    note: "Học Bù",
    rate: "bad"
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    rate: "neutral"
  },
  {
    id: 3,
    name: "Nguyễn Văn A",
    rate: "happy"
  },
  {
    id: 4,
    name: "Nguyễn Văn C",
    note: "Học Bù",
    rate: "happy"
  },
  {
    id: 5,
    name: "Nguyễn Văn B",
    rate: "happy"
  },
  {
    id: 6,
    name: "Nguyễn Văn D",
    rate: "happy"
  },
  {
    id: 7,
    name: "Nguyễn Văn A",
    note: "Học Bù",
    rate: "happy"
  },
  {
    id: 8,
    name: "Nguyễn Văn D",
    rate: "happy"
  },
  {
    id: 9,
    name: "Nguyễn Văn E",
    rate: "happy"
  },
  {
    id: 10,
    name: "Nguyễn Văn F",
    note: "Dự thính",
    rate: "happy"
  },
  {
    id: 11,
    name: "Nguyễn Văn A",
    rate: "happy"
  },
]

export default function AttendanceScreen({ route, navigation }) {
  const classDetail = route.params.classDetail
  const [studentList, setStudentList] = useState(JSON.parse(JSON.stringify(studentListDefault)))
  const [studentTmpList, setStudentTmpList] = useState(JSON.parse(JSON.stringify(studentListDefault)))
  const [searchValue, setSearchValue] = useState("")
  const [editMode, setEditMode] = useState(false)

  const handleClearAttend = () => {
    const updateArray = [...studentList]
    updateArray.forEach(item => item.status = false)
    setStudentList(updateArray)
  }

  const getAttendList = () => {
    const attendList = studentList.filter(obj => obj.status === true);
    return attendList
  }

  const changeRate = (id, rate) => {
    if (editMode) {
      const index = studentTmpList.findIndex(obj => obj.id === id);
      const updateArray = JSON.parse(JSON.stringify(studentTmpList))
      updateArray[index].rate = rate;
      setStudentTmpList(updateArray)
    }
  }

  const handleCompleteEditing = () => {
    setStudentList(JSON.parse(JSON.stringify(studentTmpList)))
    setEditMode(false)
  }

  const handleClearEditing = () => {
    setStudentTmpList(JSON.parse(JSON.stringify(studentList)))
    setEditMode(false)
  }

  const handleSetEditing = () => {
    setStudentTmpList(JSON.parse(JSON.stringify(studentList)))
    setEditMode(true)
  }

  return (
    <>
      <Header navigation={navigation} title={classDetail.title} goback={() => navigation.pop()} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Danh sách lớp:</Text>
        </View>
        <View style={styles.searchBar}>
          <Icon name={"search-web"} color={"#908484"} size={28} />
          <TextInput value={searchValue} onChangeText={setSearchValue} style={styles.searchField} placeholder={"Tìm kiếm học viên..."} placeholderTextColor="#B8B8D2" />
        </View>
        <View style={styles.studentList}>
          <View style={{ ...styles.tableColumn, backgroundColor: "#2414686B" }}>
            <Text style={styles.columnNumber}>STT</Text>
            <Text style={styles.columnName}>Tên học viên</Text>
            <Text style={styles.columnStatus}>Trạng thái</Text>
            <Text style={styles.columnNote}>Ghi chú</Text>
          </View>
          {
            (editMode ? studentTmpList : studentList).map((item, index) => {
              return (
                <TouchableOpacity
                  // onPress={() => handleCheckAttend(item.id)}
                  style={{ ...styles.tableColumn, borderBottomWidth: 1 }}
                  key={index}>
                  <View style={styles.columnNumber}>
                    <Text style={{ ...styles.boldText, marginHorizontal: 10, marginRight: 2 }}>{index + 1}</Text>
                    <Icon name={"account-circle"} color={"#908484"} size={WIDTH * 0.13} />
                  </View>
                  <Text style={styles.columnName}>{item?.name}</Text>
                  <View style={styles.columnStatus}>
                    <TouchableOpacity onPress={() => changeRate(item.id, "bad")} style={{ marginRight: 10 }}>
                      {
                        item.rate === "bad" ?
                          <Icon name={"emoticon-sad-outline"} color={"#F86565"} size={25} />
                          :
                          <Icon name={"emoticon-sad-outline"} color={"#B6C8E2"} size={25} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRate(item.id, "neutral")} style={{ marginRight: 10 }}>
                      {
                        item.rate === "neutral" ?
                          <Icon name={"emoticon-neutral-outline"} color={"#7B61FF"} size={25} />
                          :
                          <Icon name={"emoticon-neutral-outline"} color={"#B6C8E2"} size={25} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRate(item.id, "happy")}>
                      {
                        item.rate === "happy" ?
                          <Icon name={"emoticon-happy-outline"} color={"#229A89"} size={25} />
                          :
                          <Icon name={"emoticon-happy-outline"} color={"#B6C8E2"} size={25} />
                      }
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.columnNote}>{item.note}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        {
          editMode &&
          <View style={styles.buttonPack}>
            <TouchableOpacity style={{ ...styles.buttonView, backgroundColor: "#DC4646" }} onPress={handleClearEditing}>
              <Text style={{ ...styles.boldText, width: "100%", color: "white" }}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.buttonView, backgroundColor: "#241468" }} onPress={handleCompleteEditing}>
              <Text style={{ ...styles.boldText, width: "100%", color: "white" }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        }
        {
          !editMode &&
          <TouchableOpacity style={{ ...styles.editButton, bottom: editMode ? HEIGHT * 0.15 : HEIGHT * 0.05 }} onPress={handleSetEditing}>
            <Icon name={"lead-pencil"} color={"white"} size={28} />
          </TouchableOpacity>
        }
        <View style={{ height: 40 }} />
      </ScrollView>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: 'white',
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
  tableColumn: {
    flexDirection: "row",
    width: WIDTH,
    minHeight: 80,
    alignItems: "center",
  },
  columnNumber: {
    flexDirection: "row",
    width: "25%",
    paddingLeft: 20,
    alignItems: "center",
  },
  columnName: {
    width: "25%",
    paddingLeft: 5
  },
  columnStatus: {
    flexDirection: "row",
    width: "25%",
    paddingLeft: 5,
    alignItems: "center",
    marginRight: 10,
  },
  columnNote: {
    width: "25%",
    paddingLeft: 5
  },
  checkIcon: {
    padding: 2,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: "#BFE3C6"
  },
  boldText: {
    width: "20%",
    fontWeight: "600"
  },
  buttonPack: {
    flexDirection: "row",
    marginVertical: 50,
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonView: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#241468",
    borderRadius: 10
  },
  editButton: {
    position: "absolute",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#4582E6",
    right: WIDTH * 0.05,
    bottom: HEIGHT * 0.05
  },

  searchBar: {
    width: WIDTH * 0.8,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingRight: 25,
    borderWidth: 1,
    borderColor: "#000000",
    marginHorizontal: WIDTH * 0.1,
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: "row",
    alignItems: "center",
  },
  searchField: {
    width: "85%",
    paddingLeft: 10,
    marginVertical: 15,
    color: "#B8B8D2"
  }
})