import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IRouter from "./interface/IRouter";
import { schema, validateHelper } from "../helper/validate.helper";
import userHandler from "../handlers/user.handler";
import { TypeAuth } from "../../database/entities/User";
import { errorResponse, successResponse } from "./response";
import authMiddleware from "../middleware/auth.middleware";
import { IUserAuthInfoRequest } from "../types/interface";

const router = Router();
class AuthRouter implements IRouter {
  get routes() {
    /**
     * @openapi
     * /api/v1/auth/register:
     *  post:
     *    tags:
     *    - Authentication
     *    description: Create a new user
     *    requestBody:
     *      required: true
     *      content:
     *        multipart/form-data:
     *          schema:
     *            $ref: "#/components/register"
     *    response:
     *      200:
     *        descriptions: Return the user's info
     *      400:
     *        descriptions: Return the error
     */
    router.post(
      "/register",
      validateHelper.validateBody(schema.authRegister),
      async (req: Request, res: Response) => {
        try {
          const { email, password } = req.body;

          const userExits = userHandler.getAccountLocal(TypeAuth.LOCAL, email);
          if (!userExits) {
            throw new Error(`User with this email ${email} has been register`);
          }

          const passwordHashed = await bcrypt.hash(password, 10);

          const newUser = await userHandler.create({
            ...req.body,
            password: passwordHashed,
            typeAuth: TypeAuth.LOCAL,
          });

          return successResponse(res, newUser);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    ),
    /**
     * @openapi
     * /api/v1/auth/login:
     *  post:
     *    tags:
     *    - Authentication
     *    description: Login an existing user
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            $ref: "#/components/login"
     *      encoding:
     *         payload:
     *          contentType: application/json
     *    response:
     *      200:
     *        descriptions: Return the user's info
     *        content:
     *          schema:
     *            $ref: "#/components/login"
     *      400:
     *        descriptions: Return the error
     */
      router.post(
        "/login",
        validateHelper.validateBody(schema.authLogin),
        async (req: Request, res: Response) => {
          try {
            const { email, password } = req.body;

            const user = await userHandler.getAccountLocal(
              TypeAuth.LOCAL,
              email
            );
            if (!user) {
              throw new Error("User is not exits");
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
              throw new Error("Password incorrect");
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 1000,
            });

            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: 60 * 60 * 10,
            });

            return successResponse(res, {
              email: user.email,
              name: user.name,
            });
          } catch (error) {
            return errorResponse(res, error);
          }
        }
      );

    /**
     * @openapi
     * /api/v1/auth/logout:
     *  post:
     *    tags:
     *    - Authentication
     *    description: Logging user out
     *    response:
     *      200:
     *        descriptions: Log out success
     *      400:
     *        descriptions: Return the error
     */
    router.post("/logout", async (req, res) => {
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      return successResponse(res, "Logout successfully");
    });

    router.get(
      "/profile",
      authMiddleware.authToken,
      async (req: IUserAuthInfoRequest, res) => {
        try {
          return successResponse(res, req.user);
        } catch (error) {
          return errorResponse(res, error);
        }
      }
    );
    return router;
  }
}

export default new AuthRouter();
