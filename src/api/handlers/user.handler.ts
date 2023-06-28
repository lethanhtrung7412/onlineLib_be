import { TypeAuth, User } from "../../database/entities/User";
import userRepository from "../../database/repository/user.repository";
import { IUserHandler } from "./interface/iuser.handler";

class UserHandler implements IUserHandler {
    async getByEmail(email: string): Promise<User> {
        try {
            const user = await userRepository.getByEmail(email);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<User> {
        try {
            const user = await userRepository.getById(id);
            return user;
        } catch (error) {
            throw error;
        }    
    }

    async getAccountLocal(typeAuth: TypeAuth, email: string): Promise<User> {
        try {
            const user = await userRepository.getAccountLocal(typeAuth, email)
            return user;
        } catch (error) {
            throw error
        }
    }

    async getAccountGoogle(typeAuth: TypeAuth, googleId: string): Promise<User> {
        try {
            const user = await userRepository.getAccountGoogle(typeAuth, googleId);
            return user;
        } catch (error) {
            throw error
        }
    }

    async create(data: User): Promise<User> {
        try {
            const newUser = await userRepository.create(data);
            return newUser;
        } catch (error) {
            throw error
        } 
    }
}

export default new UserHandler();