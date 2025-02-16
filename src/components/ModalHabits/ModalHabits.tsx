import React, { useState } from 'react'
import {
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import { ModalHabitsProps } from '../../types'
import AntDesign from '@expo/vector-icons/AntDesign'

const ModalHabits = ({ open, setOpen }: ModalHabitsProps) => {
    const [date, setDate] = useState(new Date())
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [habitName, setHabitName] = useState<string>('')

    const handleDateChange = (newDate: Date) => {
        setDate(newDate)
        setDatePickerOpen(false)
    }

    const handleInputChange = (text: string) => {
        setHabitName(text)
    }

    return (
        <Modal
            animationType="fade"
            transparent
            visible={open}
            onRequestClose={() => setOpen(false)}
        >
            <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.headerModal}>
                            <Text style={styles.modalText}>Выберите цель</Text>
                            <TouchableOpacity onPress={() => setOpen(false)}>
                                <AntDesign name="close" size={28} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.habitContainer}>
                            <TextInput
                                placeholder="Название привычки"
                                placeholderTextColor="#A5A7A8"
                                value={habitName}
                                onChangeText={handleInputChange}
                            />
                            <TouchableOpacity onPress={() => setDatePickerOpen(true)}>
                                <Text style={styles.inputText}>{date.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                           
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    habitContainer: {},
    buttonSave: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '600',
        backgroundColor: '#66C3F4',
        paddingVertical: 12,
        paddingHorizontal: 26,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    headerModal: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1C1Cf2',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 8,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
    },
    inputText: {
        flexWrap: 'wrap',
        width: 240,
        fontSize: 16,
        paddingVertical: 12,
        paddingLeft: 12,
        marginVertical: 8,
        backgroundColor: 'white',
        shadowOpacity: 0.08,
        borderRadius: 12,
        elevation: 5,
        shadowOffset: { width: 0, height: 20 },
        shadowRadius: 10,
    },
    containerWithInputs: {
        flexDirection: 'column',
        gap: 4,
        padding: 14,
    },
})

export default ModalHabits
