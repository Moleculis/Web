import React, {useContext, useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import formStyles from "../styles/FormStyle";
import {connect} from "react-redux";
import {StoreState} from "../redux/Store";
import {AuthState} from "../redux/auth/AuthReducer";
import TextFormField from "../components/Form/TextFormField";
import Form from "../components/Form/Form";
import {checkPasswordValid} from "../utils/Validation";
import {SnackbarContext} from "../components/Snackbar/SnackbarWrapper";
import StoreListener from "../redux/StoreListener";
import SubmitButton from "../components/SubmitButton";
import {useTranslation} from "react-i18next";
import Routes from "./Base/Routes";
import {useHistory, useLocation} from "react-router-dom";
import queryString from 'query-string'
import {checkTokenAction, resetPassAction, TOKEN_NOT_VALID, TOKEN_VALID} from "../redux/auth/AuthActions";

interface ResetPassProps {
    isLoading: boolean,
    checkTokenAction: (token: string) => void,
    resetPassAction: (token: string, password: string) => void,
}

let tokenChecked: boolean = false;
const ResetPass = ({isLoading, checkTokenAction, resetPassAction}: ResetPassProps) => {
    const classes = formStyles();

    const location = useLocation();
    const token: string | undefined = queryString.parse(location.search).token?.toString();
    const history = useHistory();
    if (!token) {
        history.push(Routes.signIn);
    } else {
        if (!tokenChecked && !isLoading) {
            tokenChecked = true;
            checkTokenAction(token);
        }
    }

    const {t} = useTranslation();

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const {openSnackBar} = useContext(SnackbarContext);

    if (isLoading && !tokenChecked) {
        return (<></>);
    }

    const onSubmit = () => {
        resetPassAction(token!, password2);
    }

    return (
        <StoreListener<StoreState, AuthState>
            mapper={(state) => state.auth}
            listener={
                (dispatch, currentState) => {
                    if (currentState.error) {
                        if (currentState.error === TOKEN_NOT_VALID) {
                            history.push(Routes.signIn);
                        } else {
                            openSnackBar(currentState.error, "error");
                        }
                    } else if (currentState.message) {
                        if (currentState.message !== TOKEN_VALID) {
                            history.push(Routes.signIn, {message: currentState.message});
                        }
                    }
                }
            }>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        {t("change_pass")}
                    </Typography>
                    <Form className={classes.form} onSubmit={onSubmit}>
                        <TextFormField
                            required
                            label={t("password")}
                            type="password"
                            value={password1}
                            onChange={setPassword1}
                            validation={checkPasswordValid}
                            autoComplete="current-password"
                        />
                        <TextFormField
                            required
                            label={t("confirm_password")}
                            type="password"
                            value={password2}
                            onChange={setPassword2}
                            validation={(_) => {
                                if (password1 !== password2) {
                                    return t("diff_pass");
                                }
                                return undefined;
                            }}
                            autoComplete="current-password"
                        />
                        <SubmitButton
                            disabled={isLoading}
                            text={t("send")}
                        />
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
    checkTokenAction: checkTokenAction,
    resetPassAction: resetPassAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);