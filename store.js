import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

const logger = createLogger({
    duration: true,
    titleFormatter: (action, time, took) => 
        `REDUX AXN @ ${time} : ${action.type} in ${took.toFixed(2)} ms`,
    colors: {
        prevState: false,
        nextState: false,
        error: false
    }
    // ...options
});

const middlewares = applyMiddleware(promise, ReduxPromise, ReduxThunk, logger);
const configureStore = initialState => {
    const store = createStore(reducers, initialState, middlewares);
    return store;
};
export default configureStore;
