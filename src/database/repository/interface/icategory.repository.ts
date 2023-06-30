import { Category } from "../../entities/Category";

export default interface ICategoryRepository {
    getAllCategories(): Promise<Category[]>,
    getSpecificCategory(id: number): Promise<Category>,
    getCategoryByName(name: string): Promise<Category>
    create(data: Category): Promise<Category>
}