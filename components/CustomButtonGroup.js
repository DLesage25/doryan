import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export default function CustomButtonGroup({ options, onPress, selectedIndex }) {
    const buttons = options.map(option => (
        <Text style={styles.buttonText}> {option} </Text>
    ));
    return (
        <View style={styles.container}>
            <ButtonGroup
                Component={TouchableOpacity}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ borderWidth: 0, width: 350 }}
                textStyle={{ color: '#fcfcfc' }}
                buttonStyle={{ backgroundColor: '#212728' }}
                selectedButtonStyle={{ backgroundColor: '#2d3436' }}
                innerBorderStyle={{ color: '#34495e' }}
                onPress={onPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 80,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 15,
        fontFamily: 'Avenir-Medium',
        color: '#fcfcfc',
    },
});
