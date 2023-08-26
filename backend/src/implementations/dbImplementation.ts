import { FileDbInterface, ShareFileDbInterface, UserDbInterface } from "../interfaces/dbInterface";
import FileModel from "../models/fileModel";
import User from "../models/userModel";
import { JwtPayload } from "jsonwebtoken";
import ShareFile from "../models/shareFileModel";



export class FileDbImplementation implements FileDbInterface {

    async getByFileName(filename: string, creator: string) {
        try {
            let res = await FileModel.find({filename: filename, creator: creator});
            return res;
        }
        catch (err) {
            console.log(err);
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
                return "File Already Exists";
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async deleteFile(filename: string, creator: string) {
        const file = await FileModel.find({filename, creator});
        if(file && file.length !== 0 && file.length <= 1) {
            try {
                const sharedFile = await ShareFile.find({ primaryOwner: creator, fileName: file[0].id});
                if(sharedFile && sharedFile.length !== 0) {
                    sharedFile[0].deleteOne();
                }
            }
            catch(err) {
                console.log(err);
            }
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

    async updateUserInfo(username: string, password: string, userId: string | JwtPayload) {
        if(userId && username || password) {
            try {
                const user = await this.getByUserId(userId);

                if(user) {
                    
                    username !== "" ? user.username = username : user.username = user.username;
                    password !== "" ? user.password = password : user.password = user.password;
                    user.save();
                    return user;
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async deleteUser(userId: string | JwtPayload) {
        if(userId) {
            try {
                const user = User.findById(userId);
                if(user) {
                    user.deleteOne();
                    return user;
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}

export class ShareFileDbImplementation implements ShareFileDbInterface {

    async getAll() {
        try {
            const sharedFiles = await ShareFile.find().populate("fileName", ["filename"]);
            if(sharedFiles) {
                return sharedFiles
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async getByUserIdAndFileName(userId: string | JwtPayload, filename: string) {
        if(userId && filename) {
            try {
                const sharedFile = await ShareFile.find({primaryOwner: userId, fileName: filename})
                                                        .populate("secondaryOwners", ["username"]);
                if(sharedFile && sharedFile.length !== 0) {
                    return sharedFile;
                }
                else {
                    console.log("err");
                }
            }
            catch (err) {
                console.log("err");
            }
        }
    }

    async deleteSecondaryOwnerOfFileForUserDelete(sharedFileId: string, secondaryOwner: any, fileName: any) {
        if (sharedFileId && secondaryOwner) {
            try {
                let sharedFile = await ShareFile.findById(sharedFileId).populate("secondaryOwners", ["id", "username"]);

                console.log("Hello");
                console.log("workd");
                console.log(sharedFile);
                if(sharedFile) {
                    let secondaryOwners = sharedFile.secondaryOwners;

                    let secondaryOwnerArraySecond = [];
                    for(let i=0; i<secondaryOwners.length; i++) {
                        if(secondaryOwners[i].id !== secondaryOwner) {
                            secondaryOwnerArraySecond.push(secondaryOwners[i]);
                        } 
                    }

                    sharedFile.secondaryOwners = secondaryOwnerArraySecond;
                    sharedFile.save();
                    return sharedFile;
                }

                
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async deleteSecondaryOwnerOfFile(userId: string | JwtPayload, secondaryOwner: any, filename: string) {
        if (userId && secondaryOwner) {
            try {
                let file = await FileModel.find({creator: userId, filename: filename});
                if(file && file.length !== 0) {
                    let sharedFile = await ShareFile.find({primaryOwner: userId, fileName: { $eq: file[0].id }})
                                                        .populate("secondaryOwners", ["username"]);
                                                        
                    if(sharedFile && sharedFile.length !== 0) {
                        let secondaryOwners = sharedFile[0].secondaryOwners;
                        let secondaryOwnerArraySecond = secondaryOwners.filter((element) => {
                            if(element._id.toString() !== secondaryOwner) {
                                return element;
                            }
                        })
                        sharedFile[0].secondaryOwners = secondaryOwnerArraySecond;
                        sharedFile[0].save();
                        return sharedFile[0];
                    }

                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async getSharedFilesWithUser(userId: string | JwtPayload) {
        if( userId ) {
            try {
                let sharedFiles = await ShareFile.find( { secondaryOwners: { $all: [userId] } } )
                                            .populate('primaryOwner', 'username')
                                            .populate('secondaryOwners', ['id', 'username'])
                                            .populate('fileName', ['filename', 'textData'])
                                      
                return sharedFiles;
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async shareFile(userId: string | JwtPayload, filename: string, secondaryOwner: any) {
        if(userId && filename && secondaryOwner) {
            try {
                let sharedFile = await this.getByUserIdAndFileName(userId, filename);
                if(sharedFile && sharedFile.length === 1) {    
                    let secondaryOwners = sharedFile[0].secondaryOwners;

                    secondaryOwners.push(secondaryOwner);
                    const shareFileModelEntry = await ShareFile.find({primaryOwner: userId, fileName: filename})
                    if(shareFileModelEntry && shareFileModelEntry.length === 1) {
                        shareFileModelEntry[0].secondaryOwners = secondaryOwners;
                        shareFileModelEntry[0].save();
                        return shareFileModelEntry[0];
                    }
                    else {
                        console.log("err");
                    }
                }
                else {
                    let secondaryOwners = [];
                    secondaryOwners.push(secondaryOwner);

                    const shareFileModelEntry = await ShareFile.create({primaryOwner: userId, secondaryOwners: secondaryOwners, fileName: filename})
                    if(shareFileModelEntry) {
                        return shareFileModelEntry;
                    }
                    else {
                        console.log("err");
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}