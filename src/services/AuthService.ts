import axiosInstance from "./RestApi";
import {usersEndpoint} from "./BaseEndpoints";
import {AxiosResponse} from "axios";
import LoginResponse from "../models/responses/LoginResponse";
import MessageResponse from "../models/responses/MessageResponse";
import BooleanResponse from "../models/responses/BooleanResponse";
import RegistrationRequest from "../models/requests/RegistrationRequest";

const logInEndpoint: string = `${usersEndpoint}/login`;
const sendResetPassEndpoint: string = `${usersEndpoint}/resetPass`;
const checkTokenEndpoint: string = `${usersEndpoint}/tokenValid`;
const resetPassEndpoint: string = `${usersEndpoint}/resetPassConfirm`;
const registrationEndpoint: string = `${usersEndpoint}/register`;
const registrationConfirmEndpoint: string = `${usersEndpoint}/registrationConfirm`;
const logOutEndpoint: string = `${usersEndpoint}/logout`;

class AuthService {
    logIn = async (username: string, password: string): Promise<LoginResponse> => {
        const response: AxiosResponse = await axiosInstance.post(logInEndpoint,
            {username: username, password: password});

        return response.data;
    }

    sendResetPassMessage = async (email: string): Promise<MessageResponse> => {
        const response: AxiosResponse = await axiosInstance.post(sendResetPassEndpoint,
            null, {
                params: {
                    email: email
                }
            });
        return response.data;
    }

    checkToken = async (token: string): Promise<BooleanResponse> => {
        const response: AxiosResponse = await axiosInstance.get(checkTokenEndpoint,
            {
                params: {
                    token: token
                }
            });
        return response.data;
    }

    resetPass = async (token: string, password: string): Promise<MessageResponse> => {
        const response: AxiosResponse = await axiosInstance.post(resetPassEndpoint,
            {
                token, password
            });
        return response.data;
    }

    register = async (request: RegistrationRequest): Promise<MessageResponse> => {
        const response: AxiosResponse = await axiosInstance.post(registrationEndpoint, request);
        return response.data;
    }

    registrationConfirm = async (token: String): Promise<MessageResponse> => {
        const response: AxiosResponse = await axiosInstance.get(registrationConfirmEndpoint,
            {
                params: {
                    token: token
                }
            });
        return response.data;
    }

    logOut = async (): Promise<MessageResponse> => {
        const response: AxiosResponse = await axiosInstance.post(logOutEndpoint);
        return response.data;
    }
}

export default AuthService;