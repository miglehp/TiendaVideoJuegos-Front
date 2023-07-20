export interface User {
    id: number,
    username: string,
    password: string,
    email: string,
    active: boolean,
    birth_date: string,
    profile_picture: string,
    is_admin: boolean,
    validated: boolean,
    fatal: string
}