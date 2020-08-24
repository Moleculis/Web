import Gender from "../enums/Gender";

interface RegistrationRequest {
    displayname: string,
    fullname: string,
    gender: Gender,
    username: string,
    email: string,
    password: string
}

export default RegistrationRequest;