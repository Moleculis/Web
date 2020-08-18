import React from "react";
import Routes from "./Base/Routes";
import {useHistory, useLocation} from "react-router-dom";
import queryString from 'query-string'
import PagePlaceholder from "../components/PagePlaceholder";
import AuthService from "../services/AuthService";
import MessageResponse from "../models/responses/MessageResponse";

const RegistrationConfirm = () => {
    const location = useLocation();
    const token: string | undefined = queryString.parse(location.search).token?.toString();
    const history = useHistory();
    if (!token) {
        history.push(Routes.signIn);
    } else {
        const authService = new AuthService();
        authService.registrationConfirm(token).then((response: MessageResponse) => {
            history.push(Routes.signIn, {message: response.message});
        }).catch(_ => {
            history.push(Routes.signIn);
        })
    }

    return (
        <PagePlaceholder/>
    );
}

export default RegistrationConfirm;