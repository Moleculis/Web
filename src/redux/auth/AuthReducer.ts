import {AuthActionTypes} from "./AuthActions";

export interface AuthState {
    isLoading: boolean
}

const initialState: AuthState = {isLoading: false};

const authReducer = (state: AuthState = initialState, action: any) => {
    switch (action.type) {
        case AuthActionTypes.logIn:
        default:
            return initialState;
    }
}

export default authReducer;