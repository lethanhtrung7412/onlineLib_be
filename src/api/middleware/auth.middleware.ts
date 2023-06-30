import {Response, NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import { IUserAuthInfoRequest } from "../types/interface";
import { errorResponse } from "../routers/response";
import userHandler from "../handlers/user.handler";

class AuthMiddleware {
    async authToken(
        req: IUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const token = req.cookies.jwt;
            if (!token) {
                throw new Error(`Unauthorize`);
            }
            const result: JwtPayload | any = jwt.verify(
                token, process.env.JWT_SECRET
            )

            const user = await userHandler.getById(result.id);
            req.user = user;
            next();
        } catch (error) {
            return errorResponse(res, error, 401);
        }
    }
}

export default new AuthMiddleware();