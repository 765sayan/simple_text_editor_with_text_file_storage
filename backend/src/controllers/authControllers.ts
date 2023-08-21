import { Request, Response } from "express";
import { UserDbImplementations } from "../implementations/dbImplementation";

const { encryptString, compareString } = require("../utils/stringEncryptionMethods.js");
const { generateToken } = require("../utils/jwtMethods.js");

export const loginController = async (req: Request, res: Response) => {
    const userCrudInstance = new UserDbImplementations();
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        const user = await userCrudInstance.getByUserName(username);
        if(user) {
            const passwordBool = await compareString(password, user.password);
            if(passwordBool) {
                const token = generateToken(user.id);
                res.json({token: token, username: user.username});
            }
            else {
                res.json({msg: "Password Not Correct"});
            }
        }
        else {
            res.json({msg: "Username Not Correct"});
        }
    }
    else {
        res.json({msg: "Enter Username Or Password"});
    }
}

export const registerController = async (req: Request, res: Response) => {
    const userCrudInstance = new UserDbImplementations();
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        const user = await userCrudInstance.getByUserName(username);
        if(user) {
            res.json({msg: "Username already exists"});
        }
        else {
            const encryptedPassword = await encryptString(password);
            const user = await userCrudInstance.createUser(username, encryptedPassword);
            if(user) {
                const token = generateToken(user.id);
                res.json({token: token, username: user.username});
            }
            else {
                res.json({msg: "Error" });
            }
        }
    }
    else {

        res.json({msg: "Enter Username Or Password"});
    }

}

export const getUserInfoController = async (req: Request, res: Response) => {
    const userCrudInstance = new UserDbImplementations();
    
    const userId: string = req.body.user;
    if(userId) {

        const user = await userCrudInstance.getByUserId(userId);
        if(user) {
            res.json(user);
        }
        else {
            res.json({msg: "err"});
        }
    }
    else {
        res.json({msg: "err"});
    }

}