import AuthService from "../../services/AuthService";
import {ThunkAction} from "redux-thunk";
import {AuthState} from "./AuthReducer";
import {getToken, setToken} from "../../services/Storage";

const authService = new AuthService();


export const SILENT_LOG_IN = "SILENT_LOG_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

interface SilentLogIn {
    type: typeof SILENT_LOG_IN
}

interface LoggedOut {
    type: typeof LOGGED_OUT
}

interface LogInRequest {
    type: typeof LOG_IN_REQUEST
}

interface LogInSuccess {
    type: typeof LOG_IN_SUCCESS,
    token: string
}

interface AuthFailure {
    type: typeof AUTH_FAILURE
    error: string
}

export type AuthActionTypes = LogInRequest | LogInSuccess | AuthFailure | SilentLogIn | LoggedOut;

// Actions
const logInRequest = (): AuthActionTypes => {
    return {type: LOG_IN_REQUEST};
};

const logInSuccess = (token: string): AuthActionTypes => {
    return {type: LOG_IN_SUCCESS, token};
}

const loggedOut = (): AuthActionTypes => {
    return {type: LOGGED_OUT};
}

const authFailure = (error: string): AuthActionTypes => {
    return {type: AUTH_FAILURE, error};
}

//Action creators
const silentLogIn = (): ThunkAction<void, AuthState, unknown, any> => {
    return dispatch => {
        dispatch(logInRequest());
        const token: string | null = getToken();
        if (token) {
            dispatch(logInSuccess(token));
        } else {
            dispatch(loggedOut());
        }
    }
}

const logInAction = (username: string, password: string, isRememberMe: boolean)
    : ThunkAction<void, AuthState, unknown, any> => {
    return dispatch => {
        dispatch(logInRequest());
        authService.logIn(username, password).then(response => {
            const token: string = response.token;
            if (isRememberMe) {
                setToken(token);
            }
            dispatch(logInSuccess(token));
        }).catch(error => {
            const errorMessage: string = error.message;
            dispatch(authFailure(errorMessage));
        });
    };
}

export {
    logInAction,
    silentLogIn
}