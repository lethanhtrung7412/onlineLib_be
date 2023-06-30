import authMiddleware from "../middleware/auth.middleware";
import IRouter from "./interface/IRouter";
import { Router } from "express";
import { errorResponse, successResponse } from "./response";
import { schema, validateHelper } from "../helper/validate.helper";
import userHandler from "../handlers/user.handler";

const router = Router();

class UserRouter implements IRouter {
    get routes() {
        router.get(
            "/:id",
            authMiddleware.authToken,
            validateHelper.validateParams(schema.params),
            async (req, res) => {
                try {
                    const {id} = req.params;
                    const user = await userHandler.getById(Number(id));

                    return successResponse(res, user);
                } catch (error) {
                    return errorResponse(res, error)
                }
            }
        )

        return router;
    }
}

export default new UserRouter();
