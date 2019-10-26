import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    Slider,
} from 'react-native';
import CustomButton from '../components/CustomButton';

import LooperStyles from '../styles/LooperStyles';

const LooperScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/images/looper.png')}
                    style={styles.welcomeImage}
                />
                <Text style={styles.title}> Looper </Text>
            </View>
            <View style={styles.toolContainer}>
                <CustomButton
                    text="Tap Tempo"
                    colorSet="secondary"
                    onPress={() => {
                        console.log('tap tempo');
                    }}
                />

                <CustomButton
                    text={'Loop'}
                    colorSet="primary"
                    onPress={() => {
                        console.log('loop');
                    }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create(LooperStyles);

export default LooperScreen;
