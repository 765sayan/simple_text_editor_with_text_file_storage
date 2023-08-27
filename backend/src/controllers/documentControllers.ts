import { Request, Response } from "express";
import {
  FileDbImplementation,
  ShareFileDbImplementation,
  UserDbImplementations,
} from "../implementations/dbImplementation";
import { createNewFileIfFileAlreadyExists } from "../utils/newFileCreationUtils";

export const downloadFileController = async (req: Request, res: Response) => {
  const fileName = req.query.filename?.toString();
  const authToken = req.body.user;
  let creator = authToken;

  const fileModelCrudInstance = new FileDbImplementation();

  if (fileName !== undefined && creator !== undefined) {
    let resp = await fileModelCrudInstance.getByFileName(fileName, creator);
    if (resp && resp.length !== 0 && resp.length <= 1) {
      const responseObject = resp[0];
      let filename = responseObject.filename;
      let textData = responseObject.textData;
      res.json({ textdata: textData });
    }
  }
};

export const readFileController = async (req: Request, res: Response) => {
  const fileModelCrudInstance = new FileDbImplementation();
  const fileName = req.query.filename?.toString();
  const creator = req.body.user;
  if (fileName !== undefined && creator !== undefined) {
    let resp = await fileModelCrudInstance.getByFileName(fileName, creator);
    if (resp !== undefined && resp.length !== 0) {
      let fileData = resp[0].textData;
      res.json({ fileData: fileData });
    } else {
      res.json({ fileData: "Don't Have Access To Content" });
    }
  } else {
    res.json({ msg: "Error" });
  }
};

export const createFileController = async (req: Request, res: Response) => {
  const fileModelCrudInstance = new FileDbImplementation();
  const fileName: string = req.body.fileName;
  const textData: string = req.body.textData;
  const creator: string = req.body.user;

  if (
    fileName !== undefined &&
    textData !== undefined &&
    creator !== undefined
  ) {
    const resp = await fileModelCrudInstance.createFile(
      fileName,
      textData,
      creator
    );
    if (resp !== "File Already Exists") {
      res.json(resp);
    } else {
      const resp = await createNewFileIfFileAlreadyExists(
        fileName,
        textData,
        creator,
        fileModelCrudInstance,
        1
      );
      if (resp) {
        res.json(resp);
      }
    }
  } else {
    res.json({ msg: "Err" });
  }
};

export const updateFileController = async (req: Request, res: Response) => {
  const fileModelCrudInstance = new FileDbImplementation();
  const filename = req.body.filename;
  const textData = req.body.textdata;
  const creator = req.body.user;

  if (
    textData !== "" ||
    null ||
    (undefined && filename !== null) ||
    undefined ||
    ""
  ) {
    let resp = await fileModelCrudInstance.updateFile(
      filename,
      creator,
      textData
    );
    res.json({ file: resp });
  } else {
    res.json({ msg: "err" });
  }
};

export const shareFileController = async (req: Request, res: Response) => {
  const userCrudInstance = new UserDbImplementations();
  const fileModelCrudInstance = new FileDbImplementation();
  const filename = req.body.filename;
  const username = req.body.username;
  const creator = req.body.user;

  if (filename && username && creator) {
    let userResp = await userCrudInstance.getByUserName(username);
    let fileResp = await fileModelCrudInstance.getByFileName(filename, creator);
    if (userResp && fileResp && fileResp.length === 1) {
      const secondaryOwner = userResp.id;
      const fileFromFileModel = fileResp[0].id;
      if (secondaryOwner === creator) {
        res.json({ msg: "err" });
      } else {
        const sharedFileCrudInstance = new ShareFileDbImplementation();
        const sharedFile = await sharedFileCrudInstance.shareFile(
          creator,
          fileFromFileModel,
          secondaryOwner
        );
        if (sharedFile) {
          res.json({ msg: "File Shared" });
        } else {
          res.json({ msg: "err" });
        }
      }
    } else {
      res.json({ msg: "err" });
    }
  } else {
    res.json({ msg: "err" });
  }
};

export const getSecondaryOwnerOfAFileController = async (
  req: Request,
  res: Response
) => {
  const sharedFileCrudInstance = new ShareFileDbImplementation();
  const filename = req.query?.filename;
  const creator = req.body.user;

  if (filename && creator) {
    const fileModelCrudInstance = new FileDbImplementation();
    let file = await fileModelCrudInstance.getByFileName(
      filename.toString(),
      creator
    );
    if (file && file.length === 1) {
      let filename = file[0].id;

      let sharedFile = await sharedFileCrudInstance.getByUserIdAndFileName(
        creator,
        filename
      );
      if (sharedFile && sharedFile.length === 1) {
        res.json({ list: sharedFile[0].secondaryOwners });
      } else {
        res.json({ msg: "err" });
      }
    } else {
      res.json({ msg: "err" });
    }
  } else {
    res.json({ msg: "err" });
  }
};

export const deleteSecondaryOwnersOfFileController = async (
  req: Request,
  res: Response
) => {
  const sharedFileCrudInstance = new ShareFileDbImplementation();
  const creator = req.body.user;
  const secondaryOwner = req.query.secondaryowner?.toString();
  const filename = req.query.filename?.toString();
  if (creator && secondaryOwner && filename) {
    let sharedFile = await sharedFileCrudInstance.deleteSecondaryOwnerOfFile(
      creator,
      secondaryOwner,
      filename
    );
    if (sharedFile) {
      res.json({ list: sharedFile.secondaryOwners });
    } else {
      res.json({ msg: "err" });
    }
  } else {
    res.json({ msg: "err" });
  }
};
