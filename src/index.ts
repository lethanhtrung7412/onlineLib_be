import {Application} from "express";
import database from "./database";
import { Environment } from "./config/environment";
import api from "./api";
import swaggerDocs from "./document/swagger";

Environment.setup()

async function connectDB() {
    await database.setup();
}

async function startApiServer(){
    const app: Application = await api.server();
    app.listen(process.env.SERVER_PORT || 8080, () => {
        swaggerDocs(app, Number(process.env.SERVER_PORT));
        console.log(`Application run on http://localhost:${process.env.SERVER_PORT || 8080}`)
    })
}

connectDB();
startApiServer()