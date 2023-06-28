import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import BaseRouter from "./routers/index";
interface IApi {
  server(): Promise<Application>;
}

class Api implements IApi {
  async server(): Promise<Application> {
    const app = express();
    app.use(cors());
    app.use(cookieParser())
    app.use(express.json({ limit: "100mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/v1", BaseRouter.routes)
    app.get("/", (_req: Request, res: Response) => {
      res.send("Welcome to Online Library application!");
    });
    return app;
  }
}

export default new Api();