import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, LayoutChangeEvent } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { ProgressBarProps } from '../../types'

const ProgressBar = ({ progress }: ProgressBarProps) => {
    const [maxWidth, setMaxWidth] = useState(0)
    const width = useSharedValue(0)

    useEffect(() => {
        if (maxWidth > 0) {
            const normalizedProgress = (Math.min(progress, 100) / 100) * maxWidth
            width.value = withTiming(normalizedProgress, {
                duration: 500,
                easing: Easing.linear,
            })
        }
    }, [progress, maxWidth])

    const rStyle = useAnimatedStyle(() => {
        return {
            width: width.value,
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Прогресс: {((progress / 100) * 100).toFixed(1)}%</Text>
            <View
                style={styles.backgroundBar}
                onLayout={(event: LayoutChangeEvent) => {
                    setMaxWidth(event.nativeEvent.layout.width)
                }}
            >
                <Animated.View style={[styles.progressBar, rStyle]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    text: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 8,
    },
    backgroundBar: {
        width: '100%',
        height: 20,
        backgroundColor: '#171414',
        borderRadius: 1000,
        marginTop: 4,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 1000,
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.67,
        shadowRadius: 10,
        elevation: 10,
    },
})

export default ProgressBar
