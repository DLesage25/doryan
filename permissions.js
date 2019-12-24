import * as Permissions from 'expo-permissions';

const requestPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status === 'granted') {
        return true;
    } else {
        console.error('Audio recording permissions not granted');
        return false;
    }
};

export default async () => {
    const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
        return requestPermissions();
    } else return true;
};
