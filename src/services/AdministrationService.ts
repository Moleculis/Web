import {administrationEndpoint} from "./BaseEndpoints";
import {AxiosResponse} from "axios";
import axiosInstance from "./RestApi";
import MessageResponse from "../models/responses/MessageResponse";
import ListResponse from "../models/responses/ListResponse";

const backupsEndpoint: string = `${administrationEndpoint}/backups`;

class AdministrationService {
    createDbBackup = async (): Promise<MessageResponse> => {
        const response: AxiosResponse = await axiosInstance.post(backupsEndpoint);
        return response.data;
    }

    getDbBackups = async (): Promise<ListResponse<string>> => {
        const response: AxiosResponse = await axiosInstance.get(backupsEndpoint);
        return response.data;
    }

    restoreDbBackup = async (backup: string): Promise<MessageResponse> => {
        const response: AxiosResponse = await axiosInstance.put(backupsEndpoint, null, {
            params: {
                backup: backup
            }
        });
        return response.data;
    }
}

export default AdministrationService;