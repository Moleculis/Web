import UserService from "../../services/UserService";
import User from "../../models/User";
import {ThunkAction} from "redux-thunk";
import {UserState} from "./UserReducer";

const userService = new UserService();

export const RESET_TO_INITIAL = "RESET_TO_INITIAL";

export const GET_CURRENT_USER_REQUEST = "GET_CURRENT_USER_REQUEST";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const USER_FAILURE = "USER_FAILURE";

interface ResetToInitial {
    type: typeof RESET_TO_INITIAL
}

interface GetCurrentUserRequest {
    type: typeof GET_CURRENT_USER_REQUEST
}

interface GetCurrentUserSuccess {
    type: typeof GET_CURRENT_USER_SUCCESS,
    user: User
}

interface UserFailure {
    type: typeof USER_FAILURE,
    error: string
}

export type UserActionTypes = GetCurrentUserRequest | GetCurrentUserSuccess | UserFailure
    | ResetToInitial;

const getCurrentUserRequest = (): UserActionTypes => {
    return {type: GET_CURRENT_USER_REQUEST};
};

const getCurrentUserSuccess = (user: User): UserActionTypes => {
    return {type: GET_CURRENT_USER_SUCCESS, user};
};

const userFailure = (error: string): UserActionTypes => {
    return {type: USER_FAILURE, error};
};

const resetToInitial = (): UserActionTypes => {
    return {type: RESET_TO_INITIAL};
};

//Action creators
const getCurrentUser = (): ThunkAction<void, UserState, unknown, any> => {
    return dispatch => {
        dispatch(getCurrentUserRequest());
        userService.getCurrentUser().then(user => {
            dispatch(getCurrentUserSuccess(user));
        }).catch(e => {
            const errorMessage: string = e.message;
            dispatch(userFailure(errorMessage));
        })
    }
}

export {
    getCurrentUser,
    resetToInitial,
}