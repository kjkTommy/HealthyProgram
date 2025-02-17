import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WaterChecker from '../../components/WaterChecker/WaterChecker'
import { MenuIcon } from '../../components/MenuIcon/MenuIcon'
import TodoList from '../../components/TodoList/TodoList'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProfileModal from '../../components/ProfileModule/ProfileModule'
import HabitsTracker from '../../components/HabitsTracker/HabitsTracker'

const STORAGE_KEY = 'USER_PROFILE'

const MainPage = () => {
    const [open, setOpen] = useState(false)
    const [textValue, setTextValue] = useState({
        name: '',
        weight: '',
        size: '',
    })

    useEffect(() => {
        const loadData = async () => {
            try {
                const storedData = await AsyncStorage.getItem(STORAGE_KEY)
                if (storedData) setTextValue(JSON.parse(storedData))
            } catch (error) {
                console.error('Ошибка загрузки данных:', error)
            }
        }
        loadData()
    }, [])

    const handleSaveTextInput = useCallback(async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(textValue))
            setOpen(false)
            console.log(
                `Имя: ${textValue.name}, Вес: ${textValue.weight}, Рост: ${textValue.size}`
            )
        } catch (error) {
            console.error('Ошибка сохранения данных:', error)
        }
    }, [textValue])

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <MenuIcon open={open} setOpen={setOpen} />
                <ProfileModal
                    open={open}
                    setOpen={setOpen}
                    textValue={textValue}
                    setTextValue={setTextValue}
                    onSave={handleSaveTextInput}
                />
            </View>
            <HabitsTracker />
            <Text style={styles.text}>Отслеживание выпитой воды</Text>
            <WaterChecker
                weight={parseInt(textValue.weight) || 0}
                size={parseInt(textValue.size) || 0}
            />
            <TodoList />
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        position: 'relative',
        top: 30,
        right: -178,
    },
    text: {
        fontSize: 20,
        fontWeight: 600,
        marginTop: 12,
        paddingLeft: 14,
        width: '100%',
    },
})

export default MainPage
