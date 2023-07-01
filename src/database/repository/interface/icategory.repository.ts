import { DeleteResult, UpdateResult } from "typeorm";
import { Category } from "../../entities/Category";

export default interface ICategoryRepository {
    getAllCategories(): Promise<Category[]>,
    getSpecificCategory(id: number): Promise<Category>,
    getCategoryByName(name: string): Promise<Category>
    create(data: Category): Promise<Category>,
    update(id: number, data: Category): Promise<UpdateResult>,
    delete(id: number): Promise<DeleteResult>
}