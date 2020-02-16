const INITIAL_STATE = {
    playing: false,
    loopLength: {
        index: 0,
        value: 5000,
    },
    loops: [],
    recording: false, // TODO use this to change the icon color
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_PLAY':
            return { ...state, playing: !state.playing };
        case 'TOGGLE_RECORD':
            return { ...state, recording: !state.recording };
        case 'CHANGE_LOOP_LENGTH':
            return { ...state, loopLength: action.payload };
        case 'RECORDED_NEW_SOUND':
            return {
                ...state,
                loops: state.loops.concat([action.payload]),
                recording: false,
            };
        case 'UPDATE_LOOPS':
            return { ...state, loops: action.payload };
        default:
            return state;
    }
};
