import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    Slider,
    Switch,
} from 'react-native';

import { useInterval } from '../hooks';

import CustomButtonGroup from '../components/CustomButtonGroup';
import CustomButton from '../components/CustomButton';
import MetronomeStyles from '../styles/MetronomeStyles';

import { loadMetronomeEngine } from '../actions/metronomeActions';

const TempoControl = ({ tempo }) => {
    const dispatch = useDispatch();
    return (
        <View style={styles.controlContainer}>
            <Text style={styles.subTitle}> Tempo </Text>
            <Text style={styles.smallLabel}> {tempo} </Text>
            <View style={styles.sliderContainer}>
                <Slider
                    maximumValue="200"
                    minimumValue="1"
                    step={1}
                    value={tempo}
                    minimumTrackTintColor="#f1c40f"
                    maximumTrackTintColor="#2c3e50"
                    onSlidingComplete={newTempo => {
                        dispatch({ type: 'CHANGE_TEMPO', payload: newTempo });
                    }}
                />
            </View>
        </View>
    );
};

const AccentControl = ({ accent }) => {
    const options = ['First', 'Second', 'Third', 'Fourth'];
    const { index } = accent;
    const dispatch = useDispatch();
    return (
        <View style={styles.controlContainer}>
            <Text style={styles.subTitle}> Accent </Text>
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
                selectedIndex={index}
            />
        </View>
    );
};

const VibrationControl = ({ vibration }) => {
    const dispatch = useDispatch();
    return (
        <View style={styles.controlContainer}>
            <Text style={styles.subTitle}> Vibration </Text>
            <Switch
                style={styles.switch}
                value={vibration}
                trackColor={{ true: '#e67e22', false: 'grey' }}
                onValueChange={() => {
                    dispatch({
                        type: 'TOGGLE_VIBRATION',
                    });
                }}
            />
        </View>
    );
};

const VisualMonitor = ({ metronomeStep }) => {
    return (
        <View style={styles.VisualMonitor}>
            {Array(4)
                .fill()
                .map((e, index) => {
                    const imageSrc =
                        index === metronomeStep
                            ? require('../assets/images/step_active.png')
                            : require('../assets/images/step_inactive.png');
                    return (
                        <Image
                            key={`metronome_step_${index}`}
                            source={imageSrc}
                            style={styles.MetronomeStep}
                        />
                    );
                })}
        </View>
    );
};

const MetronomeScreen = () => {
    const {
        accent,
        tempo,
        playing,
        vibration,
        engine,
        soundObjects,
    } = useSelector(state => state.metronome);

    const [metronomeStep, setMetronomeStep] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!engine) dispatch(loadMetronomeEngine());
    }, []);

    const metronomeOpts = {
        accent,
        vibration,
        setMetronomeStep,
        timerId,
        repeats: 100,
        donef: () => {
            console.log('stopped metronome');
        },
    };

    const interval = tempo ? 120000 / tempo / 2 : 1000;

    let timerId = useInterval(
        () => {
            if (engine) engine.tick(metronomeOpts);
        },
        interval,
        playing
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.bodyContainer}>
                <Image
                    source={require('../assets/images/metronome2.png')}
                    style={styles.welcomeImage}
                />
                {/* <Text style={styles.title}> Smart Metronome </Text> */}
                <VisualMonitor metronomeStep={metronomeStep} />
            </View>
            <View style={styles.toolContainer}>
                <TempoControl tempo={tempo} />
                <AccentControl accent={accent} />
                <VibrationControl vibration={vibration} />
                <CustomButton
                    text="Tap Tempo"
                    colorSet="secondary"
                    onPress={() => {
                        soundObjects.metronomeOnNote.replayAsync();
                        console.log('tap tempo');
                    }}
                />
                <CustomButton
                    text={playing ? 'Stop' : 'Start'}
                    colorSet="primary"
                    onPress={() => {
                        dispatch({ type: 'TOGGLE_PLAY' });
                        engine.stop();
                    }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create(MetronomeStyles);

MetronomeScreen.navigationOptions = {
    title: 'Metronome',
};

export default MetronomeScreen;
