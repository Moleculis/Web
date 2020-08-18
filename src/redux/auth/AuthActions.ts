import AuthService from "../../services/AuthService";
import {ThunkAction} from "redux-thunk";
import {AuthState} from "./AuthReducer";
import {getToken, setToken} from "../../services/Storage";

const authService = new AuthService();


export const SILENT_LOG_IN = "SILENT_LOG_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const RESET_PASS_REQUEST = "RESET_PASS_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const RESET_PASS_MESSAGE_SENT = "RESET_PASS_MESSAGE_SENT";
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

interface ResetPassRequest {
    type: typeof RESET_PASS_REQUEST
}

interface LogInSuccess {
    type: typeof LOG_IN_SUCCESS
}

interface ResetPassMessageSent {
    type: typeof RESET_PASS_MESSAGE_SENT,
    message: string
}

interface AuthFailure {
    type: typeof AUTH_FAILURE
    error: string
}

export type AuthActionTypes = LogInRequest | LogInSuccess
    | AuthFailure | SilentLogIn | LoggedOut | ResetPassRequest
    | ResetPassMessageSent;

// Actions
const logInRequest = (): AuthActionTypes => {
    return {type: LOG_IN_REQUEST};
};

const resetPassRequest = (): AuthActionTypes => {
    return {type: RESET_PASS_REQUEST};
};

const logInSuccess = (): AuthActionTypes => {
    return {type: LOG_IN_SUCCESS};
}

const resetPassMessageSent = (message: string): AuthActionTypes => {
    return {type: RESET_PASS_MESSAGE_SENT, message};
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
            dispatch(logInSuccess());
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
            dispatch(logInSuccess());
        }).catch(error => {
            const errorMessage: string = error.message;
            dispatch(authFailure(errorMessage));
        });
    };
}

const sendResetPassMailAction = (email: string)
    : ThunkAction<void, AuthState, unknown, any> => {
    return async dispatch => {
        dispatch(resetPassRequest());
        authService.sendResetPassMessage(email).then(response => {
            const message: string = response.message;
            dispatch(resetPassMessageSent(message));
        }).catch(error => {
            const errorMessage: string = error.message;
            dispatch(authFailure(errorMessage));
        });
    };
}

export {
    logInAction,
    silentLogIn,
    sendResetPassMailAction,
}