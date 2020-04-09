import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';

export default function IntroScreen(props) {
    const { navigate } = props.navigation;
    return (
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Image
                    source={require('../assets/images/logo2.png')}
                    style={styles.welcomeImage}
                />
                <Text style={styles.title}> Doryan </Text>
                <Text style={styles.subTitle}> The musician's toolkit. </Text>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    text="Smart Metronome"
                    colorSet="secondary"
                    onPress={() => navigate('Metronome')}
                />
                <CustomButton
                    text="Chord Composer"
                    colorSet="secondary"
                    onPress={() => navigate('Metronome')}
                />
                <CustomButton
                    text="About"
                    colorSet="secondary"
                    onPress={() => navigate('About')}
                />
            </View>
        </View>
    );
}

IntroScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 80,
    },
    title: {
        fontSize: 50,
        fontFamily: 'Avenir',
        color: '#ff7675',
    },
    subTitle: {
        fontSize: 20,
        fontFamily: 'Avenir-Medium',
        color: '#fcfcfc',
    },
    container: {
        flex: 1,
        backgroundColor: '#212728',
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
});
