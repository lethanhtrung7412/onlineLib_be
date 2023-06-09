import { Router } from "express";
import IRouter from "./interface/IRouter";
import { errorResponse, successResponse } from "./response";
import userHandler from "../handlers/user.handler";
import bookHandler from "../handlers/book.handler";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";
import categoryHandler from "../handlers/category.handler";
import { Book } from "../../database/entities/Book";

const router = Router();

class BookRouter implements IRouter {
  get routes() {
    /**
         * @openapi
         * /api/v1/book:
         *   get:
         *     tags:
         *     - Book
         *     description: Get all the book
         *     responses:
         *       200:
         *         description: Returns an arrays of book with the status
         *       400:
         *         description: Return an error with the status of error
         */
    router.get("/", async (req, res) => {
      try {
        const books = await bookHandler.getAllBook();
        if (books.length === 0) {
          return errorResponse(res, new Error("No book in DB"));
        }

        return successResponse(res, books);
      } catch (err) {
        return errorResponse(res, err);
      }
    });
    /**
     * @openapi
     * /api/v1/book/create:
     *  post:
     *    tags:
     *    - Book
     *    description: Create a new book
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            $ref: "#/components/newBook"
     *      encoding:
     *         payload:
     *          contentType: application/json
     *      responses:
     *         "200":
     *            description: Returns an arrays of book with the status
     *            content:
     *              application/json:
     *                schema:
     *                  type: object
     *                  $ref: "#/components/newBook"
     *         "400":
     *            description: Return an error with the status of error
     */
    router.post(
      "/create",
      // authMiddleware.authToken,
      // roleMiddleware.isAdmin,
      async (req, res) => {
        try {
          const newBook = req.body;

          newBook.category = await categoryHandler.getSpecificCategories(
            Number(req.body.category)
          );
          const result = await bookHandler.create(newBook);
          return successResponse(res, result);
        } catch (err) {
          return errorResponse(res, err);
        }
      }
    );

    router.put("/update/:id", async (req, res) => {
      try {
        // const previousBook = await bookHandler.getBookById(Number(req.params.id));
        const bookId = Number(req.params.id);
        const updateCategory = await categoryHandler.getSpecificCategories(
          Number(req.body.category)
        );
        const updatedBook = {
          ...req.body,
          category: updateCategory,
        } as Book;
        const result = await bookHandler.update(bookId, updatedBook);
        return successResponse(res, result);
      } catch (error) {
        return errorResponse(res, error);
      }
    });

    router.delete("/delete/:id", async (req, res) => {
      try {
        const bookId = Number(req.params.id);
        const result = await bookHandler.delete(bookId);

        return successResponse(res, result);
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    return router;
  }
}

export default new BookRouter();
