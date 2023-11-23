import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, ListItem, Icon } from '@rneui/themed';

export default function StudentMenuScreen() {
    const route = useRoute();
    const student = route?.params.student
    const [expandedClass, setExpandedClass] = useState(false);
    const [expandedEvent, setExpandedEvent] = useState(false);
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.student}>
                <Avatar size={60} rounded source={{ uri: student.avatarImage }} />
                <View style={{ marginLeft: 16 }}>
                    <Text style={styles.studentName}>{student.fullName}</Text>
                </View>
            </View>
            <ListItem>
                <Icon name='calendar' type='antdesign' />
                <ListItem.Content>
                    <ListItem.Title>Lịch học</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem.Accordion
                content={
                    <>
                        <Icon name='book' type='antdesign' style={{ marginRight: 15 }} />
                        <ListItem.Content>
                            <ListItem.Title>Lớp học</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expandedClass}
                onPress={() => {
                    setExpandedClass(!expandedClass);
                }}
            >
                <ListItem onPress={() => navigation.navigate('StudentClass', { student, status: 'upcoming' })} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Sắp tới</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem onPress={() => navigation.navigate('StudentClass', { student, status: 'on-going' })} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Đang diễn ra</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem onPress={() => navigation.navigate('StudentClass', { student, status: 'completed' })} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Đã hoàn thành</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </ListItem.Accordion>
            <ListItem.Accordion
                content={
                    <>
                        <Icon name='star' type='antdesign' style={{ marginRight: 15 }} />
                        <ListItem.Content>
                            <ListItem.Title>Sự kiện</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expandedEvent}
                onPress={() => {
                    setExpandedEvent(!expandedEvent);
                }}
            >
                <ListItem onPress={() => console.log("1")} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Sắp tới</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem onPress={() => console.log("2")} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Đang tiến hành</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem onPress={() => console.log("3")} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Đã hoàn thành</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </ListItem.Accordion>
            <ListItem>
                <Icon name='user' type='antdesign' />
                <ListItem.Content>
                    <ListItem.Title>Thông tin học viên</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </View>
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
        marginTop: 100,
    },
    student: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 15,
        marginTop: 10,
        alignItems: 'center',
    },
    studentName: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
    },
})