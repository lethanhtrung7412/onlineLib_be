import { Router } from "express";
import IRouter from "./interface/IRouter";

const router = Router();

class BaseRouter implements IRouter {
    get routes(){
        // router.use("/auth", auth)
        router.get("/", (req, res) => {
            res.send("testing route")
        })
        return router
    }
}

export default new BaseRouter();