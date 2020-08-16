import React, {createContext, useState} from "react";
import ProjectSnackbar, {AlertSeverityType} from "./ProjectSnackbar";

interface SnackbarWrapperProps {
    children: React.ReactNode
}

interface SnackbarPayload {
    snackBarMessage?: string,
    snackBarSeverity?: AlertSeverityType,
}

interface SnackbarWrapperState {
    isSnackbarOpened: boolean,
    snackbarPayload?: SnackbarPayload,
}

const delayedMessages: Array<SnackbarPayload> = new Array<SnackbarPayload>();

interface SnackbarContextPayload {
    openSnackBar: (message: string, severity?: AlertSeverityType) => void,
    currentSnackbarPayload?: SnackbarPayload,
}

const defaultSnackbarContextPayload: SnackbarContextPayload = {
    openSnackBar: _ => {
    }
};

export const SnackbarContext =
    createContext<SnackbarContextPayload>(defaultSnackbarContextPayload);

const SnackbarWrapper = ({children}: SnackbarWrapperProps) => {
    const [state, setState] = useState({isSnackbarOpened: false} as SnackbarWrapperState);

    const {isSnackbarOpened, snackbarPayload} = state;

    const handleSnackbarClose = () => {
        if (delayedMessages.length > 0) {
            setState({
                ...state,
                snackbarPayload: delayedMessages[0],
            });
            delayedMessages.shift();
        } else {
            setState({
                ...state,
                isSnackbarOpened: false,
                snackbarPayload: undefined
            });
        }
    }

    const openSnackBar = (message: string, severity: AlertSeverityType = "success") => {
        if (state.isSnackbarOpened) {
            addToDelayed({snackBarMessage: message, snackBarSeverity: severity});
        } else {
            setState({
                isSnackbarOpened: true,
                snackbarPayload: {
                    snackBarMessage: message,
                    snackBarSeverity: severity,
                }
            });
        }
    }

    const addToDelayed = (snackbarPayload: SnackbarPayload) => {
        if (state.snackbarPayload) {
            if (isSnackbarPayloadsEqual(snackbarPayload, state.snackbarPayload)) {
                return;
            }
        }
        for (let payload of delayedMessages) {
            if (isSnackbarPayloadsEqual(payload, snackbarPayload)) {
                return;
            }
        }
        delayedMessages.push(snackbarPayload);
    }

    const isSnackbarPayloadsEqual = (snackbarPayload1: SnackbarPayload,
                                     snackbarPayload2: SnackbarPayload): boolean => {
        return snackbarPayload1.snackBarMessage === snackbarPayload2.snackBarMessage &&
            snackbarPayload1.snackBarSeverity === snackbarPayload2.snackBarSeverity;
    }

    return (
        <>
            <ProjectSnackbar
                open={isSnackbarOpened}
                message={snackbarPayload?.snackBarMessage}
                severity={snackbarPayload?.snackBarSeverity}
                handleClose={handleSnackbarClose}
            />
            <SnackbarContext.Provider value={{
                openSnackBar,
                currentSnackbarPayload: snackbarPayload
            }}>
                {children}
            </SnackbarContext.Provider>
        </>
    );
};

export default SnackbarWrapper;