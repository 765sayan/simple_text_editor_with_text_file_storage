import { Request, Response } from "express";
import { FileDbImplementation, ShareFileDbImplementation, UserDbImplementations } from "../implementations/dbImplementation";

import { encryptString, compareString } from "../utils/stringEncryptionMethods";
import { generateToken } from "../utils/jwtMethods";

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

export const editUserInfoController = async (req: Request, res: Response ) => {
    const userCrudInstance = new UserDbImplementations();

    const userData = req.body.userdata;
    const userId: string = req.body.user;
    if(userId && userData.username && userData.password) {
        let encryptedPassword = await encryptString(userData.password);
        const user = await userCrudInstance.updateUserInfo(userData.username, encryptedPassword, userId);
        if (user) {
            res.json({user: user});
        }
        else {
            res.json({msg: "err"});
        }
    }
    else if(userId && userData.username === "" || userData.password === "") {
        let encryptedPassword = "";
        if(userData.password !== ""){
            encryptedPassword = await encryptString(userData.password);
        }
        const user = await userCrudInstance.updateUserInfo(userData.username, encryptedPassword, userId);
        if (user) {
            res.json({user: user});
        }
        else {
            res.json({msg: "err"});
        }
    }
    else {
        res.json({msg: "err"});
    }
}

export const deleteUserInfoController = async (req: Request, res: Response) => {
    const userCrudInstance = new UserDbImplementations();
    const fileModelCrudInstance = new FileDbImplementation();
    const sharedFileCrudInstance = new ShareFileDbImplementation();

    const userId: string = req.body.user;
    if(userId) {
        const user = await userCrudInstance.deleteUser(userId);
        const var1 = 2;
        if(var1 === 2) {
            const sharedFiles = await sharedFileCrudInstance.getAll();
            if(sharedFiles) {
                for(let i=0; i<sharedFiles?.length; i++) {
                    await sharedFileCrudInstance.deleteSecondaryOwnerOfFileForUserDelete(sharedFiles[i].id, userId, sharedFiles[i].fileName);
                }
            }
            
            const files = await fileModelCrudInstance.getAllFiles(userId);
            if(files && files.length !== 0) {
                for(let i=0; i<files.length; i++) {
                    await fileModelCrudInstance.deleteFile(files[i].filename, userId);            
                }
            }
            res.json({msg: "User Deleted"});
        }
        else {
            res.json({msg: "err"});
        }
    }
    else {
        res.json({msg: "err"});
    }
}