import React, { useState, useEffect, useCallback } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateDaysArray } from '../../utils/updateDaysArray'
import ProgressBar from '../ProgressBar/ProgressBar'
import ModalHabits from '../ModalHabits/ModalHabits'
import { DayOfTheWeekProps } from '../../types'
import { conversionDateToNumber } from '../../utils/conversionDateToNumber'

const STORAGE_KEY = 'HABIT_NAME'
const STORAGE_KEY_DATE = 'HABIT_DATE'

const HabitsTracker = () => {
    const [habitName, setHabitName] = useState<string>('')
    const [date, setDate] = useState<Date>(new Date())
    const [weekDays, setWeekDays] = useState<DayOfTheWeekProps[][]>([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            try {
                const storedName = await AsyncStorage.getItem(STORAGE_KEY)
                const storedDate = await AsyncStorage.getItem(STORAGE_KEY_DATE)

                if (storedName) setHabitName(JSON.parse(storedName))
                if (storedDate) setDate(new Date(JSON.parse(storedDate)))
            } catch (error) {
                console.error('Ошибка загрузки данных:', error)
            }
        }

        loadData()
    }, [])

    const totalDate = conversionDateToNumber(date)

    useEffect(() => {
        const daysArray = updateDaysArray(totalDate)
        setWeekDays(daysArray)
    }, [totalDate])

    const handleSaveHabit = useCallback(async () => {
        try {
            await AsyncStorage.multiSet([
                [STORAGE_KEY, JSON.stringify(habitName)],
                [STORAGE_KEY_DATE, JSON.stringify(date)],
            ])
            setOpen(false)
        } catch (error) {
            console.error('Ошибка сохранения данных:', error)
        }
    }, [habitName, date])

    const handleChangeStatus = (id: number) => {
        setWeekDays((prevDays) =>
            prevDays.map((weekDayArray) =>
                weekDayArray.map((day) =>
                    day.id === id
                        ? { ...day, isCompleted: !day.isCompleted }
                        : day
                )
            )
        )
    }

    const completedDays = weekDays
        .flat()
        .filter((day) => day.isCompleted).length

    return (
        <View style={styles.mainContainer}>
            <TouchableWithoutFeedback onPress={() => setOpen(true)}>
                <View style={styles.containerHabit}>
                    <FontAwesome6 name="fire" size={76} color="#FA3E6E" />
                    <Text style={styles.habitNameText}>{habitName}</Text>
                    <ModalHabits
                        date={date}
                        setDate={setDate}
                        open={open}
                        setOpen={setOpen}
                        habitName={habitName}
                        setHabitName={setHabitName}
                        onSave={handleSaveHabit}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.containerColumn}>
                <View>
                    <ProgressBar
                        totalDate={totalDate}
                        completedDays={completedDays}
                    />
                    <Text style={styles.textUnderProgress}>
                        {completedDays} / из {totalDate} дней
                    </Text>
                </View>
                <FlatList
                    data={weekDays.flat()}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.flatListWeek}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onPress={() => handleChangeStatus(item.id)}
                        >
                            <View style={styles.dayItem}>
                                <Ionicons
                                    name="checkmark-circle"
                                    size={26}
                                    color={
                                        item.isCompleted ? '#FA3E6E' : '#000000'
                                    }
                                />
                                <Text style={styles.dayText}>{item.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flatListWeek: {
        width: 240,
    },
    habitNameText: {
        textAlign: 'center',
        fontWeight: '600',
        color: '#FFFFFF',
        fontSize: 20,
    },
    textUnderProgress: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 8,
        paddingLeft: 2,
    },
    mainContainer: {
        width: '94%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#000000',
        padding: 16,
        borderRadius: 12,
        marginTop: 30,
        gap: 8,
    },
    containerHabit: {
        width: '32%',
        backgroundColor: '#171414',
        alignItems: 'center',
        paddingVertical: 22,
        justifyContent: 'space-around',
        borderRadius: 12,
    },
    containerColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    dayItem: {
        alignItems: 'center',
        marginHorizontal: 4,
    },
    dayText: {
        color: '#FFFFFF',
        fontSize: 14,
        marginTop: 2,
    },
})
export default HabitsTracker
