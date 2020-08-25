import {usersEndpoint} from "./BaseEndpoints";
import {AxiosResponse} from "axios";
import axiosInstance from "./RestApi";
import User from "../models/User";

const currentUserEndpoint: string = `${usersEndpoint}/current`;

class UserService {
    getCurrentUser = async (): Promise<User> => {
        const response: AxiosResponse = await axiosInstance.get(currentUserEndpoint);
        return response.data;
    }
}

export default UserService;