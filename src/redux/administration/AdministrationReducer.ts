import {
    ADMINISTRATION_FAILURE,
    ADMINISTRATION_SUCCESS,
    AdministrationActionTypes,
    CREATE_BACKUP_REQUEST,
    LOAD_BACKUPS_REQUEST,
    LOAD_BACKUPS_SUCCESS,
    RESTORE_BACKUP_REQUEST
} from "./AdministrationActions";

export interface AdministrationState {
    isLoading: boolean,
    backups?: string[],
    error?: string,
    message?: string,
}

const initialState: AdministrationState = {isLoading: false};

const administrationReducer = (state: AdministrationState = initialState, action: AdministrationActionTypes) => {
    switch (action.type) {
        case RESTORE_BACKUP_REQUEST:
        case LOAD_BACKUPS_REQUEST:
        case CREATE_BACKUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                message: undefined
            };
        case LOAD_BACKUPS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                backups: action.backups,
                error: undefined,
                message: undefined
            };
        case ADMINISTRATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: undefined,
                message: action.message,
            };
        case ADMINISTRATION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                message: undefined,
            };
        default:
            return state;
    }
}

export default administrationReducer;