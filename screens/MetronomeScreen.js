import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Slider } from 'react-native';

import CustomButtonGroup from '../components/CustomButtonGroup';
import CustomButton from '../components/CustomButton';


const TempoControl = () => {
  return (
    <View style={styles.controlContainer}>
      <Text style={styles.subTitle}> Tempo </Text>
        <View style={styles.sliderContainer}>
          <Slider 
            maximumValue='200'
            minimumValue='1'
            step={1}
            value='50'
            minimumTrackTintColor='#f1c40f'
          />
        </View>
    </View>
  )
}

const AccentControl = () => {
  const component1 = () => <Text style={styles.buttonText}>None</Text>
  const component2 = () => <Text style={styles.buttonText}>Second</Text>
  const component3 = () => <Text style={styles.buttonText}>Third</Text>
  const component4 = () => <Text style={styles.buttonText}>Fourth</Text>
  const options = [component1, component2, component3, component4];
  return (
    <View style={styles.controlContainer}>
      <Text style={styles.subTitle}> Accent </Text>
      <CustomButtonGroup options={options} />
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

export default function MetronomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.bodyContainer}>
          <Image
            source={require('../assets/images/metronome2.png')}
            style={styles.welcomeImage}
            />
        <Text style={styles.title}> Smart Metronome </Text>
      </View>
      <View style={styles.toolContainer}>
        <VisualMonitor/>
        <TempoControl/>
        <AccentControl/>
        <CustomButton text='Tap Tempo' colorSet='secondaryLight'/>
        <CustomButton text='Start' colorSet='primary'/>
        </View>
    </ScrollView>
  );
}

MetronomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#f1c40f',
  },
  bodyContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  controlContainer: {
    alignItems: 'center',
    paddingTop: 20
  },
  toolContainer: {
    flex: 1,
    backgroundColor: '#34495e',
    marginTop: 0,
    height: 600,
    padding: 10, 
    alignItems: 'center'
  },
  sliderContainer: {
    width: 300
  },
  title: {
    fontSize: 30,
    fontFamily: 'Avenir',
    color: '#34495e'
  },
  subTitle: {
    fontSize: 20,
    fontFamily: 'Avenir-Medium',
    color: '#f1c40f'
  },
  welcomeImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Avenir-Medium',
    color: '#34495e'
},
  VisualMonitor: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  MetronomeStep: {
    height: 50,
    width: 50
  }
});
