import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, StyleSheet, Image, Slider } from 'react-native';

import CustomButtonGroup from '../components/CustomButtonGroup';
import CustomButton from '../components/CustomButton';

import MetronomeStyles from '../styles/MetronomeStyles'

import { changeAccent, changeTempo } from '../actions/metronomeActions';

const TempoControl = ({tempo, changeTempo}) => {
  return (
    <View style={styles.controlContainer}>
      <Text style={styles.subTitle}> Tempo </Text>
      <Text style={styles.smallLabel}> {tempo} </Text>
      <View style={styles.sliderContainer}>
          <Slider 
            maximumValue='200'
            minimumValue='1'
            step={1}
            value={tempo}
            minimumTrackTintColor='#f1c40f'
            maximumTrackTintColor='#2c3e50'
            onSlidingComplete={(newTempo) => {  changeTempo(newTempo) }}
          />
      </View>
    </View>
  )
}

const AccentControl = ({accent, changeAccent}) => {
  const options = ['First', 'Second', 'Third', 'Fourth'];
  const { index } = accent;
  return (
    <View style={styles.controlContainer}>
      <Text style={styles.subTitle}> Accent </Text>
      <CustomButtonGroup 
        options={options} 
        onPress={(selected) => { 
          changeAccent({ index: selected, value: options[selected]}) 
        }} 
        selectedIndex={index}
        />
  </View>
  )
}

const VisualMonitor = () => {
  return (
    <View style={styles.VisualMonitor}>
        <Image
          source={require('../assets/images/step_active.png')}
          style={styles.MetronomeStep}
          />
        <Image
          source={require('../assets/images/step_inactive.png')}
          style={styles.MetronomeStep}
          />
        <Image
          source={require('../assets/images/step_inactive.png')}
          style={styles.MetronomeStep}
          />
        <Image
          source={require('../assets/images/step_inactive.png')}
          style={styles.MetronomeStep}
          />
    </View>
  )
}

const MetronomeScreen = (props) => {
  const { changeAccent, changeTempo, metronome: { accent, tempo } } = props;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bodyContainer}>
          <Image
            source={require('../assets/images/metronome2.png')}
            style={styles.welcomeImage}
            />
        <Text style={styles.title}> Smart Metronome </Text>
                <VisualMonitor/>
      </View>
      <View style={styles.toolContainer}>
        <TempoControl changeTempo={changeTempo} tempo={tempo} />
        <AccentControl changeAccent={changeAccent} accent={accent} />
        <CustomButton text='Tap Tempo' colorSet='secondary' onPress={()=> { props.changeAccent('test') }}/>
        <CustomButton text='Start' colorSet='primary'/>
        </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  const { metronome } = state;
  return {
    metronome
  };
}

const mapDispatchToProps = dispatch => ({
  changeAccent: newAccent => dispatch(changeAccent(newAccent)),
  changeTempo: newTempo => dispatch(changeTempo(newTempo))
})

MetronomeScreen.navigationOptions = {
  //header: null,
  title: 'Metronome',
};

export default connect(mapStateToProps, mapDispatchToProps)(MetronomeScreen);


const styles = StyleSheet.create(MetronomeStyles);
