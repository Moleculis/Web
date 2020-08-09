import axiosInstance from "./RestApi";
import {usersEndpoint} from "./BaseEndpoints";
import {AxiosResponse} from "axios";
import LoginResponse from "../models/responses/LoginResponse";

const logInEndpoint: string = `${usersEndpoint}/login`;

class AuthService {
    logIn = async (username: string, password: string): Promise<LoginResponse> => {
        const response: AxiosResponse = await axiosInstance.post(logInEndpoint,
            {username: username, password: password});

        return response.data;
    }
}

export default AuthService;