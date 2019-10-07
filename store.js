import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

// to prevent redux logger from logging
// actions with deep nested objects
const actionsToLogAsKeys = ['LOAD_METRONOME_SOUNDS'];

const logger = createLogger({
    duration: true,
    titleFormatter: (action, time, took) =>
        `REDUX AXN @ ${time} : ${action.type} in ${took.toFixed(2)} ms`,
    stateTransformer: state => {
        if (state.metronome.soundObjects) {
            //added this to avoid loggin soundobject bodies
            //which are huge
            state = {
                ...state,
                metronome: {
                    ...state.metronome,
                    soundObjects: Object.keys(state.metronome.soundObjects),
                },
            };
        }
        return state;
    },
    actionTransformer: action => {
        if (actionsToLogAsKeys.indexOf(action.type) >= 0) {
            action = {
                ...action,
                payload: Object.keys(action.payload),
            };
        }
        return action;
    },
    colors: {
        prevState: false,
        nextState: false,
        error: false,
    },
});

const middlewares = applyMiddleware(promise, ReduxPromise, ReduxThunk, logger);
const configureStore = initialState => {
    const store = createStore(reducers, initialState, middlewares);
    return store;
};
export default configureStore;
