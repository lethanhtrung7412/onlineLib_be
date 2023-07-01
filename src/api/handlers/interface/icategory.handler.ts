import { DeleteResult } from "typeorm";
import { Category } from "../../../database/entities/Category";

export interface ICategoryHandler {
    getAllCategories(): Promise<Category[]>
    getSpecificCategories(id: number): Promise<Category>
    getCategoryByName(name: string): Promise<Category>
    create(data: Category): Promise<Category>
  delete(id: number): Promise<DeleteResult>

}