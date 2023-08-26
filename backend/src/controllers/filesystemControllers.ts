import { Request, Response } from "express";
import { FileDbImplementation, ShareFileDbImplementation } from "../implementations/dbImplementation";



export const getAllFilesFromFs = async (req: Request, res: Response) => {
    const empty = new Array();
    const fileModelCrudInstance = new FileDbImplementation();

    const creator: string = req.body.user;
    if(creator) {
        let resp = await fileModelCrudInstance.getAllFiles(creator);
    
        if (resp?.length !== 0) {
            const listOfFileFs = new Array();
            resp?.map((element, index) => {
                listOfFileFs.push(element);
            })
            res.json({listOfFileFs});
        }
        else {
            res.json({msg: "empty"  })
        }
    }
    else {
        // res.json({msg: "Err"});
    }
}

export const deleteFilesFs = async (req: Request, res: Response) => {
    const listOfFiles = req.body.list;
    const creator = req.body.user;
    const fileModelCrudInstance = new FileDbImplementation();
    let resp = await fileModelCrudInstance.deleteFiles(listOfFiles, creator);
    if(resp !== undefined && resp !== null) {
        res.json({list: resp});
    }
    else {
        res.json({msg: "err"}); 
    }
}

export const getSharedFileWithUserController = async (req: Request, res: Response) => {
    const sharedFileCrudInstance = new ShareFileDbImplementation();
    const userId: string = req.body.user;
    if(userId) {
        let sharedFiles = await sharedFileCrudInstance.getSharedFilesWithUser(userId);
        if(sharedFiles) {
            res.json({list: sharedFiles});
        }
        else {
            res.json({msg: "err"});
        }
    }
    else {
        res.json({msg: "err"});
    }
}
