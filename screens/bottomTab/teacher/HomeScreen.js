import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selector';

import SearchBar from '../../../components/SearchBar';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default function HomeScreen({ navigation }) {

  const [searchValue, setSearchValue] = useState("")
  const [filterVisible, setFilterVisible] = useState(false)
  const [filterValue, setFilterValue] = useState({ type: undefined })
  const user = useSelector(userSelector);

  const handleSearch = (value) => {
    setSearchValue(value)
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