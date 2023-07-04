import { Router } from "express";

import IRouter from "./interface/IRouter";
import { IUserAuthInfoRequest } from "../types/interface";
import authMiddleware from "../middleware/auth.middleware";
import { errorResponse, successResponse } from "./response";
import voteHandler from "../handlers/like.handler";
import { Like } from "../../database/entities/Like";
import bookRepository from "../../database/repository/book.repository";
import bookHandler from "../handlers/book.handler";
import userHandler from "../handlers/user.handler";
import { error } from "console";

const router = Router();

class VoteRouter implements IRouter {
    get routes() {
        router.post(
            "/:id/up",
            authMiddleware.authToken,
            async (req: IUserAuthInfoRequest, res) => {
                try {
                    const book = await bookHandler.getBookById(Number(req.params.id))
                    if (!book) {
                        return errorResponse(res, new Error("Book does not exits"))
                    }
                    const user = await userHandler.getById(req.user.id)
                    const newLike = await voteHandler.create({
                        user: user,
                        book: book,
                    } as Like)
                    return successResponse(res, newLike);
                } catch (error) {
                    return errorResponse(res, error);
                }
            }
        )

        return router
    }
}

export default new VoteRouter();