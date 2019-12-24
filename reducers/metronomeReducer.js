const INITIAL_STATE = {
    accent: {
        index: 0,
        value: 'first',
    },
    tempo: 110,
    play: false,
    engine: false,
    vibration: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHANGE_ACCENT':
            return { ...state, accent: action.payload };
        case 'CHANGE_TEMPO':
            return { ...state, tempo: action.payload };
        case 'TOGGLE_PLAY':
            return { ...state, play: !state.play };
        case 'TOGGLE_VIBRATION':
            return { ...state, vibration: !state.vibration };
        case 'LOAD_METRONOME_ENGINE':
            return {
                ...state,
                engine: action.payload.metronome,
                soundObjects: action.payload.soundObjects,
            };
        default:
            return state;
    }
};
