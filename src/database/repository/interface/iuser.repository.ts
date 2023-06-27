import { TypeAuth, User } from "../../entities/User";

export interface IUserRepository {
    getByEmail(email: string): Promise<User>,
    getById(id: number): Promise<User>,
    create(data: User): Promise<User>,
    getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User>,
    getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User>
}