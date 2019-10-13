import { Audio } from 'expo-av';
import MetronomeOnNote from '../assets/audio/metronome_on_note.wav';
import MetronomeOffNote from '../assets/audio/metronome_off_note.wav';

//deprecated, unused TODO - remove this
export const PlayAudio = async soundURI => {
    try {
        //TODO - change this reference, assuming I may need formats other
        // than mp3 in the future
        let { isLoaded } = await sound_metronomeActive.getStatusAsync();

        console.log({ isLoaded });

        if (!isLoaded) await sound_metronomeActive.loadAsync(MetronomeOnNote);

        await sound_metronomeActive.replayAsync(); //TODO when to use playAsync?

        return true;
    } catch (error) {
        console.log(`Error when playing audio ${error}`);
        return false;
    }
};

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
