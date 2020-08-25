import UserSmall from "./UserSmall";

interface Group {
    id: number,
    title: string,
    description: string,
    users: UserSmall[],
    admins: UserSmall[],
}

export default Group;