import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import formStyles from "../styles/FormStyle";
import {useHistory, useLocation} from "react-router-dom";
import Routes from "./Base/Routes";
import {connect} from "react-redux";
import {logInAction} from "../redux/auth/AuthActions";
import {StoreState} from "../redux/Store";
import {AuthState} from "../redux/auth/AuthReducer";
import TextFormField from "../components/Form/TextFormField";
import Form from "../components/Form/Form";
import {checkPasswordValid, checkUsernameValid} from "../utils/Validation";
import {SnackbarContext} from "../components/Snackbar/SnackbarWrapper";
import StoreListener from "../redux/StoreListener";
import SubmitButton from "../components/SubmitButton";
import {useTranslation} from "react-i18next";
import TextLink from "../components/TextLink";
import {getCurrentUser} from "../redux/user/UserActions";
import {UserState} from "../redux/user/UserReducer";
import User from "../models/User";

interface SignInProps {
    isLoading: boolean,
    logInAction: (username: string, password: string, isRememberMe: boolean) => void,
    getCurrentUser: () => void,
    currentUser?: User
}

interface SignInLocationState {
    message?: string
}

interface SignInState {
    username: string,
    password: string,
    isRememberMe: boolean
}

const SignInPage = ({isLoading, logInAction, getCurrentUser, currentUser}: SignInProps) => {
    const classes = formStyles();

    const {t} = useTranslation();

    const location = useLocation();
    const snackbarMessage: string | undefined = (location.state as SignInLocationState)?.message;

    const [state, setState] = useState({
        username: "",
        password: "",
        isRememberMe: false,
    } as SignInState);

    const {openSnackBar} = useContext(SnackbarContext);

    const {username, password, isRememberMe} = state;

    const updateUsername = (value: string) => {
        setState({...state, username: value});
    }

    const updatePassword = (value: string) => {
        setState({...state, password: value});
    }

    const updateRememberMe = (e: ChangeEvent<{}>, checked: boolean) => {
        setState({...state, isRememberMe: checked});
    }

    const onSubmit = () => {
        logInAction(username, password, isRememberMe);
    }
    const history = useHistory();
    useEffect(() => {
        if (snackbarMessage) {
            openSnackBar(snackbarMessage);
            history.replace({});
        } else if (currentUser) {
            history.push(Routes.home);
        }
    });

    return (
        <StoreListener<StoreState, AuthState>
            mapper={(state) => state.auth}
            listener={
                (dispatch, currentState) => {
                    if (currentState.error) {
                        openSnackBar(currentState.error, "error");
                    } else if (currentState.isLoggedIn) {
                        getCurrentUser();
                    }
                }
            }>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        {t("sing_in")}
                    </Typography>
                    <Form className={classes.form} onSubmit={onSubmit}>
                        <TextFormField
                            required
                            autoFocus
                            label={t("username")}
                            validation={checkUsernameValid}
                            value={username}
                            onChange={updateUsername}
                        />
                        <TextFormField
                            required
                            label={t("password")}
                            type="password"
                            value={password}
                            onChange={updatePassword}
                            validation={checkPasswordValid}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label={t("remember_me")}
                            checked={isRememberMe}
                            onChange={updateRememberMe}
                        />
                        <SubmitButton
                            disabled={isLoading}
                            text={t("sing_in")}
                        />
                        <Grid container>
                            <Grid item xs>
                                <TextLink to={Routes.sendResetPass} text={t("forgot_pass")}/>
                            </Grid>
                            <Grid item>
                                <TextLink to={Routes.signUp} text={t("no_account")}/>
                            </Grid>
                        </Grid>
                    </Form>
                </div>
            </Container>
        </StoreListener>
    );
}

const mapStateToProps = (state: StoreState) => {
    const authState: AuthState = state.auth;
    const userState: UserState = state.user;
    return {
        isLoading: authState.isLoading,
        currentUser: userState.currentUser
    };
}

const mapDispatchToProps = {
    logInAction: logInAction,
    getCurrentUser: getCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);