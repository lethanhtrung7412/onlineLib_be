import { Router } from "express";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";
import categoryHandler from "../handlers/category.handler";
import { schema, validateHelper } from "../helper/validate.helper";
import authMiddleware from "../middleware/auth.middleware";
import { Category } from "../../database/entities/Category";
import roleMiddleware from "../middleware/role.middleware";

const router = Router();

class CategoryRouter implements IRouter {
  get routes() {
    /**
         * @openapi
         * /api/v1/category:
         *   get:
         *     tags:
         *     - Category
         *     description: Get all the categories
         *     responses:
         *       200:
         *         description: Returns an array of categories
         *       400:
         *         description: Returns the error
         */
    router.get("/", async (req, res) => {
      try {
        const categories = await categoryHandler.getAllCategories();
        if (categories.length == 0) {
          return errorResponse(res, new Error("No category"), 205);
        }
        return successResponse(res, categories);
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
      roleMiddleware.isAdmin,
      async (req, res) => {
        try {
          const { name } = req.body;
          const categoryExits = await categoryHandler.getCategoryByName(name);
          if (categoryExits) {
            return errorResponse(
              res,
              new Error("Category with this name has exits")
            );
          }

          const newCategory = await categoryHandler.create({
            name,
          } as Category);

          return successResponse(res, newCategory);
        } catch (err) {
          return errorResponse(res, err);
        }
      }
    );

    router.delete("/delete/:id", async (req, res) => {
      try {
        const categoryId = Number(req.params.id);
        const deletedCategory = await categoryHandler.delete(categoryId);
        return successResponse(res, deletedCategory);
      } catch (error) {
        return errorResponse(res, error);
      }
    });

    return router;
  }
}

export default new CategoryRouter();
