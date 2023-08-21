import { Request, Response } from "express";
import { createFile, readFile, removeFile } from "../utils/crudFile";
import { FileDbImplementation } from "../implementations/dbImplementation";
import { searchParamAuthChecker } from "../utils/securityFunctions";

export const downloadFileController = async (req: Request, res: Response) => {
    const fileName = req.query.filename?.toString();
    // const authToken = req.query.authtoken?.toString();
    const authToken = req.body.user;
    let creator = authToken;

    // if(authToken !== undefined) {
    //     const resp = await searchParamAuthChecker(authToken);
    //     if(resp === "Token Wrong") {
    //         res.json({msg: "Not Authenticated"});
    //     }
    //     else {
    //         creator = resp?.id;
    //     }
    // }

    const fileModelCrudInstance = new FileDbImplementation();

    if(fileName !== undefined && creator !== undefined) {
        let resp = await fileModelCrudInstance.getByFileName(fileName, creator);
        if(resp && resp.length !== 0 && resp.length <= 1) {
            const responseObject = resp[0];
            let filename = responseObject.filename;
            let textData = responseObject.textData;
            res.json({textdata: textData});       
        }
    }
}

export const readFileController = async (req: Request, res: Response) => {
    const fileModelCrudInstance = new FileDbImplementation();
    const fileName = req.query.filename?.toString();
    const creator = req.body.user;
    if(fileName !== undefined && creator !== undefined) {
        let resp = await fileModelCrudInstance.getByFileName(fileName, creator);
        if(resp !== undefined && resp.length !== 0) {
            let fileData = resp[0].textData;
            res.json({fileData: fileData});
        }
        else {
            res.json({fileData: "Don't Have Access To Content"});
        }
    }
    else {
        res.json({msg: "Error"});
    }
}

export const createFileController = async (req: Request, res: Response) => {
    const fileModelCrudInstance = new FileDbImplementation();

    const fileName: string = req.body.fileName;
    const textData: string = req.body.textData;
    const creator: string = req.body.user;

    if(fileName !== undefined && textData !== undefined && creator !== undefined) {
    
        const resp = await fileModelCrudInstance.createFile(fileName, textData, creator);
        if(resp) {
            res.json(resp);
        }
    }
    else {
        res.json({msg: "Err"});
    }
}

export const updateFileController = async (req: Request, res: Response) => {
    const fileModelCrudInstance = new FileDbImplementation();
    const filename = req.body.filename;
    const textData = req.body.textdata;
    const creator = req.body.user;

    if(textData !== "" || null || undefined && filename !== null || undefined || "") {
        let resp = await fileModelCrudInstance.updateFile(filename, creator, textData);
        res.json({file: resp});
    }
    else {
        res.json({msg: "err"});
    }

}