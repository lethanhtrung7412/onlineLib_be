import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { errorResponse } from "../routers/response";

export const schema = {
    params: Joi.object({
        id: Joi.number().required(),
      }),
    authRegister: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            .required(),
        passwordConfirm: Joi.valid(Joi.ref("password")).required(),
    }),

    authLogin: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .required()
    })
}

export const validateHelper = {
    validateBody: (schema: any) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const result = schema.validate(req.body);
            if (result.error) {
                return errorResponse(res, result.error);
            } else {
                next();
            }
        }
    },

    validateParams: (schema: any) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const result = schema.validate(req.params);
            if (result.error) {
                return errorResponse(res, result.error);
            } else {
                next();
            }
        }
    },
}