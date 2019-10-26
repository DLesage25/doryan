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
        play,
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
        tempo,
        accent,
        vibration,
        repeats: 100,
        donef: () => {
            console.log('stopped metronome');
        },
        setMetronomeStep,
        togglePlay: () => {
            dispatch({ type: 'TOGGLE_PLAY' });
        },
    };

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
                    text={play ? 'Stop' : 'Start'}
                    colorSet="primary"
                    onPress={() => {
                        play ? engine.stop() : engine.start(metronomeOpts);
                    }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create(MetronomeStyles);

MetronomeScreen.navigationOptions = {
    //header: null,
    title: 'Metronome',
};

export default MetronomeScreen;
