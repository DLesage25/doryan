import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function CustomButton({ text, colorSet, onPress }) {
    const { buttonStyle, textStyle } = getStyles(colorSet);

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}> {text} </Text>
        </TouchableOpacity>
    );
}

const getStyles = colorSet => {
    switch (colorSet) {
        case 'primary':
            return {
                buttonStyle: styles.primaryButton,
                textStyle: styles.primaryText,
            };
        case 'secondary':
            return {
                buttonStyle: styles.secondaryButton,
                textStyle: styles.secondaryText,
            };
        case 'secondaryLight':
            return {
                buttonStyle: styles.secondaryLightButton,
                textStyle: styles.secondaryLightText,
            };
        default:
            return {};
    }
};

const styles = StyleSheet.create({
    secondaryButton: {
        alignItems: 'center',
        backgroundColor: '#2d3436',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: '#ff7675',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    secondaryLightButton: {
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        color: 'blue',
    },
    primaryText: {
        fontSize: 20,
        fontFamily: 'Avenir-Medium',
        color: '#fcfcfc',
    },
    secondaryText: {
        fontSize: 20,
        fontFamily: 'Avenir-Medium',
        color: '#95a5a6',
    },
    secondaryLightText: {
        fontSize: 20,
        fontFamily: 'Avenir-Medium',
        color: '#f1c40f',
    },
});
