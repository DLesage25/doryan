import { recordSoundWithTimeout } from '../engines/recording';

export const recordNewSound = loopLength => {
    return async dispatch => {
        dispatch({ type: 'TOGGLE_RECORD' });
        dispatch({
            type: 'RECORDED_NEW_SOUND',
            payload: {
                sound: await recordSoundWithTimeout(loopLength),
                //TODO find a better way to ID these
                id: Math.random().toFixed(4) * 10000,
                playing: false,
            },
        });
    };
};
