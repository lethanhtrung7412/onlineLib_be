import { Router } from "express";
import IRouter from "./interface/IRouter";
import authRouter from "./auth.router";
import userRouter from "./user.router";

const router = Router();

class BaseRouter implements IRouter {
    get routes(){
        router.use("/auth", authRouter.routes);
        router.use("/user", userRouter.routes);
        router.get("/", (req, res) => {
            res.send("testing route")
        })
        return router
    }
}

export default new BaseRouter();