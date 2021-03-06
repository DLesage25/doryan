import { loadMetronomeSounds } from '../engines/AudioDAO';
import { metronomeEngine } from '../engines/metronome';

export const loadMetronomeEngine = () => {
    return async dispatch => {
        const soundObjects = await loadMetronomeSounds();
        const metronome = new metronomeEngine({
            soundObjects,
            onNoteSound: 'metronome_on_note',
            offNoteSound: 'metronome_off_note',
            tickFunc: tickCount => {
                console.log(`metronome tick #${tickCount}`);
            },
            endFunc: tickCount => {
                console.log(`metronome ended after ${tickCount}`);
            },
        });
        return dispatch({
            type: 'LOAD_METRONOME_ENGINE',
            payload: { metronome, soundObjects },
        });
    };
};
