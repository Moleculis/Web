import axiosInstance from "./RestApi";
import {usersEndpoint} from "./BaseEndpoints";
import {AxiosResponse} from "axios";
import LoginResponse from "../models/responses/LoginResponse";
import MessageResponse from "../models/responses/MessageResponse";

const logInEndpoint: string = `${usersEndpoint}/login`;
const sendResetPassEndpoint: string = `${usersEndpoint}/resetPass`;

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
}

export default AuthService;