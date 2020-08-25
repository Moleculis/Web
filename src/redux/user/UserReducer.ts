import {
    GET_CURRENT_USER_REQUEST,
    GET_CURRENT_USER_SUCCESS,
    RESET_TO_INITIAL,
    USER_FAILURE,
    UserActionTypes
} from "./UserActions";
import User from "../../models/User";

export interface UserState {
    isLoading: boolean,
    currentUser?: User,
    error?: string
}

const initialState: UserState = {isLoading: false};

const userReducer = (state: UserState = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case RESET_TO_INITIAL:
            return initialState;
        case GET_CURRENT_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.user,
                error: undefined
            };
        case USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default userReducer;