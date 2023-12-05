import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default function HomeScreen({ navigation }) {
  return (
    <View>
      <View style={styles.flexColumn}>
        <Text style={styles.title}>
          Các khóa Học
        </Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate("CourseScreen") }}
        >
          <Text style={styles.viewAll}>
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexColumn: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3A0CA3",
  },
  viewAll: {
    color: "#3A0CA3",
  }
});