import React from 'react';
import { connect } from 'react-redux';
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
    getMetronomeSounds,
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

class MetronomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            metronomeStep: 0,
        };
    }

    //load sound objects TODO - this maybe could happen together with
    //loading the metronome engn
    componentWillMount() {
        if (!this.props.soundObjects.length) this.props.getMetronomeSounds();
    }

    //set up the metronome engine
    componentDidMount() {
        if (!this.props.engine) this.props.loadMetronomeEngine();
    }

    // const [metronomeStep, setMetronomeStep] = useState(0)
    render() {
        const {
            changeAccent,
            changeTempo,
            accent,
            tempo,
            soundObjects,
            engine,
        } = this.props;
        const { metronomeStep } = this.state;

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
                    <TempoControl changeTempo={changeTempo} tempo={tempo} />
                    <AccentControl
                        changeAccent={changeAccent}
                        accent={accent}
                    />
                    <CustomButton
                        text="Tap Tempo"
                        colorSet="secondary"
                        onPress={() => {
                            soundObjects.metronomeOnNote.replayAsync();
                        }}
                    />
                    <CustomButton
                        text="Start"
                        colorSet="primary"
                        onPress={() => {
                            engine.start({ tempo });
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    const {
        metronome: { accent, tempo, soundObjects, engine },
    } = state;
    return {
        accent,
        tempo,
        soundObjects,
        engine,
    };
};

const mapDispatchToProps = dispatch => ({
    changeAccent: newAccent => dispatch(changeAccent(newAccent)),
    changeTempo: newTempo => dispatch(changeTempo(newTempo)),
    getMetronomeSounds: e => dispatch(getMetronomeSounds(e)),
    loadMetronomeEngine: e => dispatch(loadMetronomeEngine(e)),
});

MetronomeScreen.navigationOptions = {
    //header: null,
    title: 'Metronome',
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MetronomeScreen);

const styles = StyleSheet.create(MetronomeStyles);
