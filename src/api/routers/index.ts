import { Router } from "express";

import IRouter from "./interface/IRouter";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import categoryRouter from "./category.router";
import bookRouter from "./book.router";
import voteRouter from "./like.router";

const router = Router();

class BaseRouter implements IRouter {
    get routes(){
        router.use("/auth", authRouter.routes);
        router.use("/user", userRouter.routes);
        router.use("/category", categoryRouter.routes);
        router.use("/book", bookRouter.routes);
        router.use("/like", voteRouter.routes);
        /**
         * @openapi
         * /api/v1/:
         *   get:
         *     tags:
         *     - Testing
         *     description: Welcome to swagger-jsdoc!
         *     responses:
         *       200:
         *         description: Returns a mysterious string.
         */
        router.get("/", (req, res) => {
            res.send("testing route")
        })
        return router
    }
}

export default new BaseRouter();