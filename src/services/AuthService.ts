import axiosInstance from "./RestApi";
import {usersEndpoint} from "./BaseEndpoints";
import {AxiosResponse} from "axios";
import LoginResponse from "../models/responses/LoginResponse";
import MessageResponse from "../models/responses/MessageResponse";
import BooleanResponse from "../models/responses/BooleanResponse";

const logInEndpoint: string = `${usersEndpoint}/login`;
const sendResetPassEndpoint: string = `${usersEndpoint}/resetPass`;
const checkTokenEndpoint: string = `${usersEndpoint}/tokenValid`;
const resetPassEndpoint: string = `${usersEndpoint}/resetPassConfirm`;
const registrationConfirmEndpoint: string = `${usersEndpoint}/registrationConfirm`;

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

    registrationConfirm = async (token: String): Promise<MessageResponse> => {
        const response: AxiosResponse = await axiosInstance.get(registrationConfirmEndpoint,
            {
                params: {
                    token: token
                }
            });
        return response.data;
    }
}

export default AuthService;