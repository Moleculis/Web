import React from "react";
import {AuthState} from "../../redux/auth/AuthReducer";
import {useSelector} from "react-redux";
import {StoreState} from "../../redux/Store";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import LanguageDropdown from "../../components/LanguageDropdown";
import HomePage from "../HomePage";
import SignIn from "../SignInPage";
import SignUpPage from "../SignUpPage";
import SendResetPass from "../SendResetPassPage";
import ResetPass from "../ResetPassPage";
import RegistrationConfirmPage from "../RegistrationConfirmPage";
import LoggedInRouteWrapper from "./LoggedInRouteWrapper";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import {t} from "../../i18n";
import DatabaseBackupPage from "../DatabaseBackupPage";

interface RouteProps {
    exact?: boolean,
    path: string,
    component: React.ComponentType<any>
}

const homeEndpoint = '/';
const signInEndpoint = "/sign-in";
const signUpEndpoint = "/sign-up";
const sendResetPassEndpoint = "/send-reset-pass";
const resetPassEndpoint = "/reset-pass";
const registrationConfirmEndpoint = "/registration-confirm";

const administrationBaseEndpoint = "/administration";

const databaseBackupEndpoint = `${administrationBaseEndpoint}/db-backup`;

const Routes = {
    home: homeEndpoint,
    signIn: signInEndpoint,
    signUp: signUpEndpoint,
    sendResetPass: sendResetPassEndpoint,
    resetPass: resetPassEndpoint,
    registrationConfirm: registrationConfirmEndpoint,
    databaseBackup: databaseBackupEndpoint,
};

export const getLoggedInRouteTitle = (path: string): string => {
    switch (path) {
        case Routes.home:
            return t("home");
        case Routes.databaseBackup:
            return t("db_backup");
        default:
            return "";
    }
}

export const Pages = () => {
    return (
        <>
            <Router>
                <Switch>
                    <LoggedInRoute path={Routes.home} exact component={HomePage}/>
                    <AuthRoute path={Routes.signIn} component={SignIn}/>
                    <AuthRoute path={Routes.signUp} component={SignUpPage}/>
                    <AuthRoute path={Routes.sendResetPass} component={SendResetPass}/>
                    <AuthRoute path={Routes.resetPass} component={ResetPass}/>
                    <Route path={Routes.registrationConfirm} component={RegistrationConfirmPage}/>
                    <AdministrationRoute path={Routes.databaseBackup} exact component={DatabaseBackupPage}/>
                </Switch>
            </Router>
        </>
    );
}

const AdministrationRoute = ({component: Component, path}: RouteProps) => {
    return (
        <>
            <LoggedInRoute path={path} component={Component}/>
        </>
    );
};

const LoggedInRoute = ({component: Component}: RouteProps) => {
    const authState: AuthState = useSelector((state: StoreState) => state.auth);
    const history = useHistory();
    if (!authState.isLoggedIn) {
        history.push(Routes.signIn);
    }
    return (
        <>
            <Route render={otherProps => (
                <LoggedInRouteWrapper>
                    <Component {...otherProps}/>
                </LoggedInRouteWrapper>
            )}/>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            position: "fixed",
            top: theme.spacing(1),
            right: theme.spacing(1),
        },
    }),
);

const AuthRoute = ({component: Component}: RouteProps) => {
    const classes = useStyles();
    return (
        <>
            <Route render={otherProps => (
                <>
                    <LanguageDropdown className={classes.formControl}/>
                    <Component {...otherProps} />
                </>
            )}/>
        </>
    );
};

export default Routes;