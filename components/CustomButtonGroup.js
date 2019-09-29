import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export default function CustomButtonGroup({options}) {
    const buttons = options.map(option => (<Text style={styles.buttonText}> { option } </Text> ));
    return (
            <View
            style={styles.container}
            >
                <ButtonGroup
                    Component={TouchableOpacity}
                    selectedIndex={0}
                    buttons={buttons}
                    containerStyle={{ borderWidth: 0, width: 350 }}
                    textStyle={{color: 'blue'}}
                    buttonStyle={{ backgroundColor: '#f1c40f' }}
                    selectedButtonStyle={{ backgroundColor: '#e67e22' }}
                    innerBorderStyle={{ color: '#34495e' }} 
                    />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#34495e',
        marginHorizontal: 80,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    buttonText: {
        fontSize: 15,
        fontFamily: 'Avenir-Medium',
        color: '#34495e'
    },
});

