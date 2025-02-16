import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons'
import { DayOfTheWeekProps } from '../../types'
import ProgressBar from '../ProgressBar/ProgressBar'
import ModalHabits from '../ModalHabits/ModalHabits'

const daysOfTheWeek: DayOfTheWeekProps[] = [
    { name: 'Пн', id: 1, isCompleted: false },
    { name: 'Вт', id: 2, isCompleted: false },
    { name: 'Ср', id: 3, isCompleted: false },
    { name: 'Чт', id: 4, isCompleted: false },
    { name: 'Пт', id: 5, isCompleted: false },
    { name: 'Сб', id: 6, isCompleted: false },
    { name: 'Вс', id: 7, isCompleted: false },
]

const HabitsTracker = () => {
    const [weekDays, setWeekDays] = useState(daysOfTheWeek)
    const [open, setOpen] = useState(false)

    const handleChangeStatus = (id: number) => {
        setWeekDays((prevDays) =>
            prevDays.map((day) => (day.id === id ? { ...day, isCompleted: !day.isCompleted } : day))
        )
    }

    return (
        <View style={styles.mainContainer}>
            <TouchableWithoutFeedback
                onPress={() => {
                    setOpen((prevState) => !prevState)
                }}
            >
                <View style={styles.containerHabit}>
                    <FontAwesome5 name="plus" size={40} color="white" />
                    <Text style={{ color: '#FFFFFF' }}>привычек нет</Text>
                    <ModalHabits open={open} setOpen={setOpen} />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.containerColumn}>
                <View style={styles.statusHabit}>
                    <ProgressBar progress={100} />
                </View>
                <View style={styles.weekDaysContainer}>
                    {weekDays.map((day) => (
                        <TouchableWithoutFeedback
                            key={day.id}
                            onPress={() => handleChangeStatus(day.id)}
                        >
                            <View style={styles.weekDaysChecker}>
                                <Ionicons
                                    name="checkmark-circle"
                                    size={26}
                                    color={day.isCompleted ? '#FA3E6E' : '#000000'}
                                />
                                <Text style={{ color: '#FFFFFF', fontSize: 14, marginTop: 2 }}>
                                    {day.name}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weekDaysChecker: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
    },
    mainContainer: {
        width: '94%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#000000',
        padding: 16,
        borderRadius: 12,
        marginTop: 30,
        gap: 8,
    },
    statusHabit: {},
    containerHabit: {
        width: '28%',
        backgroundColor: '#171414',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 22,
        justifyContent: 'space-around',
        borderRadius: 12,
    },
    containerColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    weekDaysContainer: {
        width: '100%',
        backgroundColor: '#171414',
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
})

export default HabitsTracker
