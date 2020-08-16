import {createStore, combineReducers, applyMiddleware} from "redux";
import authReducer, {AuthState} from "./auth/AuthReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension/index";

const combinedReducers = combineReducers({
    auth: authReducer
});

const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)));

export interface StoreState {
    auth: AuthState
}

export {
    store
};