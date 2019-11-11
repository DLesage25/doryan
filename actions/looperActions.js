import { recordSoundWithTimeout } from '../engines/recording';

export const recordNewSound = () => {
    return async dispatch => {
        let newSound = await recordSoundWithTimeout();
        dispatch({
            type: 'RECORD_NEW_SOUND',
            payload: {
                sound: newSound,
                //TODO find a better way to ID these
                id: Math.random().toFixed(4) * 10000,
            },
        });
    };
};
