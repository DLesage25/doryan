import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function CustomButton({text, colorSet}) {
    let getBttonStyle = () => {
        switch (colorSet) {
            case 'primary': 
                return styles.primaryButton
            case 'secondary': 
                return styles.secondaryButton
            case 'secondaryLight': 
                return styles.secondaryLightButton
            default:
                return '';
        }
    }
    return (
            <TouchableOpacity
            style={getBttonStyle()}
            onPress={this.onPress}
            >
                <Text style={colorSet === 'primary' ? styles.primaryText : styles.secondaryText}> { text } </Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    secondaryButton: {
        alignItems: 'center',
        backgroundColor: '#34495e',
        padding: 10,
        marginHorizontal: 80,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: '#e74c3c',
        padding: 10,
        marginHorizontal: 80,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    secondaryLightButton: {
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        padding: 10,
        marginHorizontal: 80,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        color: 'blue'
    },
    primaryText: {
        fontSize: 20,
        fontFamily: 'Avenir-Medium',
        color: '#f1c40f'
    },
    secondaryText: {
        fontSize: 20,
        fontFamily: 'Avenir-Medium',
        color: '#f1c40f'
    }
});

