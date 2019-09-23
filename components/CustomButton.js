import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function CustomButton({text, colorSet}) {
    return (
            <TouchableOpacity
            style={colorSet === 'primary' ? styles.primaryButton : styles.secondaryButton}
            onPress={this.onPress}
            >
                <Text style={colorSet === 'primary' ? styles.text : styles.text}> { text } </Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    primaryButton: {
        alignItems: 'center',
        backgroundColor: '#34495e',
        padding: 10,
        marginHorizontal: 80,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    secondaryButton: {
        alignItems: 'center',
        backgroundColor: '#e74c3c',
        padding: 10,
        marginHorizontal: 80,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        fontFamily: 'Avenir-Medium',
        color: '#f1c40f'
    }
});

