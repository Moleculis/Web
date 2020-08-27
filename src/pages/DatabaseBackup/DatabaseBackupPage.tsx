import React, {useContext, useEffect} from "react";
import {StoreState} from "../../redux/Store";
import {connect} from "react-redux";
import {createDbBackup, loadDbBackups, restoreDbBackup} from "../../redux/administration/AdministrationActions";
import {Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import LoadingComponent from "../../components/LoadingComponent";
import {useTranslation} from "react-i18next";
import DbBackupItem from "./components/DbBackupItem";
import BackupIcon from '@material-ui/icons/Backup';
import Typography from "@material-ui/core/Typography";
import DividerWithMargin from "../../components/DividerWithMargin";
import StoreListener from "../../redux/StoreListener";
import {AdministrationState} from "../../redux/administration/AdministrationReducer";
import {SnackbarContext} from "../../components/Snackbar/SnackbarWrapper";
import SimpleButton from "../../components/buttons/SimpleButton";
import {AlertDialogContext, AlertDialogPayload} from "../../assets/AlertDialog/AlertDialogWrapper";
import UpdateIcon from '@material-ui/icons/Update';
import SimpleIconButton from "../../components/SimpleIconButton";

interface DatabaseBackupPageProps {
    isLoading: boolean,
    backups?: string[],
    createDbBackup: () => void,
    loadDbBackups: () => void,
    restoreDbBackup: (backup: string) => void

}

const databaseBackupPageStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        paddingTop: theme.spacing(4),
    },
    reload: {
        marginLeft: theme.spacing(1),
    },
    buttonRow: {
        marginTop: theme.spacing(2),
    }
}));

const DatabaseBackupPage = (props: DatabaseBackupPageProps) => {
    const classes = databaseBackupPageStyles();
    const {isLoading, backups, loadDbBackups, createDbBackup, restoreDbBackup} = props;
    const {t, i18n} = useTranslation();

    const getDateFromBackup = (backup: string): string => {
        let dateTimeString = backup.substring(backup.length - 23, backup.length - 4);
        dateTimeString = dateTimeString.substring(0, 10) + 'T' + dateTimeString.substring(11);
        return (new Date(dateTimeString)).toLocaleString(i18n.language);
    }

    useEffect(() => {
        loadDbBackups();
    }, [loadDbBackups]);

    const {openSnackBar} = useContext(SnackbarContext);
    const {openAlertDialog} = useContext(AlertDialogContext);

    const onCreateDbBackupClicked = () => {
        openAlertDialog(
            {
                title: t("create_backup_title"),
                content: t("create_backup_content"),
                onOk: createDbBackup,
            } as AlertDialogPayload
        );
    }

    const onBackupClicked = (backup: string) => {
        const backupDate = getDateFromBackup(backup);
        openAlertDialog(
            {
                title: t("restore_backup_title", {date: backupDate}),
                content: t("restore_backup_content"),
                onOk: () => {
                    restoreDbBackup(backup);
                }
            } as AlertDialogPayload
        );
    }

    return (
        <>
            <StoreListener<StoreState, AdministrationState>
                mapper={(state) => state.administration}
                listener={
                    (dispatch, currentState) => {
                        if (currentState.error) {
                            openSnackBar(currentState.error, "error");
                        } else if (currentState.message) {
                            openSnackBar(currentState.message);
                        }
                    }
                }>
                <Grid container spacing={3} className={classes.container}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                {t("db_backups")}
                            </Typography>
                            <Grid className={classes.buttonRow}>
                                <SimpleButton
                                    text={t("create_backup")}
                                    onClick={onCreateDbBackupClicked}
                                    disabled={isLoading}
                                />
                                <SimpleIconButton
                                    icon={<UpdateIcon/>}
                                    onClick={loadDbBackups}
                                    disabled={isLoading}
                                    className={classes.reload}
                                />
                            </Grid>
                            <DividerWithMargin/>
                            {isLoading ? <LoadingComponent/> :
                                backups && backups.length > 0 ?
                                    backups.reverse().map((backup: string) => {
                                        return (<DbBackupItem
                                                key={backup}
                                                onClick={() => {
                                                    onBackupClicked(backup);
                                                }}
                                                text={getDateFromBackup(backup)}
                                                icon={<BackupIcon/>}/>
                                        );
                                    }) :
                                    (<>{t("no_backups")}</>)}
                        </Paper>
                    </Grid>
                </Grid>
            </StoreListener>
        </>
    );
};

const mapStateToProps = (state: StoreState) => {
    const administrationState = state.administration;
    return {
        isLoading: administrationState.isLoading,
        backups: administrationState.backups
    };
}

const mapDispatchToProps = {
    createDbBackup: createDbBackup,
    loadDbBackups: loadDbBackups,
    restoreDbBackup: restoreDbBackup,
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseBackupPage);