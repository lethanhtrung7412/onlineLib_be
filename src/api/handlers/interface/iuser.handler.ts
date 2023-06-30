import { TypeAuth, User } from "../../../database/entities/User"; 

export interface IUserHandler {
    getById(id: number): Promise<User>;
    getByEmail(email: string): Promise<User>;
    create(data: User): Promise<User>;
    getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User>;
    getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User>;
}