import { Request, Response } from "express";
import { createFile, readFile, removeFile } from "../utils/crudFile";
import { FileDbImplementation } from "../implementations/dbImplementation";
import { searchParamAuthChecker } from "../utils/securityFunctions";

export const downloadFileController = async (req: Request, res: Response) => {
    const fileName = req.query.filename?.toString();
    const authToken = req.query.authtoken?.toString();
    let creator = "";

    if(authToken !== undefined) {
        const resp = await searchParamAuthChecker(authToken);
        if(resp === "Token Wrong") {
            res.json({msg: "Not Authenticated"});
        }
        else {
            creator = resp?.id;
        }
    }

    const fileModelCrudInstance = new FileDbImplementation();

    if(fileName !== undefined && creator !== undefined) {
        let res = await fileModelCrudInstance.getByFileName(fileName, creator);
        if(res && res.length !== 0 && res.length <= 1) {
            const responseObject = res[0];
            let filename = responseObject.filename;
            let textData = responseObject.textData;
            createFile(textData, filename);
        }
    }

    res.download(`${process.env.FILE_PATH}/${fileName}`);
}

export const removeFileController = async (req: Request, res: Response) => {
    const fileName = req.query.filename?.toString();
    if(fileName !== undefined) {
        removeFile(fileName);
    }
    res.json({ msg: req.query.filename});
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