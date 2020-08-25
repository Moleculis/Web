import Gender from "./enums/Gender";
import Role from "./enums/Role";

interface UserSmall {
    id: number,
    displayname: string,
    fullname: string,
    username: string
    email: string
    gender: Gender
    roles: Role[]
}

export default UserSmall;