import {createStore, combineReducers, compose} from 'redux';
import authReducer, {AuthState} from "./auth/AuthReducer";

const combinedReducers = combineReducers({
    auth: authReducer
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combinedReducers, composeEnhancers());

export interface StoreState {
    auth: AuthState
}

export {
    store
};