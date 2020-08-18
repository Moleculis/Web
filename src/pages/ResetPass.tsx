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

interface ResetPassProps {
    isLoading: boolean
}

const ResetPass = ({isLoading}: ResetPassProps) => {
    const classes = formStyles();

    const location = useLocation();
    const token = queryString.parse(location.search).token;
    console.log(`token: ${token}`);


    const {t} = useTranslation();

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const {openSnackBar} = useContext(SnackbarContext);

    const history = useHistory();

    const onSubmit = () => {
        // TODO send reset password request
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
                            validation={(value: string) => {
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
        isLoading: authState.isLoading
    };
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);