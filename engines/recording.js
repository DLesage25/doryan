import { generateNewRecording } from './AudioDAO';

export const recordSoundWithTimeout = async (interval = 5000) => {
    let recording = await generateNewRecording();
    await recording.startAsync();

    console.log({ interval });

    return new Promise(resolve => {
        setTimeout(async () => {
            await recording.stopAndUnloadAsync();
            let { sound } = await recording.createNewLoadedSoundAsync();
            resolve(sound);
        }, interval);
    });
};
