import { Audio } from 'expo-av';
import MetronomeOnNote from '../assets/audio/metronome_on_note.wav';
import MetronomeOffNote from '../assets/audio/metronome_off_note.wav';

Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
    staysActiveInBackground: true,
    shouldDuckAndroid: false,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: true,
});

//unused - should I load audio files before playing?
const LoadAudioFiles = async soundFiles => {
    try {
        let soundObjects = {};
        await Promise.all(
            soundFiles.map(async ({ name, file }) => {
                let soundObject = new Audio.Sound();
                await soundObject.loadAsync(file);
                let { isLoaded } = await soundObject.getStatusAsync();
                if (isLoaded) soundObjects[name] = soundObject;
                else console.error(`error loading soundobject ${name}`);
                return true;
            })
        );
        return soundObjects;
    } catch (error) {
        console.log(`Error when loading soundFiles ${error}`);
    }
};

export const loadMetronomeSounds = async () => {
    const soundFiles = [
        {
            name: 'metronomeOnNote',
            file: MetronomeOnNote,
        },
        {
            name: 'metronomeOffNote',
            file: MetronomeOffNote,
        },
    ];

    return LoadAudioFiles(soundFiles);
};

export const generateNewRecording = async () => {
    try {
        const recording = new Audio.Recording();
        let { canRecord } = await recording.prepareToRecordAsync();
        if (canRecord) return recording;
    } catch (error) {
        console.log(`Error while recording ${error}`);
    }
};
