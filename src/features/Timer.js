import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import { Timing } from './Timing';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {

    useKeepAwake();
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);
    const [minutes, setMinutes] = useState(0.1);

    const onEnd = (reset) => {
        Vibration.vibrate(PATTERN);
        setIsStarted(false);
        setProgress(1);
        reset();
        onTimerEnd(focusSubject)
    }

    return (
        <View style={styles.container}>
        <View style={styles.countdown}>
            <Countdown isPaused={!isStarted}
                minutes={minutes}
                onProgress={setProgress}
                onEnd={onEnd} />
            <View style={{ paddingTop: spacing.xl }}>
            <Text style={styles.title}>Focusing on</Text>
            <Text style={styles.task}>{focusSubject}</Text>
        </View>
        </View>
        <View style={{ paddingTop: spacing.sm, paddingBottom: spacing.sm}}>
            <ProgressBar
                progress={progress}
                color={colors.progressColor}
                style={{ height: spacing.sm }} />
        </View>
        <View style={styles.timingWrapper}>
            <Timing onChangeTime={setMinutes} />
        </View>
        <View style={styles.buttonWrapper}>
            {!isStarted && (
                    < RoundedButton size={100} title="start" onPress={() => setIsStarted(true)} />
            )}
             {isStarted && (
                < RoundedButton size={100} title="pause" onPress={() => setIsStarted(false)} />
            )}
            </View>
            <View style={styles.buttonClearSubject}>
                < RoundedButton title="-" size={50} onPress={clearSubject} />
            </View>
   
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: spacing.lg
    },
    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: spacing.md,
        alignItem: 'center',
        justifyContent: 'center',
    },
    buttonClearSubject: {
        flex: 0.3,
        flexDirection: 'row',
        alignItem: 'center',
        justifyContent: 'center',
    },
    timingWrapper: {
        flex: 0.2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: spacing.sm,
        paddingTop: spacing.lg,
        textAlign: 'center',
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    task: {
        color: colors.white,
        textAlign: 'center'
    },
    })