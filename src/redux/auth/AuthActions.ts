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

export const CHECK_TOKEN_REQUEST = "CHECK_TOKEN_REQUEST";
export const TOKEN_NOT_VALID = "TOKEN_NOT_VALID";
export const TOKEN_VALID = "TOKEN_VALID";

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

interface CheckTokenRequest {
    type: typeof CHECK_TOKEN_REQUEST
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

interface TokenNotValid {
    type: typeof TOKEN_NOT_VALID;
}

interface TokenValid {
    type: typeof TOKEN_VALID;
}

export type AuthActionTypes = LogInRequest | LogInSuccess
    | AuthFailure | SilentLogIn | LoggedOut | ResetPassRequest
    | ResetPassMessageSent | TokenNotValid | CheckTokenRequest
    | TokenValid;

// Actions
const logInRequest = (): AuthActionTypes => {
    return {type: LOG_IN_REQUEST};
};

const resetPassRequest = (): AuthActionTypes => {
    return {type: RESET_PASS_REQUEST};
};

const checkTokenRequest = (): AuthActionTypes => {
    return {type: CHECK_TOKEN_REQUEST};
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

const tokenNotValid = (): AuthActionTypes => {
    return {type: TOKEN_NOT_VALID};
}

const tokenValid = (): AuthActionTypes => {
    return {type: TOKEN_VALID};
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

const checkTokenAction = (token: string)
    : ThunkAction<void, AuthState, unknown, any> => {
    return async dispatch => {
        dispatch(checkTokenRequest());
        authService.checkToken(token).then(response => {
            const result: boolean = response.result;
            if(result){
                dispatch(tokenValid());
            }else{
                dispatch(tokenNotValid());
            }
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
    checkTokenAction
}