import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IRouter from "./interface/IRouter";
import { schema, validateHelper } from "../helper/validate.helper";
import userHandler from "../handlers/user.handler";
import { TypeAuth } from "../../database/entities/User";
import { errorResponse, successResponse } from "./response";

const router = Router();
class AuthRouter implements IRouter {
    get routes(){
        router.post(
            "/register", 
            validateHelper.validateBody(schema.authRegister),
            async (req: Request, res: Response) => {
                try {
                    const {email, password} = req.body;

                    const userExits = userHandler.getAccountLocal(
                        TypeAuth.LOCAL, 
                        email
                    );
                    if (!userExits) {
                        throw new Error(`User with this email ${email} has been register`)
                    } 

                    const passwordHashed = await bcrypt.hash(password, 10);

                    const newUser = await userHandler.create({
                        ...req.body,
                        password: passwordHashed,
                        typeAuth: TypeAuth.LOCAL
                    })

                    return successResponse(res, newUser);
                } catch (error) {
                    return errorResponse(res, error)
                }
            }
        ),

        router.post(
            "/login",
            validateHelper.validateBody(schema.authLogin),
            async(req: Request, res: Response) => {
                try {
                    const {email, password} = req.body;

                    const user = await userHandler.getAccountLocal(TypeAuth.LOCAL, email);
                    if (!user) {
                        throw new Error("User is not exits");
                    } 

                    const validPassword = await bcrypt.compare(password, user.password);

                    if (!validPassword) {
                        throw new Error("Password incorrect");
                    }

                    const token = jwt.sign(
                        {id: user.id},
                        process.env.JWT_SECRET, {
                            expiresIn: 60*60*1000
                        }
                    )

                    res.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: 60*60*10
                    })

                    return successResponse(res, {...user, token: token})
                } catch (error) {
                    return errorResponse(res, error)
                }
            } 
        )

        return router;
    }
}

export default new AuthRouter();