import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../routers/response";
import { IUserAuthInfoRequest } from "../types/interface";

class RoleMiddleware {
  async isAdmin(req:IUserAuthInfoRequest, res:Response, next:NextFunction) {
    try {
      const user = req.user;

      if(!user.isAdmin){
        throw new Error("You don't permission to do this");
      }

      req.user = user;
      next();
      
    } catch (error) {
      return errorResponse(res,error);
    }
  }
}

export default new RoleMiddleware()