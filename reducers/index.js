import { combineReducers } from 'redux';

import metronomeReducer from './metronomeReducer';
import looperReducer from './looperReducer';

export default combineReducers({
    metronome: metronomeReducer,
    looper: looperReducer,
});
