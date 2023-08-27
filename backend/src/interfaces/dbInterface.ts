import { JwtPayload } from "jsonwebtoken";

export interface FileDbInterface {
  getByFileName(filename: string, creator: string): any;

  getAllFiles(creator: string): any;

  createFile(filename: string, textdata: string, creator: string): any;

  deleteFiles(files: Array<string>, creator: string): any;

  updateFile(filename: string, creator: string, textData: string): any;

  deleteFile(filename: string, creator: string): any;
}

export interface UserDbInterface {
  getByUserName(username: string): any;

  getByUserId(userId: string | JwtPayload): any;

  createUser(username: string, password: string): any;

  updateUserInfo(
    username: string,
    password: string,
    userId: string | JwtPayload
  ): any;

  deleteUser(userId: string | JwtPayload): any;
}

export interface ShareFileDbInterface {
  getAll(): any;

  getByUserIdAndFileName(userId: string | JwtPayload, filename: string): any;

  deleteSecondaryOwnerOfFileForUserDelete(
    sharedFileId: string,
    secondaryOwner: any,
    fileName: any
  ): any;

  deleteSecondaryOwnerOfFile(
    userId: string | JwtPayload,
    secondaryOwner: any,
    filename: string
  ): any;

  getSharedFilesWithUser(userId: string | JwtPayload): any;

  shareFile(
    userId: string | JwtPayload,
    filename: string,
    secondaryOwner: any
  ): any;
}
