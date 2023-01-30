import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { RoundedButton } from '../components/RoundedButton';
import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';

export const FocusHistory = ({ history }) => {
    

    const renderItem = ({ item }) => <Text style={styles.item}>- {item}</Text>

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Focus History:</Text>
            <FlatList
                data={history}
                renderItem={ renderItem}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.md,
        flex: 1
    },
    item: {
        color: colors.white,
        fontSize: fontSizes.md,
        paddingTop: spacing.md
    },
    title: {
        color: colors.white,
        fontSize: fontSizes.md,
        fontWeight: 'bold'

    }
});
