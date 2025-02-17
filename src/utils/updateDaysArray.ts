import { DayOfTheWeekProps } from '../types'

export const updateDaysArray = (count: number): DayOfTheWeekProps[][] => {
    const daysTemplate = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    let days = []

    for (let i = 0; i < count; i++) {
        const day = {
            name: daysTemplate[i % 7],
            id: i + 1,
            isCompleted: false,
        }
        days.push(day)
    }

    const weeks = []
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7))
    }

    return weeks
}
