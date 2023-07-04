import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import {openapiSpecification} from '../../document/swagger';
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
        router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
        router.get("/", (req, res) => {
            res.send("testing route")
        })
        return router
    }
}

export default new BaseRouter();