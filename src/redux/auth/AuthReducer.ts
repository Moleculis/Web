import {AUTH_FAILURE, AuthActionTypes, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOGGED_OUT} from "./AuthActions";

export interface AuthState {
    isLoading: boolean,
    isLoggedIn?: boolean,
    token?: string,
    error?: string
}

const initialState: AuthState = {isLoading: false};

const authReducer = (state: AuthState = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case LOGGED_OUT:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.token,
                isLoggedIn: true,
                error: undefined
            };
        case AUTH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default authReducer;