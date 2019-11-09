import { generateNewRecording } from './AudioDAO';

export const recordSound = async (interval = 5000) => {
    let recording = await generateNewRecording();
    await recording.startAsync();

    setTimeout(async () => {
        let finishedRecording = await recording.stopAndUnloadAsync();
        console.log({ finishedRecording });

        let { sound } = await recording.createNewLoadedSoundAsync();
        let status = await sound.getStatusAsync();
        console.log({ status });
        sound.playAsync();
    }, interval);
};
