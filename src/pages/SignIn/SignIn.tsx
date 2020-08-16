import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import formStyles from "../../styles/FormStyle";
import {Link as RouterLink, useHistory, useLocation} from "react-router-dom";
import Routes from "../../utils/Routes";
import {connect} from "react-redux";
import {logInAction} from "../../redux/auth/AuthActions";
import {StoreState} from "../../redux/Store";
import {AuthState} from "../../redux/auth/AuthReducer";
import TextFormField from "../../components/Form/TextFormField";
import Form from "../../components/Form/Form";
import {checkPasswordValid, checkUsernameValid} from "../../utils/Validation";
import {SnackbarContext} from "../../components/SnackbarWrapper";
import StoreListener from "../../redux/StoreListener";
import SubmitButton from "../../components/SubmitButton";
import LanguageDropdown from "../../components/LanguageDropdown";
import {useTranslation} from "react-i18next";

interface SignInProps {
    isLoading: boolean,
    logInAction: (username: string, password: string, isRememberMe: boolean) => void,
}

interface SignInLocationState {
    message?: string
}

interface SignInState {
    username: string,
    password: string,
    isRememberMe: boolean
}

const SignIn = ({isLoading, logInAction}: SignInProps) => {
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
                        history.push(Routes.home);
                    }
                }
            }>
            <LanguageDropdown/>
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
                            label="Username"
                            validation={checkUsernameValid}
                            value={username}
                            onChange={updateUsername}
                        />
                        <TextFormField
                            required
                            label="Password"
                            type="password"
                            value={password}
                            onChange={updatePassword}
                            validation={checkPasswordValid}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                            checked={isRememberMe}
                            onChange={updateRememberMe}
                        />
                        <SubmitButton
                            disabled={isLoading}
                            text={t("sing_in")}
                        />
                        <Grid container>
                            <Grid item xs>
                                <Link variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link variant="body2" component={RouterLink} to={Routes.signUp}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
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
    return {
        isLoading: authState.isLoading,
    };
}

const mapDispatchToProps = {
    logInAction: logInAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);