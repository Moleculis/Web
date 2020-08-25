import Gender from "./enums/Gender";
import SenderContactResponse from "./responses/SenderContactResponse";
import ReceiverContactResponse from "./responses/ReceiverContactResponse";
import Role from "./enums/Role";
import Group from "./Group";

interface User{
    displayname: string,
    fullname: string,
    gender: Gender
    contacts: SenderContactResponse[],
    contactRequests: ReceiverContactResponse[],
    username: string,
    email: string,
    roles: Role[],
    groups: Group[]
    admin_groups: Group[]
}

export default User;