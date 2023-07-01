import { DeleteResult, Repository, UpdateResult } from "typeorm";
import ICategoryRepository from "./interface/icategory.repository";
import { Category } from "../entities/Category";
import { PostgresDataSource } from "../data-source";

class CategoryRepository implements ICategoryRepository {
    repo: Repository<Category>;

    constructor(){
        this.repo = PostgresDataSource.getRepository(Category)
    }

    getAllCategories(): Promise<Category[]> {
        return this.repo.find({
            relations: {
                books: true
            }
        })
    }

    getSpecificCategory(id: number): Promise<Category> {
        return this.repo.findOne({
            where: {id}
        })
    }

    getCategoryByName(name: string): Promise<Category> {
        return this.repo.findOne({
            where: {name}
        })
    }

    create(data: Category): Promise<Category> {
        return this.repo.save(data);
    }

    update(id: number, data: Category): Promise<UpdateResult> {
        return this.repo.update(id, data)
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repo.delete(id);
    }
}

export default new CategoryRepository();