import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ButtonGroup } from 'react-native';

export default function CustomButtonGroup({ text, colorSet }) {
    return (
        <TouchableOpacity
            style={colorSet === 'primary' ? styles.primaryButton : ''}
            onPress={this.onPress}
        >
            <Text style={colorSet === 'primary' ? styles.text : ''}>
                {' '}
                this is a button{' '}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    primaryButton: {
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 10,
        marginHorizontal: 80,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Avenir-Medium',
        color: '#f1c40f',
    },
});
