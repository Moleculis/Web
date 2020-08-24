import React, {useContext, useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import formStyles from "../styles/FormStyle";
import Routes from "./Base/Routes";
import {useTranslation} from "react-i18next";
import {SnackbarContext} from "../components/Snackbar/SnackbarWrapper";
import StoreListener from "../redux/StoreListener";
import {StoreState} from "../redux/Store";
import {AuthState} from "../redux/auth/AuthReducer";
import Form from "../components/Form/Form";
import TextFormField from "../components/Form/TextFormField";
import {checkEmailValid, checkPasswordValid, checkUsernameValid} from "../utils/Validation";
import SubmitButton from "../components/SubmitButton";
import TextLink from "../components/TextLink";
import {connect} from "react-redux";
import Gender from "../models/enums/Gender";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {registerAction} from "../redux/auth/AuthActions";
import RegistrationRequest from "../models/requests/RegistrationRequest";

interface SignUpState {
    username: string,
    password1: string,
    password2: string,
    email: string,
    displayName: string,
    fullName: string,
    gender: Gender
}

interface SignUpProps {
    isLoading: boolean,
    registerAction: (request: RegistrationRequest) => void
}

const SignUpPage = ({isLoading, registerAction}: SignUpProps) => {
    const classes = formStyles();
    const {t} = useTranslation();

    const [state, setState] = useState({
        username: "",
        password1: "",
        password2: "",
        email: "",
        displayName: "",
        fullName: "",
        gender: Gender.MALE
    } as SignUpState);

    const {openSnackBar} = useContext(SnackbarContext);

    const {username, password1, password2, email, displayName, fullName, gender} = state;

    const updateUsername = (value: string) => {
        setState({...state, username: value});
    }

    const updatePassword1 = (value: string) => {
        setState({...state, password1: value});
    }

    const updatePassword2 = (value: string) => {
        setState({...state, password2: value});
    }

    const updateEmail = (value: string) => {
        setState({...state, email: value});
    }

    const updateDisplayName = (value: string) => {
        setState({...state, displayName: value});
    }

    const updateFullName = (value: string) => {
        setState({...state, fullName: value});
    }

    const updateGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            gender: (event.target as HTMLInputElement).value as Gender,
        });
    }

    const history = useHistory();

    const onSubmit = () => {
        registerAction({
            displayname: displayName,
            fullname: fullName,
            gender: gender,
            username: username,
            email: email,
            password: password1
        });
    }

    return (
        <StoreListener<StoreState, AuthState>
            mapper={(state) => state.auth}
            listener={
                (dispatch, currentState) => {
                    if (currentState.error) {
                        openSnackBar(currentState.error, "error");
                    } else if (currentState.message) {
                        history.push(Routes.signIn, {message: currentState.message});
                    }
                }
            }>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        {t("sing_un")}
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
                            value={password1}
                            onChange={updatePassword1}
                            validation={checkPasswordValid}
                        />
                        <TextFormField
                            required
                            label={t("confirm_password")}
                            type="password"
                            value={password2}
                            onChange={updatePassword2}
                            validation={() => {
                                if (password1 !== password2) {
                                    return t("diff_pass");
                                }
                                return undefined;
                            }}
                        />
                        <TextFormField
                            required
                            label={t("email")}
                            validation={checkEmailValid}
                            value={email}
                            onChange={updateEmail}
                            type="email"
                        />
                        <TextFormField
                            required
                            label={t("display_name")}
                            value={displayName}
                            onChange={updateDisplayName}
                        />
                        <TextFormField
                            required
                            label={t("full_name")}
                            value={fullName}
                            onChange={updateFullName}
                        />
                        <FormControl component="fieldset" className={classes.legendBlock}>
                            <FormLabel component="legend" className={classes.legend}>{t("gender")}</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={updateGender}>
                                <FormControlLabel value={Gender.MALE} control={<Radio/>} label={t("male")}/>
                                <FormControlLabel value={Gender.FEMALE} control={<Radio/>} label={t("female")}/>
                            </RadioGroup>
                        </FormControl>
                        <SubmitButton
                            disabled={isLoading}
                            text={t("sing_un_button")}
                        />
                        <Grid container>
                            <Grid item xs/>
                            <Grid item>
                                <TextLink to={Routes.signIn} text={'Already have an account? Sign in'}/>
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
    registerAction: registerAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);