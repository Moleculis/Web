import React from "react";
import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

interface SnackbarPosition {
    vertical: "top" | "bottom",
    horizontal: "center" | "left" | "right"
}

export type AlertSeverityType = "error" | "warning" | "info" | "success" | undefined

interface ProjectSnackbarProps {
    position?: SnackbarPosition,
    open: boolean,
    message?: string,
    severity: AlertSeverityType,
    handleClose: () => void
}

const ProjectSnackbar = ({
                             open,
                             message,
                             handleClose,
                             severity,
                             position = {
                                 vertical: "top",
                                 horizontal: "center"
                             },
                         }: ProjectSnackbarProps) => {
    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: position.vertical, horizontal: position.horizontal}}
                open={open}
                autoHideDuration={6000}
                key={position?.vertical + position?.horizontal + message}
                onClose={handleClose}
            >
                <Alert severity={severity}>
                    {message ? message : ""}
                </Alert>
            </Snackbar>
        </>
    );
}

interface AlertProps {
    severity: AlertSeverityType,
    children: React.ReactNode
}

const Alert = ({severity, children}: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" severity={severity} children={children}/>;
}

export default ProjectSnackbar;