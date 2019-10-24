import { Audio } from 'expo-av';
import MetronomeOnNote from '../assets/audio/metronome_on_note.wav';
import MetronomeOffNote from '../assets/audio/metronome_off_note.wav';

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
