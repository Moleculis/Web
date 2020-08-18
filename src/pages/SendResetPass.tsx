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
import {checkEmailValid} from "../utils/Validation";
import {SnackbarContext} from "../components/Snackbar/SnackbarWrapper";
import StoreListener from "../redux/StoreListener";
import SubmitButton from "../components/SubmitButton";
import {useTranslation} from "react-i18next";
import Routes from "./Base/Routes";
import TextLink from "../components/TextLink";
import {sendResetPassMailAction} from "../redux/auth/AuthActions";
import {useHistory} from 'react-router-dom';

interface SendResetPassProps {
    isLoading: boolean,
    message?: string,
    sendResetPassMailAction: (email: string) => void
}

const SendResetPass = ({isLoading, sendResetPassMailAction}: SendResetPassProps) => {
    const classes = formStyles();

    const {t} = useTranslation();

    const [email, setEmail] = useState("");

    const {openSnackBar} = useContext(SnackbarContext);

    const history = useHistory();

    const onSubmit = () => {
        sendResetPassMailAction(email);
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
                        {t("reset_pass")}
                    </Typography>
                    <Form className={classes.form} onSubmit={onSubmit}>
                        <TextFormField
                            required
                            autoFocus
                            label={t("email")}
                            validation={checkEmailValid}
                            value={email}
                            onChange={setEmail}
                            type="email"
                        />
                        <SubmitButton
                            disabled={isLoading}
                            text={t("send")}
                        />
                        <TextLink to={Routes.signIn} text={t("remembered_pass")}/>
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

const mapDispatchToProps = {
    sendResetPassMailAction: sendResetPassMailAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SendResetPass);