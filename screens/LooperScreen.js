import React, { useState, useEffect } from 'react';
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
import ProgressRing from '../components/ProgressRing';

import { recordNewSound } from '../actions/looperActions';

import LooperStyles from '../styles/LooperStyles';

const ProgressDisplay = () => {
    const {
        loopLength: { value },
        playing,
        recording,
    } = useSelector(({ looper }) => looper);

    let [progress, setProgress] = useState(0);

    useEffect(() => {
        //I added -10 because of a weird delay between
        //the progresscircle and actual loop being recorded
        const progressInterval = value / 100 - 10;

        if (playing || recording) {
            const interval = setInterval(() => {
                setProgress(progress++);
                if (progress === 100) {
                    if (recording) clearInterval(interval);
                    setProgress(0);
                }
            }, progressInterval);
        }
    }, [playing, recording]);

    return (
        <View style={styles.controlContainer}>
            <Text style={styles.subTitle}> Status </Text>
            <View style={styles.statusContainer}>
                {playing || recording ? (
                    <ProgressRing
                        radius={30}
                        stroke={4}
                        progress={progress}
                        color={recording ? '#e74c3c' : '#b2bec3'}
                    />
                ) : (
                    <ProgressRing
                        radius={30}
                        stroke={4}
                        progress={100}
                        color="#2d3436"
                    />
                )}
            </View>
        </View>
    );
};

const LoopLengthControl = () => {
    const { loopLength } = useSelector(({ looper }) => looper);
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
        playing,
    } = useSelector(({ looper }) => looper);
    return (
        <View style={styles.looperButtons}>
            {!loops.length ? null : (
                <CustomButton
                    text={`${!playing ? 'Play' : 'Stop'} All`}
                    colorSet="secondary"
                    onPress={() => {
                        loops.forEach(async ({ sound, playing }) => {
                            if (playing) {
                                await sound.stopAsync();
                                await sound.setIsLoopingAsync(false);
                            } else {
                                await sound.replayAsync();
                                await sound.setIsLoopingAsync(true);
                            }
                        });

                        const newLoops = loops.map(loop => {
                            return {
                                ...loop,
                                playing: !loop.playing,
                            };
                        });

                        dispatch({ type: 'TOGGLE_PLAY' });

                        dispatch({
                            type: 'UPDATE_LOOPS',
                            payload: newLoops,
                        });
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
        <View>
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

                                          dispatch({ type: 'TOGGLE_PLAY' });

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
        </View>
    );
};

const LooperScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.toolContainer}>
                <Image
                    source={require('../assets/images/looper.png')}
                    style={styles.welcomeImage}
                />
                <ProgressDisplay />
                <LoopLengthControl />
                <IndividualLoopControl />
                <LooperButtons />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create(LooperStyles);

LooperScreen.navigationOptions = {
    title: 'Looper',
};

export default LooperScreen;
