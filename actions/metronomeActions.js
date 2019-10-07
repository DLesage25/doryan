import { loadMetronomeSounds } from '../engines/AudioDAO';
import { metronomeEngine } from '../engines/metronome';

export function changeAccent(payload) {
    return dispatch => {
        return dispatch({ type: 'CHANGE_ACCENT', payload });
    };
}

export function changeTempo(payload) {
    return dispatch => {
        return dispatch({ type: 'CHANGE_TEMPO', payload });
    };
}

export function getMetronomeSounds() {
    return async dispatch => {
        const metronomeSounds = await loadMetronomeSounds();
        return dispatch({
            type: 'LOAD_METRONOME_SOUNDS',
            payload: metronomeSounds,
        });
    };
}

export function loadMetronomeEngine() {
    return async (dispatch, getState) => {
        const soundObjects = getState().metronome.soundObjects;
        const metronome = new metronomeEngine({
            soundObjects,
            onNoteSound: 'metronome_on_note',
            offNoteSound: 'metronome_off_note',
        });
        return dispatch({
            type: 'LOAD_METRONOME_ENGINE',
            payload: metronome,
        });
    };
}
