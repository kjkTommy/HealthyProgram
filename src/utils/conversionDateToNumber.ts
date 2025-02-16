export const conversionDateToNumber = (date: Date): number => {
    const today: Date = new Date()
    const currentDate: Date = date

    today.setHours(0, 0, 0, 0)
    currentDate.setHours(0, 0, 0, 0)

    const totalDays: number = Math.floor(
        (currentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )

    return totalDays
}
