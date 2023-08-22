import { resolve } from "path";
import { FileDbInterface, UserDbInterface } from "../interfaces/dbInterface";
import FileModel from "../models/fileModel";
import User from "../models/userModel";
import { JwtPayload } from "jsonwebtoken";



export class FileDbImplementation implements FileDbInterface {

    async getByFileName(filename: string, creator: string) {
        try {
            // let res = await FileModel.find({filename: filename});
            let res = await FileModel.find({filename: filename, creator: creator});
            return res;
        }
        catch (err) {
            console.log(err);
            // return "Error";
        }

    }

    async getAllFiles(creator: string) {
        try {
            let res = await FileModel.find({creator});
            return res;
        }
        catch (err) {
            console.log(err);
        }
    }


        

    async createFile(filename: string, textdata: string, creator: string) {
        const fileModelData = {filename, textdata, creator};
        
        try {
            let file = await FileModel.find({filename, creator});
            if(file.length === 0) {
                console.log("working");
                try {
                    const fileModelSingleObject = await FileModel.create({
                        creator: fileModelData.creator,
                        filename: fileModelData.filename,
                        textData: fileModelData.textdata
                    });
                    return fileModelSingleObject;
                }
                catch (err) {
                    console.log(err);
                }
            }
            else {
                console.log("File Already Exists");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async deleteFile(filename: string, creator: string) {
        const file = await FileModel.find({filename, creator});
        if(file && file.length !== 0 && file.length <= 1) {
            file[0].deleteOne();
        }
    }

    async deleteFiles(files: string[], creator: string) {
        if(files.length !== 0) {
            files.map((element, index) => {
                try {
                    this.deleteFile(element, creator);
                }
                catch (err) {
                    console.log(err);
                }
            })
        }
        return files;
    }

    async updateFile(filename: string, creator: string, textData: string) {
        try {
            let file = await FileModel.find({filename, creator});
            if(file && file.length !== 0 && file.length <= 1) {
                let singleFile = file[0];
                singleFile.textData = textData;
                singleFile.save();
                return singleFile;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}

export class UserDbImplementations implements UserDbInterface {
    async getByUserName(username: string) {
        if(username) {
            try {
                const user = await User.find({username});
                if (user && user.length === 1) {
                    return user[0];
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async getByUserId(userId: string | JwtPayload) {
        if(userId) {
            try {
                const user = await User.findById(userId);
                if (user) {
                    return user;
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async createUser(username: string, password: string) {
        if(username && password) {
            try {
                const user = await User.create({
                    username: username,
                    password: password
                });
                return user;
            }
            catch(err) {
                console.log(err);
            }
            
        }
    }
}