import {createStore, combineReducers, applyMiddleware} from "redux";
import authReducer, {AuthState} from "./auth/AuthReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension/index";
import userReducer, {UserState} from "./user/UserReducer";

const combinedReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
});

const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)));

export interface StoreState {
    auth: AuthState,
    user: UserState,
}

export {
    store
};