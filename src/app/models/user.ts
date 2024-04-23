import { Gender } from "./gender";
import { Role } from "./role";

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    age: number,
    gender: Gender,
    cnic: string,
    role: Role,
}
