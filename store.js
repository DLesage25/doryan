import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers';

const middlewares = applyMiddleware(promise, ReduxPromise, ReduxThunk);
const configureStore = initialState => {
    const store = createStore(reducers, initialState, middlewares);
    return store;
};
export default configureStore;
