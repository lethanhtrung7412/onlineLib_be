import { Category } from "../../database/entities/Category";
import categoryRepository from "../../database/repository/category.repository";
import { ICategoryHandler } from "./interface/icategory.handler";

class CategoryHandler implements ICategoryHandler {
  async getAllCategories(): Promise<Category[]> {
    try {
      const categories = await categoryRepository.getAllCategories();
      return categories;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getSpecificCategories(id: number): Promise<Category> {
    try {
      const category = await categoryRepository.getSpecificCategory(id);
      return category;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCategoryByName(name: string): Promise<Category> {
    try {
      const category = await categoryRepository.getCategoryByName(name);
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data: Category): Promise<Category> {
    try {
      const newCategory = await categoryRepository.create(data);
      return newCategory;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CategoryHandler();
