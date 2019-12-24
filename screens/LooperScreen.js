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

import { recordNewSound } from '../actions/looperActions';

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
    const dispatch = useDispatch();
    const {
        loopLength: { value },
        loops,
    } = useSelector(({ looper }) => looper);
    return (
        <View style={styles.looperButtons}>
            {!loops.length ? null : (
                <CustomButton
                    text={'Play All'}
                    colorSet="primary"
                    onPress={() => {
                        console.log('play all');
                    }}
                />
            )}
            <View style={styles.mainButtonContainer}>
                <CustomButton
                    text={'Rec/Dub'}
                    colorSet="primary"
                    onPress={async () => {
                        dispatch(recordNewSound(value));
                    }}
                />
            </View>
        </View>
    );
};

const IndividualLoopControl = () => {
    const { loops } = useSelector(({ looper }) => looper);
    const dispatch = useDispatch();
    return (
        <>
            {!loops.length
                ? null
                : loops.map(({ id, sound, playing }, index) => (
                      <View style={styles.controlContainer} key={`loop-${id}`}>
                          <Text style={styles.subTitle}>Loop {index + 1}</Text>
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
                                          onSlidingComplete={async newVolume => {
                                              await sound.setVolumeAsync(
                                                  newVolume / 10
                                              );
                                          }}
                                      />
                                  </View>
                              </View>
                              <View style={styles.centeredRow}>
                                  <CustomButton
                                      text={playing ? 'Stop' : 'Play'}
                                      colorSet="secondary"
                                      onPress={async () => {
                                          if (playing) {
                                              await sound.stopAsync();
                                              await sound.setIsLoopingAsync(
                                                  false
                                              );
                                          } else {
                                              await sound.replayAsync();
                                              await sound.setIsLoopingAsync(
                                                  true
                                              );
                                          }

                                          const newLoops = loops
                                              .filter(loop => loop.id !== id)
                                              .concat([
                                                  {
                                                      sound,
                                                      playing: !playing,
                                                      id,
                                                  },
                                              ]);
                                          dispatch({
                                              type: 'UPDATE_LOOPS',
                                              payload: newLoops,
                                          });
                                      }}
                                  />
                                  <CustomButton
                                      text={'Delete'}
                                      colorSet="secondary"
                                      onPress={async () => {
                                          await sound.stopAsync();
                                          await sound.setIsLoopingAsync(false);
                                          const newLoops = loops.filter(
                                              loop => loop.id !== id
                                          );
                                          dispatch({
                                              type: 'UPDATE_LOOPS',
                                              payload: newLoops,
                                          });
                                      }}
                                  />
                              </View>
                          </View>
                      </View>
                  ))}
        </>
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
