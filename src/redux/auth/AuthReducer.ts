import {
    AUTH_FAILURE,
    AuthActionTypes,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOGGED_OUT,
    RESET_PASS_MESSAGE_SENT,
    RESET_PASS_REQUEST
} from "./AuthActions";

export interface AuthState {
    isLoading: boolean,
    isLoggedIn?: boolean,
    error?: string,
    message?: string
}

const initialState: AuthState = {isLoading: false};

const authReducer = (state: AuthState = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case RESET_PASS_REQUEST:
        case LOG_IN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                message: undefined
            };
        case LOGGED_OUT:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                error: undefined,
                message: undefined
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                error: undefined,
                message: undefined
            };
        case RESET_PASS_MESSAGE_SENT:
            return {
                ...state,
                isLoading: false,
                message: action.message,
            };
        case AUTH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                message: undefined
            };
        default:
            return state;
    }
}

export default authReducer;