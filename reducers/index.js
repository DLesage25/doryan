import { combineReducers } from 'redux';

const INITIAL_STATE = {
    accent: {
        index: 0,
        value: 'first',
    },
    tempo: 110,
    play: false,
    engine: false,
};

const metronomeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHANGE_ACCENT':
            return { ...state, accent: action.payload };
        case 'CHANGE_TEMPO':
            return { ...state, tempo: action.payload };
        case 'LOAD_METRONOME_ENGINE':
            return { ...state, engine: action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    metronome: metronomeReducer,
});
