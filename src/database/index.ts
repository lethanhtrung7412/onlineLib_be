import { PostgresDataSource } from "./data-source";

export interface IDatabase {
    setup(): Promise<any>;
}

class Database implements IDatabase {
    async setup(): Promise<any> {
        try {
            await PostgresDataSource.initialize();
        } catch (err) {
            console.error(`Failed to connect to database`, err);
        }
    }
}

export default new Database();