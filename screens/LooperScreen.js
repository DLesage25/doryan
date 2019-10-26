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
import CustomButtonGroup from '../components/CustomButtonGroup';

import LooperStyles from '../styles/LooperStyles';

const LoopLengthControl = () => {
    const options = ['5s', '10s', '15s'];

    return (
        <View style={styles.controlContainer}>
            <Text style={styles.subTitle}> Loop length </Text>
            <CustomButtonGroup
                options={options}
                onPress={selected => {
                    dispatch({
                        type: 'CHANGE_ACCENT',
                        payload: {
                            index: selected,
                            value: options[selected],
                        },
                    });
                }}
                selectedIndex={0}
            />
        </View>
    );
};

const LooperButtons = () => {
    return (
        <View style={styles.centeredFlex}>
            <CustomButton
                text={'Play All'}
                colorSet="primary"
                onPress={() => {
                    console.log('loop');
                }}
            />
            <CustomButton
                text={'Rec/Dub'}
                colorSet="primary"
                onPress={() => {
                    console.log('loop');
                }}
            />
        </View>
    );
};

const IndividualLoopControl = () => {
    return (
        <View style={styles.controlContainer}>
            <Text style={styles.subTitle}> Loop 1 </Text>
            <View style={styles.individualLoopControls}>
                <View>
                    {/* <Text style={styles.subTitle}> Volume </Text> */}
                    <View style={styles.sliderContainer}>
                        <Slider
                            maximumValue="10"
                            minimumValue="1"
                            step={1}
                            value={5}
                            minimumTrackTintColor="#f1c40f"
                            maximumTrackTintColor="#2c3e50"
                            onSlidingComplete={newTempo => {
                                dispatch({
                                    type: 'CHANGE_TEMPO',
                                    payload: newTempo,
                                });
                            }}
                        />
                    </View>
                </View>
                <View style={styles.centeredRow}>
                    {/* <Text style={styles.subTitle}> Audio </Text> */}
                    <CustomButton
                        text={'Play'}
                        colorSet="secondary"
                        onPress={() => {
                            console.log('loop');
                        }}
                    />
                    <CustomButton
                        text={'Delete'}
                        colorSet="secondary"
                        onPress={() => {
                            console.log('loop');
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

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
                <LoopLengthControl />
                <IndividualLoopControl />
                <LooperButtons />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create(LooperStyles);

export default LooperScreen;
