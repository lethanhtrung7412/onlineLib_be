import { Router } from "express";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";
import categoryHandler from "../handlers/category.handler";
import { schema, validateHelper } from "../helper/validate.helper";
import authMiddleware from "../middleware/auth.middleware";
import { Category } from "../../database/entities/Category";

const router = Router();

class CategoryRouter implements IRouter {
  get routes() {
    router.get("/", async (req, res) => {
      try {
        const categories = await categoryHandler.getAllCategories();
        if (categories.length == 0) {
            return errorResponse(res, new Error("No category"), 205);
        }
        return categories;
      } catch (error) {
        return errorResponse(res, error);
      }
    });

    router.get(
      "/:id",
      validateHelper.validateParams(schema.params),
      async (req, res) => {
        try {
          const { id } = req.params;
          const category = await categoryHandler.getSpecificCategories(
            Number(id)
          );
          return category;
        } catch (err) {
          return errorResponse(res, err);
        }
      }
    );

    router.post(
        "/create",
        authMiddleware.authToken,
        async(req, res) => {
            try {
                const {name} = req.body
                const categoryExits = await categoryHandler.getCategoryByName(name);
                if (categoryExits) {
                    return errorResponse(res, new Error("Category with this name has exits"))
                }

                const newCategory = await categoryHandler.create({
                    name
                } as Category);

                return successResponse(res, newCategory);
            } catch (err) {
                return errorResponse(res, err)
            }
        }
    )

    return router;
  }
}

export default new CategoryRouter();