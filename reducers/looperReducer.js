const INITIAL_STATE = {
    play: false,
    loopLength: 5000,
    loops: [],
    recording: false, // TODO use this to change the icon color
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_PLAY':
            return { ...state, play: !state.play };
        default:
            return state;
    }
};
