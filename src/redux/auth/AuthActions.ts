import AuthService from "../../services/AuthService";
import {ThunkAction} from "redux-thunk";
import {AuthState} from "./AuthReducer";
import {getToken, removeToken, setToken} from "../../services/Storage";
import MessageResponse from "../../models/responses/MessageResponse";
import RegistrationRequest from "../../models/requests/RegistrationRequest";

const authService = new AuthService();


export const SILENT_LOG_IN = "SILENT_LOG_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const RESET_PASS_REQUEST = "RESET_PASS_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const RESET_PASS_MESSAGE = "RESET_PASS_MESSAGE_SENT";
export const AUTH_FAILURE = "AUTH_FAILURE";

export const CHECK_TOKEN_REQUEST = "CHECK_TOKEN_REQUEST";
export const TOKEN_NOT_VALID = "TOKEN_NOT_VALID";
export const TOKEN_VALID = "TOKEN_VALID";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";

interface SilentLogIn {
    type: typeof SILENT_LOG_IN
}

interface LoggedOut {
    type: typeof LOGGED_OUT
}

interface LogInRequest {
    type: typeof LOG_IN_REQUEST
}

interface LogOutRequest {
    type: typeof LOG_OUT_REQUEST
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

interface ResetPassMessage {
    type: typeof RESET_PASS_MESSAGE,
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

interface RegisterRequest {
    type: typeof REGISTER_REQUEST;
}

interface RegistrationSuccess {
    type: typeof REGISTER_SUCCESS;
    message: string;
}

interface LogOutSuccess {
    type: typeof LOG_OUT_SUCCESS;
    message: string;
}

export type AuthActionTypes = LogInRequest | LogInSuccess
    | AuthFailure | SilentLogIn | LoggedOut | ResetPassRequest
    | ResetPassMessage | TokenNotValid | CheckTokenRequest
    | TokenValid | RegisterRequest | RegistrationSuccess
    | LogOutRequest | LogOutSuccess;

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

const registerRequest = (): AuthActionTypes => {
    return {type: REGISTER_REQUEST};
};

const logOutRequest = (): AuthActionTypes => {
    return {type: LOG_OUT_REQUEST};
};

const logOutSuccess = (message: string): AuthActionTypes => {
    return {type: LOG_OUT_SUCCESS, message};
};

const registerSuccess = (message: string): AuthActionTypes => {
    return {type: REGISTER_SUCCESS, message};
};

const logInSuccess = (): AuthActionTypes => {
    return {type: LOG_IN_SUCCESS};
}

const resetPassMessage = (message: string): AuthActionTypes => {
    return {type: RESET_PASS_MESSAGE, message};
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
            setToken(token, isRememberMe);
            dispatch(logInSuccess());
        }).catch(error => {
            const errorMessage: string = error.message;
            dispatch(authFailure(errorMessage));
        });
    };
}

const registerAction = (request: RegistrationRequest)
    : ThunkAction<void, AuthState, unknown, any> => {
    return dispatch => {
        dispatch(registerRequest());
        authService.register(request).then(response => {
            const message: string = response.message;
            dispatch(registerSuccess(message));
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
            dispatch(resetPassMessage(message));
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
            if (result) {
                dispatch(tokenValid());
            } else {
                dispatch(tokenNotValid());
            }
        }).catch(error => {
            const errorMessage: string = error.message;
            dispatch(authFailure(errorMessage));
        });
    };
}

const resetPassAction = (token: string, newPassword: string)
    : ThunkAction<void, AuthState, unknown, any> => {
    return async dispatch => {
        dispatch(resetPassRequest());
        authService.resetPass(token, newPassword)
            .then((response: MessageResponse) => {
                dispatch(resetPassMessage(response.message));
            })
            .catch(error => {
                const errorMessage: string = error.message;
                dispatch(authFailure(errorMessage));
            });
    };
}

const logOutAction = ()
    : ThunkAction<void, AuthState, unknown, any> => {
    return async dispatch => {
        dispatch(logOutRequest());
        authService.logOut().then(response => {
            removeToken();
            const message: string = response.message;
            dispatch(logOutSuccess(message));
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
    checkTokenAction,
    resetPassAction,
    registerAction,
    logOutAction
}