import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { recordSound } from '../engines/recording';

import LooperStyles from '../styles/LooperStyles';

const LoopLengthControl = () => {
    const { loopLength } = useSelector(({ looper }) => looper);
    // const options = ['5s', '10s', '15s'];
    const options = { '5s': 5000, '10s': 10000, '15s': 15000 };
    const dispatch = useDispatch();

    return (
        <View style={styles.controlContainer}>
            <Text style={styles.subTitle}> Loop length </Text>
            <CustomButtonGroup
                options={Object.keys(options)}
                onPress={selected => {
                    dispatch({
                        type: 'CHANGE_LOOP_LENGTH',
                        payload: {
                            index: selected,
                            value: Object.values(options)[selected],
                        },
                    });
                }}
                selectedIndex={loopLength.index}
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
                    console.log('play all');
                }}
            />
            <CustomButton
                text={'Rec/Dub'}
                colorSet="primary"
                onPress={async () => {
                    await recordSound();
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
    const { play, loops, recording } = useSelector(({ looper }) => looper);

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
