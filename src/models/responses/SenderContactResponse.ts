import UserSmall from "../UserSmall";

interface SenderContactResponse{
    id:number,
    accepted: boolean,
    receiver: UserSmall
}

export default SenderContactResponse;