import React, {useEffect} from "react";
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
    }
}));

const DatabaseBackupPage = (props: DatabaseBackupPageProps) => {
    const classes = databaseBackupPageStyles();
    const {isLoading, backups, loadDbBackups} = props;
    const {t, i18n} = useTranslation();

    const getDateFromBackup = (backup: string): string => {
        let dateTimeString = backup.substring(backup.length - 23, backup.length - 4);
        dateTimeString = dateTimeString.substring(0,10) + 'T' + dateTimeString.substring(11);
        return (new Date(dateTimeString)).toLocaleString(i18n.language);
    }

    useEffect(() => {
        loadDbBackups();
    }, [loadDbBackups]);

    return (
        <>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            {t("db_backups")}
                        </Typography>
                        <DividerWithMargin/>
                        {isLoading ? <LoadingComponent/> :
                            backups && backups.length > 0 ?
                                backups.map((backup: string) => {
                                    return (<DbBackupItem
                                            key={backup}
                                            text={getDateFromBackup(backup)}
                                            icon={<BackupIcon/>}/>
                                    );
                                }) :
                                (<>{t("no_backups")}</>)}
                    </Paper>
                </Grid>
            </Grid>
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