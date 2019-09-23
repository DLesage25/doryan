import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CustomButton from '../components/CustomButton';

export default function IntroScreen() {
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
                <CustomButton text='Smart Metronome' colorSet='primary' />
                <CustomButton text='Chord Composer' colorSet='primary' />
                <CustomButton text='About' colorSet='primary' />
            </View>
        </View>
    );
}

IntroScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 80
    },
    title: {
        fontSize: 50,
        fontFamily: 'Avenir',
        color: '#34495e'
    },
    subTitle: {
        fontSize: 20,
        fontFamily: 'Avenir-Medium',
        color: '#2c3e50'
    },
    container: {
      flex: 1,
      backgroundColor: '#f1c40f',
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