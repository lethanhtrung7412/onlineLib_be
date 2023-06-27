import cors from "cors";
import express, { Application, Request, Response } from "express";


interface IApi {
  server(): Promise<Application>;
}

class Api implements IApi {
  async server(): Promise<Application> {
    const app = express();
    app.use(cors());
    app.use(express.json({ limit: "100mb" }));
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (_req: Request, res: Response) => {
      res.send("Welcome to Online Library application!");
    });
    return app;
  }
}

export default new Api();