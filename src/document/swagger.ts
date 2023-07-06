import { Application, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import j2s from "joi-to-swagger";
import { schema } from "../api/helper/validate.helper";
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version,
    },
    // components: {
    //   securitySchemas: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //       bearerFormat: "JWT",
    //     },
    //   },
    // },
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
    components: {
      register: j2s(schema.authRegister).swagger,
      login: j2s(schema.authLogin).swagger,
      newBook: j2s(schema.createBook).swagger
    },
    basePath: "/api/v1"
  },
  apis: ["./src/api/routers/index.ts", "./src/api/routers/*.router.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: number) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs;