import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selector';

import SearchBar from '../../../components/SearchBar';
import ClassCartCard from '../../../components/ClassCartCard';
import NofiticationCard from '../../../components/NofiticationCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const classDetailDefault = [
  {
    "lecture": {
      "id": "2a95e7fd-010a-4f73-870b-1a0610c7fefa",
      "fullName": "Nguyễn Thị Cẩm Hương",
      "phone": "0321234561",
      "avatarImage": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AWindows_10_Default_Profile_Picture.svg&psig=AOvVaw3bEcVZ2ooW15VA0xUDd4Zd&ust=1700475448858000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCLjfovHqz4IDFQAAAAAdAAAAABAE",
      "email": "huongntc@fe.edu.vn",
      "gender": "Nữ",
      "dateOfBirth": "1986-12-12T00:00:00",
      "address": "Hồ Chí Minh TP.Thủ Ðức 139 Phạm Văn Đồng"
    },
    "schedules": [
      {
        "topic": {
          "topicName": "Tập Hát Cho Bé",
          "orderNumber": 1,
          "session": {
            "content": "Học Hát Bài Bài Lời Chào Buổi Sáng",
            "description": "Học Hát Bài Lời Chào Buổi Sáng"
          }
        },
        "dayOfWeeks": "Tuesday",
        "date": "2023-12-31T00:00:00",
        "slot": {
          "startTime": "16:30:00",
          "endTime": "18:30:00"
        },
        "room": {
          "roomId": "472d7b7a-22ce-4fcb-a436-3ea03fd29d78",
          "name": "301",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "Tập Hát Cho Bé",
          "orderNumber": 1,
          "session": {
            "content": "Học Hát Bài Gà Trống,Mèo Con Và Cún Con",
            "description": "Học Hát Bài Gà Trống ,Mèo Con và Cún Con"
          }
        },
        "dayOfWeeks": "Thursday",
        "date": "2024-01-02T00:00:00",
        "slot": {
          "startTime": "16:30:00",
          "endTime": "18:30:00"
        },
        "room": {
          "roomId": "472d7b7a-22ce-4fcb-a436-3ea03fd29d78",
          "name": "301",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "Tập Hát Cho Bé",
          "orderNumber": 1,
          "session": {
            "content": "Học Hát Bài Ếch Ộp",
            "description": "Học Hát Bài Ếch Ộp"
          }
        },
        "dayOfWeeks": "Saturday",
        "date": "2024-01-04T00:00:00",
        "slot": {
          "startTime": "16:30:00",
          "endTime": "18:30:00"
        },
        "room": {
          "roomId": "472d7b7a-22ce-4fcb-a436-3ea03fd29d78",
          "name": "301",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "Tập Hát Cho Bé",
          "orderNumber": 1,
          "session": {
            "content": "Học Hát Bài Là Mèo Con",
            "description": "Học Hát Bài Là Mèo Con"
          }
        },
        "dayOfWeeks": "Tuesday",
        "date": "2024-01-07T00:00:00",
        "slot": {
          "startTime": "16:30:00",
          "endTime": "18:30:00"
        },
        "room": {
          "roomId": "472d7b7a-22ce-4fcb-a436-3ea03fd29d78",
          "name": "301",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "Tập Hát Cho Bé",
          "orderNumber": 1,
          "session": {
            "content": "Học Hát Bài Con Gà Trống",
            "description": "Học Hát Bài Con Gà Trống "
          }
        },
        "dayOfWeeks": "Thursday",
        "date": "2024-01-09T00:00:00",
        "slot": {
          "startTime": "16:30:00",
          "endTime": "18:30:00"
        },
        "room": {
          "roomId": "472d7b7a-22ce-4fcb-a436-3ea03fd29d78",
          "name": "301",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "Tập Hát Cho Bé",
          "orderNumber": 1,
          "session": {
            "content": "Học Hát Bài Hai Con Thằng Lằn Con",
            "description": "Học Hát Bài Hai Con Thằng Lằn Con"
          }
        },
        "dayOfWeeks": "Saturday",
        "date": "2024-01-11T00:00:00",
        "slot": {
          "startTime": "16:30:00",
          "endTime": "18:30:00"
        },
        "room": {
          "roomId": "472d7b7a-22ce-4fcb-a436-3ea03fd29d78",
          "name": "301",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      }
    ],
    "classId": "e765a5cf-c51d-49d6-a361-17ed89a5923b",
    "name": "Tập Bé Hát 1",
    "classSubject": "SINGING",
    "courseId": "f4f0b221-c583-4ca5-b26a-417889c2f9ad",
    "coursePrice": 200000,
    "startDate": "2023-12-31T00:00:00",
    "endDate": "2024-01-30T00:00:00",
    "address": "  Home",
    "status": "UPCOMING",
    "method": "ONLINE",
    "limitNumberStudent": 30,
    "leastNumberStudent": 1,
    "numberStudentRegistered": 3,
    "image": "img.png",
    "video": "vid.mp4",
    "classCode": "MUC1"
  },
  {
    "lecture": {
      "id": "ca9680a5-729d-4f8b-ba91-0b9c587269a1",
      "fullName": "Đoàn Nguyễn Thành Hòa",
      "phone": "0321245512",
      "avatarImage": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AWindows_10_Default_Profile_Picture.svg&psig=AOvVaw3bEcVZ2ooW15VA0xUDd4Zd&ust=1700475448858000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCLjfovHqz4IDFQAAAAAdAAAAABAE",
      "email": "hoadnt@fe.edu.vn",
      "gender": "Nam",
      "dateOfBirth": "1985-12-12T00:00:00",
      "address": "Hồ Chí Minh TP.Thủ Đức 140 Phạm Văn Đồng"
    },
    "schedules": [
      {
        "topic": {
          "topicName": "Welcome",
          "orderNumber": 1,
          "session": {
            "content": "Listen and Sing.Move",
            "description": "Listen and Sing.Move"
          }
        },
        "dayOfWeeks": "Monday",
        "date": "2023-11-01T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "Welcome",
          "orderNumber": 1,
          "session": {
            "content": "Look and Listen",
            "description": "Look and Listen"
          }
        },
        "dayOfWeeks": "Wednesday",
        "date": "2023-11-03T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "Welcome",
          "orderNumber": 1,
          "session": {
            "content": "Listen and Trace",
            "description": "Listen and Trace"
          }
        },
        "dayOfWeeks": "Friday",
        "date": "2023-11-05T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "Welcome",
          "orderNumber": 1,
          "session": {
            "content": "Sing and Do",
            "description": "Sing and Do"
          }
        },
        "dayOfWeeks": "Monday",
        "date": "2023-11-08T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "My Class",
          "orderNumber": 2,
          "session": {
            "content": "Listen and Sing",
            "description": "Listen and Sing"
          }
        },
        "dayOfWeeks": "Wednesday",
        "date": "2023-11-10T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "My Class",
          "orderNumber": 2,
          "session": {
            "content": "Look and Listen",
            "description": "Look and Listen"
          }
        },
        "dayOfWeeks": "Friday",
        "date": "2023-11-12T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "My Class",
          "orderNumber": 2,
          "session": {
            "content": "Sing and Do",
            "description": "Sing and Do"
          }
        },
        "dayOfWeeks": "Monday",
        "date": "2023-11-15T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "My Class",
          "orderNumber": 2,
          "session": {
            "content": "Listen and Track",
            "description": "Listen and Track"
          }
        },
        "dayOfWeeks": "Wednesday",
        "date": "2023-11-17T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "My Family",
          "orderNumber": 3,
          "session": {
            "content": "Listen and Sing",
            "description": "Listen and Sing"
          }
        },
        "dayOfWeeks": "Friday",
        "date": "2023-11-19T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "My Family",
          "orderNumber": 3,
          "session": {
            "content": "Look and Listen",
            "description": "Look and Listen"
          }
        },
        "dayOfWeeks": "Monday",
        "date": "2023-11-22T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "My Family",
          "orderNumber": 3,
          "session": {
            "content": "Sing and Do",
            "description": "Sing and Do"
          }
        },
        "dayOfWeeks": "Wednesday",
        "date": "2023-11-24T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "My Family",
          "orderNumber": 3,
          "session": {
            "content": "Listen and Track",
            "description": "Listen and Track"
          }
        },
        "dayOfWeeks": "Friday",
        "date": "2023-11-26T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "My Room",
          "orderNumber": 4,
          "session": {
            "content": "Listen and Sing",
            "description": "Listen and Sing"
          }
        },
        "dayOfWeeks": "Monday",
        "date": "2023-11-29T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      },
      {
        "topic": {
          "topicName": "My Room",
          "orderNumber": 4,
          "session": {
            "content": "Look and Listen",
            "description": "Look and Listen"
          }
        },
        "dayOfWeeks": "Wednesday",
        "date": "2023-12-01T00:00:00",
        "slot": {
          "startTime": "07:00:00",
          "endTime": "09:00:00"
        },
        "room": {
          "roomId": "21c2d354-1de5-4b67-950d-326ac832b4eb",
          "name": "GoogleMeet1",
          "floor": 3,
          "status": "AVAILABLE",
          "linkUrl": "NoLink",
          "capacity": 100
        }
      }
    ],
    "classId": "47867b8c-2ac6-48b4-acb4-2b949726f7a3",
    "name": "Tiếng Anh Cơ Bản 1",
    "classSubject": "LANGUAGE",
    "courseId": "06f5a898-e0db-4766-b0af-3340ec5d7b04",
    "coursePrice": 400000,
    "startDate": "2023-11-01T00:00:00",
    "endDate": "2023-12-01T00:00:00",
    "address": "  Home",
    "status": "COMPLETED",
    "method": "ONLINE",
    "limitNumberStudent": 30,
    "leastNumberStudent": 1,
    "numberStudentRegistered": 1,
    "image": "img.png",
    "video": "vid.mp4",
    "classCode": "ENG101"
  },
]

const noficationListDefault = [
  {
    title: "Nhắc nhở điểm danh:",
    message: "Bạn có lớp học TTD1 - Offline, Thứ 5-06/01/2024 vào lúc 19h30 - 21H chưa cập nhập điểm danh. Vui lòng cập nhật điểm danh.",
    time: "1 giờ trước"
  },
  {
    title: "Nhắc nhở chấm bài:",
    message: "Các bé lớp VCB1 - Offline, Thứ 5-06/01/2024 vào lúc 19h30 - 21H đã nộp đủ bài tập rồi. Hãy cùng xem và chấm đánh giá nào.",
    time: "1 giờ trước"
  },
]

export default function HomeScreen({ navigation }) {

  const [searchValue, setSearchValue] = useState("")
  const [classList, setClassList] = useState(classDetailDefault)
  const [noficationList, setNoficationList] = useState(noficationListDefault)
  const [filterVisible, setFilterVisible] = useState(false)
  const [filterValue, setFilterValue] = useState({ type: undefined })
  const user = useSelector(userSelector);

  const handleSearch = (value) => {
    setSearchValue(value)
  }

  const hanldeViewWorkSchedule = (item) => {

  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={{ ...styles.flexBetweenColumn, paddingHorizontal: 20 }}>
            <View style={styles.headerInforLeft}>
              <Text style={{ color: "white" }}>Xin chào!</Text>
              <Text style={{ fontWeight: "700", fontSize: 18, color: "white" }}>GV: {user.fullName}</Text>
            </View>
            <View style={styles.headerInforRight}>
              <View style={styles.flexBetweenColumn}>
                <TouchableOpacity style={styles.iconNavigate}>
                  <Icon name={"bell"} color={"#ffffff"} size={28} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.searchBar}>
            <SearchBar input={searchValue} setInput={handleSearch} setFilterModal={setFilterVisible} placeHolder={"Tìm kiếm khóa học..."} />
          </View>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>Lớp học hôm nay:</Text>
        </View>
        <ScrollView style={styles.classList}>
          {
            classList.map((item, key) => (
              <ClassCartCard cardDetail={item} index={item?.id} check={false} onClick={hanldeViewWorkSchedule} key={key} />
            ))
          }
        </ScrollView>
        <View style={styles.titleView}>
          <Text style={styles.title}>Thông báo:</Text>
        </View>
        <ScrollView style={styles.noficationList}>
          {
            noficationList.map((item, key) => (
              <NofiticationCard notificationDetail={item} onClick={hanldeViewWorkSchedule} key={key} />
            ))
          }
        </ScrollView>
      </ScrollView>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1
    // paddingBottom: 80,
    // marginBottom: 15,
  },
  title: {
    marginVertical: 10,
    marginHorizontal: WIDTH * 0.05,
    color: "#4582E6",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center"
  },
  searchBar: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
    marginTop: 20,
  },
  courseList: {
    flex: 1
  },
  courseListHead: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header: {
    backgroundColor: "#241468",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 20
  },
  headerInforLeft: {
    marginTop: 10,
  },
  iconNavigate: {
    marginHorizontal: 10
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
  classList: {
    maxHeight: HEIGHT * 0.45,
    paddingLeft: WIDTH * 0.05,
  },

  flexColumn: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexBetweenColumn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  boldText: {
    fontWeight: "600",
  },
});