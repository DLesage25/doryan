import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    Slider,
} from 'react-native';

import CustomButtonGroup from '../components/CustomButtonGroup';
import CustomButton from '../components/CustomButton';
import MetronomeStyles from '../styles/MetronomeStyles';

import {
    changeAccent,
    changeTempo,
    loadMetronomeEngine,
} from '../actions/metronomeActions';

const TempoControl = ({ tempo, changeTempo }) => {
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
                        changeTempo(newTempo);
                    }}
                />
            </View>
        </View>
    );
};

const AccentControl = ({ accent, changeAccent }) => {
    const options = ['First', 'Second', 'Third', 'Fourth'];
    const { index } = accent;
    return (
        <View style={styles.controlContainer}>
            <Text style={styles.subTitle}> Accent </Text>
            <CustomButtonGroup
                options={options}
                onPress={selected => {
                    changeAccent({ index: selected, value: options[selected] });
                }}
                selectedIndex={index}
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
    const { accent, tempo, engine } = useSelector(state => state.metronome);
    const dispatch = useDispatch();

    const [metronomeStep, setMetronomeStep] = useState(0);

    useEffect(() => {
        if (!engine) dispatch(loadMetronomeEngine());
    }, []);

    const metronomeOpts = {
        tempo,
        accent,
        repeats: 10,
        donef: () => {
            alert('stop!');
        },
        setMetronomeStep,
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.bodyContainer}>
                <Image
                    source={require('../assets/images/metronome2.png')}
                    style={styles.welcomeImage}
                />
                <Text style={styles.title}> Smart Metronome </Text>
                <VisualMonitor metronomeStep={metronomeStep} />
            </View>
            <View style={styles.toolContainer}>
                <TempoControl
                    changeTempo={dispatch(changeTempo)}
                    tempo={tempo}
                />
                <AccentControl
                    changeAccent={dispatch(changeAccent)}
                    accent={accent}
                />
                <CustomButton
                    text="Tap Tempo"
                    colorSet="secondary"
                    onPress={() => {
                        console.log('tap tempo');
                    }}
                />
                <CustomButton
                    text="Start"
                    colorSet="primary"
                    onPress={() => {
                        engine.start(metronomeOpts);
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
