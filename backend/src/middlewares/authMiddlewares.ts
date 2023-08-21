import { NextFunction, Request, Response } from "express";
import { UserDbImplementations } from "../implementations/dbImplementation";

const { verifyToken } = require("../utils/jwtMethods.js");


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const userCrudInstance = new UserDbImplementations();
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let authToken = req.headers.authorization.split(" ")[1];
        try {
            let decodedToken = await verifyToken(authToken, process.env.SECRET_KEY);
            
            const user = await userCrudInstance.getByUserId(decodedToken);
            if (user) {
                req.body.user = user.id;
                next();
            }
            else {
                res.json({msg: "User Doesn't exist"});
            }
        }
        catch (err) {
            console.log(err);
            res.json({msg: "Token incorrect"});
        }
    } else {
        res.json({msg: "Token incorrect"});
    }
};