import {ThunkAction} from "redux-thunk";
import {AdministrationState} from "./AdministrationReducer";
import AdministrationService from "../../services/AdministrationService";

const administrationService = new AdministrationService();

export const CREATE_BACKUP_REQUEST = "CREATE_BACKUP_REQUEST";
export const LOAD_BACKUPS_REQUEST = "LOAD_BACKUPS_REQUEST";
export const RESTORE_BACKUP_REQUEST = "RESTORE_BACKUP_REQUEST";

export const LOAD_BACKUPS_SUCCESS = "LOAD_BACKUPS_SUCCESS";

export const ADMINISTRATION_FAILURE = "ADMINISTRATION_FAILURE";
export const ADMINISTRATION_SUCCESS = "ADMINISTRATION_SUCCESS";

interface CreateBackupRequest {
    type: typeof CREATE_BACKUP_REQUEST
}

interface LoadBackupsRequest {
    type: typeof LOAD_BACKUPS_REQUEST
}

interface RestoreBackupRequest {
    type: typeof RESTORE_BACKUP_REQUEST
}

interface LoadBackupsSuccess {
    type: typeof LOAD_BACKUPS_SUCCESS,
    backups: string[]
}

interface AdministrationFailure {
    type: typeof ADMINISTRATION_FAILURE,
    error: string
}

interface AdministrationSuccess {
    type: typeof ADMINISTRATION_SUCCESS,
    message: string
}

export type AdministrationActionTypes = CreateBackupRequest | LoadBackupsRequest
    | LoadBackupsSuccess | AdministrationFailure | AdministrationSuccess
    | RestoreBackupRequest;

const createBackupRequest = (): AdministrationActionTypes => {
    return {type: CREATE_BACKUP_REQUEST};
};

const loadBackupsRequest = (): AdministrationActionTypes => {
    return {type: LOAD_BACKUPS_REQUEST};
};

const restoreBackupRequest = (): AdministrationActionTypes => {
    return {type: RESTORE_BACKUP_REQUEST};
};

const loadBackupsSuccess = (backups: string[]): AdministrationActionTypes => {
    return {type: LOAD_BACKUPS_SUCCESS, backups};
};

const administrationFailure = (error: string): AdministrationActionTypes => {
    return {type: ADMINISTRATION_FAILURE, error};
};

const administrationSuccess = (message: string): AdministrationActionTypes => {
    return {type: ADMINISTRATION_SUCCESS, message};
};

//Action creators
const createBackup = (): ThunkAction<void, AdministrationState, unknown, any> => {
    return dispatch => {
        dispatch(createBackupRequest());
        administrationService.createDbBackup().then(response => {
            dispatch(administrationSuccess(response.message));
        }).catch(e => {
            const errorMessage: string = e.message;
            dispatch(administrationFailure(errorMessage));
        });
    }
}

const loadBackups = (): ThunkAction<void, AdministrationState, unknown, any> => {
    return dispatch => {
        dispatch(loadBackupsRequest());
        administrationService.getDbBackups().then(response => {
            dispatch(loadBackupsSuccess(response.results));
        }).catch(e => {
            const errorMessage: string = e.message;
            dispatch(administrationFailure(errorMessage));
        });
    }
}

const restoreBackup = (backup: string): ThunkAction<void, AdministrationState, unknown, any> => {
    return dispatch => {
        dispatch(restoreBackupRequest());
        administrationService.restoreDbBackup(backup).then(response => {
            dispatch(administrationSuccess(response.message));
        }).catch(e => {
            const errorMessage: string = e.message;
            dispatch(administrationFailure(errorMessage));
        });
    }
}

export {
    createBackup,
    loadBackups,
    restoreBackup
}