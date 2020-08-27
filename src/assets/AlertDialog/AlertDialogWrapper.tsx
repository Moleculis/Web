import React, {createContext, useState} from "react";
import {Button, Dialog, DialogTitle} from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {useTranslation} from "react-i18next";

interface AlertDialogWrapperProps {
    children: React.ReactNode
}

export interface AlertDialogPayload {
    title: string,
    content?: string,
    onOk?: () => void,
    onCancel?: () => void,
}

interface AlertDialogWrapperState {
    isDialogOpened: boolean,
    dialogPayload?: AlertDialogPayload
}

interface AlertDialogContextPayload {
    openAlertDialog: (payload: AlertDialogPayload) => void,
}

const defaultAlertDialogContextPayload: AlertDialogContextPayload = {
    openAlertDialog: _ => {
    }
};

export const AlertDialogContext =
    createContext<AlertDialogContextPayload>(defaultAlertDialogContextPayload);

const AlertDialogWrapper = ({children}: AlertDialogWrapperProps) => {
    const [state, setState] = useState({isDialogOpened: false} as AlertDialogWrapperState);

    const {isDialogOpened, dialogPayload} = state;

    const openAlertDialog = (payload: AlertDialogPayload) => {
        setState({
            isDialogOpened: true,
            dialogPayload: payload
        });
    }

    const closeDialog = () => {
        setState({
            ...state,
            isDialogOpened: false
        });
    }

    const {t} = useTranslation();

    return (
        <>
            <Dialog
                open={isDialogOpened}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogPayload?.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogPayload?.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        if(dialogPayload?.onCancel){
                            dialogPayload?.onCancel();
                        }
                        closeDialog();
                    }} color="primary">
                        {t("cancel")}
                    </Button>
                    <Button onClick={() => {
                        if(dialogPayload?.onOk){
                            dialogPayload?.onOk();
                        }
                        closeDialog();
                    }} color="primary" autoFocus>
                        {t("ok")}
                    </Button>
                </DialogActions>
            </Dialog>
            <AlertDialogContext.Provider value={{
                openAlertDialog: openAlertDialog,
            }}>
                {children}
            </AlertDialogContext.Provider>
        </>
    );
};

export default AlertDialogWrapper;