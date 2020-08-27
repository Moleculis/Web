import {createStore, combineReducers, applyMiddleware} from "redux";
import authReducer, {AuthState} from "./auth/AuthReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension/index";
import userReducer, {UserState} from "./user/UserReducer";
import administrationReducer, {AdministrationState} from "./administration/AdministrationReducer";

const combinedReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    administration: administrationReducer,
});

const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)));

export interface StoreState {
    auth: AuthState,
    user: UserState,
    administration: AdministrationState
}

export {
    store
};